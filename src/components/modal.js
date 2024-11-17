export function openModal(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened'); 
  }, 1);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');

}