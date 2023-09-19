import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {

  const avatarRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    avatarRef.current.value = '';
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        ref={avatarRef}
        placeholder="Ссылка на изображение"
        className="popup__input popup__input_type_avatar-url"
        id="avatar-link"
        name="avatar"
        required
      />
      <span className="popup__input-error avatar-link-error"></span>
    </PopupWithForm>
  );
}
