let gameState = {
    _phase: 'start',
    _player1Name: "",
    _player2Name: "",
    _player1Score:0,
    _player2Score:0,
    _player1Total:0,
    _player2Total:0,

    get player1Name()
    {
      return this._player1Name;
    },
    get player2Name()
    {
      return this._player2Name;
    },
    get player1Score()
    {
      return this._player1Score;
    },
    
    get player2Score()
    {
      return this._player2Score;
    },
    get player1Total()
    {
      return this._player1Total;
    },
    get player2Total()
    {
      return this._player2Total;
    },
    get phase()
    {
      return this._phase;
    },
    set player1Name(newName)
    {
      this._player1Name = newName;
    },
    
    set player2Name(newName)
    {
      this._player2Name = newName;
    },
    set player1Score(score)
    {
      this._player1Score = score;
    },
    set player2Score(score)
    {
      this._player2Score = score;
    },
    set player1Total(playerTotal)
    {
      this._player1Total = playerTotal;
    },
    set player2Total(playerTotal)
    {
      this._player2Total = playerTotal;
    },
    set phase(newPhase)
    {
      this._phase = newPhase;
    }
  };              
let player1Ans = {}
let player2Ans = {}
let newLetter = "";
let prevLetters = [];
let timeLeft = 60;
let fields = ["country","city","animal","plant","object","boy","girl","job","food","famous"];

function clearFields() {
    fields.forEach((field) => {
        document.getElementById(field).value = ""
    });
}

function loadAnswers()
{
    fields.forEach((field) => {
        document.getElementById(`${field}Value1`).innerHTML = player1Ans[field]
        document.getElementById(`${field}Value2`).innerHTML = player2Ans[field]
    });
}

function saveData(playerAns)
{
    fields.forEach((field) => {
        playerAns[field] = document.getElementById(field).value
    });       
}

function mainScore()
{
    fields.forEach((field) => {
        score(field);
    })
}

function score(category)
{
    if(player1Ans[category] && player2Ans[category])
    {
        if(player1Ans[category] === player2Ans[category])
        {
        gameState.player1Score = gameState.player1Score + 5
        gameState.player1Total = gameState.player1Total + 5
        gameState.player2Score = gameState.player2Score + 5
        gameState.player2Total = gameState.player2Total + 5
        document.getElementById(category+"Score1").innerHTML = 5
        document.getElementById(category+"Score2").innerHTML = 5
        }
        else
        {
        gameState.player1Score = gameState.player1Score + 10
        gameState.player1Total = gameState.player2Score + 10
        gameState.player2Score = gameState.player2Score + 10
        gameState.player2Total = gameState.player2Total + 10
        document.getElementById(category+"Score1").innerHTML = 10
        document.getElementById(category+"Score2").innerHTML = 10
        }
    }
    else if(!player1Ans[category] && player2Ans[category])
    {
        gameState.player2Score = gameState.player2Score + 15
        gameState.player2Total = gameState.player2Total + 15
        document.getElementById(category+"Score2").innerHTML = 15
    }
    else if(player1Ans[category] && !player2Ans[category])
    {
        gameState.player1Score = gameState.player1Score + 15
        gameState.player1Total = gameState.player1Total + 15
        document.getElementById(category+"Score1").innerHTML = 15
    }
}

function submit(){
    if(gameState.phase == "player1Playing")
    {
        if(checkAllInputs(1))
        {
        prepareNextPlayer();
        }
        else if(timeLeft>0) {
        alert(`שים לב כי המילים חייבות להתחיל באות ${newLetter}`);
        }
        else
        {
        clearInvalidFields();
        prepareNextPlayer();
        } 
    }
    else if(checkAllInputs(1))
        {
        prepareResults();
        }
        else if(timeLeft>0)
        {
            alert(`שים לב כי המילים חייבות להתחיל באות ${newLetter}`);
        }
        else {
            clearInvalidFields();
            prepareResults();
        }
} 

function prepareNextPlayer()
{
    saveData(player1Ans);
    document.getElementById("currentPlayer").innerHTML = `התור של ${gameState.player2Name} !`;
    gameState.phase = "player2Playing";
    clearFields();
    timeLeft = 60;
    timer();
}
    
function prepareResults()
{
    saveData(player2Ans);
    mainScore();
    loadAnswers();
    openResultPage();
    gameState.phase = "player1";
    clearFields();
}

function clearInvalidFields()
{
    fields.forEach((field) => {
    if(!isInputValid(document.getElementById(field)))
    {
        document.getElementById(field).value = "";
    }
    });
}

