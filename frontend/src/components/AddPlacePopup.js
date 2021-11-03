import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddCardPopup(props) {

    const nameRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name='cards'
            title='Новое место'
            buttonText='Создать'

            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >

            <input id={`${props.name}name`} type="text" name="name"
                className="form-container__input form-container__input_title" placeholder="Название"
                tabIndex="1" minLength="2" maxLength="30" required ref={nameRef} />
            <span className="form-container__input-error" id={`${props.name}name-error`}></span>
            <input id={`${props.name}url`} type="url" name="link" className="form-container__input form-container__input_image"
                placeholder="Ссылка на картинку" tabIndex="2" required ref={linkRef} />
            <span className="form-container__input-error" id={`${props.name}url-error`}></span>

        </PopupWithForm>
    )
}

export default AddCardPopup;