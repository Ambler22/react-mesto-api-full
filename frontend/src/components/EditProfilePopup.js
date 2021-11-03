import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({ // Передаём значения управляемых компонентов во внешний обработчик
          name,
          about: description,
        });
      }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText='Сохранить'

            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input id={`${props.name}name`} type="text" name="name" className="form-container__input"
                required="Введите имя" tabIndex="1" minLength="2" maxLength="40" placeholder="Имя" value={name || ''} onChange={handleChangeName} />
            <span className="form-container__input-error" id={`${props.name}name-error`}></span>
            <input id={`${props.name}description`} type="text" name="description" className="form-container__input"
                required="Введите описание" tabIndex="2" minLength="2" maxLength="200" placeholder="Занятие" value={description || ''} onChange={handleChangeDescription} />
            <span className="form-container__input-error" id={`${props.name}description-error`}></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;