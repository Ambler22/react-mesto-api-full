import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddCardPopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from "./Register";
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { register, authorize, getContent } from "./auth"
import success from '../images/success.svg';
import fail from '../images/fail.svg'

console.log('123');


function App() {

    const history = useHistory();

    const [currentUser, setCurrentUser] = React.useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isNotifyPopupOpen, setIsNotifyPopupOpen] = React.useState(false);
    const [notifyPopupInfo, setNotifyPopupInfo] = React.useState({})

    const [selectedCard, setSelectedCard] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const [valueEmail, setValueEmail] = React.useState('');

    React.useEffect(() => {
        console.log(isLoggedIn);
        if (isLoggedIn === true) {
            Promise.all([
                api.getUserInfo(),
                api.getCards(),
            ])
                .then(([userData, cards]) => {
                    console.log(userData)
                    console.log(cards)
                    setCurrentUser(userData);
                    setCards(cards)
                })
                .catch((err) => {
                })
        }
    }, [isLoggedIn])

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            getContent(jwt)
                .then((res) => {
                    if (res) {
                        setValueEmail(res.data.email);
                    }
                    setIsLoggedIn(true);
                    history.push('/');
                })
                .catch((err) => {
                    // signOut();
                    console.log(err);
                })
        }
    }, [history])

    React.useEffect(() => {
        const closeByEscape = (e) => {
          if (e.key === 'Escape') {
            closeAllPopups();
          }
        }
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
      }, [])

    function registration(email, password) {
        register(email, password)
            .then(() => {
                changeNotifyPopup({
                    path: success,
                    text: 'Вы успешно зарегистрировались!',
                })
                handleNotifyPopupOpen();
            })
            .catch((err) => {
                changeNotifyPopup({
                    path: fail,
                    text: 'Что-то пошло не так! Попробуйте ещё раз.',
                })
                handleNotifyPopupOpen();
                console.log(err);
            })
    }

    function authorization(email, password) {
        authorize(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                }
                setValueEmail(email);
                setIsLoggedIn(true);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function signOut() {
        localStorage.removeItem('jwt');
        history.push('/sign-in');
        setIsLoggedIn(false);

    }

    function handleNotifyPopupOpen() {
        setIsNotifyPopupOpen(true);
    }

    function changeNotifyPopup({ path, text }) {
        setNotifyPopupInfo({
            image: path,
            title: text,
        })
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard({ name: card.name, link: card.link });
    }

    function handleUpdateUser(user) {
        api.setUserInfo(user)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateAvatar({ avatar }) {
        api.setUserAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardLike(props) {
        const isLiked = props.likes.some(i => i === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
        const changeLikeCardStatus = isLiked ? api.deleteLike(props._id) : api.setLike(props._id) //if-else для лайка
        changeLikeCardStatus.then((newCard) => { // Отправляем запрос в API и получаем обновлённые данные карточки
            setCards((state) => state.map((c) => c._id === props._id ? newCard : c));
        })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardDelete(props) {
        api.deleteCard(props._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== props._id)); //с помощью filter делаем копию массива без нашей карточки
        })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleAddPlaceSubmit(card) {
        api.setCards(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsNotifyPopupOpen(false);

        setSelectedCard({});
    }

    return (< CurrentUserContext.Provider value={currentUser} >
        <div className="page" >

            <Header
                email={valueEmail}
                signOut={signOut}
            />

            <Switch>

                <ProtectedRoute
                    exact path="/"
                    isLoggedIn={isLoggedIn}
                    component={Main}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}

                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />

                <Route path="/sign-in">
                    <Login authorization={authorization} />
                </Route>

                <Route path="/sign-up" >
                    <Register registration={registration} />
                </Route>

                <Route path="/"> {
                    isLoggedIn ? < Redirect to="/" /> : < Redirect to="sign-in" />
                } </Route>

            </Switch >

            <Footer />

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <AddCardPopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />

            <ImagePopup card={selectedCard}
                onClose={closeAllPopups}
            />

            <DeleteCardPopup />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />

            <InfoTooltip
                isOpen={isNotifyPopupOpen}
                onClose={closeAllPopups}
                notifyPopupInfo={notifyPopupInfo}
            />

        </div>
    </CurrentUserContext.Provider >
    );
}

export default App;