// mini PXI Questions
const questions = [
    { construct: "Audiovisual Appeal", text: "I liked the look and feel of the game." },
    { construct: "Challenge", text: "The game was not too easy and not too hard to play." },
    { construct: "Ease of Control", text: "It was easy to know how to perform actions in the game." },
    { construct: "Clarity of Goals", text: "The goals of the game were clear to me." },
    { construct: "Progress Feedback", text: "The game gave clear feedback on my progress towards the goals." },
    { construct: "Autonomy", text: "I felt free to play the game in my own way." },
    { construct: "Curiosity", text: "I wanted to explore how the game evolved." },
    { construct: "Immersion", text: "I was fully focused on the game." },
    { construct: "Mastery", text: "I felt I was good at playing this game." },
    { construct: "Meaning", text: "Playing the game was meaningful to me." },
    { construct: "Enjoyment", text: "I had a good time playing this game." },
];

// Shuffle questions
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Generate questions dynamically
const container = document.getElementById('questions-container');
shuffle(questions).forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('card', 'mb-3');
    questionDiv.setAttribute('data-question-index', index);
    questionDiv.innerHTML = `
        <div class="card-body">
            <p class="card-text fw-bold">${index + 1}. ${question.text}</p>
            <div class="d-flex justify-content-between text-center">
                <div>
                    <label for="q${index}-1" class="d-block">Strongly Disagree</label>
                    <input class="form-check-input" type="radio" name="q${index}" value="-3" id="q${index}-1">
                </div>
                <div>
                    <label for="q${index}-2" class="d-block">Disagree</label>
                    <input class="form-check-input" type="radio" name="q${index}" value="-2" id="q${index}-2">
                </div>
                <div>
                    <label for="q${index}-3" class="d-block">Somewhat Disagree</label>
                    <input class="form-check-input" type="radio" name="q${index}" value="-1" id="q${index}-3">
                </div>
                <div>
                    <label for="q${index}-4" class="d-block">Neutral</label>
                    <input class="form-check-input" type="radio" name="q${index}" value="0" id="q${index}-4">
                </div>
                <div>
                    <label for="q${index}-5" class="d-block">Somewhat Agree</label>
                    <input class="form-check-input" type="radio" name="q${index}" value="1" id="q${index}-5">
                </div>
                <div>
                    <label for="q${index}-6" class="d-block">Agree</label>
                    <input class="form-check-input" type="radio" name="q${index}" value="2" id="q${index}-6">
                </div>
                <div>
                    <label for="q${index}-7" class="d-block">Strongly Agree</label>
                    <input class="form-check-input" type="radio" name="q${index}" value="3" id="q${index}-7">
                </div>
            </div>
        </div>
    `;
    container.appendChild(questionDiv);
});

// Display a Bootstrap alert
function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

// Gather results and display scores
document.getElementById('submit-btn').addEventListener('click', () => {
    const results = {};
    let allAnswered = true;

    // Reset any previous validation indicators
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('border-danger');
    });

    questions.forEach((question, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            const value = parseInt(selected.value, 10);
            results[question.construct] = value;
        } else {
            allAnswered = false;
            const questionCard = document.querySelector(`.card[data-question-index="${index}"]`);
            questionCard.classList.add('border-danger');
        }
    });

    if (!allAnswered) {
        showAlert("Please answer all questions before submitting.", "danger");
        return;
    }

    // Display individual construct scores
    const resultElement = document.getElementById('result');
    resultElement.textContent = JSON.stringify(results, null, 2);

    // Show copy button
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.style.display = 'block';
});

// Copy to Clipboard Functionality
document.getElementById('copy-btn').addEventListener('click', () => {
    const resultElement = document.getElementById('result');
    navigator.clipboard.writeText(resultElement.textContent).then(() => {
        showAlert("Results copied to clipboard!", "success");
    }).catch(err => {
        showAlert("Failed to copy results. Please try again.", "danger");
    });
});
