const questions = [
    {
        question: "How would you describe your budget approach for this siding project?",
        options: [
            "Limited - looking for the most economical option",
            "Moderate - willing to invest in quality, but cost is a factor",
            "Flexible - prioritizing quality and aesthetics over cost",
            "Open - prepared to spend what's necessary for the best option"
        ]
    },
    {
        question: "What is the approximate square footage of your home's exterior walls?",
        options: [
            "Small (under 1,000 sq ft)",
            "Medium (1,000 - 2,000 sq ft)",
            "Large (2,000 - 3,000 sq ft)",
            "Very large (over 3,000 sq ft)"
        ]
    },
    {
        question: "Which climate best describes your area?",
        options: [
            "Hot and dry",
            "Hot and humid",
            "Cold and dry",
            "Cold and wet",
            "Moderate with all four seasons"
        ]
    },
    {
        question: "How much maintenance are you willing to perform on your siding?",
        options: [
            "Minimal (every 5-7 years)",
            "Moderate (every 2-3 years)",
            "High (annual maintenance)",
            "I prefer low-maintenance options"
        ]
    },
    {
        question: "What is your home's architectural style and are there any restrictions?",
        options: [
            "Traditional (e.g., Colonial, Victorian) with no restrictions",
            "Modern/Contemporary with no restrictions",
            "Mixed style with HOA restrictions",
            "Historic home with preservation guidelines",
            "Standard suburban with some HOA color restrictions"
        ]
    },
    {
        question: "What is your preference for siding material?",
        options: [
            "Natural wood only",
            "Engineered wood products",
            "Mix of natural and engineered wood",
            "Open to all options, including wood-look alternatives"
        ]
    }
];

let currentQuestion = 0;
const answers = [];

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestion];
    
    let html = `<div class="question">
        <h2>Question ${currentQuestion + 1}</h2>
        <p>${question.question}</p>
        <ul class="options">`;
    
    question.options.forEach((option, index) => {
        html += `<li>
            <input type="radio" name="q${currentQuestion}" id="q${currentQuestion}o${index}" value="${index}">
            <label for="q${currentQuestion}o${index}">${option}</label>
        </li>`;
    });
    
    html += `</ul></div>`;
    questionContainer.innerHTML = html;
    
    updateNavigation();
    updateProgressCounter();
}

function updateNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
    nextBtn.textContent = currentQuestion === questions.length - 1 ? 'Submit' : 'Next';
}

function updateProgressCounter() {
    const progressCounter = document.getElementById('progress-counter');
    progressCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (selectedOption) {
        answers[currentQuestion] = parseInt(selectedOption.value);
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    } else {
        alert("Please select an option before moving to the next question.");
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function showResult() {
    const resultContainer = document.getElementById('result-container');
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('navigation-buttons').style.display = 'none';
    document.getElementById('progress-counter').style.display = 'none';
    
    // Simple logic to determine siding type (you may want to expand this)
    let sidingType = "Cedar";
    if (answers[0] <= 1 && answers[3] <= 1) {
        sidingType = "Pine";
    } else if (answers[2] >= 3 || answers[4] >= 3) {
        sidingType = "Redwood";
    }
    
    resultContainer.innerHTML = `<h2>Result</h2><p>Based on your answers, we recommend ${sidingType} siding for your home.</p>`;
    resultContainer.style.display = 'block';
}

document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('prev-btn').addEventListener('click', previousQuestion);

// Start the quiz
displayQuestion();