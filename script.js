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
    question:"What is the official theme for World Environment Day 2026?",
    options:[
        "Ecosystem Restoration",
        "Inspired by Nature. For Climate. For Our Future",
        "Only One Earth",
        "Beat Plastic Pollution"
    ],
    answer:"Inspired by Nature. For Climate. For Our Future",
    time:20
},

{
    question:"Which of the following factors determines the GWP (Global Warming Potential) of a greenhouse gas?",
    options:[
        "Atmospheric life-time",
        "Absorption capability of IR radiations",
        "Range of IR wavelengths it can absorb",
        "All of the above mentioned"
    ],
    answer:"All of the above mentioned",
    time:30
},

{
    question:"Which chemical leaked from the pesticide plant and caused the Bhopal Gas Tragedy?",
    options:[
        "Sulfur dioxide",
        "Carbon monoxide",
        "Methyl isocyanate (MIC)",
        "Methane"
    ],
    answer:"Methyl isocyanate (MIC)",
    time:20
},

{
    question:"What does HVAC stand for?",
    options:[
        "Heating, Ventilation and Air Conditioning",
        "Heat, Voltage and Air Cooling",
        "Heating, Ventilation and Automation Control",
        "Heat Ventilation Air Conservation"
    ],
    answer:"Heating, Ventilation and Air Conditioning",
    time:20
},

{
    question:"Which common agricultural nutrient becomes a silent killer when it enters waterways and causes eutrophication?",
    options:[
        "Potassium",
        "Phosphorus",
        "Calcium",
        "Carbon"
    ],
    answer:"Phosphorus",
    time:30
},

{
    question:"Which invasive weed has taken over nearly 50% of Indian forest lands according to the State of India's Environment 2026 report?",
    options:[
        "Water Hyacinth",
        "Kudzu",
        "Lantana",
        "Parthenium"
    ],
    answer:"Lantana",
    time:20
},

{
    question:`• At age 15, this Swedish activist started a solo school strike for the climate outside her parliament, sparking the global 'Fridays for Future' movement.

• She is famous for her blunt, scientifically backed speeches to world leaders, including her viral "How dare you?" address at the United Nations.

• This environmental activist gained international recognition at a young age for advocating urgent action on climate change.

• She started a global movement by organizing school strikes for the climate and has addressed world leaders at major international forums, inspiring millions of young people to raise their voices for environmental protection.

Identify the inspiring environmentalist?`,
    image:"images/q8.png",
    options:[
        "Jane Goodall",
        "Greta Thunberg",
        "Wangari Maathai",
        "Vandana Shiva"
    ],
    answer:"Greta Thunberg",
    time:30
},

{
    question:"If a building has a significantly higher Energy Performance Index (EPI), what does it indicate?",
    options:[
        "Better energy efficiency",
        "Lower energy consumption",
        "Poorer energy performance",
        "Higher indoor air quality"
    ],
    answer:"Poorer energy performance",
    time:20
},

{
    question:"Which river is at the center of the Eloor-Edayar industrial pollution dispute?",
    options:[
        "Pamba River",
        "Chaliyar River",
        "Periyar River",
        "Bharathapuzha"
    ],
    answer:"Periyar River",
    time:20
},

{
    question:"Which city will host the central global observance for World Environment Day 2026?",
    options:[
        "Riyadh",
        "Geneva",
        "Baku",
        "Seoul"
    ],
    answer:"Baku",
    time:20
}

,
{
    question:"The 'Divestment Movement' is a powerful form of economic activism active on university campuses globally. What is the primary operational goal of this movement?",
    options:[
        "To force universities to buy more carbon credits from international markets",
        "To pressure institutions to remove their investment funds and endowments from fossil fuel companies",
        "To encourage students to boycott all imported consumer electronics",
        "To completely eliminate the use of paper textbooks in higher education"
    ],
    answer:"To pressure institutions to remove their investment funds and endowments from fossil fuel companies",
    time:30
},

{
    question:"The average standard BOD of domestic sewage is measured in ________.",
    options:[
        "Number of persons per day",
        "ppm",
        "Kg per person per day",
        "Kg/day"
    ],
    answer:"Kg per person per day",
    time:20
},

{
    question:"The Montreal Protocol is globally recognized because it achieved a measurable and continuing reduction in which of the following?",
    options:[
        "Carbon dioxide and particulate matter emissions",
        "Ozone-depleting substances such as CFCs",
        "Radioactive nuclear waste",
        "Global water consumption"
    ],
    answer:"Ozone-depleting substances such as CFCs",
    time:30
},

