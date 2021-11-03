function PopupWithForm(props) {

    return (
        <div className={`popup ${props.isOpen && 'popup_is-opened'}`}>
            <div className="popup__content">
                <h2 className="popup__title">{props.title}</h2>
                <form onSubmit={props.onSubmit} action="#" name={`form-${props.name}`} className={`form form-${props.name}`} noValidate>
                    <fieldset className="form-container">
                    {props.children}
                    <button type="submit"
                        className={`form-container__button form-container__button_${props.name} popup__load`}>{props.buttonText}</button>
                    </fieldset>
                </form>
                <button type="button" className="popup__img-close hover" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;