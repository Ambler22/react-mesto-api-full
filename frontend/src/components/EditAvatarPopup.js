import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }

    return (
        <PopupWithForm
            name='avatar_update'
            title='Обновить аватар'
            buttonText='Создать'

            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >

            <input id="avatarurl" type="url" name="link"
                className={`form-container__input form-container__input_${props.name}`}
                placeholder="Ссылка на картинку" tabIndex="2" required ref={avatarRef}/>
            <span className="form-container__input-error" id="avatarurl-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;