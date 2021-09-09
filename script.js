const startBtn = document.getElementById('startBtn'); // кнопка старт
const screens = document.querySelectorAll('.screen'); // коллекция с экранаими
const timeList = document.getElementById('timeList'); // обертка кнопок выбора времени
let time = null; // таймер игры
let score = null; // счет игры (очки)
const gameTimer = document.getElementById('time'); // счетчик времени
const board = document.getElementById('board'); // поле игры

startBtn.onclick = (ev) => { // убрать стартовый экран
  ev.preventDefault()
  screens[0].classList.add('up')
}

timeList.onclick = (event) => { // слушатель обертки кнопок выпора времени игры
  if (event.target.classList.contains('time-btn')) { // если клик был по кнопке с временем
    time = +event.target.getAttribute('data-time'); // задать значение таймеру игры
    screens[1].classList.add('up'); // спрятать экран
    startGame();
  }
}

function startGame() {
  setTime(time) // показать время
  setInterval(decreaseTime, 1000); // запустить счетчик
  createRandomElement()
  board.onclick = (event) => { // слушатель клика на поле
    if (event.target !== event.currentTarget) { // если клик по ребенку...
      score++ // увеличишь счетчик счета
      event.target.remove() // удалить кликнутого ребенка
      createRandomElement() // рандомно создать следующего
    }
  }
}

function finishGame() {
  gameTimer.parentNode.classList.add('hide'); // скрыть таймер
  board.classList.add('gameOver'); // добавить класс GameOver для проверки
  board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>
<br><a href="" class="start" id="retartBtn" onclick=window.location.reload(true)>Начать игру заново</a>`; // отобразить счет
  startBtn.onclick = null; // убрать ненужных слушатетей
  timeList.onclick = null; // убрать ненужных слушатетей
  board.onclick = null; // убрать ненужных слушатетей
}

function decreaseTime() { // функция для уменьшения времени
  if (time === 0 && !board.classList.contains('gameOver')) { // если 0 и если на поле нету класса GameOver - закончить игру
    finishGame()
  } else {
    let current = --time // счетчик по уменьшению времени
    if (current < 10) { // если иеньше 10
      current = `0${current}` // добвать 0 спереди
    }
    setTime(current) // вставить current в счетчик времени
  }
}

function setTime(value) { // вставить значение в счетчик времени
  gameTimer.innerHTML = `00:${value}`
}

function getRandomNumberFromRange(minValue, maxValue) {
  return (
    Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
  )
}

function createRandomElement() {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  const size = getRandomNumberFromRange(10, 50);
  const x = getRandomNumberFromRange(size, board.getBoundingClientRect().width) - size;
  const y = getRandomNumberFromRange(size, board.getBoundingClientRect().height) - size;
  circle.style.width = size + 'px';
  circle.style.height = size + 'px';
  circle.style.top = y + 'px';
  circle.style.left = x + 'px';
  circle.style.backgroundColor = `
  rgb(${getRandomNumberFromRange(1, 255)},
   ${getRandomNumberFromRange(1, 255)}, 
   ${getRandomNumberFromRange(1, 255)})`;
  board.append(circle)
}

function autoWin () {
  setInterval(()=>{
    if (document.querySelector('.circle')) {
      document.querySelector('.circle').click()
    }
  },1)
}

function dellAllPosts () {
  let rt =  document.querySelectorAll ('.ui_actions_menu_item');
  rt.forEach((el)=>{
    if (el.innerText === 'Удалить запись') {
      //el.click()
      console.log(el)
    }
  }) }