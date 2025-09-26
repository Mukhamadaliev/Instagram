import './App.css';
import Login from './components/login/Login.jsx';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sagbar from './components/sagbar/Sagbar.jsx';
import Home from './components/home/Home.jsx';
import QidiruvSoravi from './components/QidiruvSoravi/QidiruvSoravi.jsx';
import Makaralar from './components/makaralar/Makaralar.jsx';
import Xabarlar from './components/xabarlar/Xabarlar.jsx';
import Bildirishnomalar from './components/bildirishnomalar/Bildirishnomalar.jsx';
import Yaratish from './components/yaratish/Yaratish.jsx';
import Profil from './components/profil/Profil.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import { useState } from 'react';

const samplePosts = [
    {
      id: 1,
      image: "https://picsum.photos/400/400?random=1",
      likes: 24,
      comments: 3,
      date: "2023-09-15",
      isLiked: false,
      caption: "Ajoyib kun!"
    },
    {
      id: 2,
      image: "https://picsum.photos/400/400?random=2",
      likes: 56,
      comments: 7,
      date: "2023-09-10",
      isLiked: true,
      caption: "Tabiat qo'ynida."
    },
    {
      id: 3,
      image: "https://picsum.photos/400/400?random=3",
      likes: 32,
      comments: 2,
      date: "2023-09-05",
      isLiked: false,
      caption: "Mazza qilib dam olyapmiz."
    }
];

const MainLayout = () => {
    const [sharedVideo, setSharedVideo] = useState(null);
    const [posts, setPosts] = useState(samplePosts);
    const [language, setLanguage] = useState('uz');
    const [theme, setTheme] = useState('light'); // Rejim holati

    const handleSendVideo = (userId, video) => {
        setSharedVideo({
            targetUserId: userId,
            src: video.src,
        });

    };

    const handleVideoSent = () => {
        setSharedVideo(null);
    };

    const handleCreatePost = (newPostData) => {
        const newPost = {
            id: Date.now(),
            likes: 0,
            comments: 0,
            date: new Date().toLocaleDateString('ru-RU'),
            isLiked: false,
            ...newPostData 
        };
        setPosts([newPost, ...posts]);
    };

    const handleLikePost = (postId) => {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newLikes = post.isLiked ? post.likes - 1 : post.likes + 1;
          return { ...post, likes: newLikes, isLiked: !post.isLiked };
        }
        return post;
      }));
    };

    const location = useLocation();
    const isXabarlarPage = location.pathname === './xabarlar';

    return (
        <div className={`max-width-App ${theme}`}>
            <div className={`main-app-container ${isXabarlarPage ? 'xabarlar-layout' : ''}`}>
                <Sagbar language={language} theme={theme} />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/qidiruvSoravi" element={<QidiruvSoravi />} />
                        <Route
                            path="/makaralar"
                            element={<Makaralar onSendVideo={handleSendVideo} />}
                        />
                        <Route
                            path="/xabarlar"
                            element={
                                <Xabarlar
                                    sharedVideo={sharedVideo}
                                    onVideoSent={handleVideoSent}
                                />
                            }
                        />
                        <Route path="/bildirishnomalar" element={<Bildirishnomalar />} />
                        <Route path="/yaratish" element={<Yaratish onPostCreate={handleCreatePost} />} />
                        <Route 
                            path="/profil" 
                            element={
                                <Profil 
                                    posts={posts} 
                                    onLike={handleLikePost} 
                                    language={language} 
                                    setLanguage={setLanguage}
                                    theme={theme}
                                    setTheme={setTheme}
                                />
                            } 
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

function App() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    return (
        <div className="App-wrapper">
            <Routes>
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
                />
                <Route
                    path="/*"
                    element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />}
                />
            </Routes>
        </div>
    );
}

export default App;