{
    question:"What indicates the permanent hardness when alum is added to water?",
    options:[
        "CaSO4",
        "Al(OH)3",
        "Ca(OH)3",
        "CO2"
    ],
    answer:"CaSO4",
    time:20
},

{
    question:`This U.S. government agency was created to protect both people and the environment from harmful pollution.

• It sets standards for clean air, safe drinking water, and responsible waste management.

• Its work helps protect ecosystems while ensuring healthier communities for future generations.

• The agency's mission is often summarized by the phrase "Protecting Nature, Preserving Life," highlighting the close connection between environmental conservation and human well-being.

Which environmental agency is mentioned above?`,
    image:"images/q16.png",
    options:[
        "Nature Protection Authority (NPA)",
        "World Wide Fund for Nature (WWF)",
        "United States Environmental Protection Agency (EPA)",
        "National Wildlife Preservation Agency (NWPA)"
    ],
    answer:"United States Environmental Protection Agency (EPA)",
    time:30
},

{
    question:`• In the 1970s, she noticed widespread deforestation, soil erosion, and water shortages in her country.

• She believed that planting trees could help restore the environment while improving the lives of local communities.

• She founded the Green Belt Movement, which led to the planting of millions of trees across Africa.

• Her work connected environmental conservation with women's empowerment and sustainable development.

• In 2004, she became the first African woman to receive the Nobel Peace Prize.

• Her tree-planting campaign has resulted in more than 50 million trees being planted, earning her global recognition as the "Tree Woman of Africa."

Who is this environmental champion?`,
    image:"images/q18.png",
    options:[
        "Greta Thunberg",
        "Jane Goodall",
        "Wangari Maathai",
        "Vandana Shiva"
    ],
    answer:"Wangari Maathai",
    time:30
},

{
    question:"Which gas is most closely associated with photochemical smog and can cause breathing problems and eye irritation?",
    options:[
        "Ozone (O3)",
        "Hydrogen (H2)",
        "Helium (He)",
        "Neon (Ne)"
    ],
    answer:"Ozone (O3)",
    time:20
},

{
    question:"What is the noise limit prescribed by the Central Pollution Control Board (India) for residential areas?",
    options:[
        "60 dB",
        "55 dB",
        "50 dB",
        "45 dB"
    ],
    answer:"45 dB",
    time:20
},

{
    question:"Which scientific institute pioneered the Planetary Boundaries framework?",
    options:[
        "IPCC",
        "Stockholm Resilience Centre",
        "World Economic Forum",
        "Woods Hole Oceanographic Institution"
    ],
    answer:"Stockholm Resilience Centre",
    time:30
},

{
    question:"On which island was the dodo found before becoming extinct?",
    options:[
        "Madagascar",
        "Mauritius",
        "Sri Lanka",
        "Seychelles"
    ],
    answer:"Mauritius",
    time:20
}

,
{
    question:"Every few years, warmer-than-normal ocean waters spread across the Pacific, disrupting weather patterns worldwide. What is this climate event called?",
    options:[
        "La Nina",
        "Gulf Stream",
        "El Nino",
        "Monsoon Drift"
    ],
    answer:"El Nino",
    time:20
},

{
    question:"Activated sludge process is an example of _________.",
    options:[
        "Anaerobic suspended growth process",
        "Anaerobic attached growth process",
        "Aerobic attached growth process",
        "Aerobic suspended growth process"
    ],
    answer:"Aerobic suspended growth process",
    time:20
},

{
    question:`In the early 1970s, a remote Himalayan village witnessed a unique act of environmental resistance.

When loggers arrived to cut down trees, local villagers—especially women—stood between the axes and the forest.

They wrapped their arms around the trees, risking their own safety to protect nature.

The movement became a global symbol of grassroots environmental activism and community-led forest conservation.

Which famous environmental movement is being described?`,
    image:"images/q25.png",
    options:[
        "Appiko Movement",
        "Chipko Movement",
        "Bishnoi Movement",
        "Jungle Bachao Andolan"
    ],
    answer:"Chipko Movement",
    time:30
},

{
    question:"Which toxic metal was responsible for the infamous Itai-Itai disease in Japan?",
    options:[
        "Mercury",
        "Lead",
        "Cadmium",
        "Arsenic"
    ],
    answer:"Cadmium",
    time:20
},

{
    question:"Which bird's population declined drastically due to eggshell thinning caused by DDT exposure?",
    options:[
        "Peacock",
        "Bald Eagle",
        "Ostrich",
        "Emu"
    ],
    answer:"Bald Eagle",
    time:20
},

