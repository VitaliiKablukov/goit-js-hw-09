const startBTN = document.querySelector('button[data-start]');
const stopBTN = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
//
stopBTN.setAttribute('disabled', true);
//
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//
let timerId = null;
//
startBTN.addEventListener('click', startChangeColorBody);
stopBTN.addEventListener('click', stopChangeColorBody);
//
function startChangeColorBody(e) {
  startBTN.setAttribute('disabled', true);
  stopBTN.removeAttribute('disabled');

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
//
function stopChangeColorBody() {
  clearInterval(timerId);
  startBTN.removeAttribute('disabled');
  stopBTN.setAttribute('disabled', true);
}
