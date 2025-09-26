import React, { useState, useEffect } from 'react';
import './sagbar.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { RiMenu2Fill } from 'react-icons/ri';
import { IoHome, IoHeartOutline, IoAddCircleOutline } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { RiMessengerLine } from 'react-icons/ri';
import { PiVideo } from 'react-icons/pi';
import { CgProfile } from 'react-icons/cg';
import { FaInstagram } from 'react-icons/fa';

const texts = {
  uz: {
    home: "Bosh sahifa",
    search: "Qidiruv",
    reels: "Videolar",
    messages: "Xabarlar",
    notifications: "Bildirishnomalar",
    create: "Yaratish",
    profile: "Profil",
    more: "Ko'proq"
  },
  ru: {
    home: "Главная",
    search: "Поиск",
    reels: "Видео",
    messages: "Сообщения",
    notifications: "Уведомления",
    create: "Создать",
    profile: "Профиль",
    more: "Еще"
  },
  en: {
    home: "Home",
    search: "Search",
    reels: "Reels",
    messages: "Messages",
    notifications: "Notifications",
    create: "Create",
    profile: "Profile",
    more: "More"
  }
};

const Sagbar = ({ language, theme }) => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const currentTexts = texts[language];

  // Ekran o'lchamini kuzatish
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <>
      <div className={`mobile-header ${theme}`}>
        <div className="mobile-logo">
          <FaInstagram className="instagram-icon" style={{ marginRight: '8px' }} />
          <span>Instagram</span>
        </div>
        <div className="mobile-right-icons">
          <NavLink to="/bildirishnomalar" className="link">
            <span className='icon'><IoHeartOutline /></span>
          </NavLink>
          <NavLink to="/xabarlar" className="link">
            <span className='icon'><RiMessengerLine /></span>
          </NavLink>
        </div>
      </div>

      {!isMobile && (
        <div className={`sagbar ${open ? "" : "active"} ${theme}`}>
          <div className="logo-container">
            {open ? (
              <h1>Instagram</h1>
            ) : (
              <FaInstagram className="instagram-icon" />
            )}
          </div>

          <ul className="sagbar-menu">
            <li>
              <NavLink to="/" className="link">
                <span className='icon'><IoHome /></span>
                <span className='text'>{currentTexts.home}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/qidiruvSoravi" className="link">
                <span className='icon'><FiSearch /></span>
                <span className='text'>{currentTexts.search}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/makaralar" className="link">
                <span className='icon'><PiVideo /></span>
                <span className='text'>{currentTexts.reels}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/xabarlar" className="link">
                <span className='icon'><RiMessengerLine /></span>
                <span className='text'>{currentTexts.messages}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/bildirishnomalar" className="link">
                <span className='icon'><IoHeartOutline /></span>
                <span className='text'>{currentTexts.notifications}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/yaratish" className="link">
                <span className='icon'><IoAddCircleOutline /></span>
                <span className='text'>{currentTexts.create}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profil" className="link">
                <span className='icon'><CgProfile /></span>
                <span className='text'>{currentTexts.profile}</span>
              </NavLink>
            </li>
          </ul>
          <div className="sagbar-bottom-menu">
            <div className="div-icon" onClick={() => setOpen(!open)}>
              <span className='icon'><RiMenu2Fill size={30} className='menu-icon' /></span>
              <span className='text'>{currentTexts.more}</span>
            </div>
          </div>
        </div>
      )}

      <div className={`mobile-bottom-nav ${theme}`}>
        <NavLink to="/" className="link">
          <span className='icon'><IoHome /></span>
          <span className='text'>{currentTexts.home}</span>
        </NavLink>
        <NavLink to="/qidiruvSoravi" className="link">
          <span className='icon'><FiSearch /></span>
          <span className='text'>{currentTexts.search}</span>
        </NavLink>
        <NavLink to="/yaratish" className="link">
          <span className='icon'><IoAddCircleOutline /></span>
          <span className='text'>{currentTexts.create}</span>
        </NavLink>
        <NavLink to="/makaralar" className="link">
          <span className='icon'><PiVideo /></span>
          <span className='text'>{currentTexts.reels}</span>
        </NavLink>
        <NavLink to="/profil" className="link">
          <span className='icon'><CgProfile /></span>
          <span className='text'>{currentTexts.profile}</span>
        </NavLink>
      </div>
    </>
  );
};

export default Sagbar;