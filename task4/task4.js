const but = document.querySelector(".but");
const geoloc = document.querySelector(".geoloc");
const mess = document.querySelector(".message");

const error = () => {
    mess.textContent = 'Невозможно получить ваше местоположение';
  }

const success = async(position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude; 
    geoloc.textContent = `Данные геолокации пользователя: широта: ${latitude} долгота: ${longitude}`;
   fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`
   ).then(response => {
     return response.json();
   }).then(timeZoneData => {
     mess.textContent = `Временная зона: ${timeZoneData.timezone}; местное время: ${timeZoneData.date_time_txt}`;
   });
}


but.addEventListener('click', async() => {
    if (!navigator.geolocation) {
        mess.textContent = 'Геолокация не поддерживается вашим браузером';
      } else {
        mess.textContent = 'Определение данных геолокации и временной зоны, где находится пользователь...';
        navigator.geolocation.getCurrentPosition(success, error);
      }       
    });