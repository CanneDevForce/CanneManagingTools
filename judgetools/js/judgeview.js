/***
 * DATAS STRUCTURES
 ***/
//localStorage.clear();
/**
 *  DS: CONFIGURATION
 **/
function Configuration()
{
    this.userName = false;
    this.userAccesscode = false;
    this.userRole = 'judge1';
    this.autoSwitchtab = true;
    this.autoAskDetails = false;
    this.conServer = false;
    this.conGathering = false;
    this.conCompetition = false;
    this.conGroup = false;
    this.conAssault = false;
    this.assaultYellowName = false;
    this.assaultBlueName = false;
    this.assaultRoundNumber = 3;
    this.assaultRoundDuration = 90;
    this.assaultRecoveryDuration = 60;

    this.localStore = function()
    {
        localStorage.setItem("mainConfiguration", JSON.stringify(this));
    };
    this.localLoad = function()
    {
        // Détection
        if (typeof localStorage === 'undefined')
        {
            alert("localStorage n'est pas supporté");
            return false;
        }
        // Récupération de la valeur dans web storage
        var storeddatas = localStorage.getItem('mainConfiguration');
        // Vérification de la présence du compteur
        if (storeddatas === null)
        {
            alert("Bienvenue! Une nouvelle Configuration a été créé;");
            this.localStore();
            return false;
        }
        // Si preexiste, on convertit en nombre entier la chaîne de texte qui fut stockée
        storeddatas = JSON.parse(storeddatas);
        for (var i in storeddatas)
        {
            this.setValue(i, storeddatas[i]);
        }
    };

    this.setValue = function(key, value)
    {
        // Assignment
        this[key] = value;
        this.localStore();
        // listening
        if ('userRole' === key)
        {
            if ('all' === value)
            {
                $('#tabJudLnk').show();
                $('#tabVotLnk').show();
                $('#tabMarLnk').show();
                $('#tabConLnk').show();
                $('#tabLogLnk').show();
                $('#counters .commonzone div').show();
                $('#clickers .commonzone button').show();
                globalChronometer.syncDisplay();
            }
            else if ('judge1' === value)
            {
                $('#tabJudLnk').show();
                $('#tabVotLnk').hide();
                $('#tabMarLnk').show();
                $('#tabConLnk').show();
                $('#tabLogLnk').hide();

                $('#counters .commonzone div').show();
                $('#clickers .commonzone button').show();
                globalChronometer.syncDisplay();
            }
            else if ('judge2' === value || 'judge3' === value)
            {
                if (globalConfiguration.autoSwitchtab === '1')
                    $('#tabJudLnk').tab('show');
                $('#tabJudLnk').show();
                $('#tabVotLnk').show();
                $('#tabMarLnk').hide();
                $('#tabConLnk').show();
                $('#tabLogLnk').hide();

                $('#counters .commonzone div').hide();
                $('#clickers .commonzone button').hide();
                $('#clickers .commonzone button[data-etype="vote"]').show();
            }
            else
            {
                alert('Unknown role');
            }
        }

    };
    this.localLoad();
}

/**
 *  DS: CHRONOMETER
 **/
