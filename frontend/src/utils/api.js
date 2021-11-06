class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

_getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

_checkToken = (headers) => {
    const token = localStorage.getItem('jwt');

    if (token) {
        headers['autorization'] = `Bearer ${token}`;
    }
    return headers;
}

getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: this._checkToken(this._headers),
    })
    .then(res => this._getResponseData(res));
};

getCards() {
    return fetch(`${this._url}/cards`, {
        credentials: 'include',
        headers: this._checkToken(this._headers),
    })
    .then(res => this._getResponseData(res));
};

setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._checkToken(this._headers),
        body: JSON.stringify({
            name: data.name,
            about: data.about,
        })
    })
    .then(res => this._getResponseData(res));
}

setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._checkToken(this._headers),
        body: JSON.stringify({
            avatar: data,
        })
    })
    .then(res => this._getResponseData(res));
}

setCards(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        credentials: 'include',
        headers: this._checkToken(this._headers),
        body: JSON.stringify({
            name: data.name,
            link: data.link,
        })
    })
    .then(res => this._getResponseData(res));
}

deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._checkToken(this._headers),
        })
        .then(res => this._getResponseData(res));
}

setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: this._checkToken(this._headers),
    })
    .then(res => this._getResponseData(res));
}

deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._checkToken(this._headers),
    })
    .then(res => this._getResponseData(res));
}

}

const api = new Api ({
    // url: 'https://nomoreparties.co/v1/cohort-26',
    url: 'http://localhost:3001',
    headers: {
      // authorization: '071ec2e0-6b59-41c1-9439-d0b2ee95bfc8',
      'Content-Type': 'application/json'
    }
});

export default api;