import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position: position, delay: delay });
    } else reject({ position: position, delay: delay });
  });
}
const form = document.forms[0];
form.addEventListener('submit', callAmountPromise);
//
function callAmountPromise(event) {
  event.preventDefault();
  const formAmount = event.target.elements.amount.value;
  let formDelay = Number(event.target.elements.step.value);
  let formFirstDelay = Number(event.target.elements.delay.value);
  if (
    formAmount &&
    formDelay &&
    formFirstDelay &&
    formAmount > 0 &&
    formDelay > 0 &&
    formFirstDelay > 0
  ) {
    setTimeout(() => {
      for (let i = 0; i < formAmount; i += 1) {
        setTimeout(() => {
          upgradecreatePromise(i + 1, formFirstDelay);
          formFirstDelay += formDelay;
        }, formDelay * i);
      }
    }, formFirstDelay);
  } else {
    Notiflix.Notify.failure(
      `❌ Заповніть усі рядки значеннями які більше за нуль`
    );
  }

  form.reset();
}
function upgradecreatePromise(count, timeOut) {
  createPromise(count, timeOut)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