{
    question:"The Ringelmann Chart is used for the evaluation of:",
    options:[
        "Air Pollution",
        "Water Pollution",
        "Noise Pollution",
        "Radioactive Pollution"
    ],
    answer:"Air Pollution",
    time:20
},

{
    question:"Pick out the wrong statement regarding the atmosphere.",
    options:[
        "The layer containing about 70% of atmospheric mass and showing a steady decrease in temperature is called stratosphere",
        "Stratosphere is rich in ozone and lies above the troposphere",
        "Troposphere contains most water vapour and clouds",
        "Earth's atmosphere extends to about 200 km"
    ],
    answer:"The layer containing about 70% of atmospheric mass and showing a steady decrease in temperature is called stratosphere",
    time:30
},

{
    question:"Who led the famous Plachimada anti-Coca-Cola groundwater protest movement in Kerala?",
    options:[
        "Medha Patkar",
        "Mayilamma",
        "Vandana Shiva",
        "Arundhati Roy"
    ],
    answer:"Mayilamma",
    time:20
},

{
    question:"Which day is celebrated as World Wildlife Day?",
    options:[
        "March 3",
        "April 22",
        "June 5",
        "December 5"
    ],
    answer:"March 3",
    time:20
},

{
    question:"What is the title of E.F. Schumacher's influential 1973 book advocating localist economics and intermediate technologies?",
    options:[
        "The Affluent Society",
        "Small Is Beautiful",
        "The Limits to Growth",
        "Silent Spring"
    ],
    answer:"Small Is Beautiful",
    time:20
},

{
    question:`A device used in industries to clean exhaust gases by applying electric forces so that suspended particles are separated and collected before the gas is released into the atmosphere.

These systems are highly efficient in capturing particulate matter before it is released into the atmosphere.

Which type of particulate matter is most effectively removed by this system?`,
    image:"images/q30.png",
    options:[
        "Large dust particles (> 50 µm)",
        "Coarse suspended particles (10–50 µm)",
        "Fine and very fine particles (< 10 µm)",
        "Only gaseous pollutants"
    ],
    answer:"Fine and very fine particles (< 10 µm)",
    time:30
},

{
    question:"Under a Circular Economy framework, designing products for easy disassembly and recycling primarily targets which traditional economic problem?",
    options:[
        "The linear take-make-waste model",
        "Command-and-control regulatory bottlenecks",
        "The tragedy of the commons",
        "The Jevons Paradox"
    ],
    answer:"The linear take-make-waste model",
    time:30
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

    const collegeName =
    document.getElementById("college").value.trim();

    if(!studentName || !studentClass || !collegeName){

        alert("Please enter Name, Class and College");

        return;

    }


    quizStartTime = Date.now();

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "block";

    loadQuestion();

});

function loadQuestion(){

    clearInterval(timer);

    const q = questions[currentQuestion];

    timeLeft = q.time || 20;

    timerEl.textContent = timeLeft;

    questionEl.textContent = q.question;

    const imageEl =
    document.getElementById("questionImage");

    if(q.image){

        imageEl.src = q.image;

        imageEl.style.display = "block";

    }
    else{

        imageEl.style.display = "none";

    }

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

        document.getElementById("nextBtn").innerText =
        "Submit";

    }
    else{

        document.getElementById("nextBtn").innerText =
        "Next";

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

    const collegeName =
document.getElementById("college").value;

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
                college: collegeName,
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
        font-family:'Segoe UI',sans-serif;
        text-align:center;
        color:white;
    ">

        <h1 style="
            font-size:48px;
            margin-bottom:20px;
            color:#ffffff;
        ">
            ✅ Quiz Submitted Successfully!
        </h1>

        <p style="
            font-size:24px;
            margin-bottom:10px;
            color:#f5f5f5;
        ">
            Thank you for participating.
        </p>

        <p style="
            font-size:20px;
            color:#e0e0e0;
        ">
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

document.addEventListener("contextmenu", e => {
    e.preventDefault();
});

document.addEventListener("copy", e => {
    e.preventDefault();
});

document.addEventListener("cut", e => {
    e.preventDefault();
});

document.addEventListener("selectstart", e => {
    e.preventDefault();
});

//extra for phone
let violations = 0;

document.addEventListener("visibilitychange", () => {

    if(document.hidden){

        violations++;

        if(violations >= 2){

            alert("Quiz submitted due to multiple app switches.");

            finishQuiz();

        }

    }

});//done