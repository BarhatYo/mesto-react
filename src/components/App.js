import "../index.css";
import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");

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
    setSelectedCard("");
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
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <Footer />
    </div>
  );
}

export default App;
