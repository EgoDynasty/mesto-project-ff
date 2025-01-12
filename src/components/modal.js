function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function openModal(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened'); 
    document.addEventListener('keydown', handleEscape);
  }, 1);
}

export function closeModal(popup, errorSelector = '.popup__input-error') {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);

  const errors = popup.querySelectorAll(errorSelector);
  errors.forEach((error) => {
    error.textContent = '';
    error.classList.remove('popup__input-error_visible');
  });

  const button = popup.querySelector('.popup__button');
  button.disabled = false;
}