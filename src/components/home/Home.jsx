import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { FaHeart, FaRegHeart, FaRegComment, FaShare, FaEllipsisH, FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaCompress, FaExpand } from "react-icons/fa";
import './home.css';

Modal.setAppElement('#root');

const Makaralar = ({ onSendVideo }) => {
  const [liked, setLiked] = useState({});
  const [likesCount, setLikesCount] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalVideoId, setModalVideoId] = useState(null);
  const [playing, setPlaying] = useState({});
  const [muted, setMuted] = useState({});
  const [currentTime, setCurrentTime] = useState({});
  const [duration, setDuration] = useState({});
  const [isFullScreen, setIsFullScreen] = useState({});
  const [isFollowing, setIsFollowing] = useState({});
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareVideoId, setShareVideoId] = useState(null);

  const videoRefs = useRef([]);

  const videos = [
    {
      id: 1,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      username: "user123",
      caption: "Beautiful nature scenery #nature #outdoors",
      initialLikes: 245,
      initialComments: ["Ajoyib video!", "Yoqdi!"],
      profilePic: "https://picsum.photos/200"
    },
    {
      id: 2,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      username: "wildlife_lover",
      caption: "Elephants in their natural habitat",
      initialLikes: 512,
      initialComments: ["Amazing!", "So majestic"],
      profilePic: "https://picsum.photos/201"
    },
    {
      id: 3,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      username: "adventure_seeker",
      caption: "Fire show performance #fire #performance",
      initialLikes: 189,
      initialComments: ["Wow!", "Incredible skills"],
      profilePic: "https://picsum.photos/202"
    },
    {
      id: 4,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      username: "travel_diaries",
      caption: "Beautiful getaway location ✈️",
      initialLikes: 421,
      initialComments: ["I want to go there!", "Paradise"],
      profilePic: "https://picsum.photos/203"
    },
    {
      id: 5,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      username: "fun_times",
      caption: "Having the best time with friends! #friends #fun",
      initialLikes: 367,
      initialComments: ["Looks like fun!", "Awesome"],
      profilePic: "https://picsum.photos/204"
    }
  ];

  const chatUsers = [
    {
      id: 1,
      username: "Roziqov",
      profilePic: "https://picsum.photos/40/40?random=1",
    },
    {
      id: 2,
      username: "_abdurasulov_247_",
      profilePic: "https://picsum.photos/40/40?random=2",
    },
    {
      id: 3,
      username: "muhammad_soliyev",
      profilePic: "https://picsum.photos/40/40?random=3",
    },
    {
      id: 4,
      username: "shoxrux_999",
      profilePic: "https://picsum.photos/40/40?random=4",
    },
  ];

  useEffect(() => {
    const initialLiked = {};
    const initialLikesCount = {};
    const initialComments = {};
    const initialFollowing = {};
    const initialPlaying = {};
    const initialMuted = {};

    videos.forEach(video => {
      initialLiked[video.id] = false;
      initialLikesCount[video.id] = video.initialLikes;
      initialComments[video.id] = video.initialComments;
      initialFollowing[video.id] = false;
      initialPlaying[video.id] = false;
      initialMuted[video.id] = true;
    });

    setLiked(initialLiked);
    setLikesCount(initialLikesCount);
    setComments(initialComments);
    setIsFollowing(initialFollowing);
    setPlaying(initialPlaying);
    setMuted(initialMuted);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          const videoId = video.dataset.videoid;
          if (entry.isIntersecting) {
            video.play();
            setPlaying(prev => ({ ...prev, [videoId]: true }));
          } else {
            video.pause();
            setPlaying(prev => ({ ...prev, [videoId]: false }));
          }
        });
      },
      { threshold: 0.8 }
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, []);

  const handleLike = (videoId) => {
    setLikesCount(prev => ({
      ...prev,
      [videoId]: liked[videoId] ? prev[videoId] - 1 : prev[videoId] + 1
    }));
    setLiked(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const handleAddComment = (e, videoId) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments(prev => ({
        ...prev,
        [videoId]: [...(prev[videoId] || []), newComment]
      }));
      setNewComment('');
    }
  };

  const togglePlay = (videoId) => {
    const video = videoRefs.current.find(ref => ref?.dataset.videoid == videoId);
    if (video) {
      if (playing[videoId]) {
        video.pause();
      } else {
        video.play();
      }
      setPlaying(prev => ({ ...prev, [videoId]: !prev[videoId] }));
    }
  };

  const toggleMute = (videoId) => {
    const video = videoRefs.current.find(ref => ref?.dataset.videoid == videoId);
    if (video) {
      video.muted = !muted[videoId];
      setMuted(prev => ({ ...prev, [videoId]: !prev[videoId] }));
    }
  };

  const handleTimeUpdate = (e, videoId) => {
    setCurrentTime(prev => ({ ...prev, [videoId]: e.target.currentTime }));
  };

  const handleLoadedMetadata = (e, videoId) => {
    setDuration(prev => ({ ...prev, [videoId]: e.target.duration }));
  };

  const handleProgressClick = (e, videoId) => {
    const video = videoRefs.current.find(ref => ref?.dataset.videoid == videoId);
    if (video) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration[videoId];
      video.currentTime = newTime;
      setCurrentTime(prev => ({ ...prev, [videoId]: newTime }));
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const toggleFullScreen = (videoId) => {
    const container = document.getElementById(`video-container-${videoId}`);
    if (container) {
      if (!isFullScreen[videoId]) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      setIsFullScreen(prev => ({ ...prev, [videoId]: !prev[videoId] }));
    }
  };

  const openCommentModal = (videoId) => {
    setModalVideoId(videoId);
    setShowModal(true);
  };

  const openShareModal = (videoId) => {
    setShareVideoId(videoId);
    setShowShareOptions(true);
  };

  const handleSendToUser = (userId) => {
    const videoToSend = videos.find(v => v.id === shareVideoId);
    if (videoToSend) {
      onSendVideo(userId, videoToSend);
      alert(`Video ${userId} foydalanuvchisiga yuborildi!`);
    }
    setShowShareOptions(false);
  };

  const handleShare = (platform, videoId) => {
    const currentVideo = videos.find(v => v.id === videoId);
    const shareUrl = window.location.href;
    const text = `Check out this video by ${currentVideo.username} on VideoApp!`;
    let shareWindowUrl = '';

    switch (platform) {
      case 'facebook':
        shareWindowUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareWindowUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareWindowUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
      case 'telegram':
        shareWindowUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        setShowShareOptions(false);
        return;
      default:
        return;
    }

    window.open(shareWindowUrl, '_blank', 'width=600,height=400');
    setShowShareOptions(false);
  };

  return (
    <div className="video-feed-container">
      <div className="video-feed">
        {videos.map((video, index) => (
          <div key={video.id} className="video-card" id={`video-container-${video.id}`}>
            <div className="video-header">
              <div className="user-info">
                <img src={video.profilePic} alt="profile" className="profile-pic" />
                <span className="username">{video.username}</span>
                <button
                  onClick={() => setIsFollowing(prev => ({ ...prev, [video.id]: !prev[video.id] }))}
                  className={`follow-btn ${isFollowing[video.id] ? 'following' : ''}`}
                >
                  {isFollowing[video.id] ? "Подписки" : "Подписаться"}
                </button>
              </div>
              <FaEllipsisH className="icon-more" />
            </div>

            <div className="video-player">
              <video
                ref={el => videoRefs.current[index] = el}
                data-videoid={video.id}
                src={video.src}
                className="video"
                onTimeUpdate={(e) => handleTimeUpdate(e, video.id)}
                onLoadedMetadata={(e) => handleLoadedMetadata(e, video.id)}
                onClick={() => togglePlay(video.id)}
                muted={muted[video.id]}
                loop
              />
              {!playing[video.id] && (
                <button onClick={() => togglePlay(video.id)} className="play-button">
                  <FaPlay />
                </button>
              )}
            </div>

            <div className="video-controls">
              <div className="progress-bar-container" onClick={(e) => handleProgressClick(e, video.id)}>
                <div className="progress-bar" style={{ width: `${(currentTime[video.id] / duration[video.id]) * 100}%` }} />
              </div>
              <div className="controls-row">
                <div className="controls-left">
                  <button onClick={() => togglePlay(video.id)} className="control-btn">
                    {playing[video.id] ? <FaPause /> : <FaPlay />}
                  </button>
                  <button onClick={() => toggleMute(video.id)} className="control-btn">
                    {muted[video.id] ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                </div>
                <div className="controls-right">
                  <span className="time-display">{formatTime(currentTime[video.id])} / {formatTime(duration[video.id])}</span>
                  <button onClick={() => toggleFullScreen(video.id)} className="control-btn fullscreen-btn">
                    {isFullScreen[video.id] ? <FaCompress /> : <FaExpand />}
                  </button>
                </div>
              </div>
            </div>

            <div className="video-actions">
              <button onClick={() => handleLike(video.id)} className="action-btn">
                {liked[video.id] ? <FaHeart className="liked-icon" /> : <FaRegHeart />}
                <span className="action-count">{likesCount[video.id]}</span>
              </button>
              <button onClick={() => openCommentModal(video.id)} className="action-btn">
                <FaRegComment />
                <span className="action-count">{comments[video.id]?.length || 0}</span>
              </button>
              <button onClick={() => openShareModal(video.id)} className="action-btn share-btn">
                <FaShare />
              </button>
            </div>

            <div className="video-info">
              <p className="likes-count">{likesCount[video.id]} likes</p>
              <p className="caption">
                <span className="username">{video.username}</span> {video.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="comment-modal-layout" onClick={(e) => e.stopPropagation()}>
            <div className="modal-video-container">
              <video
                src={videos.find(v => v.id === modalVideoId)?.src}
                className="modal-video"
                controls
                autoPlay
              />
            </div>
            <div className="modal-comments-container">
              <div className="modal-header">
                <h3>Comments</h3>
                <button onClick={() => setShowModal(false)} className="modal-close-btn">
                  ×
                </button>
              </div>
              <div className="comment-list">
                {comments[modalVideoId]?.map((c, i) => (
                  <div key={i} className="comment-item">
                    <p className="comment">{c}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={(e) => handleAddComment(e, modalVideoId)} className="comment-form">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="comment-input"
                />
                <button type="submit" className="comment-post-btn">
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showShareOptions && (
        <div className="modal-overlay" onClick={() => setShowShareOptions(false)}>
          <div className="modal-content share-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Yuborish</h3>
            <div className="share-user-list">
              {chatUsers.map(user => (
                <div key={user.id} className="share-user-item" onClick={() => handleSendToUser(user.id)}>
                  <img src={user.profilePic} alt="Profile" className="profile-pic" />
                  <span>{user.username}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowShareOptions(false)} className="modal-cancel-btn">
              Bekor qilish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Asosiy Home komponenti
const Home = () => {
  // Hikoyalar uchun ma'lumotlar
  const storiesData = [
    {
      id: 1,
      profilePic: "https://coursetop.fra1.cdn.digitaloceanspaces.com/1731904962850.jpeg",
      username: "it_tat_samarqand",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      id: 2,  
      profilePic: "https://img.championat.com/i/57/34/1594725734293371066.jpg",
      username: "Lionel Andrés Messi Cuccittini",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
      id: 3,
      profilePic: "https://cdn.nur.kz/images/1120/pogudx5bd7k1jtoms.jpeg",
      username: "cristiano ronaldo",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      id: 4,
      profilePic: "https://cdn.images.express.co.uk/img/dynamic/67/1200x712/4608244.jpg",
      username: "neymar jr",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
      id: 5,
      profilePic: "https://avatars.mds.yandex.net/i?id=0cb6b3efaf25bba8a7c18ef78282643f_l-9181393-images-thumbs&n=13",
      username: "Kylian Mbappé",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
      id: 6,
      profilePic: "https://i.pinimg.com/736x/6f/85/4e/6f854eccd8d1aabe4d64eee503d68473.jpg",
      username: "Luka Modrić",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      id: 7,
      profilePic: "https://i.ytimg.com/vi/nzBPmr7xrTE/maxresdefault.jpg",
      username: "Karim Benzema",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
      id: 8,
      profilePic: "https://i2-prod.manchestereveningnews.co.uk/incoming/article23948490.ece/ALTERNATES/s1200/0_Lewandowsi-Bayern.jpg",
      username: "Robert Lewandowski",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      id: 9,
      profilePic: "https://avatars.mds.yandex.net/i?id=20ea365779f3addae9c9d41d5457dc8e_l-5170695-images-thumbs&n=13",
      username: "Kevin De Bruyne",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
      id: 10,
      profilePic: "https://wallpaper.forfun.com/fetch/cf/cffb2611c5e9ab667df99f905f3cedb3.jpeg",
      username: "Mohamed Salah",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
      id: 11,
      profilePic: "https://avatars.mds.yandex.net/i?id=9e885b0cc5dd7234c6af3671dd7e0bba_l-5235074-images-thumbs&n=13",
      username: "Harry Kane",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      id: 12,
      profilePic: "https://livesport-ott-images.ssl.cdn.cra.cz/r1200xfq60/aaf3defe-9496-43d0-863c-8a538c126dc9.jpeg",
      username: "Erling Haaland",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
      id: 13,
      profilePic: "https://nbcsports.brightspotcdn.com/dims4/default/b407f3a/2147483647/strip/true/crop/6604x3715+0+325/resize/1440x810!/quality/90/?url=https%3A%2F%2Fnbc-sports-production-nbc-sports.s3.us-east-1.amazonaws.com%2Fbrightspot%2F30%2F76%2Ffbb6b1d64b89825496843f6a6c38%2Fhttps-delivery-gettyimages.com%2Fdownloads%2F2187727888",
      username: "Virgil van Dijk",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },

    {
      id: 14,
      profilePic: "https://avatars.mds.yandex.net/i?id=09eb81a5df8d204807a9eeef986de293_l-5236362-images-thumbs&n=13",
      username: "Sergio Ramos",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },

    {
      id: 15,
      profilePic: "https://i.ytimg.com/vi/7X1hU_1kccI/maxresdefault.jpg",
      username: "Manuel Neuer",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },

    {
      id: 16,
      profilePic: "https://v.wpimg.pl/MTE2MDIuYjUkUDt3Zg5vIGcIby0gV2F2MBB3ZmZEf2R1SntzfFo-MmhTKSkgGyQnMUAsJyMUYyM1USkqZwUhezZGIjYoEihmalQoJT0APzEhbSI2IBIkOiReYnJ7QitjIAd-dHoRKTB9bXlycER8YnUAYy45Em8p",
      username: "Paulo Dybala",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },

    {
      id: 17,
      profilePic: "https://avatars.mds.yandex.net/i?id=e01580f3e600aeba7828fb2159f215c2_l-12609997-images-thumbs&n=13",
      username: "Antoine Griezmann",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    }
  ];

  // Foydalanuvchilar ro'yxati
  const users = [
    { id: 1, username: "khalikov_salih", followedBy: "Khalikov", isRecommended: false },
    { id: 2, username: "shahlo_alijonova", followedBy: "so.liha486 ve diğerleri", isRecommended: false },
    { id: 3, username: "raufov_10__", followedBy: "rabbimovi...", isRecommended: false },
    { id: 4, username: "klever.rr", followedBy: "", isRecommended: true },
    { id: 5, username: "khurshedovnaa.n", followedBy: "school_6_9...", isRecommended: false }
  ];

  // State Management
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const storiesContainerRef = useRef(null);
  const [followedUsers, setFollowedUsers] = useState(new Set());

  // Functions
  const openStory = (index) => {
    setCurrentStoryIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % storiesData.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + storiesData.length) % storiesData.length);
  };

  const scrollStories = (direction) => {
    if (storiesContainerRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        storiesContainerRef.current.scrollLeft -= scrollAmount;
      } else {
        storiesContainerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const toggleFollow = (userId) => {
    const newFollowed = new Set(followedUsers);
    if (newFollowed.has(userId)) {
      newFollowed.delete(userId);
    } else {
      newFollowed.add(userId);
    }
    setFollowedUsers(newFollowed);
  };

  const visitProfile = (username) => {
    alert(`${username} profil sayfasına yönlendiriliyorsunuz!`);
  };

  const handleSendVideo = (userId, video) => {
    alert(`Video ${userId} foydalanuvchisiga yuborildi: ${video.caption}`);
  };

  const currentStory = storiesData[currentStoryIndex];

  return (
    <div className="max-width-App">
      <div className="home-container">
        <div className="stories-wrapper">
          <button onClick={() => scrollStories('left')} className="scroll-arrow left">
            {"<"}
          </button>
          <div className="stories-container" ref={storiesContainerRef}>
            {storiesData.map((story, index) => (
              <div key={story.id} className="story-item" onClick={() => openStory(index)}>
                <div className="story-ring">
                  <img src={story.profilePic} alt={story.username} className="story-profile-pic" />
                </div>
                <span className="story-username">{story.username}</span>
              </div>
            ))}
          </div>
          <button onClick={() => scrollStories('right')} className="scroll-arrow right">
            {">"}
          </button>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Story Modal"
          className="story-modal-content"
          overlayClassName="story-modal-overlay"
        >
          <button onClick={closeModal} className="story-close-button">×</button>
          {currentStory && (
            <>
              <div className="modal-header">
                <img src={currentStory.profilePic} alt={currentStory.username} className="modal-profile-pic" />
                <span className="modal-username">{currentStory.username}</span>
              </div>
              <div className="story-video-container">
                <video
                  key={currentStory.id}
                  src={currentStory.videoUrl}
                  title={`Story by ${currentStory.username}`}
                  controls
                  autoPlay
                ></video>
              </div>
              <button onClick={prevStory} className="story-nav-button story-prev-button">←</button>
              <button onClick={nextStory} className="story-nav-button story-next-button">→</button>
            </>
          )}
        </Modal>

        <div className="main-content">
          <Makaralar onSendVideo={handleSendVideo} />

          <div className="right-sidebar">
            <header className="header">
              <div className="user-info">
                <img src="https://picsum.photos/40" alt="profile" className="profile-pic" />
                <span className="username">ibrohim_325</span>
                <button className="switch-account">Подписаться</button>
              </div>
            </header>

            <div className="recommendations-header">
              <h2>Siz uchun tavsiyalar</h2>
              <span>Hammasi</span>
            </div>

            <div className="users-list">
              {users.map(user => (
                <div key={user.id} className="user-item">
                  <div
                    className="user-info"
                    onClick={() => visitProfile(user.username)}
                  >
                    <div className="avatar"></div>
                    <div className="user-details">
                      <div className="username">{user.username}</div>
                      <div className="followed-by">
                        {user.isRecommended
                          ? "Senin için öneriliyor"
                          : ` Подписаться ${user.followedBy}`}
                      </div>
                    </div>
                  </div>
                  <button
                    className={`follow-btn ${followedUsers.has(user.id) ? 'following' : ''}`}
                    onClick={() => toggleFollow(user.id)}
                  >
                    {followedUsers.has(user.id) ? 'Подписки' : 'Подписаться'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;