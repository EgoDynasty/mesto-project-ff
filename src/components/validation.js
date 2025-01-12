export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_visible'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = inputElement.closest('.popup__input-wrapper').querySelector('.popup__input-error');
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = inputElement.closest('.popup__input-wrapper').querySelector('.popup__input-error');
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valueMissing) {
    showInputError(formElement, inputElement, 'Вы пропустили это поле.');
  } else if (inputElement.validity.tooShort) {
    showInputError(formElement, inputElement, `Минимально количество символов: ${inputElement.minLength}.`);
  } else if (inputElement.validity.tooLong) {
    showInputError(formElement, inputElement, `Максимально количество символов: ${inputElement.maxLength}.`);
  } else if (inputElement.validity.typeMismatch) {
    showInputError(formElement, inputElement, 'Введите адрес сайта.');
  } else if (inputElement.validity.patternMismatch) {
    showInputError(formElement, inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.');
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const button = formElement.querySelector(validationConfig.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      if (inputList.every((input) => input.validity.valid)) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });
  });
};

export function enableValidation () {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

export function clearValidation(validationConfig, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const button = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
    const errorElement = inputElement.closest(".popup__input-wrapper")?.querySelector(".popup__input-error");
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('popup__input-error_visible');
    }
  });

  button.disabled = false;
}

