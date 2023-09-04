import React, { useState, useEffect } from "react";
import edit from "../img/edit.svg";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/Api";
import Card from "./Card";

export default function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getCurrentUserApi().then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });
    api.getAllCardsApi().then((res) => {
      setCards(res);
    });
  }, []);

  return (
    <main className="content container">
      <div className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
          <div className="profile__avatar-overlay">
            <img
              className="profile__avatar-edit"
              src={edit}
              alt="Редактировать"
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__edit" onClick={props.onEditProfile}>
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
            ></button>
          </div>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
          onClick={props.onAddPlace}
        ></button>
      </div>
      <section className="elements" aria-label="Карточки">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card data={card} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.onClose}
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
        <button className="popup__button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        name="card"
        title="Новое место"
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.onClose}
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
        <button className="popup__button" type="submit">
          Создать
        </button>
      </PopupWithForm>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.onClose}
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
        <button className="popup__button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm name="delete" title="Вы уверены?">
        <button className="popup__button popup__delete-button">Да</button>
      </PopupWithForm>
    </main>
  );
}
