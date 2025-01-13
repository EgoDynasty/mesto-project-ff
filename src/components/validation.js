export const validationConfig = { 
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: '.popup__button_disabled', 
  inputErrorClass: '.popup__input-error', 
  errorClass: '.popup__input-error_visible',
  inputWrapper: '.popup__input-wrapper',
}; 
 
const showInputError = (inputElement, errorMessage) => { 
  const errorElement = inputElement.closest(validationConfig.inputWrapper).querySelector(validationConfig.inputErrorClass);
  inputElement.classList.add(validationConfig.inputErrorClass); 
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(validationConfig.errorClass); 
}; 
 
const hideInputError = (inputElement) => { 
  const errorElement = inputElement.closest(validationConfig.inputWrapper).querySelector(validationConfig.inputErrorClass); 
  inputElement.classList.remove(validationConfig.inputErrorClass); 
  errorElement.classList.remove(validationConfig.errorClass); 
  errorElement.textContent = ''; 
}; 
 
const checkInputValidity = (inputElement) => { 
  if (inputElement.validity.valueMissing) { 
    showInputError(inputElement, 'Вы пропустили это поле.'); 
  } else if (inputElement.validity.tooShort) { 
    showInputError(inputElement, `Минимально количество символов: ${inputElement.minLength}.`); 
  } else if (inputElement.validity.tooLong) { 
    showInputError(inputElement, `Максимально количество символов: ${inputElement.maxLength}.`); 
  } else if (inputElement.validity.typeMismatch) { 
    showInputError(inputElement, 'Введите адрес сайта.'); 
  } else if (inputElement.validity.patternMismatch) { 
    showInputError(inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.'); 
  } else { 
    hideInputError(inputElement); 
  } 
}; 
 
const setEventListeners = (validationConfig, formElement) => { 
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); 
  const button = formElement.querySelector(validationConfig.submitButtonSelector); 
   
  inputList.forEach((inputElement) => { 
    inputElement.addEventListener('input', function () { 
      checkInputValidity(inputElement); 
      if (inputList.every((input) => input.validity.valid)) { 
        button.disabled = false; 
      } else { 
        button.disabled = true; 
      } 
    }); 
  }); 
}; 
 
export function enableValidation (validationConfig) { 
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); 
   
  formList.forEach((formElement) => { 
    formElement.addEventListener('submit', (evt) => { 
      evt.preventDefault(); 
    }); 
 
    setEventListeners(validationConfig, formElement); 
  }); 
}; 
 
export function clearValidation(validationConfig, formElement) { 
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); 
  const button = formElement.querySelector(validationConfig.submitButtonSelector); 
 
  inputList.forEach((inputElement) => { 
    inputElement.classList.remove(validationConfig.inputErrorClass); 
    const errorElement = inputElement.closest(validationConfig.inputWrapper).querySelector(validationConfig.inputErrorClass); 
    if (errorElement) { 
      errorElement.textContent = ''; 
      errorElement.classList.remove(validationConfig.errorClass); 
    } 
  }); 
 
  button.disabled = false; 
} 
