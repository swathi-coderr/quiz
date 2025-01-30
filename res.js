"use strict";

// Retrieve score from localStorage
const score = localStorage.getItem("quizScore");

// DOM Elements
const scoreDisplay = document.getElementById("score-display");
const feedbackContainer = document.getElementById("feedback");

// Display the score
scoreDisplay.textContent = `Your score is: ${score}`;

// Provide feedback based on the score
const percentage = (score / 4) * 100; // Assuming 4 questions in total

if (percentage > 80) {
    feedbackContainer.textContent = "Excellent!";
} else if (percentage >= 50) {
    feedbackContainer.textContent = "Good job!";
} else {
    feedbackContainer.textContent = "Keep practicing!";
}
