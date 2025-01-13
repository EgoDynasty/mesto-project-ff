(()=>{"use strict";var e=".popup__form";function t(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}var n="410f1435-c485-422a-973e-96392634204b",r="wff-cohort-29";function o(e,n){return fetch("https://nomoreparties.co/v1/".concat(n,"/users/me"),{method:"GET",headers:{authorization:e}}).then(t)}function a(e,n){return fetch("https://nomoreparties.co/v1/".concat(n,"/cards"),{method:"GET",headers:{authorization:e}}).then(t)}function c(e,o){return fetch("https://nomoreparties.co/v1/".concat(r,"/cards"),{method:"POST",headers:{authorization:n,"Content-Type":"application/json"},body:JSON.stringify({name:e,link:o})}).then(t)}function i(e){return fetch("https://nomoreparties.co/v1/".concat(r,"/cards/").concat(e,"/likes"),{method:"PUT",headers:{authorization:n}}).then(t)}function u(e){return fetch("https://nomoreparties.co/v1/".concat(r,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:{authorization:n}}).then(t)}function l(e){return fetch("https://nomoreparties.co/v1/".concat(r,"/users/me/avatar"),{method:"PATCH",headers:{authorization:n,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then(t)}function s(e,t,n,r,o){var a=document.getElementById("card-template").content.querySelector(".card").cloneNode(!0),c=a.querySelector(".card__image"),i=a.querySelector(".card__title"),u=a.querySelector(".card__delete-button"),l=a.querySelector(".card__like-button"),s=a.querySelector(".card__likes");return c.src=e.link,c.alt=e.name,i.textContent=e.name,s.textContent=e.likes&&Array.isArray(e.likes)?e.likes.length:0,a.dataset.cardId=e._id,u.addEventListener("click",t),l.addEventListener("click",n),c.addEventListener("click",(function(){r(e.link,e.name)})),a}function p(e){var o,a=e.target.closest(".card");a&&(o=a.dataset.cardId,fetch("https://nomoreparties.co/v1/".concat(r,"/cards/").concat(o),{method:"DELETE",headers:{authorization:n}}).then(t)).then((function(){a.remove()}))}var d={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:".popup__button_disabled",inputErrorClass:".popup__input-error",errorClass:".popup__input-error_visible",inputWrapper:".popup__input-wrapper"},f=function(e,t){var n=e.closest(d.inputWrapper).querySelector(d.inputErrorClass);e.classList.add(d.inputErrorClass),n.textContent=t,n.classList.add(d.errorClass)},_=function(e){e.validity.valueMissing?f(e,"Вы пропустили это поле."):e.validity.tooShort?f(e,"Минимально количество символов: ".concat(e.minLength,".")):e.validity.tooLong?f(e,"Максимально количество символов: ".concat(e.maxLength,".")):e.validity.typeMismatch?f(e,"Введите адрес сайта."):e.validity.patternMismatch?f(e,"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы."):function(e){var t=e.closest(d.inputWrapper).querySelector(d.inputErrorClass);e.classList.remove(d.inputErrorClass),t.classList.remove(d.errorClass),t.textContent=""}(e)};function y(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(t){t.classList.remove(e.inputErrorClass);var n=t.closest(e.inputWrapper).querySelector(e.inputErrorClass);n&&(n.textContent="",n.classList.remove(e.errorClass))})),r.disabled=!1}function m(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&h(t)}}function v(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened"),document.addEventListener("keydown",m)}),1)}function h(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",m),y(d,e)}var S=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}];function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}document.addEventListener("DOMContentLoaded",(function(){var n=document.querySelector(".places__list"),r=document.querySelector(".profile__title"),d=document.querySelector(".profile__description"),f=document.querySelector(".profile__image"),_=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),m=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_new-card"),k=document.querySelector(".popup_type_image"),g=k.querySelector(".popup__image"),C=k.querySelector(".popup__caption"),E=document.querySelector(".popup_type_avatar"),L=m.querySelector(e),x=m.querySelector(".popup__input_type_name"),A=m.querySelector(".popup__input_type_description"),j=q.querySelector(e),T=q.querySelector(".popup__input_type_card-name"),w=q.querySelector(".popup__input_type_url");function z(e,t){g.src=e,g.alt=t,C.textContent=t,v(k)}S.forEach((function(e){var t=s(e,p,D,z);n.appendChild(t)}));var I="410f1435-c485-422a-973e-96392634204b",O="wff-cohort-29";function D(e){var t=e.target,n=t.closest(".card").dataset.cardId;t.classList.contains("card__like-button_is-active")?u(n).then((function(e){t.classList.remove("card__like-button_is-active"),t.closest(".card").querySelector(".card__likes").textContent=e.likes.length})).catch((function(e){console.error(e)})):i(n).then((function(e){t.classList.add("card__like-button_is-active"),t.closest(".card").querySelector(".card__likes").textContent=e.likes.length})).catch((function(e){console.error(e)}))}Promise.all([o(I,O),a(I,O)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];console.log(o),console.log(a);var c=document.querySelector(".profile__title"),i=document.querySelector(".profile__description"),u=document.querySelector(".profile__image");c.textContent=o.name,i.textContent=o.about,u&&(u.style.backgroundImage="url(".concat(o.avatar,")"));var l=document.querySelector(".places__list");l.innerHTML="",a.forEach((function(e){if(e.link&&e.name){var t=e.likes.some((function(e){return e._id===o._id})),n=s(e,p,D,z),r=n.querySelector(".card__like-button"),a=n.querySelector(".card__delete-button");t&&r.classList.add("card__like-button_is-active"),l.appendChild(n),e.owner._id===o._id?a.style.display="block":a.style.display="none"}}))})).catch((function(e){console.error(e)})),L.addEventListener("submit",(function(e){e.preventDefault();var n=e.target.querySelector(".popup__button");n.textContent="Сохранение...",n.disabled=!0;var a=x.value,c=A.value;(function(e,n,r,o){return fetch("https://nomoreparties.co/v1/".concat(n,"/users/me"),{method:"PATCH",headers:{authorization:e,"Content-Type":"application/json"},body:JSON.stringify({name:r,about:o})}).then(t)})(I,O,a,c).then((function(e){console.log(e),r.textContent=e.name,d.textContent=e.about,f.src=e.avatar,h(m)})).catch((function(e){console.error(e)})).finally((function(){var e=m.querySelector(".popup__button");e.textContent="Сохранить",e.disabled=!1})),o(I,O).then((function(e){console.log(e),r.textContent=e.name,d.textContent=e.about,f.src=e.avatar})).catch((function(e){console.error(e)}))})),j.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Создание...",t.disabled=!0,c(T.value,w.value).then((function(e){var t=s(e,p,D,z);n.prepend(t),h(q)})).catch((function(e){console.error(e)})).finally((function(){var e=q.querySelector(".popup__button");e.textContent="Создать",e.disabled=!1})),T.value="",w.value=""})),_.addEventListener("click",(function(){r&&d?(x.value=r.textContent,A.value=d.textContent):console.error("Элементы профиля не найдены"),v(m)})),f.addEventListener("click",(function(){v(E)}));var M=document.querySelector(".popup__form_avatar");M.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Обновление...",t.disabled=!0;var n=M.querySelector(".popup__input_type_avatar-link").value;l(n).then((function(e){f.style.backgroundImage="url(".concat(n,")"),h(E)})).catch((function(e){console.error(e)})).finally((function(){var e=E.querySelector(".popup__button");e.textContent="Обновить",e.disabled=!1}))})),y.addEventListener("click",(function(){return v(q)})),document.querySelectorAll(".popup").forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){return h(e)})),e.addEventListener("click",(function(t){t.target===e&&h(e)}))}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(e){e.addEventListener("input",(function(){_(e),n.every((function(e){return e.validity.valid}))?r.disabled=!1:r.disabled=!0}))}))}(e,t)}))}(d);var q=document.querySelector(".popup__form");y(d,q)})();