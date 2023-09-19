import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import edit from "../img/edit.svg";
import api from "../utils/Api";
import Card from "./Card";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content container">
      <div className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
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
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
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
          {props.cards.map((card) => (
            <Card card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}
