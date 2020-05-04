// define some vars
let cookies = 0;
let famMembers = 0;
let nextCost = 0;

let autoSave = true;

// to cheat a bit while developing
let cloneMulti = 2;

// GAME STATE FUNCTIONS

// Start the game
function gameStart(){
    if(localStorage.getItem("cookieSaver") === null){
        $("#tracker").hide();
        $("#clicker").hide();
    }
    else {
        $("#welcomeMessage").hide();
    }
};


function welcome(){
    cookies = 10; // get some free cookies for starting
    document.getElementById("cookies").innerHTML = cookies;
    
    $("#welcomeMessage").hide();
    $("#tracker").show();
    $("#clicker").show();
};

// save the game
function saveGame(){
    let saveVar = {
        cookies: cookies,
        famMembers: famMembers,
        nextCost: nextCost
    };
    localStorage.setItem("cookieSaver",JSON.stringify(saveVar)); 
};

// load the game
function load(){
    let savegame = JSON.parse(localStorage.getItem("cookieSaver")); 

    if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies; 
    if (typeof savegame.famMembers !== "undefined") famMembers = savegame.famMembers;
    if (typeof savegame.nextCost !== "undefined") nextCost = savegame.nextCost;

    document.getElementById('cookies').innerHTML = savegame.cookies;
    document.getElementById('famMembers').innerHTML = savegame.famMembers;
    document.getElementById('famCost').innerHTML = nextCost;
};

// delete save
function deleteSave(){
    let confirmPlayerAction = confirm('Really delete save?');
    if(confirmPlayerAction){
        localStorage.removeItem('cookieSaver');
        autoSave = false;
        
        // reset counters
        document.getElementById('cookies').innerHTML = 0;
        document.getElementById('famMembers').innerHTML = 0;
        document.getElementById('famCost').innerHTML = 0;

        // reset letiables
        cookies = 0;
        famMembers = 0;
        famCost = 0;
        
        // reset the game
        $("#welcomeMessage").show();
        $("#tracker").hide();
        $("#clicker").hide();

    }
}


// GAMEPLAY

// bake cookie button
function cookieClick(number){
    cookies = cookies + number;
    document.getElementById('cookies').innerHTML = cookies;
};

// con family into helping your business
function conFamily(){
    let famCost = Math.floor(10 * Math.pow(1.1, famMembers));
    if(cookies >= famCost){
        document.getElementById('insufficientCookies').innerHTML=''; // reset the message

        famMembers = famMembers + 1;
        cookies = cookies - famCost;
        
        document.getElementById('famMembers').innerHTML = famMembers;
        document.getElementById('cookies').innerHTML = cookies;
    }
    else {
        document.getElementById('insufficientCookies').innerHTML='Not enough cookies!'; // display error message
    };
    nextCost = Math.floor(10 * Math.pow(1.1, famMembers));
    document.getElementById('famCost').innerHTML = nextCost;
};

// developer cheat function 
function cloneFamily(){
    if(famMembers > 0){
        famMembers = famMembers * cloneMulti;
        document.getElementById('famMembers').innerHTML = famMembers;

        // force cost update
        nextCost = Math.floor(10 * Math.pow(1.1, famMembers));
        document.getElementById('famCost').innerHTML = nextCost;
    }    
};

window.setInterval(function(){
    cookieClick(famMembers);
    }, 1000);

window.setInterval(function(){
    if(autoSave){
        saveGame();
        }
}, 100);

$(document).ready(function(){
    gameStart();
    load();
    });