function Chronometer()
{
    this.interv;
    this.timecounter = 0;
    this.lastStart = false;
    this.startlist = new Array();
    this.stoplist = new Array();
    this.roundlist = new Array();
    this.endWarningEmited = false;
    this.readyWarningEmited = false;
    this.equipmentWarningEmited = false;


    this.localStore = function()
    {
        localStorage.setItem("mainChronometer", JSON.stringify(this));
    };
    this.localLoad = function()
    {
        // Détection
        if (typeof localStorage === 'undefined')
        {
            alert("localStorage n'est pas supporté");
            return false;
        }
        // Récupération de la valeur dans web storage
        var storeddatas = localStorage.getItem('mainChronometer');
        // Vérification de la présence du compteur
        if (storeddatas === null)
        {
            alert("Bienvenue! Un nouveau chrono a été créé;");
            this.localStore();
            return false;
        }
        // Si preexiste, on convertit en nombre entier la chaîne de texte qui fut stockée
        storeddatas = JSON.parse(storeddatas);
        for (var i in storeddatas)
        {
            this[i] = storeddatas[i];
        }
        this.syncDisplay();
    };
    this.gettime = function()
    {
        var time = this.timecounter;
        if (this.lastStart !== false)
        {
            time += (new Date().getTime() - this.lastStart);
        }
        return time;
    };
    this.start = function()
    {
        if (this.lastStart === false)
        {
            this.startlist.push(new Date());
            this.lastStart = new Date().getTime();
            //view
            this.syncDisplay();
            addLog('chrono start');
            this.localStore();
        }

    };
    this.stop = function()
    {
        var endStage = false;
        if (this.lastStart !== false)
        {
            this.stoplist.push(new Date());
            this.timecounter += (new Date().getTime() - this.lastStart);
            this.lastStart = false;
            // to refresh regularily the time display
            this.syncDisplay();

            //view
            displayTime();
            addLog('chrono stop');
            this.localStore();
            if (this.getRemainingTime() < 0)
            {
                var question = 'Ce stop termine-t-il la reprise?';
                if (this.isInRecovery())
                    question = 'Ce stop termine-t-il le temps de récupération?';
                endStage = window.confirm(question);
                if (endStage)
                    this.endOfStage();
            }//ENDOF stage end test
        }
        return endStage;
    };
    this.reset = function()
    {
        this.stop();
        this.timecounter = 0;
        this.lastStart = false;
        this.startlist = new Array();
        this.stoplist = new Array();
        this.roundlist = new Array();
        this.endWarningEmited = false;
        this.readyWarningEmited = false;
        this.equipmentWarningEmited = false;

        this.syncDisplay();
        displayTime();
        this.localStore();
    };
    this.syncDisplay = function()
    {
        if (this.lastStart === false)
        {
            clearInterval(this.interv);
            $('#clickers .chtri[data-etype="start"]').show();
            $('#clickers .chtri[data-etype="stop"]').hide();
        }
        else
        {
            this.interv = setInterval(function() {
                displayTime();
            }, 500);
            $('#clickers .chtri[data-etype="start"]').hide();
            $('#clickers .chtri[data-etype="stop"]').show();
        }
    };
    this.isInRecovery = function()
    {
        if (this.roundlist.length % 2 === 0)
            return false;
        else
            return true;
    };
    this.getRemainingTime = function()
    {
        // round
        if (this.isInRecovery())
        {
            return globalConfiguration.assaultRecoveryDuration * 1000 - this.gettime();
        }
        // recovery
        {
            return globalConfiguration.assaultRoundDuration * 1000 - this.gettime();
        }
    };
    this.endOfStage = function()
    {
        this.stop();
        this.roundlist.push(this.timecounter);
        // si pas de recup (équipes) alors on crée une fausse récup.
        if (this.isInRecovery() && globalConfiguration.assaultRecoveryDuration === '0')
        {
            this.roundlist.push(0);
        }

        this.timecounter = 0;
        this.lastStart = false;
        this.endWarningEmited = false;
        this.readyWarningEmited = false;
        this.equipmentWarningEmited = false;

        $("#clickers .commonzone button").removeClass("btn-info btn-warning btn-danger btn-default").addClass('btn-default');
        this.start();
        displayTime();
        addLog('nextStage (' + this.roundlist.length + ')');
        this.localStore();
    };

    this.localLoad();

}

/**
 *  DS: SCORE EVENT
 **/
/**
 * 
 * @param {type} color
 * @param {type} type
 * @param {type} details
 * @returns {ScoreEvent}
 */
function ScoreEvent(color, type, details)
{
    this.color = color;
    this.type = type;
    this.details = details;
    this.sent = false;
    this.date = new Date();
    //@todo manage round number
    this.assaulttime = globalChronometer.gettime();
}

