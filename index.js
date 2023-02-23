import image from './images/lazy.png';

const createImage = (src) => new Promise((res, rej) => {
  const img = new Image();
  img.onload = () => res(img);
  img.onerror = rej;
  img.src = src;
});

async function render() {
  const subHeader = document.createElement('h2');
  subHeader.innerHTML = 'This elements was created by js';
  const myImage = await createImage(image);
  document.body.appendChild(subHeader);
  document.body.appendChild(myImage);
}

render();

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.getElementsByTagName('body')[0];
const options = {month: "long", weekday: "long", day: "numeric"};
const arrPartOfDay = ['night', 'morning', 'afternoon', 'evening'];
const timeOfDay = arrPartOfDay[Math.trunc(new Date().getHours() / 6)];
let bgNum;
let randomNum;
const prev = document.querySelector('.slide-prev');
const next = document.querySelector('.slide-next');

function showTime() {
  time.textContent = new Date().toLocaleTimeString();
  date.textContent = new Date().toLocaleDateString('en-Us', options);
  greeting.textContent = `Good ${timeOfDay}, `;
  setTimeout(showTime, 1000);
};
showTime();

// function getTimeOfDay() {
//   greeting.textContent = `Good ${arrPartOfDay[Math.trunc(new Date().getHours() / 6)]}, `;
// }

// getTimeOfDay();

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);

}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getLocalStorage);

function getRandomNum() {
  let min = Math.ceil(1);
  let max = Math.floor(20);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
};
getRandomNum();

function setBg() {
  bgNum = randomNum.toString().padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/ivan5576/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload =() => {
    body.style.backgroundImage = `url("${img.src}")`;
  };
};
setBg();

function getSlideNext() {
  if (randomNum > 19) {
    randomNum = 1;
    setBg();
  } else {
  randomNum += 1;
  setBg();
  }
};
next.addEventListener('click', getSlideNext);

function getSlidePrev() {
  if (randomNum < 2) {
    randomNum = 20;
    setBg();
  } else {
    randomNum -= 1;
    setBg();
  }
};
prev.addEventListener('click', getSlidePrev);

// weather forecast

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');

async function getWeather() { 
  console.log(city.textContent);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=74f17c1fdb91e87e865d343369292c57&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.weather[0].id, data.weather[0].description, data.main.temp, data.wind.speed, data.main.humidity, data.name);

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
  console.log(city.value);
}

  function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  }

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);


