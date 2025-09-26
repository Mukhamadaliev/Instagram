import React, { useState, useEffect } from 'react';
import './Xabarlar.css';

const chatUsers = [
  {
    id: 1,
    username: "Roziqov",
    profilePic: "https://picsum.photos/40/40?random=1",
    lastMessage: "В сети 4 ч. назад",
    messages: [
      { id: 1, text: "Salom! Bugun nima qilyapsiz?", sender: "other" },
      { id: 2, text: "Yaxshi, o'zingiz-chi?", sender: "self" },
    ]
  },
  {
    id: 2,
    username: "_abdurasulov_247_",
    profilePic: "https://picsum.photos/40/40?random=2",
    lastMessage: "Вы отправили вложение. · 2 ч.",
    messages: [
      { id: 1, text: "Rasm yubordim", sender: "self" },
      { id: 2, text: "Ko'rdim, rahmat!", sender: "other" },
    ]
  },
  {
    id: 3,
    username: "muhammad_soliyev",
    profilePic: "https://picsum.photos/40/40?random=3",
    lastMessage: "В сети сегодня: 5",
    messages: [
      { id: 1, text: "Assalomu alaykum!", sender: "other" },
      { id: 2, text: "Vaalaykum assalom, yaxshimisiz?", sender: "self" },
    ]
  },
  {
    id: 4,
    username: "shoxrux_999",
    profilePic: "https://picsum.photos/40/40?random=4",
    lastMessage: "shoxrux_999 отправил(-а) вложение. · 21 ч.",
    messages: [
      { id: 1, text: "Qanday qilib video yuborish mumkin?", sender: "other" },
      { id: 2, text: "Hozir ko'rsataman...", sender: "self" },
    ]
  },
];

const Xabarlar = ({ sharedVideo, onVideoSent }) => {



  
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [users, setUsers] = useState(chatUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (sharedVideo) {
      const updatedUsers = users.map(user => {
        if (user.id === sharedVideo.targetUserId) {
          const newVideoMessage = {
            id: user.messages.length + 1,
            type: 'video',
            src: sharedVideo.src,
            sender: 'self',
          };
          
          return {
            ...user,
            messages: [...user.messages, newVideoMessage],
            lastMessage: "Вы отправили вложение. · Только что"
          };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      
      if (selectedChat && selectedChat.id === sharedVideo.targetUserId) {
        const updatedSelectedChat = updatedUsers.find(user => user.id === sharedVideo.targetUserId);
        setSelectedChat(updatedSelectedChat);
      }
      
      onVideoSent();
    }
  }, [sharedVideo, onVideoSent]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === '') return;

    const newMessage = {
      id: selectedChat.messages.length + 1,
      type: 'text',
      text: messageInput,
      sender: 'self'
    };

    const updatedUsers = users.map(user => {
      if (user.id === selectedChat.id) {
        return {
          ...user,
          messages: [...user.messages, newMessage],
          lastMessage: messageInput
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    
    const updatedSelectedChat = updatedUsers.find(user => user.id === selectedChat.id);
    setSelectedChat(updatedSelectedChat);
    setMessageInput('');
  };

  const handleGoBack = () => {
      setSelectedChat(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectChat = (user) => {
    setSelectedChat(user);
    handleCloseModal();
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const renderChatContent = () => {
    if (!selectedChat) {
      return (
        <div className="placeholder-content">
        </div>
      );
    }

    return (
      <div className="chat-content">
        <div className="chat-header">
          <button onClick={handleGoBack} className="back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
          </button>
          <img src={selectedChat.profilePic} alt="Profile" className="profile-pic" />
          <span className="username">{selectedChat.username}</span>
        </div>
        <div className="chat-messages">
          {selectedChat.messages.map(message => (
            <div
              key={message.id}
              className={`message-bubble ${message.sender === 'self' ? 'self' : 'other'}`}
            >
              {message.type === 'video' ? (
                <video src={message.src} controls className="shared-video" />
              ) : (
                message.text
              )}
            </div>
          ))}
        </div>
        <div className="chat-input-area">
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Xabar yuborish..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="messages-page">
      {!selectedChat && (
        <div className="messages-sidebar">
          <div className="sidebar-header">
            <span className="current-user">ibrohim_325</span>
            <button className="new-message-btn" onClick={handleOpenModal}>
              <svg aria-label="Новое сообщение" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                <path d="M12.202 3.203a2.5 2.5 0 0 0-.704 3.037L9.63 8.805a1.5 1.5 0 1 1-2.868-.7l1.86-2.56-2.646-2.22c-1.39-1.168-3.41-1.3-4.872-.254-.925.68-.456 1.954.516 2.548.887.534 1.98.665 2.915.228L8 6.749v.001c-.053-.016-.106-.03-.16-.042a.75.75 0 0 1-.22-.061l-2.61-2.203a1.5 1.5 0 0 0-2.206 1.968l1.492 1.258a1.5 1.5 0 0 1-.77 2.155L2.8 11.2a1.5 1.5 0 0 0 1.25 2.113l2.673.238c.677 0 1.34-.148 1.93-.418.91-.41 1.76-.9 2.52-1.46L11 9.8l1.24 1.706a1.5 1.5 0 0 0 2.228 1.97l2.87-2.42c1.32-1.11 2.37-2.67 3.03-4.32a1.5 1.5 0 0 0-2.61-1.968l-2.07 1.745a1.5 1.5 0 0 1-2.206 1.968L12.202 3.203z" />
              </svg>
            </button>
          </div>
          <div className="notes-section">
            <p className="section-title">Заметка...</p>
            <div className="note-profile">
              <img src="https://picsum.photos/60/60?random=7" alt="Profile" className="profile-pic" />
              <span className="note-text">Ваша заметка</span>
            </div>
          </div>
          <div className="chat-section">
            <div className="chat-section-header">
              <h4 className="section-title">Сообщения</h4>
              <span className="section-link">Запросы</span>
            </div>
            <div className="chat-list">
              {users.map(user => (
                <div
                  key={user.id}
                  className={`chat-item ${selectedChat?.id === user.id ? 'active' : ''}`}
                  onClick={() => setSelectedChat(user)}
                >
                  <img src={user.profilePic} alt="Profile" className="profile-pic" />
                  <div className="chat-details">
                    <span className="username">{user.username}</span>
                    <p className="last-message">{user.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {selectedChat && (
        <div className="messages-main-content">
          {renderChatContent()}
        </div>
      )}

      {/* Modal oynasi */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Yangi xabar</h3>
              <button onClick={handleCloseModal}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Kim bilan xabar yubormoqchisiz?</p>
              <div className="modal-chat-list">
                {users.map(user => (
                  <div key={user.id} className="chat-item" onClick={() => handleSelectChat(user)}>
                    <img src={user.profilePic} alt="Profile" className="profile-pic" />
                    <div className="chat-details">
                      <span className="username">{user.username}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Xabarlar;