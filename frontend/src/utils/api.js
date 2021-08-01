class Api {
  constructor({ address }) {
    this._address = address;
 }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }

  createCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) =>
      res.ok ? cardId : Promise.reject(`Ошибка ${res.status}`)
    );
  }

  likeCard(cardId, like) {
    this._like = like ? "PUT" : "DELETE";
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: this._like,
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }

  setAvatar(avatarLink) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  address: "https://api.mesto.dron369.ru",
});

export default api;
