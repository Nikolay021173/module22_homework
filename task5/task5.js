const textMess = document.querySelector(".text-message");
const send = document.querySelector(".send");
const geoloc = document.querySelector(".geolocation");
const outputMess = document.querySelector(".text-output-message");

const wsUri = "wss://echo-ws-service.herokuapp.com/";

function writeFaild(message) {
    let messUserServer = document.createElement('p');
    messUserServer.style.wordBreak = "word-break";
    messUserServer.innerHTML = message;
    outputMess.appendChild(messUserServer);
}

window.addEventListener('load', () => {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function() {
        writeFaild("<b>Начать общение:</b>");
      };
      websocket.onerror = function(evt) {
        writeFaild('<b>ОШИБКА:</b> ' + evt.data);
      };
});

window.addEventListener('unload', () => {
    websocket.close();
    websocket = null;
});

send.addEventListener('click', () => {

    websocket.onmessage = function(evt) {
        writeFaild('<b>Ответ сервера:</b> ' + evt.data);
      };

    const message = textMess.value;
    writeFaild("<b>Сообщение от пользователя:</b> " + message);
    websocket.send(message);
    textMess.value = '';
});

const error = () => {
    writeFaild("<b>Невозможно получить ваше местоположение</b>");
  }

const success = async(position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude; 
    const locationUser = '<a href="https://www.openstreetmap.org/#map=19/${latitude}/${longitude}" target="_blank">' + 
    `https://www.openstreetmap.org/#map=19/${latitude}/${longitude}` + '</a>';
    writeFaild(locationUser, 'locationData');
    websocket.send(locationUser);

    websocket.onmessage = function() {
        writeFaild('');
      };

}

geoloc.addEventListener('click', () => {
    if (!navigator.geolocation) {
        messUserServer.innerHTML = '<b>Геолокация не поддерживается вашим браузером</b>';
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }       
});