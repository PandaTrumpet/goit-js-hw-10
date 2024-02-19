import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.input-text');

function mainFunk(event) {
  event.preventDefault();

  const myPromise = new Promise((resolve, reject) => {
    const delay = Number(delayInput.value);
    setTimeout(() => {
      const stateInput = document.querySelector('input[name="state"]:checked');
      if (stateInput && stateInput.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  myPromise
    .then(result => hadlerSuccess(result))
    .catch(error => hadlerError(error));
}

function hadlerSuccess(delay) {
  iziToast.show({
    titleColor: '#fff',
    messageColor: '#fff',
    message: ` ✅ Fulfilled promise in ${delay}ms`,
    closeOnEscape: true,
    position: 'topRight',
    backgroundColor: '#59a10d',
  });
}

function hadlerError(delay) {
  iziToast.show({
    titleColor: '#fff',
    messageColor: '#fff',
    message: `❌  Rejected promise in ${delay}ms`,
    closeOnEscape: true,
    position: 'topRight',
    backgroundColor: '#ed6f7c',
  });
}

form.addEventListener('submit', mainFunk);
