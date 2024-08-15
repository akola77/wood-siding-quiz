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
       // Add the rest of the questions here
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
       
       document.getElementById('submit-btn').style.display = 'block';
   }

   function submitAnswer() {
       const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
       if (selectedOption) {
           answers.push(parseInt(selectedOption.value));
           currentQuestion++;
           if (currentQuestion < questions.length) {
               displayQuestion();
           } else {
               showResult();
           }
       } else {
           alert("Please select an option before submitting.");
       }
   }

   function showResult() {
       const resultContainer = document.getElementById('result-container');
       document.getElementById('question-container').style.display = 'none';
       document.getElementById('submit-btn').style.display = 'none';
       
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

   document.getElementById('submit-btn').addEventListener('click', submitAnswer);

   // Start the quiz
   displayQuestion();
   