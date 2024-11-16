export function openModal(popup) {
  popup.classList.add('popup_is-animated');
  popup.style.visibility = 'visible';
  popup.style.pointerEvents = 'auto';
  setTimeout(() => {
    popup.style.opacity = 1;
  }, 0);
}

export function closeModal(popup) {
  popup.style.opacity = 0;
  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
    popup.style.visibility = 'hidden';
    popup.style.pointerEvents = 'none';
  }, 600);
}