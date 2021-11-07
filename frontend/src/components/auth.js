// export const BASE_URL = 'https://auth.nomoreparties.co';

export const BASE_URL = 'http://api.dom.rom.nomoredomains.xyz';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((res) => checkResponse(res));
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    // .then((res => res.json()))
    // .then((data) => {
    //    if(data.token) {
    //        localStorage.setItem('jwt', data.token);
    //        return data.token;
    //    }
    //})
    //.catch(err => console.log(err))
    .then((res) => checkResponse(res));
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
      }
    })
    // .then(res => res.json())
    // .then(data => data)
    .then((res) => checkResponse(res));
  };

  function checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибк: ${res.status}`);
  }