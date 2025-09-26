import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaHeart, FaRegHeart, FaRegComment, FaShare, FaEllipsisH, FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaExpand, FaCompress, FaTimes } from "react-icons/fa";
import './Makaralar.css';

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
        caption: "Elephants in their natural habitat 🐘",
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

const Makaralar = ({ onSendVideo }) => {
    const [videoState, setVideoState] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalVideo, setModalVideo] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [shareVideoId, setShareVideoId] = useState(null);
    const [showOptionsMenu, setShowOptionsMenu] = useState(null);

    const videoRefs = useRef(new Map());

    useEffect(() => {
        const initialState = {};
        videos.forEach(video => {
            initialState[video.id] = {
                liked: false,
                likesCount: video.initialLikes,
                comments: video.initialComments,
                isFollowing: false,
                playing: false,
                muted: true,
                currentTime: 0,
                duration: 0,
                isFullScreen: false,
            };
        });
        setVideoState(initialState);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const videoId = parseInt(entry.target.dataset.videoid);
                    const isPlaying = videoState[videoId]?.playing;

                    if (entry.isIntersecting && !isPlaying) {
                        entry.target.play();
                        setVideoState(prev => ({
                            ...prev,
                            [videoId]: { ...prev[videoId], playing: true }
                        }));
                    } else if (!entry.isIntersecting && isPlaying) {
                        entry.target.pause();
                        setVideoState(prev => ({
                            ...prev,
                            [videoId]: { ...prev[videoId], playing: false }
                        }));
                    }
                });
            },
            { threshold: 0.8 }
        );

        videoRefs.current.forEach(videoEl => {
            if (videoEl) {
                observer.observe(videoEl);
            }
        });

        return () => {
            videoRefs.current.forEach(videoEl => {
                if (videoEl) {
                    observer.unobserve(videoEl);
                }
            });
        };
    }, [videoState]);

    const handleLike = useCallback((videoId) => {
        setVideoState(prev => {
            const currentVideo = prev[videoId];
            const newLiked = !currentVideo.liked;
            const newLikesCount = newLiked ? currentVideo.likesCount + 1 : currentVideo.likesCount - 1;
            return {
                ...prev,
                [videoId]: { ...currentVideo, liked: newLiked, likesCount: newLikesCount }
            };
        });
    }, []);

    const handleAddComment = useCallback((e, videoId) => {
        e.preventDefault();
        if (newComment.trim()) {
            setVideoState(prev => ({
                ...prev,
                [videoId]: {
                    ...prev[videoId],
                    comments: [...(prev[videoId]?.comments || []), newComment]
                }
            }));
            setNewComment('');
        }
    }, [newComment]);

    const togglePlay = useCallback((videoId) => {
        const video = videoRefs.current.get(videoId);
        if (video) {
            if (videoState[videoId].playing) {
                video.pause();
            } else {
                video.play();
            }
            setVideoState(prev => ({
                ...prev,
                [videoId]: { ...prev[videoId], playing: !prev[videoId].playing }
            }));
        }
    }, [videoState]);

    const toggleMute = useCallback((videoId) => {
        const video = videoRefs.current.get(videoId);
        if (video) {
            video.muted = !videoState[videoId].muted;
            setVideoState(prev => ({
                ...prev,
                [videoId]: { ...prev[videoId], muted: !prev[videoId].muted }
            }));
        }
    }, [videoState]);

    const handleTimeUpdate = useCallback((e, videoId) => {
        setVideoState(prev => ({
            ...prev,
            [videoId]: { ...prev[videoId], currentTime: e.target.currentTime }
        }));
    }, []);

    const handleLoadedMetadata = useCallback((e, videoId) => {
        setVideoState(prev => ({
            ...prev,
            [videoId]: { ...prev[videoId], duration: e.target.duration }
        }));
    }, []);

    const handleProgressClick = useCallback((e, videoId) => {
        const video = videoRefs.current.get(videoId);
        if (video) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * videoState[videoId].duration;
            video.currentTime = newTime;
            setVideoState(prev => ({
                ...prev,
                [videoId]: { ...prev[videoId], currentTime: newTime }
            }));
        }
    }, [videoState]);

    const toggleFullScreen = useCallback((videoId) => {
        const container = document.getElementById(`video-container-${videoId}`);
        if (container) {
            if (!videoState[videoId].isFullScreen) {
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
            setVideoState(prev => ({
                ...prev,
                [videoId]: { ...prev[videoId], isFullScreen: !prev[videoId].isFullScreen }
            }));
        }
    }, [videoState]);

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const openCommentModal = useCallback((video) => {
        setModalVideo(video);
        setShowModal(true);
        const currentVideoRef = videoRefs.current.get(video.id);
        if (currentVideoRef) {
            currentVideoRef.pause();
        }
    }, []);

    const closeCommentModal = useCallback(() => {
        setShowModal(false);
        setModalVideo(null);
    }, []);

    const openShareModal = useCallback((videoId) => {
        setShareVideoId(videoId);
        setShowShareOptions(true);
        setShowOptionsMenu(null);
    }, []);

    const handleSendToUser = useCallback((userId) => {
        const videoToSend = videos.find(v => v.id === shareVideoId);
        if (videoToSend) {
            onSendVideo(userId, videoToSend);
        }
        setShowShareOptions(false);
    }, [shareVideoId, onSendVideo]);

    const toggleOptionsMenu = useCallback((videoId) => {
        setShowOptionsMenu(showOptionsMenu === videoId ? null : videoId);
    }, [showOptionsMenu]);

    const handleReport = useCallback((videoId) => {
        alert(`Video ${videoId} report qilindi`);
        setShowOptionsMenu(null);
    }, []);

    const handleSave = useCallback((videoId) => {
        alert(`Video ${videoId} saqlandi`);
        setShowOptionsMenu(null);
    }, []);

    return (
        <div className="video-feed-container">
            <div className="video-feed-makaralar">
                {videos.map((video) => {
                    const state = videoState[video.id] || {};
                    return (
                        <div key={video.id} className="video-card" id={`video-container-${video.id}`}>
                            <div className="video-header">
                                <div className="user-info">
                                    <img src={video.profilePic} alt="profile" className="profile-pic" />
                                    <span className="username">{video.username}</span>
                                    <button
                                        onClick={() => setVideoState(prev => ({ ...prev, [video.id]: { ...prev[video.id], isFollowing: !prev[video.id].isFollowing } }))}
                                        className={`follow-btn ${state.isFollowing ? 'following' : ''}`}
                                    >
                                        {state.isFollowing ? "Подписки" : "Подписаться"}
                                    </button>
                                </div>
                                
                                <div className="options-container">
                                    <FaEllipsisH 
                                        className="icon-more" 
                                        onClick={() => toggleOptionsMenu(video.id)} 
                                    />
                                    {showOptionsMenu === video.id && (
                                        <div className="options-menu">
                                            <button onClick={() => handleReport(video.id)}>Report</button>
                                            <button onClick={() => handleSave(video.id)}>Save</button>
                                            <button onClick={() => openShareModal(video.id)}>Share</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="video-player">
                                <video
                                    ref={el => videoRefs.current.set(video.id, el)}
                                    data-videoid={video.id}
                                    src={video.src}
                                    className="video"
                                    onTimeUpdate={(e) => handleTimeUpdate(e, video.id)}
                                    onLoadedMetadata={(e) => handleLoadedMetadata(e, video.id)}
                                    onClick={() => togglePlay(video.id)}
                                    muted={state.muted}
                                    loop
                                />
                                {!state.playing && (
                                    <button onClick={() => togglePlay(video.id)} className="play-button">
                                        <FaPlay />
                                    </button>
                                )}
                            </div>

                            <div className="video-controls">
                                <div className="progress-bar-container" onClick={(e) => handleProgressClick(e, video.id)}>
                                    <div className="progress-bar" style={{ width: `${(state.currentTime / state.duration) * 100}%` }} />
                                </div>
                                <div className="controls-row">
                                    <div className="controls-left">
                                        <button onClick={() => togglePlay(video.id)} className="control-btn">
                                            {state.playing ? <FaPause /> : <FaPlay />}
                                        </button>
                                        <button onClick={() => toggleMute(video.id)} className="control-btn">
                                            {state.muted ? <FaVolumeMute /> : <FaVolumeUp />}
                                        </button>
                                    </div>
                                    <div className="controls-right">
                                        <span className="time-display">{formatTime(state.currentTime)} / {formatTime(state.duration)}</span>
                                        <button onClick={() => toggleFullScreen(video.id)} className="control-btn fullscreen-btn">
                                            {state.isFullScreen ? <FaCompress /> : <FaExpand />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="video-actions">
                                <button onClick={() => handleLike(video.id)} className="action-btn">
                                    {state.liked ? <FaHeart className="liked-icon" /> : <FaRegHeart />}
                                    <span className="action-count">{state.likesCount}</span>
                                </button>
                                <button onClick={() => openCommentModal(video)} className="action-btn">
                                    <FaRegComment />
                                    <span className="action-count">{state.comments?.length || 0}</span>
                                </button>
                                <button onClick={() => openShareModal(video.id)} className="action-btn share-btn">
                                    <FaShare />
                                </button>
                            </div>

                            <div className="video-info">
                                <p className="likes-count">{state.likesCount} likes</p>
                                <p className="caption">
                                    <span className="username">{video.username}</span> {video.caption}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showModal && modalVideo && (
                <div className="modal-overlay" onClick={closeCommentModal}>
                    <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-video-section">
                            <video
                                src={modalVideo.src}
                                className="modal-video"
                                controls
                                autoPlay
                            />
                        </div>
                        <div className="modal-comments-section">
                            <div className="modal-header">
                                <h3>Comments</h3>
                                <button onClick={closeCommentModal} className="modal-close-btn">
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="comment-list">
                                {videoState[modalVideo.id]?.comments?.map((c, i) => (
                                    <div key={i} className="comment-item">
                                        <p className="comment">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={(e) => handleAddComment(e, modalVideo.id)} className="comment-form">
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
                            
                            <div className="comment-actions-footer">
                                <button onClick={() => handleLike(modalVideo.id)} className="action-btn">
                                    {videoState[modalVideo.id]?.liked ? <FaHeart className="liked-icon" /> : <FaRegHeart />}
                                    <span>{videoState[modalVideo.id]?.likesCount}</span>
                                </button>
                                <button className="action-btn">
                                    <FaRegComment />
                                    <span>{videoState[modalVideo.id]?.comments?.length || 0}</span>
                                </button>
                                <button onClick={() => openShareModal(modalVideo.id)} className="action-btn share-btn">
                                    <FaShare />
                                </button>
                            </div>
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

export default Makaralar;