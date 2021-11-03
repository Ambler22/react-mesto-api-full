import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup popup-image ${props.card.name && 'popup_is-opened'}`} //props.card.name !== undefined ? 'popup_is-opened' : ''
            onClose={props.onClose}>
            <div className="popup-image__content">
                <img src={props.card.link} className="popup-image__photo" alt={props.card.name} />
                <h2 className="popup-image__title">{props.card.name}</h2>
                <button type="button" className="popup__img-close hover" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;