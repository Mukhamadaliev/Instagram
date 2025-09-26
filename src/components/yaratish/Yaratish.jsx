import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhotoVideo, FaTimes } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import './Yaratish.css';

const Yaratish = ({ onPostCreate }) => {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };

    const processFile = (selectedFile) => {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setStep(2);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type.startsWith('video/'))) {
            processFile(droppedFile);
        }
    };
    
    const handleSubmit = () => {
        if (!file) return;
        
        const newPostData = {
            image: previewUrl,
            caption: caption,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: []
        };

        onPostCreate(newPostData);
        navigate('/profil'); 
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
            setFile(null);
            setPreviewUrl('');
            setCaption('');
        } else {
            navigate(-1);
        }
    };

    const handleClose = () => {
        navigate(-1);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div className="yaratish-modal-overlay" onClick={handleOverlayClick}>
            <div className="yaratish-modal-content">
                <div className="modal-header">
                    <button onClick={handleBack} className="back-btn">
                        <IoArrowBack size={20} />
                    </button>
                    <h3>{step === 1 ? 'Yangi post yaratish' : 'Postni tahrirlash'}</h3>
                </div>

                {step === 1 && (
                    <div 
                        className={`upload-step ${isDragOver ? 'dragover' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="upload-body">
                            <div className="upload-icon">
                                <FaPhotoVideo size={64} color={isDragOver ? "#0095f6" : "#8e8e8e"} />
                            </div>
                            <p className="upload-text">Rasmlar va videolarni shu yerga torting</p>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <button 
                                onClick={() => fileInputRef.current.click()} 
                                className="select-file-btn"
                            >
                                Kompyuterdan tanlang
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="edit-step">
                        <div className="media-preview">
                            {file.type.startsWith('image/') ? (
                                <img src={previewUrl} alt="Preview" className="preview-media" />
                            ) : (
                                <video src={previewUrl} controls className="preview-media"></video>
                            )}
                        </div>
                        <div className="caption-section">
                            <div className="user-info">
                                <img 
                                    src="https://picsum.photos/40/40?random=1" 
                                    alt="User" 
                                    className="user-avatar" 
                                />
                                <span className="username">sizning_profil</span>
                            </div>
                            <textarea
                                placeholder="Izoh qo'shing..."
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                className="caption-input"
                                rows="4"
                                maxLength={2200}
                            ></textarea>
                            <div className="char-counter">{caption.length}/2,200</div>
                            <button 
                                onClick={handleSubmit} 
                                className="share-btn"
                                disabled={!file}
                            >
                                Postni ulashish
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Yaratish;