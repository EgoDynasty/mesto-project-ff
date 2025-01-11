import { SELECTORS } from "./constants";

export function getUserInfo(token, cohortId) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const token = '410f1435-c485-422a-973e-96392634204b';
  const cohortId = 'wff-cohort-29';

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
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  export function deleteCardFromServer(cardId) {
    const token = '410f1435-c485-422a-973e-96392634204b';
    const cohortId = 'wff-cohort-29';
  
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  export function putLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }
  
  export function deleteLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  export function updateAvatar(avatarLink) {
    const token = '410f1435-c485-422a-973e-96392634204b';
    const cohortId = 'wff-cohort-29';
  
    fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        console.log(data);
        const profileImage = document.querySelector(SELECTORS.profileImage);
        profileImage.style.backgroundImage = `url(${avatarLink})`;
      })
      .catch((err) => {
        console.error(err);
      });
  }