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
    
    const sidingOptions = {
        cedar: { score: 0, name: "Cedar wood siding" },
        pine: { score: 0, name: "Pine wood siding" },
        redwood: { score: 0, name: "Redwood siding" },
        engineered: { score: 0, name: "Engineered wood" },
        douglasFir: { score: 0, name: "Douglas fir wood" },
        cypress: { score: 0, name: "Cypress wood" },
        thermallyModified: { score: 0, name: "Thermally modified wood" },
        fiberCement: { score: 0, name: "Fiber cement siding" }
    };

    // Budget (Q1)
    if (answers[0] === 0) {
        sidingOptions.pine.score += 2;
        sidingOptions.engineered.score += 1;
    } else if (answers[0] === 1) {
        sidingOptions.cedar.score += 1;
        sidingOptions.douglasFir.score += 2;
    } else if (answers[0] === 2) {
        sidingOptions.cedar.score += 2;
        sidingOptions.redwood.score += 2;
        sidingOptions.cypress.score += 1;
    } else {
        sidingOptions.redwood.score += 2;
        sidingOptions.thermallyModified.score += 2;
        sidingOptions.fiberCement.score += 1;
    }

    // Square footage (Q2)
    if (answers[1] <= 1) {
        sidingOptions.cedar.score += 1;
        sidingOptions.pine.score += 1;
    } else {
        sidingOptions.engineered.score += 1;
        sidingOptions.fiberCement.score += 2;
    }

    // Climate (Q3)
    if (answers[2] === 0) { // Hot and dry
        sidingOptions.redwood.score += 2;
        sidingOptions.thermallyModified.score += 2;
    } else if (answers[2] === 1) { // Hot and humid
        sidingOptions.cypress.score += 2;
        sidingOptions.fiberCement.score += 2;
    } else if (answers[2] === 2) { // Cold and dry
        sidingOptions.cedar.score += 2;
        sidingOptions.douglasFir.score += 1;
    } else if (answers[2] === 3) { // Cold and wet
        sidingOptions.cedar.score += 2;
        sidingOptions.fiberCement.score += 2;
    } else { // Moderate
        sidingOptions.pine.score += 1;
        sidingOptions.engineered.score += 1;
    }

    // Maintenance (Q4)
    if (answers[3] === 0) {
        sidingOptions.fiberCement.score += 2;
        sidingOptions.engineered.score += 1;
    } else if (answers[3] === 1) {
        sidingOptions.cedar.score += 1;
        sidingOptions.thermallyModified.score += 2;
    } else if (answers[3] === 2) {
        sidingOptions.redwood.score += 2;
        sidingOptions.cypress.score += 1;
    } else {
        sidingOptions.fiberCement.score += 2;
        sidingOptions.engineered.score += 2;
    }

    // Architectural style (Q5)
    if (answers[4] === 0) {
        sidingOptions.cedar.score += 2;
        sidingOptions.pine.score += 1;
    } else if (answers[4] === 1) {
        sidingOptions.thermallyModified.score += 2;
        sidingOptions.fiberCement.score += 1;
    } else if (answers[4] === 2 || answers[4] === 4) {
        sidingOptions.engineered.score += 2;
        sidingOptions.fiberCement.score += 1;
    } else {
        sidingOptions.redwood.score += 2;
        sidingOptions.cypress.score += 1;
    }

    // Material preference (Q6)
    if (answers[5] === 0) {
        Object.keys(sidingOptions).forEach(key => {
            if (key !== 'engineered' && key !== 'fiberCement') {
                sidingOptions[key].score += 2;
            }
        });
    } else if (answers[5] === 1) {
        sidingOptions.engineered.score += 3;
    } else if (answers[5] === 2) {
        sidingOptions.engineered.score += 2;
        Object.keys(sidingOptions).forEach(key => {
            if (key !== 'engineered' && key !== 'fiberCement') {
                sidingOptions[key].score += 1;
            }
        });
    } else {
        // No additional scoring for "Open to all options"
    }

    // Determine the top recommendation
    const topRecommendation = Object.keys(sidingOptions).reduce((a, b) => 
        sidingOptions[a].score > sidingOptions[b].score ? a : b
    );


    // Explanations for each siding type
    const explanations = {
        cedar: "Cedar is known for its natural beauty, durability, and insect-resistant properties. It performs well in various climates and is a great choice for traditional architectural styles.",
        pine: "Pine is an economical option that offers a rustic look. It's suitable for moderate climates and can be a good choice for those on a budget.",
        redwood: "Redwood is prized for its rich color, natural resistance to decay, and ability to withstand harsh weather conditions. It's an excellent choice for homes in challenging climates.",
        engineered: "Engineered wood combines the beauty of real wood with enhanced durability and lower maintenance requirements. It's a versatile option suitable for various architectural styles and climates.",
        douglasFir: "Douglas fir is known for its strength and resistance to weathering. It's a good mid-range option that performs well in colder climates.",
        cypress: "Cypress wood is naturally resistant to insects and decay, making it a great choice for humid climates. It has a unique grain pattern that adds character to your home.",
        thermallyModified: "Thermally modified wood undergoes a special heating process that enhances its durability and stability. It's an excellent choice for those who want the look of natural wood with improved performance.",
        fiberCement: "Fiber cement siding offers exceptional durability, low maintenance, and fire resistance. It's a versatile option that can mimic the look of wood while providing superior longevity."
    };

    // Display the result
    let resultHTML = `<h2>Your Wood Siding Recommendation</h2>
    <p>Based on your answers, our recommendation is: <strong>${sidingOptions[topRecommendation].name}</strong></p>
    <p><strong>Why this recommendation:</strong> ${explanations[topRecommendation]}</p>
    <p>Factors that influenced this recommendation include your budget, climate, maintenance preferences, and architectural style.</p>
    <p>Do you want to see this on your own home? <a href="https://appbuilder.renoworks.com/signup?utm_source=SEO&utm_medium=design_inspiration&utm_campaign=wood_siding&utm_id=self_sign_up" target="_blank">Click here to visualize this product on your own home.</a></p>`;

    resultContainer.innerHTML = resultHTML;
    resultContainer.style.display = 'block';
}

document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('prev-btn').addEventListener('click', previousQuestion);

// Start the quiz
displayQuestion();