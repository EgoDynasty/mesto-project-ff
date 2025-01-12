import { SELECTORS } from "./constants";
import { checkResponse } from './utils/checkResponse';

const token = '410f1435-c485-422a-973e-96392634204b';
const cohortId = 'wff-cohort-29';

export function getUserInfo(token, cohortId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  })
    .then(checkResponse);
}

export function getInitialCards(token, cohortId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  })
    .then(checkResponse);
}

export function updateUserInfo(token, cohortId, name, about) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(checkResponse);
}

export function addNewCard(name, link) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(checkResponse);
}

export function deleteCardFromServer(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
    .then(checkResponse);
}

export function putLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: {
      authorization: token,
    },
  })
    .then(checkResponse);
}

export function deleteLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    },
  })
    .then(checkResponse);
}

export function updateAvatar(avatarLink) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    .then(checkResponse);
}