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

        let initiativeResult2message = ""

        if (initiativeRoll > 10){
            initiativeResult2message = "You go first!";
            switchTurns()
        } else{
            initiativeResult2message = "Maja goes first!";
        }
        
        document.getElementById("combatMessage").textContent = `She saw you, so you rolled the d20 for: ${initiativeRoll}, so ${initiativeResult2message}`;
        setTimeout(fight, 2000);
    }

    function myAttack(){
        let damage = d8();
        document.getElementById("combatMessage").textContent = `Your attack would've done ${damage} HP, but you can't bring yourself to hurt your cat`;
        document.getElementById("attackBtn").disabled = true;
        switchTurns();
        setTimeout(fight, 500);
    }

    function herAttack(){
        let damage = d8();
        myHP -= damage
        document.getElementById("combatMessage").textContent = `Maja deals ${damage} damage with the d8 die!`;
        document.getElementById("myHPtext").textContent = `My HP: ${myHP}`;
        
        if (myHP <= 0) {
            document.getElementById("combatMessage").textContent = "You have been defeated!";
            return;
        }
        switchTurns();
        setTimeout(fight, 500);
    }

    function fight(){
        if (myTurn === false) {
            document.getElementById("turnOrder").textContent = `Turn Order: Maja's`;
            document.getElementById("attackBtn").disabled = true;
            setTimeout(herAttack, 2000);
        } else {
            document.getElementById("turnOrder").textContent = `Turn Order: Yours`;
            document.getElementById("attackBtn").disabled = false;
        }
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && myTurn) {
            document.getElementById("attackBtn").click();
        }
    });
    //Enables, so that when you click the attack button, it initiates myAttack();
    document.getElementById("attackBtn").addEventListener("click", myAttack);
    document.getElementById("attackBtn").disabled = true;

    //Rolls initiative upon loading the page
    rollInitiative();

};
