let userSelections = [];
let lifelineUsed = false;
document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
});
function updateDashboard() {
    const highScore = localStorage.getItem('highScore') || 0;
    const quizzesDone = localStorage.getItem('quizzesCompleted') || 0;
    const hsElement = document.getElementById('dash-high-score');
    const qdElement = document.getElementById('dash-quizzes');
    function animateValue(obj, start, end, duration) {
        if (start === end) {
            obj.innerText = end;
            return;
        }
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerText = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    if (hsElement) animateValue(hsElement, 0, highScore, 1500);
    if (qdElement) animateValue(qdElement, 0, quizzesDone, 1500);
}

function showCategories() {
    document.getElementById("dashboard-section").style.display = "none";
    document.getElementById("category-box").style.display = "block";
}

function goToCategories() {
    document.getElementById("main-quiz").style.display = "none";
    document.getElementById("dashboard-section").style.display = "none";
    document.getElementById("category-box").style.display = "block";
}

const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');
const victorySound = new Audio('party-horn-sound-effect .mp3');

const allQuestions = {
    programming: [
        { question: "What is HTML?", options: ["HTML describes the structure of a webpage", "HTML is the standard markup language mainly used to create web pages", "HTML consists of a set of elements that helps the browser how to view the content", "All of the mentioned"], answer: 3 },
        { question: "Who is the father of HTML?", options: ["Rasmus Lerdorf", "Tim Berners-Lee", "Brendan Eich", "Sergey Brin"], answer: 1 },
        { question: "HTML stands for __________", options: ["HyperText Markup Language", "HyperText Machine Language", "HyperText Marking Language", "HighText Marking Language"], answer: 0 },
        { question: "What is the correct syntax of doctype in HTML5?", options: [" </doctype html>", "<doctype html>", "<doctype html!>", "<!doctype html>"], answer: 3 },
        { question: " What is CSS?", options: ["CSS is a style sheet language", "CSS is designed to separate the presentation and content, including layout, colors, and fonts", " CSS is the language used to style the HTML documents ", "All of the mentioned"], answer: 3 },
        { question: " Which of the following tag is used to embed css in html page?", options: ["<css>", "<!DOCTYPE html>", "<script>", "<style>"], answer: 3 },
        { question: " Which of the following CSS selectors are used to specify a group of elements?", options: ["tag", "id", " class", "both class and tag"], answer: 2 },
        { question: "What is JavaScript?", options: ["JavaScript is a scripting language used to make the website interactive", " JavaScript is an assembly language used to make the website interactive", "JavaScript is a compiled language used to make the website interactive", " None of the mentioned"], answer: 0 },
        { question: "Which of the following is correct about JavaScript?", options: ["JavaScript is an Object-Based language", "JavaScript is Assembly-language", "JavaScript is an Object-Oriented language", " JavaScript is a High-level language"], answer: 0 },
        { question: "Which of the following is not javascript data types?", options: ["Null type", "Undefined type", " Number type", " All of the mentioned"], answer: 3 }

    ],

    maths: [
        { question: "What percent of 400 is 60?", options: ["6", "12", "15", "20"], answer: 2 },
        { question: " A train covers a distance of 10 km in 12 min. If it's speed is decreased by 5 km/s, what is the time taken by the train to cover the same distance?", options: ["14 m 33s", "13 m 33s", "13 m 20s", "15 m 20s"], answer: 2 },
        { question: "A towel was 50 CM broad and 100 cm long. When bleached, it was found to have lost 20% of its breadth. Find the percentage of decrease in area?", options: ["32", "28", "33", "24"], answer: 1 },
        { question: " How many digits will be there to the right of the decimal point in the product of 95.75 and 0.02554 ?", options: ["5", "6", "7", "Insufficient data"], answer: 1 },
        { question: "The price of patrol went up by 25%. In order that expenses on patrol should not increase. One must reduce travel by", options: ["25%", "20%", "18%", "15%"], answer: 1 },
        { question: "An ore contains 26% copper. To get 91 kg of copper the quantity of the ore required is?", options: ["350kg", "250kg", "240kg", "450kg"], answer: 0 },
        { question: "45% of 750 - 25% of 480 + x = 480.50. find the value of x?", options: ["216", "263", "245", "236.50"], answer: 1 },
        { question: "The sum of three consecutive natural numbers each divisible by 3 is 72. What is the largest among them?", options: ["21", "24", "27", "30"], answer: 2 },
        { question: "2/5 ÷ 4/5 × 1/9 × 0 = ?", options: ["1", "1/2", "1/3", "0"], answer: 3 },
        { question: " A is thrice as good a workman as B, and takes 10 days less to do a piece of work than B takes. How many days will B take to complete, if he works alone?", options: ["21", "15", "18", "25"], answer: 1 }
    ],

    environment: [
        { question: "Which of these layers of the atmosphere consists of the ozone layer that is responsible for absorbing the Ultra-Violet (UV) light?", options: ["Troposphere", "Mesosphere", " Stratosphere", "None of these"], answer: 2 },
        { question: "Which of these days is celebrated in the form of World Environment Day all around the world?", options: ["July 5th", "June 10th", "October 20th", "June 5th"], answer: 3 },
        { question: "Largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
        { question: "which of these following can we find Brackish water ecosystems?", options: ["Wetlands", " Streams", "Deltas", "Coastal shallows"], answer: 2 },
        { question: "Which drug is associated with the tea or coffee plant source?", options: ["Camphor", " Caffeine", "Thorn Apple", "Opium Poppy"], answer: 1 },
        { question: "How many total numbers of biodiversity hotspots are there in the world?", options: ["36", "32", "28", "18"], answer: 0 },
        { question: "Which of these is the most naturally occurring and frequent disaster?", options: ["Tsunami", "Drought", "Earthquake", "Flood"], answer: 3 },
        { question: "Which of these gases is not permitted to be released by the Prevention and Control of Pollution Act by the Government?", options: ["Sulphur Dioxide", "Carbon Monoxide", "Nitrogen Oxide", "All of the above"], answer: 3 },
        { question: "In which of these years was the Forest Conservation Act amended?", options: ["1978", "1988", "1963", "1952"], answer: 1 },
        { question: "Which of these countries constitute approximately 57% of the various large dams in the world?", options: ["Brazil and India", "Japan and India", "China and India", "Brazil and China"], answer: 2 }
    ],

    "general knowledge": [
        { question: "Which institution developed the Central Suspect Registry?", options: [" Reserve Bank of India (RBI)", "Indian Cyber Crime Coordination Centre (I4C)", "Central Bureau of Investigation (CBI)", "National Investigation Agency (NIA)"], answer: 1 },
        { question: "Which state government has launched the SHE COHORT 3.0 initiative to empower women-led startups?", options: ["Odisha", " Haryana", " Punjab", "Gujarat"], answer: 2 },
        { question: "Project Veer Gatha 4.0 is a joint initiative of which ministries?", options: [" Ministry of Education and Ministry of Sports", " Ministry of Culture and Ministry of Defence", "Ministry of Defence and Ministry of Education", "Ministry of Home Affairs and Ministry of Youth Affairs"], answer: 2 },
        { question: "CyberSecurity Grand Challenge (CSGC 2.0) has been launched by whom?", options: [" Ministry of Defence and the Indian Army", "Ministry of Science and Technology and ISRO", " Ministry of Home Affairs and NITI Aayog", "Ministry of Technology and Data Security Council of India"], answer: 3 },
        { question: "How many children were awarded the Pradhan Mantri Rashtriya Bal Puraskar 2025 by President Draupadi Murmu?", options: ["17", "15", "16", "18"], answer: 0 },
        { question: "Which organization approved the 2nd Living drug, Qartemi, for treating blood cancer?", options: [" Central Drugs Standard Control Organization (CDSCO)", " All India Institute of Medical Sciences, New Delhi", "Ministry of Health and Family Welfare", "None of these"], answer: 1 },
        { question: "How many people have been announced to be given the Padma Award by the government of India in 2025?", options: ["121", "135", "140", "139"], answer: 3 },
        { question: "Rani Durgavati Tiger Reserve is located in which state?", options: ["Odisha", "Madhya Pradesh", "Rajasthan", " Gujarat"], answer: 1 },
        { question: "Which day is observed as the International Day of Education every year?", options: ["24 January", "25 January", "26 January", "27 January"], answer: 0 },
        { question: "Which country will host the Chess World Cup 2025?", options: ["India", "Germany", "USA", "Norway"], answer: 0 }
    ],

    sports: [
        { question: "Which country won the Kho Kho World Cup 2025 in both the men’s and women’s categories?", options: [" India", "Nepal", " South Africa", "Indonesia"], answer: 0 },
        { question: "Who won the 9th Johor International Open chess tournament in Malaysia?", options: ["Nihal Sarin", "Surya Shekhar Ganguly", "Iniyan Panneerselvam", " Vidit Gujrathi"], answer: 2 },
        { question: "The official logo and mascot for the 23rd National Para Athletics Championship 2025 were launched in which city?", options: ["Hyderabad", "Chennai", "New Delhi", " Bengaluru"], answer: 1 },
        { question: "Which state has become the first to start a rural cricket league?", options: ["Gujarat", "Jharkhand", "Bihar", " Haryana"], answer: 2 },
        { question: "Which team won the men’s Hockey India League 2024-25 title?", options: ["Bengal Tigers", " Hyderabad Toofans", "Odisha Warriors", " Ranchi Rhinos"], answer: 0 },
        { question: "Who won the 2025 Chennai Open Tennis men’s single title?", options: ["Kyrian Jacquet", "Elias Ymer", "Dalibor Svrcina", "Billy Harris"], answer: 0 },
        { question: "Which state is the host of 17th National River Rafting Championship 2025?", options: ["Uttarakhand", "Sikkim", "Himachal Pradesh", "Meghalaya"], answer: 2 },
        { question: "Which country won the Asia Mixed Team Badminton Championship 2025 title?", options: ["Indonesia", "China", "Japan", "Thailand"], answer: 0 },
        { question: "Who won the Delhi Open 2025 tennis men’s singles title?", options: ["Daniil Medvedev", "Kyrian Jacquet", "Billy Harris", "Alexander Zverev"], answer: 1 },
        { question: "Which country is the host of second Asian Yogasana Championship 2025?", options: [" India", " China", " Indonesia", "Bhutan"], answer: 0 }
    ],

    "space & technology": [
        { question: "Who is the Father of Indian Space Programme?", options: ["Dr Vikram Ambalal Sarabhai", "Dr Satish Dhawan", "Dr Homi J Bhabha", "Dr Krishnaswami Kasturirangan"], answer: 0 },
        { question: "In which year Indian Space Programme was started?", options: [" 1962", "1964", " 1966", "1975"], answer: 0 },
        { question: "The Indian National Committee for Space Research (INCOSPAR) was found in which year?", options: ["1969", "1966", "1962", "1970"], answer: 2 },
        { question: "ISRO was established in which year?", options: ["15th August, 1949", "15th August, 1969", "15th August, 1972", " none of the above"], answer: 1 },
        { question: "Where is the headquarters of ISRO?", options: ["Chennai", "Mumbai", "Bengaluru", " None of these"], answer: 2 },
        { question: "At which of the following places ISRO Navigation Centre (INC) was established?", options: [" Byalalu", "Vikram Sarabhai Space Centre", "Chennai", "Sriharikota"], answer: 0 },
        { question: "The Liquid Propulsion Systems Centre (LPSC) of the Indian Space Research Organisation (ISRO) is at ", options: ["Mahendragiri (Tamil Nadu)", "Bengaluru (Karnataka)", "yderabad (Andhra Pradesh)", "Ahmedabad (Gujarat)"], answer: 0 },
        { question: "Indian space agency ISRO is setting up the country’s first space park at which location?", options: ["Hyderabad", "Chennai", "Bengaluru", "Madurai"], answer: 2 },
        { question: "ISRO’s Master Control Facility is at Hassan, it is located in", options: ["Andhra Pradesh", " Odisha", "Gujarat", "Karnataka"], answer: 3 },
        { question: "Thumba Rocket Launching Centre is located at", options: ["Uttar Pradesh", " Bihar", "Jharkhand", " Kerala"], answer: 3 }
    ],

};

let selectedQuestions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

function initQuiz(category) {
    console.log("Starting Quiz for:", category);
    lifelineUsed = false;
    userSelections = [];
    selectedQuestions = allQuestions[category].sort(() => Math.random() - 0.5);
    currentQuestion = 0;
    score = 0;
    document.getElementById("category-box").style.display = "none";
    document.getElementById("main-quiz").style.display = "block";
    const quizBox = document.getElementById("main-quiz");
    quizBox.innerHTML = `
       <div id="progress-container" style="width: 100%; background: #eee; height: 10px; border-radius: 5px; margin-bottom: 20px;">
            <div id="progress-bar" style="width: 0%; background: #28a745; height: 100%; border-radius: 5px; transition: 0.3s;"></div>
        </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 id="question-number" style="font-size: 16px; margin: 0;"></h3>
        <div style="display: flex; align-items: center; gap: 15px;">
            <p id="timer" style="font-weight: bold; color: #FF5C77; margin: 0;">Time Left: 15s</p>
            <button id="lifeline-btn" class="logout-link" style="background:#ffc107; color:black; font-size: 12px; padding: 5px 10px;" onclick="useLifeline()">
                <i class='bx bx-bulb'></i> 50-50 Lifeline
            </button>
        </div>
        </div>
        <hr>
        <h2 id="question-text"></h2>
        <div class="options-container">
            <button class="option-btn"></button>
            <button class="option-btn"></button>
            <button class="option-btn"></button>
            <button class="option-btn"></button>
        </div>
        <button id="next-btn" class="login-btn" style="background:#28a745;" onclick="nextQuestion()">Next Question</button>
        <p id="result"></p> `;

    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    startTimer();
    const q = selectedQuestions[currentQuestion];
    document.getElementById("question-text").innerText = q.question;
    document.getElementById("question-number").innerText = `Question ${currentQuestion + 1} of ${selectedQuestions.length}`;
    const btns = document.querySelectorAll(".option-btn");
    btns.forEach((btn, index) => {
        btn.innerText = q.options[index];
        btn.disabled = false;
        btn.style.background = "#f8f9fa";
        btn.style.opacity = "1";
        btn.classList.remove('shake');
        btn.onclick = () => checkAnswer(index);
    });
    const lifelineBtn = document.getElementById('lifeline-btn');
    if (lifelineBtn) {
        if (lifelineUsed) {
            lifelineBtn.style.display = "none";
        } else {
            lifelineBtn.style.display = "block";
        }
    }
    const progress = ((currentQuestion) / selectedQuestions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selected) {
    clearInterval(timer);
    const correct = selectedQuestions[currentQuestion].answer;
    const btns = document.querySelectorAll(".option-btn");
    let selectedText = selected === -1 ? "Not Answered" : selectedQuestions[currentQuestion].options[selected];

    userSelections.push({
        question: selectedQuestions[currentQuestion].question,
        selected: selectedText,
        correct: selectedQuestions[currentQuestion].options[correct],
        isCorrect: selected === correct
    });

    if (selected === correct) {
        score++;
        if (btns[selected]) btns[selected].style.background = "lightgreen";
        correctSound.play().catch(e => console.log("Audio error"));
    } else {
        if (selected !== -1) {
            score -= 0.5;
            btns[selected].classList.add('shake');
            btns[selected].style.background = "salmon";
        }
        btns[correct].style.background = "lightgreen";
        wrongSound.play().catch(e => console.log("Audio error"));
    }

    btns.forEach(btn => btn.disabled = true);
    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < selectedQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);
    const quizBox = document.getElementById("main-quiz");
    const total = selectedQuestions.length;
    let count = parseInt(localStorage.getItem('quizzesCompleted') || 0);
    localStorage.setItem('quizzesCompleted', count + 1);
    updateDashboard();
    let highScore = localStorage.getItem('highScore') || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        highScore = score;
    }
    let resultHTML = "";
    if (score === total) {
        if (typeof victorySound !== 'undefined') victorySound.play();
        resultHTML = `
        <div class="celebration-container">
            <img src="https://media1.tenor.com/m/9CSjgBMp2fIAAAAC/emoji-party.gif" class="jumping" alt="Winner" style="width:100px;">
            <h2 style="color: #28a745;">Perfect Score!</h2>
            <p>You did it! 🏆</p>
        </div> `;
    } else {
        resultHTML = `
          <h2 style="color:purple;">Quiz Finished!</h2>

            <p style="font-size: 20px;">Your Score: <b>${score} / ${total}</b></p>  `;

    }
    quizBox.innerHTML = `
        ${resultHTML}
    <p style="color: #666;">Highest Score: ${highScore}</p>
        <hr style="margin: 20px 0;">
        <button class="login-btn" onclick="restartCurrentCategory()" style="background:#007bff;">
            🔄 Try Again
        </button>
        <button class="login-btn" onclick="showReview()" style="background:#6f42c1; margin-top: 10px;">
    📝 Review Answers
      </button>
        <button class="login-btn" onclick="goToCategories()" style="background:#28a745; margin-top: 10px;">
        📚 Subject
    </button>
        <button class="login-btn" onclick="location.reload()" style="background:#6c757d; margin-top: 10px;">
            🏠 Home
        </button> `;
}

function logout() {
    window.location.href = "index.html";
}

function restartCurrentCategory() {
    victorySound.pause();
    victorySound.currentTime = 0;
    currentQuestion = 0;
    score = 0;
    selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
    const quizBox = document.getElementById("main-quiz");
    quizBox.innerHTML = `
        <h3 id="question-number"></h3>
        <p id="timer">Time Left: 15s</p>
        <hr>
        <h2 id="question-text"></h2>
        <div class="options-container">
            <button class="option-btn"></button>
            <button class="option-btn"></button>
            <button class="option-btn"></button>
            <button class="option-btn"></button>
        </div>
        <button id="next-btn" class="login-btn" style="background:#28a745;" onclick="nextQuestion()">Next Question</button>
        <p id="result"></p>
    `;
    loadQuestion();
}

function goToDashboard() {
    document.getElementById("category-box").style.display = "none";
    document.getElementById("main-quiz").style.display = "none";
    document.getElementById("dashboard-section").style.display = "block";
    updateDashboard();
}

function useLifeline() {
    if (lifelineUsed) return;
    lifelineUsed = true;
    const correct = selectedQuestions[currentQuestion].answer;
    const btns = document.querySelectorAll(".option-btn");
    let count = 0;
    btns.forEach((btn, index) => {
        if (index !== correct && count < 2) {
            btn.style.opacity = "0";
            btn.disabled = true;
            count++;
        }
    });
    document.getElementById('lifeline-btn').style.display = "none";
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}

function showReview() {
    const quizBox = document.getElementById("main-quiz");
    let reviewHTML = `<h3>Review Answers</h3>
                      <div style="max-height: 400px; overflow-y: auto; text-align: left; padding: 10px;">`;

    userSelections.forEach((item, index) => {
        const safeSelected = item.selected.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeCorrect = item.correct.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        reviewHTML += `
            <div style="margin-bottom: 15px; padding: 15px; border-radius: 8px; 
                 background-color: ${item.isCorrect ? '#d4edda' : '#f8d7da'}; 
                 border-left: 8px solid ${item.isCorrect ? '#28a745' : '#dc3545'};">
                <p style="margin: 0; font-weight: bold; color: #333;">Q${index + 1}: ${item.question}</p>
                <p style="margin: 5px 0 0 0; color: ${item.isCorrect ? '#155724' : '#721c24'};">
                    <b>Your Answer:</b> ${safeSelected}
                </p>
                <p style="margin: 2px 0 0 0; color: #155724;">
                    <b>Correct Answer:</b> ${safeCorrect}
                </p>
            </div>`;
    });

    reviewHTML += `</div>
        <button class="login-btn" onclick="showResult()" style="background:#6c757d;">⬅️ Back to Result</button>
        <button class="login-btn" onclick="goToCategories()" style="background:#28a745; margin-top: 10px;">🏠 Home</button>`;

    quizBox.innerHTML = reviewHTML;
}