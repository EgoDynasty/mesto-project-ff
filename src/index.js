import { createCard, deleteCard, toggleLike } from './components/card.js';

import './index.css';
import { openModal, closeModal } from './components/modal.js';
import { SELECTORS } from './components/constants.js';
import { initialCards } from './components/cards.js';
import { enableValidation, clearValidation, validationConfig} from './components/validation.js'
import { getUserInfo, updateUserInfo, addNewCard, putLike, deleteLike, updateAvatar, getInitialCards } from './components/api.js';

document.addEventListener('DOMContentLoaded', () => {
  const placesList = document.querySelector(SELECTORS.placesList);
  const profileName = document.querySelector(SELECTORS.profileName);
  const profileJob = document.querySelector(SELECTORS.profileJob);
  const profileImage = document.querySelector('.profile__image');
  let openPopupElement = null;

  const editButton = document.querySelector(SELECTORS.editButton);
  const addButton = document.querySelector(SELECTORS.addButton);
  const editPopup = document.querySelector(SELECTORS.editPopup);
  const newCardPopup = document.querySelector(SELECTORS.newCardPopup);
  const imagePopup = document.querySelector(SELECTORS.imagePopup);
  const imagePopupImage = imagePopup.querySelector(SELECTORS.imagePopupImage);
  const imagePopupCaption = imagePopup.querySelector(SELECTORS.imagePopupCaption);
  const avatarPopup = document.querySelector('.popup_type_avatar');

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
    const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup, true);
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

  const token = '410f1435-c485-422a-973e-96392634204b';
  const cohortId = 'wff-cohort-29';

  Promise.all([
  getUserInfo(token, cohortId),
  getInitialCards(token, cohortId)
])
  .then(([userData, cardsData]) => {
    console.log(userData);
    console.log(cardsData);
    const profileName = document.querySelector('.profile__title');
    const profileJob = document.querySelector('.profile__description');
    const profileImage = document.querySelector('.profile__image');

    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    
    if (profileImage) {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
    }

    const placesList = document.querySelector('.places__list');
    placesList.innerHTML = '';

    cardsData.forEach((card) => {
      if (card.link && card.name) {
        const isLikedByMe = card.likes.some((like) => like._id === userData._id);
        const cardElement = createCard(card, deleteCard, toggleLike, openImagePopup, isLikedByMe);
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");

        if (isLikedByMe) {
          likeButton.classList.add('card__like-button_is-active');
        }
        placesList.appendChild(cardElement);

        if (card.owner._id === userData._id) {
          deleteButton.style.display = 'block';
        } else {
          deleteButton.style.display = 'none';
        }
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });

    function handleProfileFormSubmit(evt) {
      evt.preventDefault();
    const button = evt.target.querySelector('.popup__button');
    button.textContent = 'Сохранение...';
    button.disabled = true;
    
      const nameValue = nameInput.value;
      const jobValue = jobInput.value;
    
      updateUserInfo(token, cohortId, nameValue, jobValue)
  .then((data) => {
    console.log(data);
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
    profileImage.src = data.avatar;
    closeModal(editPopup);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    const button = editPopup.querySelector('.popup__button');
    button.textContent = 'Сохранить';
    button.disabled = false;
  });

    
      getUserInfo(token, cohortId)
        .then((data) => {
          console.log(data);
          profileName.textContent = data.name;
          profileJob.textContent = data.about;
          profileImage.src = data.avatar;
        })
        .catch((err) => {
          console.error(err);
        });
    
    }

    function handleNewCardSubmit(evt) {
      evt.preventDefault();
    const button = evt.target.querySelector('.popup__button');
    button.textContent = 'Создание...';
    button.disabled = true;
      
      const cardNameValue = cardNameInput.value;
      const cardLinkValue = cardLinkInput.value;
      
      addNewCard(cardNameValue, cardLinkValue)
  .then((data) => {
    const newCardElement = createCard(data, deleteCard, toggleLike, openImagePopup, true);
    placesList.prepend(newCardElement);
    closeModal(newCardPopup);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    const button = newCardPopup.querySelector('.popup__button');
    button.textContent = 'Создать';
    button.disabled = false;
  });

  closeModal(newCardPopup);
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

function toggleLike(event) {
  const likeButton = event.target;
  const cardId = likeButton.closest('.card').dataset.cardId;
  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId)
      .then((data) => {
        likeButton.classList.remove('card__like-button_is-active');
        const likesCount = likeButton.closest('.card').querySelector('.card__likes');
        likesCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    putLike(cardId)
      .then((data) => {
        likeButton.classList.add('card__like-button_is-active');
        const likesCount = likeButton.closest('.card').querySelector('.card__likes');
        likesCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}


  profileForm.addEventListener('submit', handleProfileFormSubmit);
  newCardForm.addEventListener('submit', handleNewCardSubmit);

  editButton.addEventListener('click', () => {
    fillProfileFormFields();
    openModal(editPopup);
  });

profileImage.addEventListener('click', () => {
  openModal(avatarPopup);
});

const avatarForm = document.querySelector('.popup__form_avatar');

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Обновление...';
  button.disabled = true;
  
  const avatarLink = avatarForm.querySelector('.popup__input_type_avatar-link').value;
  updateAvatar(avatarLink)
  .then((data) => {
    profileImage.style.backgroundImage = `url(${avatarLink})`;
    closeModal(avatarPopup);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    const button = avatarPopup.querySelector('.popup__button');
    button.textContent = 'Обновить';
    button.disabled = false;
  });
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

enableValidation(validationConfig);

const formElement = document.querySelector('.popup__form');
clearValidation(validationConfig, formElement)