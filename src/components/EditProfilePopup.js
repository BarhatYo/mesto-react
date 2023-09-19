import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const handleName = (evt) => {
    setName(evt.target.value);
  };

  const handleAbout = (evt) => {
    setAbout(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateUser({
      name, 
      about,
    })
  }

  useEffect(() => {
    if (currentUser.name) {
      setName(currentUser?.name);
      setAbout(currentUser?.about);
    }
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Введите имя"
        className="popup__input popup__input_type_name"
        id="name"
        name="name"
        minLength="2"
        maxLength="40"
        value={name}
        required
        onChange={handleName}
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
        value={about}
        onChange={handleAbout}
      />
      <span className="popup__input-error about-error"></span>
    </PopupWithForm>
  );
}
