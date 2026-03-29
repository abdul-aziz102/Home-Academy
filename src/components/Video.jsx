import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const videos = [
  {
    id: 1,
    src: '/1stvideo.mp4',
    title: '25 Years of Excellence – Event Highlights',
    views: '1.2K views',
    date: '2 weeks ago',
    thumbnail: '/video1-thumb.jpg',
    tag: 'EVENT',
    tagColor: '#3b82f6',
  },
  {
    id: 2,
    src: '/2nd.mp4',
    title: 'Meet One of Our Youngest Achievers',
    views: '856 views',
    date: '1 month ago',
    thumbnail: '/video2-thumb.jpg',
    tag: 'STUDENT',
    tagColor: '#10b981',
  },
  {
    id: 3,
    src: '/3rd.mp4',
    title: 'Abdullah Masood – Student Success Story',
    views: '2.4K views',
    date: '3 months ago',
    thumbnail: '/video3-thumb.jpg',
    tag: 'SUCCESS',
    tagColor: '#f59e0b',
  },
];

/* ── Icon components (no react-icons dependency) ── */
const IconPlay     = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const IconPause    = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;
const IconMute     = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>;
const IconVolume   = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
const IconHeart    = ({ size = 16, filled = false, color = 'currentColor' }) => filled
  ? <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  : <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const IconExpand   = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>;
