export function createCard(data, onDelete, onLike, openImagePopup) {
  const template = document.getElementById('card-template').content;
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener("click", onDelete);
  likeButton.addEventListener("click", onLike);

  cardImage.addEventListener('click', () => {
    openImagePopup(data.link, data.name);
  });

  return cardElement;
}

export function deleteCard(event) {
  const cardElement = event.target.closest(".card");
  if (cardElement) {
    cardElement.remove();
  }
}

export function toggleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
}