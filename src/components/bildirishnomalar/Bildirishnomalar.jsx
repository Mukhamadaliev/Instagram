import React, { useState } from 'react';
import './Bildirishnomalar.css';

const notificationsData = [
  {
    id: 1,
    username: "iamsammick1",
    profilePic: "https://picsum.photos/40/40?random=1",
    action: "подписался(-ась) на ваши обновления.",
    date: "03 сент.",
    group: "this_month"
  },
  {
    id: 2,
    username: "6.school_10a",
    profilePic: "https://picsum.photos/40/40?random=2",
    action: "упомянул(-а) вас в комментарии: @ibrohim_325",
    date: "30 авг.",
    group: "earlier"
  },
  {
    id: 3,
    username: "merhli_market",
    profilePic: "https://picsum.photos/40/40?random=3",
    action: "упомянул(-а) вас в комментарии: @ibrohim_325",
    date: "15 июл.",
    group: "earlier"
  },
  {
    id: 4,
    username: "a.store_05_edit",
    profilePic: "https://picsum.photos/40/40?random=4",
    action: "подписался(-ась) на ваши обновления.",
    date: "28 июл.",
    group: "earlier"
  },
  {
    id: 5,
    username: "fshxrm_shapoat9",
    profilePic: "https://picsum.photos/40/40?random=5",
    action: "поставили 'Нравится' вашему комментарию:",
    date: "18 июл.",
    group: "earlier"
  },
  {
    id: 6,
    username: "user_thread",
    profilePic: "https://picsum.photos/40/40?random=6",
    action: "У вас 1 новый подписчик в Threads.",
    date: "05 авг.",
    group: "earlier"
  },
];

const Bildirishnomalar = () => {
  const [notifications, setNotifications] = useState(notificationsData);


  const thisMonthNotifications = notifications.filter(n => n.group === 'this_month');
  const earlierNotifications = notifications.filter(n => n.group === 'earlier');

  return (
    <div className="notifications-container">
      <h2>Уведомления</h2>

      {thisMonthNotifications.length > 0 && (
        <div className="notification-group">
          <h4>В этом месяце</h4>
          {thisMonthNotifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <img src={notification.profilePic} alt="Profile" className="profile-pic" />
              <div className="notification-text">
                <span className="username">{notification.username}</span> {notification.action}
                <span className="date">{notification.date}</span>
              </div>
            
            </div>
          ))}
        </div>
      )}

      {earlierNotifications.length > 0 && (
        <div className="notification-group">
          <h4>Ранее</h4>
          {earlierNotifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <img src={notification.profilePic} alt="Profile" className="profile-pic" />
              <div className="notification-text">
                <span className="username">{notification.username}</span> {notification.action}
                <span className="date">{notification.date}</span>
              </div>
           
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bildirishnomalar;