const button = document.getElementById('button');

// Fetch the JSON file if there is no localStorage named 'questions'
function getQuestions(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            //set an object to local storage
            localStorage.setItem('questions', JSON.stringify(data));
            
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

if (!localStorage.getItem('questions') || Object.keys(JSON.parse(localStorage.getItem('questions'))).length == 0) {
    console.log('fetching');
    getQuestions('questions.json');
}

function getRandomValue(max) {
    const randomValue = Math.floor(Math.random() * max);
    return randomValue;
}

function handleClick() {
    const questions = JSON.parse(localStorage.getItem('questions'));

    if (!questions) {
        document.getElementById('question').innerText = 'No questions found, try clicking the button again or reloading the page';
    } else if (Object.keys(questions).length === 1) {
        button.innerHTML = 'Load questions';
        document.getElementById('question').innerText = questions[0];
        localStorage.removeItem('questions');
    } else {
        const numberOfQuestions = Object.keys(questions).length;
        const questionNumber = getRandomValue(numberOfQuestions);

        document.getElementById('question').innerText = questions[questionNumber];

        questions[questionNumber] = questions[numberOfQuestions-1];
        delete questions[numberOfQuestions-1];

        localStorage.setItem('questions', JSON.stringify(questions));
    }
}

function handleFetching() {
    getQuestions('questions.json');
}

function handleTouchStart() {
    button.style.backgroundColor = '#3bedb7';
}

function handleTouchEnd() {
    setTimeout(() => {
        button.style.backgroundColor = '#135CFD';
        button.style.color = '#dbebf8';
    }, 200);
}

button.addEventListener('click', () => {
    if (!localStorage.getItem('questions')) {
        handleFetching()
        button.innerHTML = 'Next question'
    } else {
        handleClick()
    }
});
button.addEventListener('touchstart', handleTouchStart);
button.addEventListener('touchend', handleTouchEnd);
button.addEventListener('touchcancel', handleTouchEnd);

const date = new Date().getFullYear();
document.getElementById('year').textContent = date;