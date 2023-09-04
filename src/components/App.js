import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
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

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        onEditProfile={handleEditProfileClick}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        onAddPlace={handleAddPlaceClick}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCardClick={handleCardClick}
      />
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonTitle="Сохранить"
      >
        <input
          type="text"
          placeholder="Введите имя"
          className="popup__input popup__input_type_name"
          id="name"
          name="name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error name-error"></span>
        <input
          type="text"
          placeholder="Расскажите о себе"
          className="popup__input popup__input_type_about"
          id="about"
          name="about"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__input-error about-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonTitle="Создать"
      >
        <input
          type="text"
          placeholder="Название"
          className="popup__input popup__input_type_card-name"
          id="picture-name"
          name="name"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__input-error picture-name-error"></span>
        <input
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_image-url"
          id="link"
          name="link"
          required
        />
        <span className="popup__input-error link-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonTitle="Сохранить"
      >
        <input
          type="url"
          placeholder="Ссылка на изображение"
          className="popup__input popup__input_type_avatar-url"
          id="avatar-link"
          name="avatar"
          required
        />
        <span className="popup__input-error avatar-link-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonTitle="Да"
      ></PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <Footer />
    </div>
  );
}

export default App;
