import React from "react";

export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && !props.isPopupClose ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button className="popup__button" type="submit">
            {props.buttonTitle}
          </button>
        </form>
        <button
          onClick={props.onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
        ></button>
      </div>
    </div>
  );
}
