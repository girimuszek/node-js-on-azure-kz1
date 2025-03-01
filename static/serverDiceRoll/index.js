window.onload = function initiate() {

    let myTurn = false;
    let herTurn = true;
    let myHP = 30;
    document.getElementById("myHPtext").textContent = `My HP: ${myHP}`;
    
    const apiBase = "https://node-js-on-azure-kz1-backend-fvcbd9b3f7a3fubp.centralus-01.azurewebsites.net";

    // d20 Die
    async function d20() {
        const response = await fetch(`${apiBase}/roll?type=d20`)
        const data = await response.json()
        return data.die;
    }

    // d8 Die 
    async function d8() {
        const response = await fetch(`${apiBase}/roll?type=d8`)
        const data = await response.json()
        return data.die;
    }

    function switchTurns() {
        myTurn = !myTurn;
        herTurn = !herTurn;
    }

    //rolls d20 to seeb who gets initiative
    async function rollInitiative() {
        let initiativeRoll = await d20();

        
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

    async function myAttack(){
        let damage = await d8();
        document.getElementById("combatMessage").textContent = `Your attack would've done ${damage} HP, but you can't bring yourself to hurt your cat`;
        document.getElementById("attackBtn").disabled = true;
        switchTurns();
        setTimeout(fight, 500);
    }

    async function herAttack(){
        let damage = await d8();
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
