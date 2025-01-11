export const form = document.querySelector('.popup__form');
const nameInput = form.querySelector('.popup__input_type_name');
const descriptionInput = form.querySelector('.popup__input_type_description');
const button = form.querySelector('.popup__button');
const nameError = nameInput.nextElementSibling;
const descriptionError = descriptionInput.nextElementSibling;
const newCardForm = document.querySelector('.popup__form_new-card');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');
const cardNameError = cardNameInput.nextElementSibling;
const cardLinkError = cardLinkInput.nextElementSibling;
const avatarForm = document.querySelector('.popup__form_avatar');
const avatarLinkInput = avatarForm.querySelector('.popup__input_type_avatar-link');
const avatarLinkError = avatarLinkInput.nextElementSibling;

export const validationConfig = {

  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  const inputList = Array.from(document.querySelectorAll(config.inputSelector));
  const buttonList = Array.from(document.querySelectorAll(config.submitButtonSelector));

  form.addEventListener('input', () => {
    if (nameInput.validity.valid && descriptionInput.validity.valid) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  
    if (nameInput.value.length === 0) {
      nameError.textContent = 'Вы пропустили это поле.';
      nameError.classList.add('popup__input-error_visible');
    } else if (nameInput.value.length < 2 || nameInput.value.length > 40) {
      nameError.textContent = `Минимально количество символов: 2. Длина текста сейчас: ${nameInput.value.length} символов.`;
      nameError.classList.add('popup__input-error_visible');
    } else if (!nameInput.validity.valid) {
      nameError.textContent = 'Имя должно содержать только латинские и кириллические буквы, знаки дефиса и пробелы';
      nameError.classList.add('popup__input-error_visible');
    } else {
      nameError.textContent = '';
      nameError.classList.remove('popup__input-error_visible');
    }
  
    if (descriptionInput.value.length === 0) {
      descriptionError.textContent = 'Вы пропустили это поле.';
      descriptionError.classList.add('popup__input-error_visible');
    } else if (descriptionInput.value.length < 2 || descriptionInput.value.length > 200) {
      descriptionError.textContent = `Минимально количество символов: 2. Длина текста сейчас: ${descriptionInput.value.length} символов.`;
      descriptionError.classList.add('popup__input-error_visible');
    } else if (!descriptionInput.validity.valid) {
      descriptionError.textContent = 'О себе должно содержать только латинские и кириллические буквы, знаки дефиса и пробелы';
      descriptionError.classList.add('popup__input-error_visible');
    } else {
      descriptionError.textContent = '';
      descriptionError.classList.remove('popup__input-error_visible');
    }
  });

  newCardForm.addEventListener('input', () => {
    if (cardNameInput.validity.valid && cardLinkInput.validity.valid) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  
    if (cardNameInput.value.length === 0) {
      cardNameError.textContent = 'Вы пропустили это поле.';
      cardNameError.classList.add('popup__input-error_visible');
    } else if (cardNameInput.value.length < 2 || cardNameInput.value.length > 30) {
      cardNameError.textContent = 'Минимально количество символов: 2. Длина текста сейчас: ' + cardNameInput.value.length + ' символов.';
      cardNameError.classList.add('popup__input-error_visible');
    } else if (!cardNameInput.validity.valid) {
      cardNameError.textContent = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
      cardNameError.classList.add('popup__input-error_visible');
    } else {
      cardNameError.textContent = '';
      cardNameError.classList.remove('popup__input-error_visible');
    }
  
    if (cardLinkInput.value.length === 0) {
      cardLinkError.textContent = 'Вы пропустили поле.';
      cardLinkError.classList.add('popup__input-error_visible');
    } else if (!cardLinkInput.validity.valid) {
      cardLinkError.textContent = 'Введите адрес сайта.';
      cardLinkError.classList.add('popup__input-error_visible');
    } else {
      cardLinkError.textContent = '';
      cardLinkError.classList.remove('popup__input-error_visible');
    }
  });

  avatarForm.addEventListener('input', () => {
    if (avatarLinkInput.validity.valid) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  
    if (!avatarLinkInput.validity.valid) {
      avatarLinkError.textContent = 'Введите ссылку аватара.';
      avatarLinkError.classList.add('popup__input-error_visible');
    } else {
      avatarLinkError.textContent = '';
      avatarLinkError.classList.remove('popup__input-error_visible');
    }
  });

  formList.forEach((form) => {
    form.addEventListener('input', () => {
      const inputList = Array.from(form.querySelectorAll(config.inputSelector));
      const button = form.querySelector(config.submitButtonSelector);

      inputList.forEach((input) => {
        if (input.validity.valid) {
          input.classList.remove(config.inputErrorClass);
        } else {
          input.classList.add(config.inputErrorClass);
        }
      });

      if (inputList.every((input) => input.validity.valid)) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });
  });
}

export function clearValidation(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
  });

  button.disabled = true;
}


