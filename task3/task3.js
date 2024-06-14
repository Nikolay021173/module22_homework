const but = document.querySelector(".but");
const mess1 = document.querySelector(".message1");
const mess2 = document.querySelector(".message2");

const error = () => {
  mess2.textContent = 'Информация о местоположении недоступна';
}

const geoloc = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  mess2.textContent = `Координаты геолокации пользователя: широта: ${latitude}° долгота: ${longitude}°.`
}

but.addEventListener('click', () => {

  mess1.textContent = `Ширина экрана пользователя: ${window.screen.width} px
                     Высота экрана пользователя: ${window.screen.height} px`;

    if (!navigator.geolocation) {
      mess2.textContent = 'Функция геолокации не поддерживается вашим браузером';
    } else {
      mess2.textContent = 'Определение местоположения пользователя';
      navigator.geolocation.getCurrentPosition(geoloc, error);
    }
  });
                   
