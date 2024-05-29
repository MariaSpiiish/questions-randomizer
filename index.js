// Fetch the JSON file if there is no localStorage named 'questions'
if (!localStorage.getItem('questions')) {
    console.log('fetching')
    fetch('questions.json')
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

function getRandomValue(max) {
    const randomValue = Math.floor(Math.random() * max);
    return randomValue;
}

const button = document.getElementById('button');

button.addEventListener('click', () => {
    const questions = JSON.parse(localStorage.getItem('questions'));

    if (!questions) {
        document.getElementById('question').innerText = 'No questions found, try clicking the button again or reloading the page';
    } else if(Object.keys(questions).length === 0) {
        document.getElementById('question').innerText = 'You have answered all the questions. Load more.';
    } else {
        const numberOfQuestions = Object.keys(questions).length;
        const questionNumber = getRandomValue(numberOfQuestions);

        document.getElementById('question').innerText = questions[questionNumber];

        questions[questionNumber] = questions[numberOfQuestions-1];
        delete questions[numberOfQuestions-1];

        localStorage.setItem('questions', JSON.stringify(questions));
    }
})

const date = new Date().getFullYear();
document.getElementById('year').textContent = date;