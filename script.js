// Army objects to store fighters
var army1Fighters = [];
var army2Fighters = [];

// Function to add a fighter to the specified army
function addFighter(army) {
    var fighter = { health: 100, damage: Math.floor(Math.random() * 10) + 1 };
    
    if (army === 1) {
        army1Fighters.push(fighter);
        document.getElementById('army1').innerHTML += '<div class="fighter">Fighter (' + fighter.damage + ')</div>';
    } else {
        army2Fighters.push(fighter);
        document.getElementById('army2').innerHTML += '<div class="fighter">Fighter (' + fighter.damage + ')</div>';
    }
}

// Function to start the battle
function startBattle() {
    var battlefield = document.getElementById('battlefield');
    var context = battlefield.getContext('2d');
    var xPos = 10;
    var yPos = 10;

    while (army1Fighters.length > 0 && army2Fighters.length > 0) {
        // Clear the canvas
        context.clearRect(0, 0, battlefield.width, battlefield.height);

        // Draw army 1 fighters on the canvas
        for (var i = 0; i < army1Fighters.length; i++) {
            var fighter = army1Fighters[i];
            context.drawImage(fighter.image, xPos, yPos);
            xPos += 60;
        }

        // Reset positions for army 2 fighters
        xPos = 10;
        yPos = battlefield.height - 70;

        // Draw army 2 fighters on the canvas
        for (var j = 0; j < army2Fighters.length; j++) {
            var fighter = army2Fighters[j];
            context.drawImage(fighter.image, xPos, yPos);
            xPos += 60;
        }

        // Army 1 attacks Army 2
        for (var i = 0; i < army1Fighters.length; i++) {
            var damage = army1Fighters[i].damage;
            army2Fighters[0].health -= damage;
            if (army2Fighters[0].health <= 0) {
                army2Fighters.shift();
            }
        }
        
        // Army 2 attacks Army 1
        for (var j = 0; j < army2Fighters.length; j++) {
            var damage = army2Fighters[j].damage;
            army1Fighters[0].health -= damage;
            if (army1Fighters[0].health <= 0) {
                army1Fighters.shift();
            }
        }

        // Pause for a short duration between each battle round
        await sleep(1000);
    }

    // Display the winner
    var result = document.createElement('h3');
    if (army1Fighters.length === 0 && army2Fighters.length === 0) {
        result.textContent = 'The battle resulted in a draw!';
    } else if (army1Fighters.length === 0) {
        result.textContent = 'Army 2 is the winner!';
    } else {
        result.textContent = 'Army 1 is the winner!';
    }

    document.body.appendChild(result);
}

// Utility function to pause execution for a given duration
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Preload fighter images
var image1 = new Image();
image1.src = 'd.png';
var image2 = new Image();
image2.src = 'd.png';

// Add image properties to fighters
function addFighter(army) {
    var fighter = { health: 100, damage: Math.floor(Math.random() * 10) + 1 };

    if (army === 1) {
        fighter.image = image1;
        army1Fighters.push(fighter);
        document.getElementById('army1').innerHTML += '<div class="fighter">Fighter (' + fighter.damage + ')</div>';
    } else {
        fighter.image = image2;
        army2Fighters.push(fighter);
        document.getElementById('army2').innerHTML += '<div class="fighter">Fighter (' + fighter.damage + ')</div>';
    }
}
