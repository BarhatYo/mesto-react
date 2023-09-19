import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import api from "../utils/Api";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getAllInfoApi()
      .then(([cards, userInfo]) => {
        setCards(cards);
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeApi(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api.removeCardApi(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id)).catch(
        (err) => console.log(err),
      );
    });
  };

  const handleUpdateUser = (data) => {
    api
      .changeUserInfoApi(data)
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(err));
    closeAllPopups();
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .changeUserAvatarApi(avatar)
      .then((avatar) => setCurrentUser(avatar))
      .catch((err) => console.log(err));
    closeAllPopups();
  };

  const handleAddPlaceSubmit = (newPlace) => {
    api
      .addCardApi(newPlace)
      .then((newPlace) => setCards([newPlace, ...cards]))
      .catch((err) => console.log(err));
    closeAllPopups();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          onEditProfile={handleEditProfileClick}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          onAddPlace={handleAddPlaceClick}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonTitle="Да"
        ></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
