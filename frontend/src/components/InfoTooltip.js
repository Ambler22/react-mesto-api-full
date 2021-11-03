import React from 'react';

function InfoTooltip(props) {
    return (
        <div className={`popup popup-notify ${props.isOpen && 'popup_is-opened'}`}>
            <div className="popup__content">
                <img className="popup-notify__img" src={props.notifyPopupInfo.image} alt="" />
                <h2 className="popup-notify__title">{props.notifyPopupInfo.title}</h2>
                <button type="button" className="popup__img-close hover" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;