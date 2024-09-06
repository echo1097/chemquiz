document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const answerInput = document.getElementById('answer');
    const feedback = document.getElementById('feedback');
    const questionElem = document.getElementById('question');
    const questionsLeftElem = document.getElementById('questions-left');
    const masterlistModal = document.getElementById('masterlist-modal');
    const closeModal = document.getElementById('close-modal');
    const elementList = document.getElementById('element-list');
    const autocompleteContainer = document.getElementById('autocomplete-container');

    if (!submitButton || !answerInput || !feedback || !questionElem || !questionsLeftElem || !masterlistModal || !closeModal || !elementList || !autocompleteContainer) {
        console.error('One or more elements are missing in the HTML.');
        return;
    }

    const elements = [
        { name: "Aluminum", symbol: "Al" },
        { name: "Lithium", symbol: "Li" },
        { name: "Magnesium", symbol: "Mg" },
        { name: "Argon", symbol: "Ar" },
        { name: "Mercury", symbol: "Hg" },
        { name: "Bismuth", symbol: "Bi" },
        { name: "Barium", symbol: "Ba" },
        { name: "Neon", symbol: "Ne" },
        { name: "Beryllium", symbol: "Be" },
        { name: "Nickel", symbol: "Ni" },
        { name: "Boron", symbol: "B" },
        { name: "Nitrogen", symbol: "N" },
        { name: "Bromine", symbol: "Br" },
        { name: "Oxygen", symbol: "O" },
        { name: "Calcium", symbol: "Ca" },
        { name: "Phosphorus", symbol: "P" },
        { name: "Carbon", symbol: "C" },
        { name: "Platinum", symbol: "Pt" },
        { name: "Potassium", symbol: "K" },
        { name: "Chlorine", symbol: "Cl" },
        { name: "Radium", symbol: "Ra" },
        { name: "Chromium", symbol: "Cr" },
        { name: "Radon", symbol: "Rn" },
        { name: "Cobalt", symbol: "Co" },
        { name: "Copper", symbol: "Cu" },
        { name: "Fluorine", symbol: "F" },
        { name: "Silicon", symbol: "Si" },
        { name: "Gallium", symbol: "Ga" },
        { name: "Silver", symbol: "Ag" },
        { name: "Sodium", symbol: "Na" },
        { name: "Gold", symbol: "Au" },
        { name: "Helium", symbol: "He" },
        { name: "Sulfur", symbol: "S" },
        { name: "Hydrogen", symbol: "H" },
        { name: "Tin", symbol: "Sn" },
        { name: "Iodine", symbol: "I" },
        { name: "Iron", symbol: "Fe" },
        { name: "Uranium", symbol: "U" },
        { name: "Lead", symbol: "Pb" },
        { name: "Zinc", symbol: "Zn" }
    ];

    const QUESTION_COUNT = 20;

    let selectedElements = [];
    let currentElementIndex = 0;
    let score = 0;
    let userAnswers = [];
    let correctAnswers = [];
    let questionTypes = [];

    function getRandomElements(elements, count) {
        const shuffled = [...elements].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function initializeQuestionTypes() {
        questionTypes = [];
        for (let i = 0; i < QUESTION_COUNT; i++) {
            questionTypes.push(Math.floor(Math.random() * 2)); // 0 or 1
        }
    }

    function updateQuestion() {
        const element = selectedElements[currentElementIndex];
        const questionType = questionTypes[currentElementIndex];

        if (questionType === 0) {
            questionElem.textContent = `What is the symbol for ${element.name}?`;
            correctAnswers[currentElementIndex] = element.symbol;
        } else {
            const randomFormat = Math.random() < 0.5;
            if (randomFormat) {
                questionElem.textContent = `What is the element with symbol ${element.symbol}?`;
                correctAnswers[currentElementIndex] = element.name;
            } else {
                questionElem.textContent = `What element has symbol ${element.symbol}?`;
                correctAnswers[currentElementIndex] = element.name;
            }
        }

        answerInput.value = '';
        autocompleteContainer.innerHTML = ''; // Clear previous suggestions
        updateQuestionsLeft();
    }

    function calculateScore() {
        let feedbackText = `Quiz finished! Your score is ${score} out of ${QUESTION_COUNT}.`;
        let results = [];

        userAnswers.forEach((answer, index) => {
            const correctAnswer = correctAnswers[index];
            const result = answer === correctAnswer ? 'Correct' : `Wrong. Correct answer was ${correctAnswer}`;
            if (answer === correctAnswer) score++;
            results.push(`${index + 1}) ${questionElem.textContent} - Your answer: ${answer} - ${result}`);
        });

        feedbackText += ` You got ${score} correct answers.`;
        feedback.textContent = feedbackText;
        feedback.style.color = 'black'; // Feedback color for the end of the quiz

        // Display results
        const resultsContainer = document.createElement('div');
        results.forEach(result => {
            const p = document.createElement('p');
            p.textContent = result;
            resultsContainer.appendChild(p);
        });
        document.body.appendChild(resultsContainer);
    }

    function updateQuestionsLeft() {
        questionsLeftElem.textContent = `${QUESTION_COUNT - currentElementIndex} questions left`;
    }

    function handleAutocomplete() {
        const input = answerInput.value.trim().toUpperCase();
        if (!input) {
            autocompleteContainer.innerHTML = '';
            return;
        }

        const suggestions = elements.filter(el => 
            el.name.toUpperCase().startsWith(input) || el.symbol.toUpperCase().startsWith(input)
        );

        autocompleteContainer.innerHTML = '';
        suggestions.forEach(el => {
            const div = document.createElement('div');
            div.classList.add('autocomplete-item');
            div.textContent = `${el.name} (${el.symbol})`;
            div.addEventListener('click', () => {
                answerInput.value = el.name;
                autocompleteContainer.innerHTML = '';
            });
            autocompleteContainer.appendChild(div);
        });
    }

    submitButton.addEventListener('click', () => {
        const userAnswer = answerInput.value.trim().toUpperCase();
        userAnswers[currentElementIndex] = userAnswer;

        currentElementIndex++;
        if (currentElementIndex >= QUESTION_COUNT) {
            calculateScore();
            submitButton.style.display = 'none';
        } else {
            updateQuestion();
        }
    });

    function populateMasterlist() {
        elementList.innerHTML = '';
        elements.forEach(el => {
            const li = document.createElement('li');
            li.textContent = `${el.name}: ${el.symbol}`;
            elementList.appendChild(li);
        });
    }

    document.getElementById('show-masterlist').addEventListener('click', () => {
        masterlistModal.style.display = 'flex';
        populateMasterlist();
    });

    closeModal.addEventListener('click', () => {
        masterlistModal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === masterlistModal) {
            masterlistModal.style.display = "none";
        }
    };

    // Initialize quiz
    selectedElements = getRandomElements(elements, QUESTION_COUNT);
    initializeQuestionTypes();
    updateQuestion();

    // Add autocomplete functionality
    answerInput.addEventListener('input', handleAutocomplete);
});
