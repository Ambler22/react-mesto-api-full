import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.owner === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
    
    const cardDeleteButtonClassName = (
        `card__delete ${isOwn ? 'card__delete' : 'card__delete_none'}` // Создаём переменную, которую после зададим в `className` для кнопки удаления
    );

    const isLiked = props.likes.some(i => i === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const cardLikeButtonClassName = `card__like ${isLiked ? 'card__like_active' : ''}`; // Создаём переменную, которую после зададим в `className` для кнопки лайка

    function handleClick() {
        props.onCardClick(props);
    }

    function handleLikeClick() {
        props.onCardLike(props);
    }

    function handleDeleteClick() {
        props.onCardDelete(props);
    }

    return (
        <div key={props.id} className="card">
            <div className="card">
                <button type="button" className={`${cardDeleteButtonClassName} hover`} onClick={handleDeleteClick}></button>
                <img src={props.link} className="card__img" alt={props.name} onClick={handleClick} />
                <div className="card__description">
                    <h2 className="card__text">{props.name}</h2>
                    <div className="">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится"></button>
                        <p className="card__like_number">{props.likes.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;