/**
 *  DS: SCORE ACCUMULATOR
 **/
function ScoreAccumulator()
{
    this.eventList = new Array();
    this.counters = new Array();

    this.counters = {
        yellow: {touch: 0, remtouch: 0, warning: 0, penalty: 0, observation: 0, yellowcard: 0, redcard: 0},
        blue: {touch: 0, remtouch: 0, warning: 0, penalty: 0, observation: 0, yellowcard: 0, redcard: 0}
    };
    this.localStore = function()
    {
        localStorage.setItem("mainScoreAccumulator", JSON.stringify(this));
    };
    this.localLoad = function()
    {
        // Détection
        if (typeof localStorage === 'undefined')
        {
            alert("localStorage n'est pas supporté");
            return false;
        }
        // Récupération de la valeur dans web storage
        var storeddatas = localStorage.getItem('mainScoreAccumulator');
        // Vérification de la présence du compteur
        if (storeddatas === null)
        {
            alert("Bienvenue! Un nouveau jeu de ScoreAccumulator a été créé;");
            this.localStore();
            return false;
        }
        // Si preexiste, on convertit en nombre entier la chaîne de texte qui fut stockée
        storeddatas = JSON.parse(storeddatas);
        for (var i in storeddatas)
        {
            this[i] = storeddatas[i];
        }
    };

    this.addEvent = function(color, type, details)
    {
        // controles particulier
        if ('remtouch' === type && this.counters[color].touch <= this.counters[color].remtouch)
        {
            addLog('Impossible: ' + color + ' : ' + type + '');
            return false;
        }
        if ('redcard' === type || 'yellowcard' === type || 'warning' === type || 'penalty' === type)
        {
            var ok = window.confirm('Confirmez le ' + type + " pour " + color);
            if (!ok)
            {
                addLog('Annulé: ' + color + ' : ' + type + '');
                return false;
            }
        }

        // structure
        var event = new ScoreEvent(color, type, details);
        this.eventList.push(event);

        if (undefined === this.counters[color])
            this.counters[color] = new Array();
        if (undefined === this.counters[color][type])
            this.counters[color][type] = 0;
        this.counters[color][type]++;
        //view
        displayTouches();
        displayRefnote();
        addLog('' + color + ' : ' + type + '');
        this.localStore();
        return true;
    };
    this.gettouches = function(color)
    {
        return this.counters[color].touch - this.counters[color].remtouch;
    };
    this.reset = function()
    {
        this.eventList = new Array();
        this.counters = new Array();

        this.counters = {
            yellow: {touch: 0, remtouch: 0, warning: 0, penalty: 0, observation: 0, yellowcard: 0, redcard: 0},
            blue: {touch: 0, remtouch: 0, warning: 0, penalty: 0, observation: 0, yellowcard: 0, redcard: 0}
        };
        displayTouches();
        displayRefnote();
        this.localStore();

    };
    this.localLoad();
}

fakeGatheringStructure = {
    gathers: [
        {
            id: 1,
            name: 'gather1',
            competitions: [
                {
                    id: 1,
                    name: 'compet1',
                    groups: [
                        {
                            id: 1,
                            name: 'poule 1',
                            assaults: [
                                {
                                    id: 1,
                                    name: 'g1c1g1a1',
                                    fighters: [
                                        {
                                            id: 1,
                                            name: 'Tomtom'
                                        },
                                        {
                                            id: 2,
                                            name: 'Nana'
                                        }
                                    ]
                                },
                                {
                                    id: 2,
                                    name: 'g1c1g1a2',
                                    fighters: [
                                        {
                                            id: 3,
                                            name: 'Romeo'
                                        },
                                        {
                                            id: 4,
                                            name: 'Giulietta'
                                        }
                                    ]
                                }
                            ]

                        },
                        {
                            id: 2,
                            name: 'poule 2',
                            assaults: [
                                {
                                    id: 3,
                                    name: 'g1c1g2a1',
                                    fighters: [
                                        {
                                            id: 5,
                                            name: 'Starsky'
                                        },
                                        {
                                            id: 6,
                                            name: 'Hutch'
                                        }
                                    ]
                                },
                                {
                                    id: 4,
                                    name: 'g1c1g2a2',
                                    fighters: [
                                        {
                                            id: 7,
                                            name: 'Iseult'
                                        },
                                        {
                                            id: 8,
                                            name: 'Tristan'
                                        }
                                    ]
                                }
                            ]

                        }
                    ]
                }
            ]
        }
    ]
};

