
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";



import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";



const startButton = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const clock = document.querySelectorAll('.value');

let userSelectedDate = null;
let timerInterval;

function updateTime() {
    const currentDate = new Date();
    const timeDiff = userSelectedDate - currentDate;

    if (timeDiff <= 0) {
        clearInterval(timerInterval);
        clock.forEach(div => div.textContent = '00');
        return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    clock[0].textContent = days.toString().padStart(2, '0');
    clock[1].textContent = hours.toString().padStart(2, '0');
    clock[2].textContent = minutes.toString().padStart(2, '0');
    clock[3].textContent = seconds.toString().padStart(2, '0');
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
const userTime = flatpickr("#datetime-picker", options);

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
        timerInterval = setInterval(updateTime, 1000);
    }
}

const timer = new Timer();

startButton.addEventListener('click', () => {
    timer.start();
});
