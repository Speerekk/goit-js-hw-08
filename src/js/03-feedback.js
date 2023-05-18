import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

// Функция сохранения состояния формы в локальное хранилище
const saveFormState = () => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
};

// Функция загрузки состояния формы из локального хранилища
const loadFormState = () => {
  const savedState = localStorage.getItem(storageKey);
  if (savedState) {
    const state = JSON.parse(savedState);
    emailInput.value = state.email;
    messageInput.value = state.message;
  }
};

// Функция обработки сабмита формы
const handleSubmit = event => {
  event.preventDefault();
  console.log('Form submitted');
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(state);
  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
};

// Добавляем обработчики событий
form.addEventListener('input', throttle(saveFormState, 500));
form.addEventListener('submit', handleSubmit);

// Загружаем состояние формы при загрузке страницы
window.addEventListener('load', loadFormState);
