var power = 0;
var auto = true;
var crying = $("#crying");
var sleeping = $("#sleeping");
var cradleControl = $(".cradle-control");
var mainControl = $(".main-overview");
var infoPanel = $(".info");
var cPopup = $("#cradle-control-popup");
var sPopup = $("#main-overview");
var mildBtn = $("#mild-button");
var medBtn = $("#medium-button");
var stopBtn = $("#stop-button");
var autoOn = $(".auto-on");
var autoOff = $(".auto-off");
var dB2 = 0;
var pants = 'D';
var health = true;
var cry = false;

// Default setup
crying.hide();
cradleControl.hide();
autoOff.hide();

// Functions
function requestCradleMovement(){
    $.post("http://exceed.cupco.de/iot/Have-a-seed/web", {data: power});
}

function getCradleStatus(){
    $.get("http://exceed.cupco.de/iot/Have-a-seed/web", showCradleStatus);
}

function showCradleStatus(status){
    var cradle = $("#cradle-status");
    if (status == 0) {
        cradle.text("Idle");
    } 
    else if (status == 1) {
        cradle.text("Mild");
    } 
    else if (status == 2) {
        cradle.text("Fun");
    }
}

function changeInfantState(){
    if (health) {
        $("#infant-status").text("Happy");
        $(".condition-status").css('color', 'greenyellow');
        sleeping.show();
        crying.hide();
    }
    else {  
        $("#infant-status").text("Unhappy");
        $(".condition-status").css('color', 'red');
         crying.show();
         sleeping.hide();
    }
}

function autoCradleControl(){
    if (auto) {
        if (cry) {
            power = 1;
            requestCradleMovement();
        }
    }
}

function toggleAuto(){
    auto = !auto;
    autoOn.toggle();
    autoOff.toggle();
}

function showCradleControl(){
    infoPanel.slideUp();
    cradleControl.slideDown();
}

function showInfo(){
    infoPanel.slideDown();
    cradleControl.slideUp();
}

function refreshData(){
    $.get("http://exceed.cupco.de/iot/Have-a-seed/board",onGetweb);
    if (pants == 'W') {
        health = false;
    }
    else if (dB2 > 40 && cry != true) {
        cry = true;
        health = false;
    }
    else if (cry == true) {
        health = false;
    }
    else {
        health = true;
    }
    changeInfantState();
    getCradleStatus();
    autoCradleControl();
}

function onGetweb(result){
    var dB = result.substring(1);
    dB2 = dB/1024*100;
    dB2 = Math.round(dB2);
    if (dB2 === parseInt(dB2,10))
        dB2 = dB2;
    else
        dB2 = 0;

    pants = result.charAt(0);
    setPantStatus();
    setSoundStatus();
}

function setPantStatus(){
    var pantStatus = $("#pantstatus");
    if (pants == 'W') 
        pantStatus.text("Wet");
    else
        pantStatus.text("Dry");
}

function setSoundStatus(){
    var soundstatus = $("#soundstatus");
    soundstatus.text(Math.round(dB2)+"%");
}


function refreshCry(){
    memory += Math.round(dB2)+" ";
    memory.split
    memoryCount++;
}

function resetDelay()
{
    if(dB2<40){
        cry = false;
        if(auto){
            power = 0;
            requestCradleMovement();
        }
    }
}

  // Anonymous Function
mildBtn.click(function(){
    power = 1;
    requestCradleMovement();
});

medBtn.click(function(){
    power = 2;
    requestCradleMovement();
});
stopBtn.click(function(){
    power = 0;
    requestCradleMovement();
});

// Set Interval
setInterval(refreshData,1000);
setInterval(resetDelay,7000)

// Button implementation
infoPanel.hover(showCradleControl);
mainControl.hover(showInfo);
autoOn.click(toggleAuto);
autoOff.click(toggleAuto);