const IconEye      = ({ size = 13 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconClock    = ({ size = 13 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

const VideoGrid = () => {
  const [hoveredVideo, setHoveredVideo]   = useState(null);
  const [playingVideo, setPlayingVideo]   = useState(null);
  const [muted,        setMuted]          = useState(true);
  const [likedVideos,  setLikedVideos]    = useState([]);
  const videoRefs = useRef({});

  const togglePlay = (id) => {
    if (playingVideo === id) {
      videoRefs.current[id]?.pause();
      setPlayingVideo(null);
    } else {
      if (playingVideo) videoRefs.current[playingVideo]?.pause();
      videoRefs.current[id]?.play();
      setPlayingVideo(id);
    }
  };

  const toggleLike = (id) =>
    setLikedVideos(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );

  const toggleFullscreen = (id) => {
    const el = videoRefs.current[id];
    if (!el) return;
    (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        /* ── SECTION ── */
        .ha-vg {
          font-family: 'Outfit', sans-serif;
          background: #060d22;
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
        }
        .ha-vg::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 600px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,.3), transparent);
        }
        .ha-vg::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(99,179,237,.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .ha-vg-glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 360px;
          background: radial-gradient(ellipse, rgba(139,92,246,.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .ha-vg-inner {
          max-width: 1200px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── HEADING ── */
        .ha-vg-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 14px;
        }
        .ha-vg-eline { width: 44px; height: 1px; background: linear-gradient(90deg, transparent, #8b5cf6); flex-shrink: 0; }
        .ha-vg-eline.r { background: linear-gradient(90deg, #8b5cf6, transparent); }
        .ha-vg-elabel { font-size: .65rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #8b5cf6; }

        .ha-vg-h2 {
          font-size: clamp(1.9rem, 3.8vw, 3rem); font-weight: 900;
          letter-spacing: -.03em; color: #f1f5f9;
          text-align: center; margin: 0 0 12px; line-height: 1.1;
        }
        .ha-vg-h2 span {
          background: linear-gradient(135deg, #a78bfa, #8b5cf6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ha-vg-sub {
          text-align: center; color: rgba(148,163,184,.6);
          font-size: .96rem; margin: 0 auto 52px; max-width: 460px; line-height: 1.6;
        }

        /* ── GRID ── */
        .ha-vg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) { .ha-vg-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .ha-vg-grid { grid-template-columns: 1fr; } }

        /* ── CARD ── */
        .ha-vg-card {
          background: rgba(13,20,45,.92);
          border: 1px solid rgba(99,179,237,.1);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color .32s, box-shadow .32s;
          cursor: pointer;
        }
        .ha-vg-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), 0 20px 52px rgba(0,0,0,.45);
        }

        /* video wrapper */
        .ha-vg-vid-wrap {
          position: relative;
          overflow: hidden;
          background: #000;
        }
        .ha-vg-video {
          width: 100%; height: 210px;
          object-fit: cover; display: block;
          transition: transform .4s ease;
        }
        .ha-vg-card:hover .ha-vg-video { transform: scale(1.03); }

        /* tag badge */
        .ha-vg-tag {
          position: absolute; top: 12px; left: 12px;
          font-size: .55rem; font-weight: 700; letter-spacing: .14em;
          padding: 3px 9px; border-radius: 100px;
          border: 1px solid; backdrop-filter: blur(8px);
          background: rgba(6,13,34,.6);
        }

        /* center play button */
        .ha-vg-play-center {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          transition: opacity .25s;
        }
        .ha-vg-play-circle {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(255,255,255,.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,.25);
          display: flex; align-items: center; justify-content: center;
          color: white;
          transition: background .25s, transform .25s;
        }
        .ha-vg-card:hover .ha-vg-play-circle {
          background: rgba(255,255,255,.22);
          transform: scale(1.1);
        }

        /* controls overlay */
        .ha-vg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 50%);
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 12px;
        }
        .ha-vg-controls {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 8px;
        }
        .ha-vg-ctrl-btn {
          background: transparent; border: none; cursor: pointer;
          color: rgba(255,255,255,.85); padding: 4px;
          transition: color .2s, transform .2s;
          display: flex; align-items: center;
        }
        .ha-vg-ctrl-btn:hover { color: white; transform: scale(1.15); }
        .ha-vg-ctrl-right { display: flex; align-items: center; gap: 10px; }

        /* progress bar */
        .ha-vg-progress-bg {
          width: 100%; height: 3px;
          background: rgba(255,255,255,.2); border-radius: 3px; overflow: hidden;
        }
        .ha-vg-progress-fill {
          height: 100%; border-radius: 3px;
          background: var(--accent);
          box-shadow: 0 0 6px var(--accent);
          width: 0%;
          transition: width .5s ease;
        }

        /* card body */
        .ha-vg-body { padding: 16px 18px 18px; }
        .ha-vg-title {
          font-size: .92rem; font-weight: 700; color: #e2e8f0;
          letter-spacing: -.01em; line-height: 1.4; margin: 0 0 10px;
        }
        .ha-vg-meta {
          display: flex; align-items: center; justify-content: space-between;
        }
        .ha-vg-meta-item {
          display: flex; align-items: center; gap: 5px;
          font-size: .72rem; color: rgba(148,163,184,.5); font-weight: 500;
        }

        /* ── CTA button ── */
        .ha-vg-cta {
          display: flex; justify-content: center; margin-top: 48px;
        }
        .ha-vg-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 32px;
          font-family: 'Outfit', sans-serif; font-size: .9rem; font-weight: 700;
          color: white; text-decoration: none;
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
          border: none; border-radius: 12px; cursor: pointer;
          box-shadow: 0 4px 20px rgba(139,92,246,.35);
          transition: all .28s ease; letter-spacing: .02em;
          position: relative; overflow: hidden;
        }
        .ha-vg-cta-btn::before {
          content: ''; position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent);
          transition: left .5s;
        }
        .ha-vg-cta-btn:hover::before { left: 100%; }
        .ha-vg-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(139,92,246,.45); }

        @media (max-width: 640px) { .ha-vg { padding: 64px 16px; } }
      `}</style>

      <section className="ha-vg">
        <div className="ha-vg-glow" />
        <div className="ha-vg-inner">

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="ha-vg-eyebrow">
              <span className="ha-vg-eline" />
              <span className="ha-vg-elabel">WATCH & LEARN</span>
              <span className="ha-vg-eline r" />
            </div>
            <h2 className="ha-vg-h2">Featured <span>Videos</span></h2>
            <p className="ha-vg-sub">Explore our success stories, events, and student achievements</p>
          </motion.div>

          {/* Grid */}
          <div className="ha-vg-grid">
            {videos.map((video, i) => {
              const isPlaying = playingVideo === video.id;
              const isHovered = hoveredVideo === video.id;
              const isLiked   = likedVideos.includes(video.id);

              return (
                <motion.div
                  key={video.id}
                  className="ha-vg-card"
                  style={{ "--accent": video.tagColor }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  {/* Video */}
                  <div className="ha-vg-vid-wrap">
                    <video
                      ref={el => videoRefs.current[video.id] = el}
                      className="ha-vg-video"
                      poster={video.thumbnail}
                      muted={muted}
                      loop
                      onClick={() => togglePlay(video.id)}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>

                    {/* Tag */}
                    <div className="ha-vg-tag" style={{ color: video.tagColor, borderColor: `${video.tagColor}40` }}>
                      {video.tag}
                    </div>

                    {/* Center play — when idle */}
                    {!isPlaying && !isHovered && (
                      <div className="ha-vg-play-center">
                        <div className="ha-vg-play-circle">
                          <IconPlay size={20} />
                        </div>
                      </div>
                    )}

                    {/* Controls overlay — on hover or playing */}
                    {(isHovered || isPlaying) && (
                      <motion.div
                        className="ha-vg-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="ha-vg-controls">
                          {/* Play/Pause */}
                          <button className="ha-vg-ctrl-btn" onClick={(e) => { e.stopPropagation(); togglePlay(video.id); }}>
                            {isPlaying ? <IconPause size={18} /> : <IconPlay size={18} />}
                          </button>

                          <div className="ha-vg-ctrl-right">
                            {/* Mute */}
                            <button className="ha-vg-ctrl-btn" onClick={(e) => { e.stopPropagation(); setMuted(m => !m); }}>
                              {muted ? <IconMute size={15} /> : <IconVolume size={15} />}
                            </button>
                            {/* Like */}
                            <button className="ha-vg-ctrl-btn" onClick={(e) => { e.stopPropagation(); toggleLike(video.id); }}>
                              <IconHeart size={15} filled={isLiked} color={isLiked ? "#f43f5e" : "currentColor"} />
                            </button>
                            {/* Fullscreen */}
                            <button className="ha-vg-ctrl-btn" onClick={(e) => { e.stopPropagation(); toggleFullscreen(video.id); }}>
                              <IconExpand size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="ha-vg-progress-bg">
                          <div className="ha-vg-progress-fill" style={{ width: isPlaying ? "35%" : "0%" }} />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="ha-vg-body">
                    <h3 className="ha-vg-title">{video.title}</h3>
                    <div className="ha-vg-meta">
                      <span className="ha-vg-meta-item">
                        <IconEye /> {video.views}
                      </span>
                      <span className="ha-vg-meta-item">
                        <IconClock /> {video.date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            className="ha-vg-cta"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
          >
            <Link to="/about">
              <motion.div className="ha-vg-cta-btn" whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>
                Explore More Videos
                <IconPlay size={13} />
              </motion.div>
            </Link>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default VideoGrid;