/***
 * DISPLAY FUNCTIONS
 ***/
function displayTime()
{
    var time = globalChronometer.gettime();
    $("#counters .commonzone .clock.visible-xs").text(Math.floor(time / 1000));
    $("#counters .commonzone .clock.hidden-xs").text(Math.floor(time / 60000) + ":" + Math.floor(time / 1000) % 60);
    var remainingTime = globalChronometer.getRemainingTime();
    if (remainingTime <= 0 && false === globalChronometer.endWarningEmited)
    {
        addLog(remainingTime);
        playSound('#endSound');
        $("#clickers .commonzone button").removeClass("btn-info btn-warning btn-danger btn-default").addClass('btn-danger');
        globalChronometer.endWarningEmited = true;
    }
    else if (remainingTime <= 5 * 1000 && true === globalChronometer.isInRecovery() && false === globalChronometer.readyWarningEmited)
    {
        playSound('#readySound');
        $("#clickers .commonzone button").removeClass("btn-info btn-warning btn-danger btn-default").addClass('btn-warning');
        globalChronometer.readyWarningEmited = true;
    }
    else if (remainingTime <= 15 * 1000 && true === globalChronometer.isInRecovery() && false === globalChronometer.equipmentWarningEmited)
    {
        playSound('#equipmentSound');
        $("#clickers .commonzone button").removeClass("btn-info btn-warning btn-danger btn-default").addClass('btn-info');
        globalChronometer.equipmentWarningEmited = true;
    }
}
function displayTouches()
{
    $('#counters .yellowzone span.score').html(globalScoreAccumulator.gettouches('yellow'));
    $('#counters .bluezone span.score').html(globalScoreAccumulator.gettouches('blue'));
    $('#clickers .yellowzone .evtri[data-etype="touch"]').html(globalScoreAccumulator.gettouches('yellow'));
    $('#clickers .bluezone .evtri[data-etype="touch"]').html(globalScoreAccumulator.gettouches('blue'));
}
function displayRefnote()
{
    $('#markview .score').each(function() {
        var color = $(this).data('fcolor');
        var type = $(this).data('etype');
        $(this).html(globalScoreAccumulator.counters[color][type]);
    });
}
function displayConfig()
{
    $('#settingsview input, #settingsview select').each(function() {
        var val = $(this).data('cparameter');
        if (false !== globalConfiguration[val])
            $(this).val(globalConfiguration[val]);
    });
}

/**
 * Update selected information from the gathering's tree information.
 * @todo: must be connecter to true API
 * @returns {undefined}
 */
function displayGatheringInfo()
{
    //@todo: may probably be refactored with recursive algo
    //get selection
    var selectedGather = globalConfiguration.conGathering;
    var selectedCompet = globalConfiguration.conCompetition;
    var selectedGroup = globalConfiguration.conGroup;
    var selectedAssault = globalConfiguration.conAssault;

    //reset
    $('#conGathering').empty();
    $('#conCompetition').empty();
    $('#conGroup').empty();
    $('#conAssault').empty();
    $('#assaultYellowName').val('');
    $('#assaultBlueName').val('');

    $('#conGathering').append($('<option>', {value: -1, text: 'Rien'}));
    $('#conCompetition').append($('<option>', {value: -1, text: 'Rien'}));
    $('#conGroup').append($('<option>', {value: -1, text: 'Rien'}));
    $('#conAssault').append($('<option>', {value: -1, text: 'Rien'}));
    $('#conGathering').val(-1);
    $('#conCompetition').val(-1);
    $('#conGroup').val(-1);
    $('#conAssault').val(-1);

    //alert(":" + selectedGather + ":" + selectedCompet + ":" + selectedGroup + ":" + selectedAssault);
    //@Todo: server connection
    var gatheringStructure = fakeGatheringStructure;

    for (var g = 0; g < gatheringStructure.gathers.length; g++)
    {
        var currentgather = gatheringStructure.gathers[g];
        $('#conGathering').append($('<option>', {
            value: currentgather.id,
            text: currentgather.name
        }));
        if (1 * currentgather.id !== 1 * selectedGather)
            continue;
        $('#conGathering').val(1 * selectedGather);
        for (var c = 0; c < currentgather.competitions.length; c++)
        {
            var currentcompet = currentgather.competitions[c];
            $('#conCompetition').append($('<option>', {
                value: currentcompet.id,
                text: currentcompet.name
            }));
            if (1 * currentcompet.id !== 1 * selectedCompet)
                continue;
            $('#conCompetition').val(1 * selectedCompet);
            for (var gr = 0; gr < currentcompet.groups.length; gr++)
            {
                var currentgroup = currentcompet.groups[gr];
                $('#conGroup').append($('<option>', {
                    value: currentgroup.id,
                    text: currentgroup.name
                }));
                if (1 * currentgroup.id !== 1 * selectedGroup)
                    continue;
                $('#conGroup').val(1 * selectedGroup);
                for (var a = 0; a < currentgroup.assaults.length; a++)
                {
                    var currentassault = currentgroup.assaults[a];
                    $('#conAssault').append($('<option>', {
                        value: currentassault.id,
                        text: currentassault.name
                    }));
                    if (1 * currentassault.id !== 1 * selectedAssault)
                        continue;
                    $('#conAssault').val(1 * selectedAssault);
                    $('#assaultYellowName').val(currentassault.fighters[0].name);
                    $('#assaultBlueName').val(currentassault.fighters[1].name);
                }
            }
        }
    }


}// END displayGatheringInfo

function addLog(text)
{
    $('#logs ul').append('<li>' + globalChronometer.gettime() + ' -- ' + text + "</li>");
}

// pour que le bouton touche soit toujours de la plus grande taille possible.
function sizeadjust()
{
    var newHeight = $("html").height() - $("#navbarid").height();
    $(".fillheight").css("height", newHeight + "px");
    $('#clickers').css("height", newHeight - $("#counters").outerHeight(true) - $("#pagefooter").outerHeight(true) - 15 + "px");

}
function playSound(id)
{
    $(id)[0].play();
}

/***
 * NETWORKING
 ***/
function networkSendUnsentScoreEvents()
{
    var totest = globalScoreAccumulator.eventList;
    for (i = 0; i < totest.length; i++)
    {
        if (totest[i].sent === true)
            continue;
        //@todo: brancher sur une vraie api
        var tosendEvent = totest[i];
        tosendEvent.username = globalConfiguration.userName;
        tosendEvent.userrole = globalConfiguration.userRole;
        tosendEvent.assault = globalConfiguration.conAssault;
        tosendEvent.yellow = globalScoreAccumulator.gettouches('yellow');
        tosendEvent.blue = globalScoreAccumulator.gettouches('blue');

        var api_url = 'http://www.canne-et-dragons.org/eflags.php';
        var full_call = api_url + "?" + $.param(tosendEvent);

        $.post(full_call, function(data) {
            addLog('Server called for scoreevent ' + i + ' : ok' + full_call);
            totest[i].sent = true;
        });
        //@todo remove
        totest[i].sent = true;
    }
}
function networkGetVoteResult()
{
    //@todo warning synchonization management
}

/***
 * INITIALISATION
 ***/
