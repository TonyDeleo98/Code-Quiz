const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Arrays in JavaScript can be used to store ?',
    answers: [
      { text: 'booleans', correct: false },
      { text: 'numbers and strings', correct: false },
      { text: 'other arrays', correct: false },
      { text: 'all of the above', correct: true }
    ]
  },
  {
    question: 'What is the data type of variables in JavaScript ?',
    answers: [
      { text: 'object data types', correct: true },
      { text: 'function data types', correct: false },
      { text: 'none of the above', correct: false },
      { text: 'all of the above', correct: false }
    ]
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is',
    answers: [
      { text: 'terminal', correct: false },
      { text: 'console log', correct: true },
      { text: 'for loops', correct: false },
      { text: 'javascript', correct: false }
    ]
  },
  {
    question: 'Commonly used data types DO NOT include:',
    answers: [
      { text: 'strings', correct: false },
      { text: 'numbers', correct: false },
      { text: 'booleans', correct: false },
      { text: 'alerts', correct: true }
    ]
  }
]