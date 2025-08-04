import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaExpand, FaHeart, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const VideoGrid = () => {
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [muted, setMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState([]);
  const videoRefs = useRef([]);

  const videos = [
    {
      id: 1,
      src: '/1stvideo.mp4',
      title: '25 Years of Excellence – Event Highlights',
      views: '1.2K views',
      date: '2 weeks ago',
      thumbnail: '/video1-thumb.jpg'
    },
    {
      id: 2,
      src: '/2nd.mp4',
      title: 'Meet one of our youngest achievers',
      views: '856 views',
      date: '1 month ago',
      thumbnail: '/video2-thumb.jpg'
    },
    {
      id: 3,
      src: '/3rd.mp4',
      title: 'Abdullah Masood - Student Success Story',
      views: '2.4K views',
      date: '3 months ago',
      thumbnail: '/video3-thumb.jpg'
    },
    // Add more video objects as needed
  ];

  const togglePlay = (id) => {
    if (playingVideo === id) {
      videoRefs.current[id].pause();
      setPlayingVideo(null);
    } else {
      if (playingVideo) {
        videoRefs.current[playingVideo].pause();
      }
      videoRefs.current[id].play();
      setPlayingVideo(id);
    }
  };

  const toggleLike = (id) => {
    if (likedVideos.includes(id)) {
      setLikedVideos(likedVideos.filter(videoId => videoId !== id));
    } else {
      setLikedVideos([...likedVideos, id]);
    }
  };

  const toggleFullscreen = (id) => {
    if (videoRefs.current[id].requestFullscreen) {
      videoRefs.current[id].requestFullscreen();
    } else if (videoRefs.current[id].webkitRequestFullscreen) {
      videoRefs.current[id].webkitRequestFullscreen();
    }
  };

  return (
    <section className=" py-16 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Featured Videos</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our success stories, events, and student achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <div className="relative">
                <video
                  ref={el => videoRefs.current[video.id] = el}
                  className="w-full h-48 sm:h-56 object-cover cursor-pointer"
                  onClick={() => togglePlay(video.id)}
                  poster={video.thumbnail}
                  muted={muted}
                  loop
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video controls overlay */}
                {(hoveredVideo === video.id || playingVideo === video.id) && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay(video.id);
                          }}
                          className="text-white hover:text-indigo-300 transition-colors"
                        >
                          {playingVideo === video.id ? <FaPause size={18} /> : <FaPlay size={18} />}
                        </button>
                        
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setMuted(!muted);
                            }}
                            className="text-white hover:text-indigo-300 transition-colors"
                          >
                            {muted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
                          </button>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(video.id);
                            }}
                            className="text-white hover:text-indigo-300 transition-colors"
                          >
                            {likedVideos.includes(video.id) ? 
                              <FaHeart size={16} className="text-red-500" /> : 
                              <FaRegHeart size={16} />
                            }
                          </button>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFullscreen(video.id);
                            }}
                            className="text-white hover:text-indigo-300 transition-colors"
                          >
                            <FaExpand size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
                        <div className="bg-indigo-500 h-1 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {playingVideo !== video.id && hoveredVideo !== video.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <FaPlay className="text-white" size={24} />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{video.title}</h3>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{video.views}</span>
                  <span>{video.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/about">
            <motion.button
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore More Videos
              <FaPlay className="ml-2" size={14} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoGrid;