/***
 * DATAS STRUCTURES
 ***/
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

    this.localStore = function()
    {
        localStorage.setItem("mainChronometer", JSON.stringify(this));
    }
    this.localLoad = function()
    {
        // Détection
        if (typeof localStorage == 'undefined')
        {
            alert("localStorage n'est pas supporté");
            return false;
        }
        // Récupération de la valeur dans web storage
        var storeddatas = localStorage.getItem('mainChronometer');
        // Vérification de la présence du compteur
        if (storeddatas == null)
        {
            alert("Bienvenu! Un nouveau chrono a été créé;");
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
    }
    this.gettime = function()
    {
        var time = this.timecounter;
        if (this.lastStart !== false)
        {
            time += (new Date().getTime() - this.lastStart);
        }
        return time;
    }
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
            switchRefView(false);
        }

    }
    this.stop = function()
    {
        if (this.lastStart != false)
        {
            this.stoplist.push(new Date());
            this.timecounter += (new Date().getTime() - this.lastStart);
            this.lastStart = false;

            //pres
            this.syncDisplay();
            $('#tabRefLnk').tab('show');

            //view
            displayTime();
            switchRefView(true);
            addLog('chrono stop');
            this.localStore();
        }

    }
    this.reset = function()
    {
        this.timecounter = 0;
        this.syncDisplay();
        displayTime();
        this.localStore();
    }
    this.syncDisplay = function()
    {
        if (this.lastStart == false)
        {
            clearInterval(this.interv);
        }
        else
        {
            this.interv = setInterval(function() {
                //@todo gérer le dépassement
                displayTime();
            }, 500);
        }
    }
    this.localLoad();

}

/**
 *  DS: SCORE EVENT
 **/
function ScoreEvent(color, type, details)
{
    this.color = color;
    this.type = type;
    this.details = details;
    this.sent = 0;
    this.date = new Date();
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
        blue: {touch: 0, remtouch: 0, warning: 0, penalty: 0, observation: 0, yellowcard: 0, redcard: 0},
    }
    this.localStore = function()
    {
        localStorage.setItem("mainScoreAccumulator", JSON.stringify(this));
    }
    this.localLoad = function()
    {
        // Détection
        if (typeof localStorage == 'undefined')
        {
            alert("localStorage n'est pas supporté");
            return false;
        }
        // Récupération de la valeur dans web storage
        var storeddatas = localStorage.getItem('mainScoreAccumulator');
        // Vérification de la présence du compteur
        if (storeddatas == null)
        {
            alert("Bienvenu! Un nouveau jeu de ScoreAccumulator a été créé;");
            this.localStore();
            return false;
        }
        // Si preexiste, on convertit en nombre entier la chaîne de texte qui fut stockée
        storeddatas = JSON.parse(storeddatas);
        for (var i in storeddatas)
        {
            this[i] = storeddatas[i];
        }
    }


    this.addEvent = function(color, type, details)
    {
        // controles particulier
        if ('remtouch' == type && this.counters[color].touch <= this.counters[color].remtouch)
        {
            addLog('Impossible: ' + color + ' : ' + type + '');
            return false;
        }
        if ('redcard' == type || 'yellowcard' == type || 'warning' == type || 'penalty' == type)
        {
            var ok = window.confirm('Confirmez le ' + type + " pour " + color);
            if (!ok)
            {
                addLog('Annulé: ' + color + ' : ' + type + '');
                return false;
            } else
            {
                $('#tabJudLnk').tab('show');
            }
        }
        if ('observation' == type)
        {
            $('#tabJudLnk').tab('show');
        }

        // structure
        var event = new ScoreEvent(color, type, details);
        this.eventList.push(event);

        if (undefined == this.counters[color])
            this.counters[color] = new Array();
        if (undefined == this.counters[color][type])
            this.counters[color][type] = 0;
        this.counters[color][type]++;
        //@todo: gérer l'accès réseau pour transmettre les informations.

        //view
        displayTouches();
        displayRefnote();
        addLog('' + color + ' : ' + type + '');
        this.localStore();
    }
    this.gettouches = function(color)
    {
        return this.counters[color].touch - this.counters[color].remtouch;
    }
    this.localLoad();
}

/***
 * DISPLAY FUNCTIONS
 ***/
function displayTime()
{
    var time = globalChronometer.gettime();
    $("#counters .commonzone .clock.visible-xs").text(Math.floor(time / 1000));
    $("#counters .commonzone .clock.hidden-xs").text(Math.floor(time / 60000) + ":" + Math.floor(time / 1000) % 60);
}
function displayTouches()
{
    $('#counters .yellowzone span.score').html(globalScoreAccumulator.gettouches('yellow'));
    $('#counters .bluezone span.score').html(globalScoreAccumulator.gettouches('blue'));
}
function displayRefnote()
{
    $('#refereeview .score').each(function() {
        var color = $(this).data('fcolor');
        var type = $(this).data('etype');
        $(this).html(globalScoreAccumulator.counters[color][type]);
    });
}
function addLog(text)
{
    $('#logs ul').append('<li>' + globalChronometer.gettime() + ' -- ' + text + "</li>");
}
function switchRefView(val)
{
    if (val)
        $('#refereeview button').removeAttr("disabled");
    else
        $('#refereeview button').attr("disabled", "enabled");
}

// pour que le bouton touche soit toujours de la plus grande taille possible.
function sizeadjust()
{
    var newHeight = $("html").height() - $("#navbarid").height();
    $(".fillheight").css("height", newHeight + "px");
    $('#clickers').css("height", newHeight - $("#counters").outerHeight(true) - $("#pagefooter").outerHeight(true) - 15 + "px");

}



/***
 * INITIALISATION
 ***/
$(document).ready(function() {
    // GLOBAL VARIABLES
    globalChronometer = new Chronometer();
    globalScoreAccumulator = new ScoreAccumulator();

    // LISTENERS
    $('button.evtri').click(function() {
        globalScoreAccumulator.addEvent($(this).data('fcolor'), $(this).data('etype'), $(this).data('details'));
        return false;
    });
    $('button.chtri').click(function() {
        if ($(this).data('etype') == 'start')
            globalChronometer.start();
        else if ($(this).data('etype') == 'stop')
            globalChronometer.stop();
        else if ($(this).data('etype') == 'reset')
            globalChronometer.reset();
        else
            alert($(this).data('etype'));
    });
    $(window).resize(function() {
        sizeadjust();
    });

    // VIEW SETUP
    sizeadjust();
    displayTime();
    displayTouches();
    displayRefnote();
    // toremove
    //$('#tabSetLnk').tab('show');

});



/****
 * TOREMOVE
 ***
 function print_r(theObj) {    
 var win_print_r = "";   
 for(var p in theObj){  
 var _type = typeof(theObj[p]);  
 if( (_type.indexOf("array") >= 0) || (_type.indexOf("object") >= 0) ){  
 win_print_r += "<li>";  
 win_print_r += "["+_type+"] =>"+p;  
 win_print_r += "<ul>";  
 win_print_r += print_r(theObj[p]);  
 win_print_r += "</ul></li>";  
 } else {  
 win_print_r += "<li>["+p+"] =>"+theObj[p]+"</li>";  
 }  
 }  
 return win_print_r;  
 }
 /**/