$(document).ready(function() {
    // GLOBAL VARIABLES
    globalChronometer = new Chronometer();
    globalScoreAccumulator = new ScoreAccumulator();
    globalConfiguration = new Configuration();

    // LISTENERS
    $(window).resize(function() {
        sizeadjust();
    });
    $('#settingsview input').keyup(function() {
        globalConfiguration.setValue($(this).data('cparameter'), $(this).val());
    });
    $('#settingsview input').click(function() {
        globalConfiguration.setValue($(this).data('cparameter'), $(this).val());
    });
    $('#settingsview select,#settingsview input').change(function() {
        var cpar = $(this).data('cparameter');
        globalConfiguration.setValue(cpar, $(this).val());

        if (cpar === 'conServer' ||
                cpar === 'conGathering' ||
                cpar === 'conCompetition' ||
                cpar === 'conGroup' ||
                cpar === 'conAssault')
        {
            displayGatheringInfo();
        }
    });
    $('button.evtri').click(function() {
        //@todo: ask for details part   
        var added = globalScoreAccumulator.addEvent($(this).data('fcolor'), $(this).data('etype'), $(this).data('details'));
        if (added && globalConfiguration.autoSwitchtab === '1')
            $('#tabJudLnk').tab('show');
    });
    $('button.chtri').click(function() {
        if ($(this).data('etype') === 'start')
        {
            globalChronometer.start();
            if (globalConfiguration.autoSwitchtab === '1')
                $('#tabJudLnk').tab('show');

        }
        else if ($(this).data('etype') === 'stop')
        {
            var endStage = globalChronometer.stop();
            if (!endStage && !globalChronometer.isInRecovery() && globalConfiguration.autoSwitchtab === '1')
            {
                $('#tabMarLnk').tab('show');
            }
        }
        else if ($(this).data('etype') === 'reset')
        {
            globalChronometer.reset();
            globalScoreAccumulator.reset();
            if (globalConfiguration.autoSwitchtab === '1')
                $('#tabJudLnk').tab('show');
        }
        else if ($(this).data('etype') === 'vote')
        {
            globalChronometer.stop();
            $('#tabVotLnk').tab('show');
        }
        else
            alert($(this).data('etype'));
    });
    $('#voteview button').click(function() {
        //@todo: ask for details part
        $(this).parent('div').children().removeClass('active');
        $(this).addClass('active');
        if ($('#voteview .active').length === 2)
        {
            var color = $('#votecolor .active').data('fcolor');
            var vote = $('#votevalue .active').data('etype');
            var ok = window.confirm("Confirmez vous votre vote:" + color + ":" + vote + " ?");
            if (ok)
            {
                globalScoreAccumulator.addEvent(color, vote, false);
                $('#voteview button').removeClass('active');
                if (vote === 'voteYes' && globalConfiguration.userRole === 'judge1')
                {
                    $('#tabMarLnk').tab('show');
                    var target = '#markview [data-fcolor=' + color + '][data-etype=warning]';
                    $(target).click();
                }
                else
                    $('#tabJudLnk').tab('show');
            }
        }
    });


    // VIEW SETUP
    sizeadjust();
    displayTime();
    displayTouches();
    displayRefnote();
    displayGatheringInfo();
    displayConfig();
    displayGatheringInfo();


    var interv = setInterval(function() {
        networkSendUnsentScoreEvents();
    }, 1000);

});



/****
 * TOREMOVE
 ***
 function print_r(theObj) {
 var win_print_r = "";
 for (var p in theObj) {
 var _type = typeof(theObj[p]);
 if ((_type.indexOf("array") >= 0) || (_type.indexOf("object") >= 0)) {
 win_print_r += "<li>";
 win_print_r += "[" + _type + "] =>" + p;
 win_print_r += "<ul>";
 win_print_r += print_r(theObj[p]);
 win_print_r += "</ul></li>";
 } else {
 win_print_r += "<li>[" + p + "] =>" + theObj[p] + "</li>";
 }
 }
 return win_print_r;
 }
 /**/
