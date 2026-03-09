const quizData = [
    {
        'question': 'What is the capital of France?',
        'options': ['Berlin', 'Madrid', 'Paris', 'Rome'],
        'correct': 'C'
    },
    {
        'question': 'Which planet is known as the Red Planet?',
        'options': ['Earth', 'Mars', 'Jupiter', 'Venus'],
        'correct': 'B'
    },
    {
        'question': 'What is the largest ocean on Earth?',
        'options': ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        'correct': 'D'
    },
    {
        'question': 'Who wrote the play "Romeo and Juliet"?',
        'options': ['William Shakespeare', 'Charles Dickens', 'Mark Twain', 'Jane Austen'],
        'correct': 'A'
    }
];

const userAnswers = [];
let index = 0;
let total = quizData.length;
let right = 0, wrong = 0;

const questionBox = document.getElementById('question');
const optionInputs = document.querySelectorAll('.options');
const submitBtn = document.getElementById('submit');

const loadQuestion = () => {
    if (index === total) {
        return endQuiz();
    }
    reset(); // Clears previous selections
    
    const data = quizData[index];    
    questionBox.innerText = `${index + 1}) ${data.question}`;
    
    optionInputs.forEach((input, i) => {
        input.nextElementSibling.innerText = data.options[i];
        
        // ADD THIS: Listen for a click on any option
        input.addEventListener('change', () => {
            submitBtn.classList.add('active');
        });
    });
}

const getAnswer = () => {
    let answer;
    optionInputs.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
}

const reset = () => {
    optionInputs.forEach((input) => {
        input.checked = false;
    });
    // ADD THIS: Remove the active class for the new question
    submitBtn.classList.remove('active');
}

const submitQuiz = () => {
    const data = quizData[index];
    const ans = getAnswer();
    
    if (!ans) {
        alert("Please select an option!");
        return;
    }

    userAnswers.push(ans);
    
    if (ans === data.correct) {
        right++;
    } else {
        wrong++;
    }
    
    index++;
    loadQuestion();
}

const endQuiz = () => {
    document.getElementById('quiz-box').innerHTML = `
        <div style="text-align:center; padding:20px;">
            <h3 style="margin-bottom:15px;">Thanks for playing!</h3>
            <h2>${right} / ${total} Correct</h2>
            <button onclick="location.reload()" style="margin-top:10px; padding:5px 10px;">Restart</button>
        </div>`;
    showDetailedResults();
}

const showDetailedResults = () => {
    // 1. Get the elements
    const resBox = document.getElementById('result');
    const userBox = document.getElementById('userResult');

    // 2. Make them visible
    resBox.style.display = "block";
    userBox.style.display = "block";

    // 3. Insert the content (using your existing logic)
    let resultHtml = "<h3>Correct Answers:</h3>";
    quizData.forEach((item, i) => {
        resultHtml += `<p>${i + 1}) ${item.question} - <b>${item.correct}</b></p>`;
    });
    resBox.innerHTML = resultHtml;

    let userHtml = "<h3>Your Selections:</h3><ul>";
    userAnswers.forEach((ans, i) => {
        userHtml += `<li>Question ${i + 1}: ${ans}</li>`;
    });
    userHtml += "</ul>";
    userBox.innerHTML = userHtml;
}

// Event Listeners
submitBtn.addEventListener('click', submitQuiz);

// Initial Load
loadQuestion();