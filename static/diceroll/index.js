window.onload = function initiate() {

    let myTurn = false;
    let herTurn = true;
    let myHP = 30;
    document.getElementById("myHPtext").textContent = `My HP: ${myHP}`;
    
    // d20 Die
    function d20() {
        return Math.floor(Math.random() * 20) + 1;
    }

    // d8 Die 
    function d8() {
        return Math.floor(Math.random() * 8) + 1;
    }

    function switchTurns() {
        myTurn = !myTurn;
        herTurn = !herTurn;
        
    }
    //rolls d20 to seeb who gets initiative
    function rollInitiative() {
        let initiativeRoll = d20();

        //gets the element, and prints out the outcome of initiativeRoll
        document.getElementById("initiativeResult").textContent = `Initiative Roll: ${initiativeRoll}`;
        let initiativeResult2message = ""

        if (initiativeRoll > 10){
            initiativeResult2message = "You go first!";
            switchTurns()
        } else{
            initiativeResult2message = "Maja goes first!";
        }
        
        document.getElementById("initiativeResult2").textContent = initiativeResult2message;
        fight()
    }


    function myAttack(){
        document.getElementById("attackBtn").disabled = false;
        document.getElementById("combatMessage").textContent = `You can't bring yourself to hurt your cat`;
        fight();
    }


    function herAttack(){
        let damage = d8();
        myHP -= damage
        document.getElementById("combatMessage").textContent = `Maja deals ${damage} damage!`;
        document.getElementById("myHPtext").textContent = `${myHP}`;
        
        if (myHP <= 0) {
            document.getElementById("combatMessage").textContent = "You have been defeated!";
            document.getElementById("attackBtn").disabled = true;
            return;
        }
        switchTurns();
        fight();
    }

    function fight(){
        if (myTurn === false) {
            herAttack()
        } else {
            myAttack()
        }
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && myTurn) {
            myAttack();
        }
    });

    document.getElementById("attackBtn").addEventListener("click", myAttack);
    document.getElementById("attackBtn").disabled = true;

    //Rolls initiative upon loading the page
    rollInitiative();

};
