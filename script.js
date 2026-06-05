let quizStartTime;
let quizSubmitted = false;
let score = 0;

import { db } from "./firebase.js";

import {
    addDoc,
    collection
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const questions = [

{
    question:"Capital of India?",
    options:["Mumbai","Delhi","Chennai","Kolkata"],
    answer:"Delhi"
},

{
    question:"Which gas causes global warming?",
    options:["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"],
    answer:"Carbon Dioxide"
}

];

let currentQuestion = 0;
let selectedAnswer = "";
let timer;
let timeLeft = 15;

let responses = [];

const startBtn = document.getElementById("startBtn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");

startBtn.addEventListener("click",()=>{

    const studentName =
    document.getElementById("name").value.trim();

    const studentClass =
    document.getElementById("studentClass").value.trim();

    if(!studentName || !studentClass){

        alert("Please enter Name and Class");
        return;
    }

    quizStartTime = Date.now();

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "block";

    loadQuestion();

});

function loadQuestion(){

    clearInterval(timer);

    timeLeft = 15;

    timerEl.textContent = timeLeft;

    const q = questions[currentQuestion];

    questionEl.textContent = q.question;

    optionsEl.innerHTML = "";

    q.options.forEach(option=>{

        const btn = document.createElement("button");

        btn.textContent = option;

        btn.classList.add("option");

        btn.onclick = ()=>{

    if(selectedAnswer === option){

        selectedAnswer = "";

        btn.classList.remove("selected");

        return;

    }

    selectedAnswer = option;

    document
        .querySelectorAll(".option")
        .forEach(b=>b.classList.remove("selected"));

    btn.classList.add("selected");

};

        optionsEl.appendChild(btn);

    });

    if(currentQuestion === questions.length - 1){

        document.getElementById("nextBtn").innerText = "Submit";

    }else{

        document.getElementById("nextBtn").innerText = "Next";

    }

    timer = setInterval(()=>{

        timeLeft--;

        timerEl.textContent = timeLeft;

        if(timeLeft <= 0){

            nextQuestion();

        }

    },1000);

}

document
.getElementById("nextBtn")
.addEventListener("click",nextQuestion);

async function nextQuestion(){

    clearInterval(timer);

    const currentQ = questions[currentQuestion];

    if(selectedAnswer === currentQ.answer){

        score++;

    }

    responses.push({

        question: currentQ.question,

        selectedAnswer:
        selectedAnswer || "Not Answered",

        correctAnswer:
        currentQ.answer

    });

    selectedAnswer = "";

    currentQuestion++;

    if(currentQuestion < questions.length){

        loadQuestion();

    }
    else{

        await finishQuiz();

    }

}

async function finishQuiz(){

    if(quizSubmitted) return;

    quizSubmitted = true;

    document.getElementById("quizScreen").style.display = "none";

    const studentName =
    document.getElementById("name").value;

    const studentClass =
    document.getElementById("studentClass").value;

    const completionTime =
    Math.floor(
        (Date.now() - quizStartTime)/1000
    );

    try{

        await addDoc(

            collection(db,"results"),

            {
                name: studentName,
                class: studentClass,
                score: score,
                totalQuestions: questions.length,
                completionTime: completionTime,
                responses: responses,
                submittedAt: Date.now()
            }

        );

        document.body.innerHTML = `
            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                flex-direction:column;
                font-family:Arial;
            ">
                <h1>
                    Quiz Submitted Successfully!
                </h1>

                <p>
                    Thank you for participating.
                </p>

                <p>
                    Results will be announced later.
                </p>
            </div>
        `;

    }
    catch(error){

        console.error(error);

        alert("Failed to save response.");

    }

}