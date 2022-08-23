import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
//
const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', true);
const timer = document.querySelector('.timer');
const days = timer.querySelector('span[data-days]');
const hours = timer.querySelector('span[data-hours]');
const minutes = timer.querySelector('span[data-minutes]');
const seconds = timer.querySelector('span[data-seconds]');
let timerId = null;
let selectedTime;
//

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = Date.parse(selectedDates[0]);
    const timeNow = Date.parse(options.defaultDate);
    if (selectedTime > timeNow) {
      startBtn.removeAttribute('disabled');
      selectedTime = selectedDates;
      console.log(selectedTime);
    } else {
      Notiflix.Notify.failure('"Please choose a date in the future"');
    }
  },
};

//
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
//

//
function startTimer(e) {
  e.preventDefault();
  startBtn.setAttribute('disabled', true);
  //
  timerId = setInterval(() => {
    if (Date.parse(selectedTime) > 0) {
      const timeToEnd = Date.parse(selectedTime) - new Date();
      addLeadingZero(convertMs(timeToEnd));
    }
    if (Date.parse(selectedTime) === Date.parse(new Date())) {
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
      clearInterval(timerId);
    }
  }, 1000);
}
//
function addLeadingZero(value) {
  days.textContent = String(value.days).padStart(2, '0');
  hours.textContent = String(value.hours).padStart(2, '0');
  minutes.textContent = String(value.minutes).padStart(2, '0');
  seconds.textContent = String(value.seconds).padStart(2, '0');
}

//
flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', startTimer);
