-- =====================================================
-- SOCIAL MEDIA DATABASE - PostgreSQL VERSION (Neon)
-- =====================================================
-- All errors fixed for Neon DB (PostgreSQL)
-- Copy this entire script into Neon SQL Editor and run

-- Drop existing tables if any (optional, comment out first time)
-- DROP TABLE IF EXISTS login CASCADE;
-- DROP TABLE IF EXISTS bookmarks CASCADE;
-- DROP TABLE IF EXISTS post_tags CASCADE;
-- DROP TABLE IF EXISTS hashtag_follow CASCADE;
-- DROP TABLE IF EXISTS hashtags CASCADE;
-- DROP TABLE IF EXISTS follows CASCADE;
-- DROP TABLE IF EXISTS comment_likes CASCADE;
-- DROP TABLE IF EXISTS post_likes CASCADE;
-- DROP TABLE IF EXISTS comments CASCADE;
-- DROP TABLE IF EXISTS videos CASCADE;
-- DROP TABLE IF EXISTS photos CASCADE;
-- DROP TABLE IF EXISTS post CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- ===== USERS TABLE =====
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    profile_photo_url VARCHAR(255) DEFAULT 'https://picsum.photos/100',
    bio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== PHOTOS TABLE =====
CREATE TABLE photos (
    photo_id SERIAL PRIMARY KEY,
    photo_url VARCHAR(255) NOT NULL UNIQUE,
    post_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    size FLOAT CHECK (size < 5)
);

-- ===== VIDEOS TABLE =====
CREATE TABLE videos (
    video_id SERIAL PRIMARY KEY,
    video_url VARCHAR(255) NOT NULL UNIQUE,
    post_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    size FLOAT CHECK (size < 10)
);

-- ===== POST TABLE =====
CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    photo_id INTEGER,
    video_id INTEGER,
    caption VARCHAR(200),
    location VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(photo_id) REFERENCES photos(photo_id) ON DELETE SET NULL,
    FOREIGN KEY(video_id) REFERENCES videos(video_id) ON DELETE SET NULL
);

-- ===== ADD FOREIGN KEYS TO PHOTOS & VIDEOS =====
ALTER TABLE photos 
ADD CONSTRAINT fk_photos_post 
FOREIGN KEY(post_id) REFERENCES post(post_id) ON DELETE CASCADE;

ALTER TABLE videos 
ADD CONSTRAINT fk_videos_post 
FOREIGN KEY(post_id) REFERENCES post(post_id) ON DELETE CASCADE;

-- ===== COMMENTS TABLE =====
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    comment_text VARCHAR(255) NOT NULL,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(post_id) REFERENCES post(post_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ===== POST_LIKES TABLE =====
CREATE TABLE post_likes (
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(post_id) REFERENCES post(post_id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, post_id)
);

-- ===== COMMENT_LIKES TABLE =====
CREATE TABLE comment_likes (
    user_id INTEGER NOT NULL,
    comment_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, comment_id)
);

-- ===== FOLLOWS TABLE =====
CREATE TABLE follows (
    follower_id INTEGER NOT NULL,
    followee_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(follower_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(followee_id) REFERENCES users(user_id) ON DELETE CASCADE,
    PRIMARY KEY(follower_id, followee_id),
    CHECK(follower_id != followee_id)
);

-- ===== HASHTAGS TABLE =====
CREATE TABLE hashtags (
    hashtag_id SERIAL PRIMARY KEY,
    hashtag_name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== HASHTAG_FOLLOW TABLE =====
CREATE TABLE hashtag_follow (
    user_id INTEGER NOT NULL,
    hashtag_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(hashtag_id) REFERENCES hashtags(hashtag_id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, hashtag_id)
);

-- ===== POST_TAGS TABLE =====
CREATE TABLE post_tags (
    post_id INTEGER NOT NULL,
    hashtag_id INTEGER NOT NULL,
    FOREIGN KEY(post_id) REFERENCES post(post_id) ON DELETE CASCADE,
    FOREIGN KEY(hashtag_id) REFERENCES hashtags(hashtag_id) ON DELETE CASCADE,
    PRIMARY KEY(post_id, hashtag_id)
);

-- ===== BOOKMARKS TABLE =====
CREATE TABLE bookmarks (
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(post_id) REFERENCES post(post_id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, post_id)
);

-- ===== LOGIN TABLE =====
CREATE TABLE login (
    login_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    ip VARCHAR(50) NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =====================================================
-- INDEXES FOR BETTER PERFORMANCE
-- =====================================================
CREATE INDEX idx_post_user_id ON post(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_post_likes_user_id ON post_likes(user_id);
CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_followee ON follows(followee_id);
CREATE INDEX idx_login_user_id ON login(user_id);

-- =====================================================
-- SAMPLE DATA (OPTIONAL - Uncomment to populate)
-- =====================================================

-- Insert sample users
INSERT INTO users (username, email, bio) VALUES
('john_doe', 'john@example.com', 'Photography enthusiast 📸'),
('jane_smith', 'jane@example.com', 'Travel blogger ✈️'),
('mike_wilson', 'mike@example.com', 'Tech lover 💻'),
('sarah_jones', 'sarah@example.com', 'Fitness coach 💪'),
('alex_kumar', 'alex@example.com', 'Food blogger 🍕');

-- Insert sample hashtags
INSERT INTO hashtags (hashtag_name) VALUES
('#photography'),
('#travel'),
('#technology'),
('#fitness'),
('#lifestyle'),
('#food'),
('#motivation'),
('#trending');

-- Verify tables are created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
