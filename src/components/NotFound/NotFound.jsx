import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css"; 

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Sahifa topilmadi</h2>
      <p className="not-found-message">
        Kechirasiz, siz qidirgan sahifa mavjud emas.
      </p>
      <button onClick={() => navigate("/")} className="not-found-button">
        Bosh sahifaga qaytish
      </button>
    </div>
  );
};

export default NotFound;