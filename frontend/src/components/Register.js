import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

    const [valueEmail, setValueEmail] = React.useState('');
    const [valuePassword, setValuePassword] = React.useState('');

    function handleChangeEmail(e) {
        setValueEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setValuePassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const email = valueEmail;
        const password = valuePassword;

        props.registration(email, password);
    }

    return (
        <div className="register">
            <h1 className="register__title">Регистрация</h1>
            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__input" placeholder="Email" value={valueEmail} onChange={handleChangeEmail}></input>
                <input className="register__input" placeholder="Пароль" value={valuePassword} onChange={handleChangePassword}></input>
                <button className="register__button" type="submit">Зарегистрироваться</button>
            </form>
            <Link className="register__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </div>
    )
}

export default Register ;