import React from "react";

export default function Card(props) {
  return (
    <li className="element">
      <div className="element__image-container">
        <img
          className="element__image"
          alt={props.data.name}
          src={props.data.link}
          onClick={() => props.onCardClick(props.data)}
        />
      </div>
      <button
        className="element__trash"
        type="button"
        aria-label="Удалить элемент"
      ></button>
      <div className="element__text">
        <h2 className="element__name">{props.data.name}</h2>
        <div className="element__heart-container">
          <button
            className="element__heart-button"
            type="button"
            aria-label="Сердечко"
          ></button>
          <span className="element__heart-counter">
            {props.data.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}
