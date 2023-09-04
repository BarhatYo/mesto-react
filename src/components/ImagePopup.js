import React from "react";

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_picture ${props.card && "popup_opened"}`}>
      <div className="popup__picture-container">
        <figure className="popup__picture">
          <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup__picture-caption">
            {props.card.name}
          </figcaption>
        </figure>
        <button
          className="popup__close popup__close_type_picture"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
