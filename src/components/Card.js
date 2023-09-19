import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__heart-button ${
    isLiked && 'element__heart-button_active'
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <div className="element__image-container">
        <img
          className="element__image"
          alt={card.name}
          src={card.link}
          onClick={() => onCardClick(card)}
        />
      </div>
      {isOwn && (
        <button
          className="element__trash"
          type="button"
          aria-label="Удалить элемент"
          onClick={handleDeleteClick}
        />
      )}
      <div className="element__text">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__heart-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Сердечко"
            onClick={handleLikeClick}
          ></button>
          <span className="element__heart-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
