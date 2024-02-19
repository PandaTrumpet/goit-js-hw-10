import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const clock = document.querySelectorAll('.value');

startButton.disabled = true;

let userSelectedDate = null;
let timerInterval;

function updateTime() {
  const currentDate = new Date();
  const timeDiff = userSelectedDate - currentDate;

  if (timeDiff <= 0) {
    clearInterval(timerInterval);
    clock.forEach(div => (div.textContent = '00'));
    return;
  }
  const daysTime = document.querySelector('[data-days]');
  const hoursTime = document.querySelector('[data-hours]');
  const minutesTime = document.querySelector('[data-minutes]');
  const secondsTime = document.querySelector('[data-seconds]');
  const { days, hours, minutes, seconds } = convertMs(timeDiff);

  daysTime.textContent = days.toString().padStart(2, '0');
  hoursTime.textContent = hours.toString().padStart(2, '0');
  minutesTime.textContent = minutes.toString().padStart(2, '0');
  secondsTime.textContent = seconds.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = new Date(selectedDates[0]);
    validateSelectedDate();
  },
};

const userTime = flatpickr('#datetime-picker', options);

function validateSelectedDate() {
  const currentDate = new Date();
  if (userSelectedDate < currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      closeOnEscape: true,
      position: 'topRight',
    });
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
}

class Timer {
  start() {
    startButton.disabled = true;
    input.disabled = true;
    timerInterval = setInterval(updateTime, 1000);
  }
}

const timer = new Timer();

startButton.addEventListener('click', () => {
  timer.start();
});
