const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div');

car.classList.add('car');

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const settings = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 3
};

const getQuantityElements = (heigthElement) => 
  document.documentElement.clientHeight / heigthElement + 1;

const startGame = () => {
  start.classList.add('hide');

  for (let i = 0; i < getQuantityElements(100); i ++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 100) + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(100 * settings.traffic); i ++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * settings.traffic * (i + 1);
    enemy.style.top = enemy.y + 'px';
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.background = "transparent url('./image/enemy.png') center / cover no-repeat";
    gameArea.appendChild(enemy);
  }

  settings.start = true;
  gameArea.appendChild(car);
  settings.x = car.offsetLeft;
  settings.y = car.offsetTop;
  requestAnimationFrame(playGame);
};

const playGame = () => {
  
  if (settings.start) {
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && settings.x > 0) {
      settings.x -= settings.speed;
    }
    if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
      settings.x += settings.speed;
    }

    if (keys.ArrowUp && settings.y > 0) {
      settings.y -= settings.speed;
    }

    if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
      settings.y += settings.speed;
    }

    car.style.left = settings.x + 'px';
    car.style.top = settings.y + 'px';

    requestAnimationFrame(playGame);
  }
};

const startRun = (evt) => {
  evt.preventDefault();
  keys[evt.key] = true;
};

const stopRun = (evt) => {
  evt.preventDefault();
  keys[evt.key] = false;
};

const moveRoad = () => {
  let lines = document.querySelectorAll('.line');
  lines.forEach((line) => {
    line.y += settings.speed;
    line.style.top = line.y + 'px';

    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
};

const moveEnemy = () => {
  const enemy = document.querySelectorAll('.enemy');
  enemy.forEach(el => {
    el.y += settings.speed / 2;
    el.style.top = el.y + 'px';

    if (el.y >= document.documentElement.clientHeight) {
      el.y = -100 * settings.traffic;
      el.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
  });
};

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
