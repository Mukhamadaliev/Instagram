import { useState } from 'react';
import './Profil.css';

const Profil = ({ posts, onLike, language, setLanguage, theme, setTheme }) => {
  const [followers, setFollowers] = useState(44);
  const [following, setFollowing] = useState(107);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const textContent = {
    uz: {
      posts: "publikatsiya",
      followers: "obunachi",
      following: "obuna",
      follow: "Obuna boʻlish",
      followingBtn: "Obunadasiz",
      editProfile: "Profilni tahrirlash",
      bio: "Bu o‘zingiz haqingizda yozishingiz mumkin bo‘lgan bo‘lim.",
      postsTab: "POSTLAR",
      reelsTab: "REELS",
      tagsTab: "BELGILANGAN",
      noPosts: "Hali postlar yo'q",
      firstPost: "Birinchi postingizni joylang!",
      settings: "Sozlamalar",
      apps: "Ilovalar va saytlar",
      qrCode: "QR-kod",
      notifications: "Bildirishnomalar",
      settingsPrivacy: "Sozlamalar va maxfiylik",
      metaVerified: "Meta Verified",
      parentalControl: "Ota-ona nazorati",
      loginActivity: "Hisobga kirish",
      logout: "Chiqish",
      cancel: "Bekor qilish",
      changeLanguage: "Tilni o'zgartirish",
      theme: "Rejim",
      uzbek: "O‘zbekcha",
      russian: "Ruscha",
      english: "Inglizcha",
      likes: "Layk",
      comment: "Izoh",
      share: "Ulashish",
      addComment: "Izoh qo'shing...",
      postComment: "Yuborish"
    },
    ru: {
      posts: "публикации",
      followers: "подписчики",
      following: "подписки",
      follow: "Подписаться",
      followingBtn: "Вы подписаны",
      editProfile: "Редактировать профиль",
      bio: "Это раздел биографии, где вы можете написать что-то о себе.",
      postsTab: "ПУБЛИКАЦИИ",
      reelsTab: "REELS",
      tagsTab: "ОТМЕЧЕННЫЕ",
      noPosts: "Постов пока нет",
      firstPost: "Опубликуйте свой первый пост!",
      settings: "Настройки",
      apps: "Приложения и сайты",
      qrCode: "QR-код",
      notifications: "Уведомления",
      settingsPrivacy: "Настройки и конфиденциальность",
      metaVerified: "Meta Verified",
      parentalControl: "Родительский контроль",
      loginActivity: "Активность входа",
      logout: "Выйти",
      cancel: "Отмена",
      changeLanguage: "Сменить язык",
      theme: "Режим",
      uzbek: "Узбекский",
      russian: "Русский",
      english: "Английский",
      likes: "Нравится",
      comment: "Комментировать",
      share: "Поделиться",
      addComment: "Добавить комментарий...",
      postComment: "Отправить"
    },
    en: {
        posts: "posts",
        followers: "followers",
        following: "following",
        follow: "Follow",
        followingBtn: "Following",
        editProfile: "Edit Profile",
        bio: "This is a bio section where you can write something about yourself.",
        postsTab: "POSTS",
        reelsTab: "REELS",
        tagsTab: "TAGGED",
        noPosts: "No posts yet",
        firstPost: "Share your first post!",
        settings: "Settings",
        apps: "Apps and websites",
        qrCode: "QR code",
        notifications: "Notifications",
        settingsPrivacy: "Settings and privacy",
        metaVerified: "Meta Verified",
        parentalControl: "Parental controls",
        loginActivity: "Login activity",
        logout: "Log out",
        cancel: "Cancel",
        changeLanguage: "Change Language",
        theme: "Theme",
        uzbek: "Uzbek",
        russian: "Russian",
        english: "English",
        likes: "Likes",
        comment: "Comment",
        share: "Share",
        addComment: "Add a comment...",
        postComment: "Post"
    }
  };

  const texts = textContent[language];

  const handleFollow = () => {
    if (isFollowing) {
      setFollowers(followers - 1);
    } else {
      setFollowers(followers + 1);
    }
    setIsFollowing(!isFollowing);
  };
  
  const handleLike = (postId) => {
    onLike(postId);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const openModal = (post) => {
    setModalContent(post);
  };

  const closeModal = () => {
    setModalContent(null);
  };
  
  const openCommentsModal = (post) => {
    setSelectedPost(post);
    setCommentsModalOpen(true);
  };

  const closeCommentsModal = () => {
    setCommentsModalOpen(false);
    setSelectedPost(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };
  
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // Bu funksiya temani o'zgartiradi
  const handleThemeChange = () => {
    // Agar tema 'light' bo'lsa, 'dark'ga o'zgartiradi, aks holda 'light'ga
    setTheme(theme === 'light' ? 'dark' : 'light');
    // Eslatma: 'theme' holati (state) o'zgarganda, barcha komponentlar qayta render bo'ladi
    // va JSXda yozilgan `className={theme === 'dark' ? 'dark' : ''}` kodi yangi klassni qo'shadi
    // Bu esa CSSdagi :root va .dark qoidalarini ishga tushiradi.
  };

  const reels = posts.filter(post => post.type === 'video');

  return (
    // Body elementiga dark klassi qo'shilishi uchun asosiy kontenerga dark klassini qo'shamiz
    <div className={`profile-wrapper ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="profile-navbar">
        <h1 className="nav-brand">ibrohim_325</h1>
        <div className="nav-icons">
          <span className="nav-icon settings-icon" onClick={toggleDropdown}>
            <svg aria-label={texts.settings} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>{texts.settings}</title><path d="M12 1.5l3.86 2.45c.42.27.91.42 1.41.42h4.52a.75.75 0 01.75.75v4.52c0 .5.15.99.42 1.41L22.5 12l-2.45 3.86c-.27.42-.42.91-.42 1.41v4.52a.75.75 0 01-.75.75h-4.52c-.5 0-.99.15-1.41.42L12 22.5l-3.86-2.45c-.42-.27-.91-.42-1.41-.42H2.22a.75.75 0 01-.75-.75v-4.52c0-.5-.15-.99-.42-1.41L1.5 12l2.45-3.86c.27-.42.42-.91.42-1.41V2.22a.75.75 0 01.75-.75h4.52c.5 0 .99-.15 1.41-.42L12 1.5zm0 2.25c-.2 0-.39.06-.56.16l-3.37 2.14c-.3.19-.65.29-1.01.29H3.97a.75.75 0 00-.75.75v3.37c0 .36-.1.71-.29 1.01l-2.14 3.37c-.1.17-.16.36-.16.56s.06.39.16.56l2.14 3.37c.19.3.29.65.29 1.01v3.37c0 .41.34.75.75.75h3.37c.36 0 .71.1.99.29l3.37 2.14c.17.1.36.16.56.16s.39-.06.56-.16l3.37-2.14c.3-.19.65-.29 1.01-.29h3.37a.75.75 0 00.75-.75v-3.37c0-.36.1-.71.29-1.01l2.14-3.37c.1-.17.16-.36.16-.56s-.06-.39-.16-.56l-2.14-3.37c-.19-.3-.29-.65-.29-1.01V3.97a.75.75 0 00-.75-.75h-3.37c-.36 0-.71-.1-.99-.29l-3.37-2.14c-.17-.1-.36-.16-.56-.16zM12 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-1.5a3 3 0 110 6 3 3 0 010-6z" fillRule="evenodd"></path></svg>
          </span>
        </div>
        {showDropdown && (
          <div className="profile-dropdown">
            <div className="dropdown-menu">
              <div className="dropdown-item">{texts.apps}</div>
              <div className="dropdown-item">{texts.qrCode}</div>
              <div className="dropdown-item">{texts.notifications}</div>
              <div className="dropdown-item">{texts.settingsPrivacy}</div>
              <div className="dropdown-item">{texts.metaVerified}</div>
              <div className="dropdown-item">{texts.parentalControl}</div>
              <div className="dropdown-item">{texts.loginActivity}</div>
              <div className="dropdown-divider"></div>

              <div className="dropdown-item" onClick={handleThemeChange}>
                <span>{texts.theme}</span>
                <span className="theme-toggle">
                    {theme === 'light' ? '☀️' : '🌙'}
                </span>
              </div>
              
              <div className="dropdown-item">
                <span>{texts.changeLanguage}</span>
                <select className="language-select" value={language} onChange={handleLanguageChange}>
                  <option value="uz">{texts.uzbek}</option>
                  <option value="ru">{texts.russian}</option>
                  <option value="en">{texts.english}</option>
                </select>
              </div>

              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={handleLogout}>{texts.logout}</div>
              <div className="dropdown-item" onClick={toggleDropdown}>{texts.cancel}</div>
            </div>
          </div>
        )}
      </div>

      <div className="profile-page-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="https://picsum.photos/150/150?random=10" alt="Аватар" />
          </div>
          <div className="profile-stats-actions-group">
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">{texts.posts}</span>
              </div>
              <div className="stat">
                <span className="stat-number">{followers}</span>
                <span className="stat-label">{texts.followers}</span>
              </div>
              <div className="stat">
                <span className="stat-number">{following}</span>
                <span className="stat-label">{texts.following}</span>
              </div>
            </div>
            
            <div className="profile-actions">
              {isFollowing ? (
                <button className="action-btn following-btn" onClick={handleFollow}>{texts.followingBtn}</button>
              ) : (
                <button className="action-btn follow-btn" onClick={handleFollow}>{texts.follow}</button>
              )}
              <button className="action-btn edit-profile">{texts.editProfile}</button>
            </div>
          </div>
        </div>
        
        <div className="profile-info">
          <h2>ibrohim_325</h2>
          <p>{texts.bio}</p>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <span>{texts.postsTab}</span>
          </button>
          <button 
            className={`tab ${activeTab === 'reels' ? 'active' : ''}`}
            onClick={() => setActiveTab('reels')}
          >
            <span>{texts.reelsTab}</span>
          </button>
          <button 
            className={`tab ${activeTab === 'tags' ? 'active' : ''}`}
            onClick={() => setActiveTab('tags')}
          >
            <span>{texts.tagsTab}</span>
          </button>
        </div>

        <div className="posts-section">
          {activeTab === 'posts' && (
            posts.length === 0 ? (
              <div className="empty-posts">
                <h4>{texts.noPosts}</h4>
                <p>{texts.firstPost}</p>
              </div>
            ) : (
              <div className="posts-grid">
                {posts.map(post => (
                  <div key={post.id} className="post" onClick={() => openModal(post)}>
                    {post.type === 'video' ? (
                      <>
                        <video src={post.image} className="post-video" />
                        <div className="video-icon-overlay">
                          <svg aria-label="Video" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M11 11.5a1 1 0 11-2 0 1 1 0 012 0zm0 1c0 .55-.45 1-1 1s-1-.45-1-1v-1a1 1 0 112 0v1zM10 2.5a.5.5 0 01-.5-.5H8.5a.5.5 0 010 1h1a.5.5 0 01.5-.5zM12 1.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM14 2.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM16 3.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM18 5.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM20 7.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM22 10.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM22 12.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM22 14.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM20 16.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM18 18.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM16 20.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM14 21.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5zM12 22.5a.5.5 0 01-.5-.5h-1a.5.5 0 010 1h1a.5.5 0 01.5-.5z"></path></svg>
                        </div>
                      </>
                    ) : (
                      <img src={post.image} alt={`Post ${post.id}`} />
                    )}
                    <div className="post-overlay">
                      <span className="post-stat">❤️ {post.likes}</span>
                      <span className="post-stat">💬 {post.comments}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
          {activeTab === 'reels' && (
            reels.length === 0 ? (
                <div className="empty-posts">
                    <h4>{texts.noPosts}</h4>
                    <p>Reels yaratishni boshlang!</p>
                </div>
            ) : (
                <div className="reels-grid">
                    {reels.map(reel => (
                        <div key={reel.id} className="reel" onClick={() => openCommentsModal(reel)}>
                            <video src={reel.image} className="reel-video" />
                            <div className="video-overlay">
                                <span className="reel-stat">❤️ {reel.likes}</span>
                                <span className="reel-stat">💬 {reel.comments}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )
          )}
        </div>
      </div>
      
      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {modalContent.type === 'video' ? (
              <video src={modalContent.image} className="modal-video" controls autoPlay loop />
            ) : (
              <img src={modalContent.image} alt={`Post ${modalContent.id}`} className="modal-image" />
            )}
            <div className="modal-details">
              <div className="modal-post-header">
                <div className="modal-avatar">
                  <img src="https://picsum.photos/50/50?random=10" alt="Аватар" />
                </div>
                <h4>ibrohim_325</h4>
              </div>
              <p>Bu post haqida qisqacha ma'lumot.</p>
              <div className="modal-stats">
                <span>❤️ {modalContent.likes}</span>
                <span>💬 {modalContent.comments}</span>
              </div>
              <button 
                className={`like-btn ${modalContent.isLiked ? 'liked' : ''}`}
                onClick={() => handleLike(modalContent.id)}
              >
                {modalContent.isLiked ? '❤️' : '🤍'}
              </button>
            </div>
            <button className="close-modal-btn" onClick={closeModal}>&times;</button>
          </div>
        </div>
      )}
      
      {commentsModalOpen && selectedPost && (
        <div className="comments-modal-overlay" onClick={closeCommentsModal}>
            <div className="comments-modal-content" onClick={e => e.stopPropagation()}>
                <div className="comments-modal-left">
                    <video src={selectedPost.image} className="comments-modal-video" controls autoPlay loop />
                </div>
                <div className="comments-modal-right">
                    <div className="comments-modal-header">
                        <div className="comments-modal-user">
                            <img src="https://picsum.photos/50/50?random=10" alt="Аватар" />
                            <h4>ibrohim_325</h4>
                        </div>
                        <button className="close-modal-btn" onClick={closeCommentsModal}>&times;</button>
                    </div>
                    <div className="comments-list">
                      {/* Izohlar listi shu yerga joylashadi */}
                      <p>Hali izohlar yo'q.</p>
                    </div>
                    <div className="comments-actions">
                        <div className="action-buttons">
                            <button className="icon-btn" onClick={() => handleLike(selectedPost.id)}>
                                {selectedPost.isLiked ? '❤️' : '🤍'}
                            </button>
                            <button className="icon-btn">💬</button>
                            <button className="icon-btn">✈️</button>
                        </div>
                        <div className="stats-info">
                            <span>{selectedPost.likes} {texts.likes}</span>
                        </div>
                        <div className="add-comment">
                            <input type="text" placeholder={texts.addComment} />
                            <button className="post-comment-btn">{texts.postComment}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Profil;