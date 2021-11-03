import React from 'react';

function Login(props) {

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

        props.authorization(email, password);
    }

    return (
    <div className="login">
        <h1 className="login__title">Вход</h1>
        <form className="login__form" onSubmit={handleSubmit}>
            <input className="login__input" placeholder="Email" value={valueEmail} onChange={handleChangeEmail}></input>
            <input className="login__input" placeholder="Пароль" value={valuePassword} onChange={handleChangePassword}></input>
            <button className="login__button" type="submit">Войти</button>
        </form>
    </div>
    )
}

export default Login;