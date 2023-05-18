import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Создаем экземпляр плеера Vimeo
const vimeoPlayer = new Player('vimeo-player');

// Функция для сохранения текущего времени воспроизведения в локальное хранилище
const saveCurrentTime = throttle(time => {
  localStorage.setItem('videoplayer-current-time', time);
}, 1000); // Сохраняем время не чаще чем раз в секунду

// Обработчик события timeupdate - обновление времени воспроизведения
vimeoPlayer.on('timeupdate', event => {
  const currentTime = event.seconds;
  saveCurrentTime(currentTime);
});

// Получаем сохраненное время из локального хранилища
const savedTime = localStorage.getItem('videoplayer-current-time');

// Если есть сохраненное время, устанавливаем его в плеере
if (savedTime) {
  vimeoPlayer.setCurrentTime(savedTime);
}
