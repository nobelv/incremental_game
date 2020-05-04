// define some vars
var cookies = 0;
var cursors = 0;

// bake cookie button
function cookieClick(number){
    cookies = cookies + number;
    document.getElementById("cookies").innerHTML = cookies
};

// buy cursors
function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1, cursors));
    if(cookies >= cursorCost){
        document.getElementById('insufficientCookies').innerHTML=''; // reset the message

        cursors = cursors + 1;
        cookies = cookies - cursorCost;
        
        document.getElementById('cursors').innerHTML = cursors;
        document.getElementById('cookies').innerHTML = cookies;
    }
    else {
        document.getElementById('insufficientCookies').innerHTML='Not enough cookies!'; // display error message
    };
    var nextCost = Math.floor(10 * Math.pow(1.1, cursors));
    document.getElementById('cursorCost').innerHTML = nextCost;
};

window.setInterval(function(){
    cookieClick(cursors);
    }, 1000);