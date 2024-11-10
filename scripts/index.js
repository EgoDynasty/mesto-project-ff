// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");

function deleteCard(event) {
  const cardElement = event.target.closest(".card");
  if (cardElement) {
    cardElement.remove();
  }
}

function createCard(data) {
  const template = document.getElementById("card-template");
  const cardElement = template.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  placesList.appendChild(cardElement);
});
