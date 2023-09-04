import React, { useState, useEffect } from "react";
import edit from "../img/edit.svg";
import api from "../utils/Api";
import Card from "./Card";

export default function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getCurrentUserApi()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err));
    api
      .getAllCardsApi()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
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
            <Card data={card} onCardClick={props.onCardClick} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}
