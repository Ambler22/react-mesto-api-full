import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import headerLogo from '../images/header.svg';

function Header(props) {
    return (
        <header className="header page__content" >
            <img src={headerLogo} className="header__logo" alt="логотип" />
            <div className="header__elements">
                <Switch >
                    <Route exact path="/" >
                        <p className="header__email">{props.email}</p>
                        <Link to="/sign-in" className="header__button" onClick={props.signOut}>Выйти</Link>
                    </Route>

                    <Route path="/sign-in">
                        <Link to="sign-up" className="header__button">Регистрация</Link>
                    </Route>

                    <Route path="/sign-up">
                        <Link to="sign-in" className="header__button">Войти</Link>
                    </Route>
                </Switch>
            </div>
        </header>
    );
}

export default Header;