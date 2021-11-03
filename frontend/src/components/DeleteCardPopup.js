import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
    return (
        <PopupWithForm
            name='cards_delete'
            title='Вы уверены?'
            buttonText='Да'
        />
    )
}

export default DeleteCardPopup;