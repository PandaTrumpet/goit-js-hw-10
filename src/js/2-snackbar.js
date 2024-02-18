// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.input-text');

function mainFunk(event) {
  event.preventDefault();

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const stateInput = document.querySelector('input[name="state"]:checked');
      if (stateInput && stateInput.value === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, delayInput.value);
  });

  myPromise.then(() => hadlerSuccess()).catch(() => hadlerError());
}

function hadlerSuccess() {
  let delay = delayInput.value;
  iziToast.success({
    title: 'ok',
    titleColor: '#fff',
    messageColor: '#fff',
    message: `Fulfilled promise in ${delay}ms`,
    closeOnEscape: true,
    position: 'topRight',
    backgroundColor: '#59a10d',
  });
}

function hadlerError() {
    
  let delay = delayInput.value;
  iziToast.error({
    title: 'ok',
    titleColor: '#fff',
    messageColor: '#fff',
    message: `Error promise in ${delay}ms`,
    closeOnEscape: true,
    position: 'topRight',
    backgroundColor: '#59a10d',
  });
}

form.addEventListener('submit', mainFunk);























