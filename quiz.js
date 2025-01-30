"use strict";

// Question Data
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correctAnswer: "JavaScript"
    },
    {
        question: "Which HTML element is used to define a paragraph?",
        options: ["<p>", "<h1>", "<div>", "<span>"],
        correctAnswer: "<p>"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "/* */", "#", "// and /* */"],
        correctAnswer: "//"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const feedbackContainer = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");
const scoreDisplay = document.getElementById("score");

// Load Question
const loadQuestion = () => {
    const question = questions[currentQuestionIndex];
    questionContainer.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `option${index}`; // giving each checkbox a unique ID
        checkbox.name = 'option'; // same name to group checkboxes

        const label = document.createElement('label');
        label.setAttribute('for', `option${index}`);
        label.textContent = option;

        li.appendChild(checkbox);
        li.appendChild(label);
        optionsContainer.appendChild(li);
    });

    updateProgressBar();
};

// Update Progress Bar
const updateProgressBar = () => {
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
};

// Show Score and Feedback
const showScoreAndFeedback = () => {
    // Save score to localStorage
    localStorage.setItem("quizScore", score); // Saving score to localStorage

    // Redirect to result page
    window.location.href = "results.html"; // Navigate to the results page
};


// Handle User Selection and Scoring
const calculateScore = () => {
    const question = questions[currentQuestionIndex];
    const checkboxes = optionsContainer.querySelectorAll('input[type="checkbox"]');
    let userAnswer = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            userAnswer.push(checkbox.nextElementSibling.textContent); // Push the option text
        }
    });

    // Compare selected answers with correct answers
    const correctAnswers = [question.correctAnswer];
    userAnswer.forEach(answer => {
        if (correctAnswers.includes(answer)) {
            score++;
        }
    });
};

// Navigation Logic
const nextQuestion = () => {
    calculateScore(); // Update score before moving to the next question
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
};

const prevQuestion = () => {
    calculateScore(); // Update score before moving to the previous question
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
};

// Event Listeners
prevButton.addEventListener("click", prevQuestion);
nextButton.addEventListener("click", nextQuestion);
submitButton.addEventListener("click", showScoreAndFeedback);

// Initial Load
loadQuestion();

