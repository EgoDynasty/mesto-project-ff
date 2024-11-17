import avatarImage from './images/avatar.jpg';
import './index.css';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { SELECTORS } from './components/constants.js';
import { initialCards } from './components/cards.js';

document.addEventListener('DOMContentLoaded', () => {
  const placesList = document.querySelector(SELECTORS.placesList);
  const profileName = document.querySelector(SELECTORS.profileName);
  const profileJob = document.querySelector(SELECTORS.profileJob);
  const profileImage = document.querySelector('.profile__image');
  profileImage.style.backgroundImage = `url(${avatarImage})`;

  let openPopupElement = null;

  const editButton = document.querySelector(SELECTORS.editButton);
  const addButton = document.querySelector(SELECTORS.addButton);
  const editPopup = document.querySelector(SELECTORS.editPopup);
  const newCardPopup = document.querySelector(SELECTORS.newCardPopup);
  const imagePopup = document.querySelector(SELECTORS.imagePopup);
  const imagePopupImage = imagePopup.querySelector(SELECTORS.imagePopupImage);
  const imagePopupCaption = imagePopup.querySelector(SELECTORS.imagePopupCaption);

  const profileForm = editPopup.querySelector(SELECTORS.profileForm);
  const nameInput = editPopup.querySelector(SELECTORS.nameInput);
  const jobInput = editPopup.querySelector(SELECTORS.jobInput);

  const newCardForm = newCardPopup.querySelector(SELECTORS.profileForm);
  const cardNameInput = newCardPopup.querySelector(SELECTORS.cardNameInput);
  const cardLinkInput = newCardPopup.querySelector(SELECTORS.cardLinkInput);

  function openImagePopup(imageSrc, caption) {
    imagePopupImage.src = imageSrc;
    imagePopupImage.alt = caption;
    imagePopupCaption.textContent = caption;
    openModal(imagePopup);
  }

  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup);
    placesList.appendChild(cardElement);
  });

  function fillProfileFormFields() {
    if (profileName && profileJob) {
      nameInput.value = profileName.textContent;
      jobInput.value = profileJob.textContent;
    } else {
      console.error("Элементы профиля не найдены");
    }
  }

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;

    closeModal(editPopup);
  }

  function handleNewCardSubmit(evt) {
    evt.preventDefault();

    const cardNameValue = cardNameInput.value;
    const cardLinkValue = cardLinkInput.value;

    const newCardData = {
      name: cardNameValue,
      link: cardLinkValue
    };

    const newCardElement = createCard(newCardData, deleteCard, toggleLike, openImagePopup);
    placesList.prepend(newCardElement);
    closeModal(newCardPopup);

    cardNameInput.value = '';
    cardLinkInput.value = '';
  } 

  profileForm.addEventListener('submit', handleProfileFormSubmit);
  newCardForm.addEventListener('submit', handleNewCardSubmit);

  editButton.addEventListener('click', () => {
    fillProfileFormFields();
    openModal(editPopup);
  });

  addButton.addEventListener('click', () => openModal(newCardPopup));

  const popups = document.querySelectorAll(SELECTORS.popups);
 popups.forEach(popup => {
    const closeProfileButton = popup.querySelector('.popup__close');
    closeProfileButton.addEventListener('click', () => closeModal(popup));
    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        closeModal(popup);
      }
    });
  });
});