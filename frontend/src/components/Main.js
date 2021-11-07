import React from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile page__content">
                <div className="profile__info">
                    <div className="profile__avatar-icon" onClick={props.onEditAvatar}>
                        <img src={currentUser.avatar} className="profile__avatar" alt="Аватар" />
                    </div>
                    <div className="profile__content">
                        <div className="profile__add">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" className="profile__edit hover" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__jod">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__button hover" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards page__content">
            </section>

            <section className="cards page__content">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        {...card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}/>
                ))}
            </section>
        </main>
    )
}

export default Main;