function validLoginNames()
{
    const name1 = document.getElementById("player1");
    const name2 = document.getElementById("player2");
    if(!name1.value || !name2.value)
    {
        return false;
    }
    else {
        return true;
    } 
}

function clearScore()
{
    fields.forEach((field) => {
    document.getElementById(`${field}Score1`).innerHTML = 0;
    document.getElementById(`${field}Score2`).innerHTML = 0;
    });
}

function announceWinner()
{
    if(gameState.player1Score > gameState.player2Score)
    {
    return "המנצח הוא  "+gameState.player1Name+"!!!"
    }
    else if(gameState.player1Score < gameState.player2Score)
    {
    return "המנצח הוא  "+gameState.player2Name+"!!!"
    }
    else {
    return "תיקו!"
    } 
}

function openResultPage() {
    const resultPage = document.getElementById("resultScreen")
    const gamePage = document.getElementById("gameScreen")
    resultPage.style.display = "block"
    gamePage.style.display = "none"
    document.getElementById("table1header").innerHTML = gameState.player1Name; 
    document.getElementById("table2header").innerHTML = gameState.player2Name;
    document.getElementById("currentScore1").innerHTML = `${gameState.player1Name}:${gameState.player1Score} נקודות`
    document.getElementById("currentScore2").innerHTML = `${gameState.player2Name}:${gameState.player2Score} נקודות`  
    document.getElementById("winnerName").innerHTML = announceWinner(); 
}

function randomizeLetter(currentLetter) {
    const letters = ["א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת"]
    newLetter = letters[Math.floor(Math.random()*letters.length)];
    while(prevLetters.indexOf(newLetter)!=-1)
    {
        newLetter = letters[Math.floor(Math.random()*letters.length)];
    }
    prevLetters.push(newLetter); 
    return newLetter;
}

function login() {
    if(validLoginNames())
    {
        gameState.phase = "player1Playing";
        render(gameState);
    }
    else
    {
        alert("כדי להתחיל לשחק, הכניסו קודם את שמות השחקנים")
    }
}

function newRound()
{
    gameState.player1Score=0
    gameState.player2Score=0
    clearScore()
    timeLeft = 60;
    const resultPage = document.getElementById("resultScreen");
    const gamePage = document.getElementById("gameScreen"); 
    resultPage.style.display = "none";
    gamePage.style.display = "block";
    gameState._phase = "player1Playing";
    document.getElementById("currentPlayer").innerHTML = "התור של "+ gameState.player1Name +"!"
    document.getElementById("letter").innerHTML = "האות היא... "+ randomizeLetter(newLetter)
    timer();
}

function isInputValid(element)
{
    input = element.value;
    if(input !== "" && input.charAt(0) !== newLetter)
    {
        return false;
    }
    else {
        return true;
    }
}

function onFieldInput(element) {

    if (!isInputValid(element)) {
        element.style.color = "red";
    }
    else {
        element.style.color = "initial";
    }
}

function checkAllInputs(player)
{
    return fields.every((field) => {
        //You do your work here
        const input = document.getElementById(field); 
        return isInputValid(input);
    });
}

function timer()
{

    if(timeLeft>0)
    {
        timeLeft=timeLeft-1;
        document.getElementById("timer").innerHTML = timeLeft;
        setTimeout(timer,1000);
    }
    else {
        submit();
    }
}

function render(gameState)
{
    if(gameState._phase ==='start')
    {

    }
    else if(gameState._phase ==='player1Playing')
    {
        gameState.player1Name = document.getElementById("player1").value;
        gameState.player2Name = document.getElementById("player2").value;
        const welcomePage = document.getElementById("welcomeScreen");
        const gamePage = document.getElementById("gameScreen");
        welcomePage.style.display = "none";
        gamePage.style.display = "block";
        
        document.getElementById("currentPlayer").innerHTML = "התור של "+ gameState.player1Name + "!"
        document.getElementById("letter").innerHTML = "האות היא... "+ randomizeLetter("")
        timer();
    }
    else if(phase === 'player2Playing')
    {

    }
    else{
        
        const resultPage = document.getElementById("resultScreen")
        const gamePage = document.getElementById("gameScreen")
        resultPage.style.display = "block"
        gamePage.style.display = "none"
        document.getElementById("table1header").innerHTML = gameState.player1Name; 
        document.getElementById("table2header").innerHTML = gameState.player2Name;
        document.getElementById("currentScore1").innerHTML = `${gameState.player1Name}:${gameState.player1Score} נקודות`
        document.getElementById("currentScore2").innerHTML = `${gameState.player2Name}:${gameState.player2Score} נקודות`  
        document.getElementById("winnerName").innerHTML = announceWinner();
    }
}