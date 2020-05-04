// define some vars
var cookies = 0;
var famMembers = 0;

// start the game

function welcome(){
    cookies = 5;
    document.getElementById("cookies").innerHTML = cookies
};

// bake cookie button
function cookieClick(number){
    cookies = cookies + number;
    document.getElementById("cookies").innerHTML = cookies
};

// con family into helping your business
function conFamily(){
    var famCost = Math.floor(10 * Math.pow(1.1, famMembers));
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
    var nextCost = Math.floor(10 * Math.pow(1.1, famMembers));
    document.getElementById('famCost').innerHTML = nextCost;
};

window.setInterval(function(){
    cookieClick(famMembers);
    }, 1000);