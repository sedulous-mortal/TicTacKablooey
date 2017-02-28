//define login button
const logButton = document.getElementById('LOGIN');
//initialize users
let userNM;
let userNM2;
//lane referees/counters for potential win states
let Xrow1Total = 0;
let Xrow2Total = 0;
let Xrow3Total = 0;
let Xcol1Total = 0;
let Xcol2Total = 0;
let Xcol3Total = 0;
let XdiagTPrightBotLeft = 0;
let XdiagTPleftBotRight = 0;
let Orow1Total = 0;
let Orow2Total = 0;
let Orow3Total = 0;
let Ocol1Total = 0;
let Ocol2Total = 0;
let Ocol3Total = 0;
let OdiagTPrightBotLeft = 0;
let OdiagTPleftBotRight = 0;

//do the event listener for login button first
logButton.addEventListener("click", function () {
    //set a name for player1
    userNM = prompt("What will be your username?");
    //set a name for player2
    userNM2 = prompt("What will be your opponent's name?");
    //set the text inside the names element to match what user put in
    let names = document.getElementById('names');
    names.innerHTML = (`${userNM} vs ${userNM2}`);
    //after it's clicked on, set the button text to "relogin"
    //and keep it that way moving forward
    logButton.innerHTML = ('Relogin');
});

//define users
let user1 = {
    name: userNM,
    fills: '<p>X</p>'
};
let user2 = {
    name: userNM2,
    fills: '<p>O</p>',
};
//put users into an array
let currentUsers = [user1, user2];
//set default first user
let currentUser = currentUsers[0];
//explain that the node list of all the point divs should be called givenPoint
let givenPoint = document.querySelectorAll('.point');

function howToBeAPoint(e) {
    //credit @Anthony from GA for the next two lines
    // - teaching us about events and targets
    console.log(e.target);
    item = e.target;
    if (item.classList[0] === "point") {
        //then fill the div in with the "x" or "o" fill text the user has
        item.innerHTML = currentUser.fills.valueOf();
        //item.setAttribute("class", "point taken");
        item.className += (' taken');
        //otherwise if the div already contains an x
    }
    if (e.target.getAttribute('id') == "pt1" && item.innerHTML == "<p>X</p>") {
        Xrow1Total += 1;
        Xcol1Total += 1;
        XdiagTPleftBotRight += 1;
    }
    if (e.target.getAttribute('id') == "pt2" && item.innerHTML == "<p>X</p>") {
        Xrow1Total += 1;
        Xcol2Total += 1;
    }
    if (e.target.getAttribute('id') == "pt3" && item.innerHTML == "<p>X</p>") {
        Xrow1Total += 1;
        Xcol3Total += 1;
        XdiagTPrightBotLeft += 1;
    }
    if (e.target.getAttribute('id') == "pt4" && item.innerHTML == "<p>X</p>") {
        Xrow2Total += 1;
        Xcol1Total += 1;
    }
    if (e.target.getAttribute('id') == "pt5" && item.innerHTML == "<p>X</p>") {
        Xrow2Total += 1;
        Xcol2Total += 1;
        XdiagTPleftBotRight += 1;
        XdiagTPrightBotLeft += 1;
    }
    if (e.target.getAttribute('id') == "pt6" && item.innerHTML == "<p>X</p>") {
        Xrow2Total += 1;
        Xcol3Total += 1;
    }
    if (e.target.getAttribute('id') == "pt7" && item.innerHTML == "<p>X</p>") {
        Xrow3Total += 1;
        Xcol1Total += 1;
        XdiagTPrightBotLeft += 1;
    }
    if (e.target.getAttribute('id') == "pt8" && item.innerHTML == "<p>X</p>") {
        Xrow3Total += 1;
        Xcol2Total += 1;
    }
    if (e.target.getAttribute('id') == "pt9" && item.innerHTML == "<p>X</p>") {
        XdiagTPleftBotRight += 1;
        Xrow3Total += 1;
        Xcol3Total += 1;
    }
    //X CHECK ENDS HERE
    if (e.target.getAttribute('id') == "pt1" && item.innerHTML == "<p>O</p>") {
        Orow1Total += 1;
        Ocol1Total += 1;
        OdiagTPleftBotRight += 1;
    }
    if (e.target.getAttribute('id') == "pt2" && item.innerHTML == "<p>O</p>") {
        Orow1Total += 1;
        Ocol2Total += 1;
    }
    if (e.target.getAttribute('id') == "pt3" && item.innerHTML == "<p>O</p>") {
        Orow1Total += 1;
        Ocol3Total += 1;
        OdiagTPrightBotLeft += 1;
    }
    if (e.target.getAttribute('id') == "pt4" && item.innerHTML == "<p>O</p>") {
        Orow2Total += 1;
        Ocol1Total += 1;
    }
    if (e.target.getAttribute('id') == "pt5" && item.innerHTML == "<p>O</p>") {
        Orow2Total += 1;
        Ocol2Total += 1;
        OdiagTPleftBotRight += 1;
        OdiagTPrightBotLeft += 1;
    }
    if (e.target.getAttribute('id') == "pt6" && item.innerHTML == "<p>O</p>") {
        Orow2Total += 1;
        Ocol3Total += 1;
    }
    if (e.target.getAttribute('id') == "pt7" && item.innerHTML == "<p>O</p>") {
        Orow3Total += 1;
        Ocol1Total += 1;
        OdiagTPrightBotLeft += 1;
    }
    if (e.target.getAttribute('id') == "pt8" && item.innerHTML == "<p>O</p>") {
        Orow3Total += 1;
        Ocol2Total += 1;
    }
    if (e.target.getAttribute('id') == "pt9" && item.innerHTML == "<p>O</p>") {
        OdiagTPleftBotRight += 1;
        Orow3Total += 1;
        Ocol3Total += 1;
    }

    /*not sure why this isn't working
       else if (item.classList[0] === "point taken") {
           alert("This space is taken!");
       }*/

    //then, switch the user who is the current one assigned to currentUser
    if (currentUser == currentUsers[0]) {
        currentUser = currentUsers[1];
    } else {
        currentUser = currentUsers[0];
    };

    item.removeEventListener("click", howToBeAPoint);
    checkWinState();
}

//win condition checker
const checkWinState = () => {
    if (Xrow1Total == 3 ||
        Xrow2Total == 3 ||
        Xrow3Total == 3 ||
        Xcol1Total == 3 ||
        Xcol2Total == 3 ||
        Xcol3Total == 3 ||
        XdiagTPrightBotLeft == 3 ||
        XdiagTPleftBotRight == 3) {
        //say x won
        alert("Yay! X WON!");
        //force reload
        location.reload();
    } else if (
        Orow1Total == 3 ||
        Orow2Total == 3 ||
        Orow3Total == 3 ||
        Ocol1Total == 3 ||
        Ocol2Total == 3 ||
        Ocol3Total == 3 ||
        OdiagTPrightBotLeft == 3 ||
        OdiagTPleftBotRight == 3) {
        //say o won
        alert("YAY! O WON!");
        //force reload
        location.reload();
        //put in explosions here
    } else if (document.getElementsByClassName('point taken').length == 9) {
        alert('BOOM, DRAW, BOOMBOOMBOOM');
        let points = document.querySelectorAll('.point');
        for (point of points) {
            point.innerHTML = "<img src='ptSplosion.gif' \>";
        }
        location.reload();
    }

    //find out if board state is win in here
}
for (item of givenPoint) {
    //give the click event listener to all the point divs
    //and when they get clicked run the howToBeAPoint function
    item.addEventListener('click', howToBeAPoint);

};
