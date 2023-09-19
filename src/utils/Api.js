class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  onResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllInfoApi() {
    return Promise.all([this.getAllCardsApi(), this.getCurrentUserApi()]);
  }

  getCurrentUserApi() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this.onResponse);
  }

  changeLikeApi(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this.headers,
    }).then(this.onResponse);
  }

  getAllCardsApi() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this.onResponse);
  }

  addCardApi(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(card),
    }).then(this.onResponse);
  }

  removeCardApi(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.onResponse);
  }

  changeUserInfoApi(userInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(userInfo),
    }).then(this.onResponse);
  }

  changeUserAvatarApi(avatarLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(avatarLink),
    }).then(this.onResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-73",
  headers: {
    authorization: "4c55a9ed-e154-4f7c-887d-b90cfb7b0881",
    "Content-Type": "application/json",
  },
});

export default api;
