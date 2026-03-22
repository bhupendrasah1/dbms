import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { SchemaViewer } from '@/components/SchemaViewer'

interface Feature {
  id: string
  icon: string
  title: string
  summary: string
  description: string
  details: string[]
  examples?: string[]
}

const FEATURES: Feature[] = [
  {
    id: 'tables',
    icon: '📊',
    title: '13 Tables',
    summary: 'Users, Posts, Comments, Likes, Follows, Hashtags, and more',
    description: 'A complete set of interconnected database tables designed to support all core social media functionality.',
    details: [
      'Users - Store user profiles and authentication data',
      'Post - Main content table for user posts',
      'Photos & Videos - Media attachment tables with size constraints',
      'Comments - User comments on posts with hierarchical support',
      'Post Likes & Comment Likes - Track engagement metrics',
      'Follows - Manage user-to-user relationships',
      'Hashtags & Hashtag Follow - Tag system with trending support',
      'Post Tags - Many-to-many relationship between posts and hashtags',
      'Bookmarks - User bookmark collections',
      'Login - Session management and authentication logs',
    ],
    examples: [
      'posts can have multiple photos or videos',
      'comments can be nested with replies',
      'users can follow hashtags for personalized feeds',
    ]
  },
  {
    id: 'relational',
    icon: '🔗',
    title: 'Relational Design',
    summary: 'Properly normalized schema with foreign keys and constraints',
    description: 'Enterprise-grade relational database design following ACID principles and normalization best practices.',
    details: [
      'Third Normal Form (3NF) normalization ensures data integrity',
      'Foreign key constraints prevent orphaned records',
      'Cascading deletes maintain referential integrity',
      'Primary keys ensure unique entity identification',
      'Unique constraints prevent duplicate critical data',
      'NOT NULL constraints enforce required fields',
      'DEFAULT values provide sensible defaults for timestamps',
      'CHECK constraints validate data ranges',
    ],
    examples: [
      'deleting a user automatically removes their posts, comments, and likes',
      'post_likes references both users and posts with cascading deletes',
      'hashtag_follow creates a many-to-many relationship with cascading deletes',
    ]
  },
  {
    id: 'media',
    icon: '📸',
    title: 'Media Support',
    summary: 'Handles photos and videos with size constraints',
    description: 'Robust media handling system with built-in storage constraints and metadata tracking.',
    details: [
      'Photos table stores image references with URLs',
      'Videos table manages video content with duration tracking',
      'File size constraints prevent storage abuse (5MB for photos, 100MB for videos)',
      'Timestamp tracking for upload times',
      'Associated with parent posts for content organization',
      'Metadata includes file URLs and dimensions',
      'Cascading deletion when posts are removed',
      'Support for multiple media items per post',
    ],
    examples: [
      'a user can upload a post with 10 photos and 5 videos simultaneously',
      'photos limited to 5,242,880 bytes (~5MB) per file',
      'videos limited to 104,857,600 bytes (~100MB) per file',
    ]
  },
  {
    id: 'engagement',
    icon: '💬',
    title: 'User Engagement',
    summary: 'Tracks likes, comments, follows, bookmarks, and more',
    description: 'Complete engagement tracking system to measure user interactions and content popularity.',
    details: [
      'Post Likes - Track which users liked which posts',
      'Comment Likes - Support likes on individual comments',
      'Comments - Allow threaded discussions on posts',
      'Follows - Build social networks between users',
      'Bookmarks - Let users save posts for later',
      'Follower counts and engagement metrics',
      'Timestamps for all interactions',
      'Unique constraints prevent duplicate engagements',
    ],
    examples: [
      'one user can like one post only (unique constraint)',
      'posts can have unlimited comments from different users',
      'follow relationships are symmetric or follow directed graphs',
    ]
  },
  {
    id: 'hashtags',
    icon: '🏷️',
    title: 'Hashtags & Tags',
    summary: 'Complete tagging system with hashtag following',
    description: 'Powerful tagging infrastructure for content discovery and personalized feed generation.',
    details: [
      'Hashtags table stores all unique hashtags',
      'Post Tags - Many-to-many relationship between posts and hashtags',
      'Hashtag Follow - Users can follow specific hashtags for curated feeds',
      'Hashtag counter tracking for trending analysis',
      'Cascading deletes maintain referential integrity',
      'Efficient querying for trending hashtags',
      'Support for search and discovery features',
      'Flexible tagging for categorization',
    ],
    examples: [
      '#programming hashtag can be followed by thousands of users',
      'one post can have multiple hashtags (#javascript, #web, #coding)',
      'trending hashtags calculated from post_tag counts',
    ]
  },
  {
    id: 'analytics',
    icon: '📈',
    title: 'Analytics Ready',
    summary: '13+ built-in queries for engagement metrics',
    description: 'Pre-built SQL queries for extracting actionable business intelligence and user insights.',
    details: [
      'User engagement metrics - followers, posts, interactions',
      'Content performance - likes, comments, shares per post',
      'Trending analysis - top hashtags, viral posts',
      'User growth tracking - new users per day/week/month',
      'Engagement rate calculations',
      'Content categorization by hashtags',
      'Time-based analytics - peak activity hours',
      'Retention and churn analysis',
      'Network analysis - follow graph statistics',
      'Content recommendation data',
      'Bot detection patterns',
      'Spam detection indicators',
      'User influence scoring',
    ],
    examples: [
      'top 10 posts by like count in last 7 days',
      'most followed users and their follower growth',
      'trending hashtags by post frequency',
    ]
  },
]

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)

  return (
    <>
      <Head>
        <title>Social Media Database Project</title>
        <meta name="description" content="Complete Social Media Database with Schema and Documentation" />
      </Head>

      <main className="home-container">
        <nav className="navbar">
          <div className="nav-content">
            <h1>📱 Social Media DB</h1>
            <ul className="nav-links">
              <li><Link href="/">Home</Link></li>
            </ul>
          </div>
        </nav>

        <div className="hero">
          <div className="hero-content">
            <h1>Social Media Database Project</h1>
            <p>A comprehensive relational database designed for social media platforms with 13 interconnected tables</p>
            <div className="hero-buttons">
              <a href="#schema" className="btn btn-primary">
                View Schema & Tables
              </a>
            </div>
          </div>
        </div>

        <section className="features">
          <h2>Key Features</h2>
          <div className="features-grid">
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="feature-card"
                onClick={() => setSelectedFeature(feature)}
              >
                <h3>{feature.icon} {feature.title}</h3>
                <p>{feature.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {selectedFeature && (
          <div className="modal-overlay" onClick={() => setSelectedFeature(null)}>
            <div className="feature-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-btn"
                onClick={() => setSelectedFeature(null)}
              >
                ✕
              </button>
              <div className="modal-header">
                <h2>{selectedFeature.icon} {selectedFeature.title}</h2>
                <p className="modal-subtitle">{selectedFeature.description}</p>
              </div>
              <div className="modal-content">
                <div className="details-section">
                  <h3>Key Details</h3>
                  <ul className="details-list">
                    {selectedFeature.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
                {selectedFeature.examples && (
                  <div className="examples-section">
                    <h3>Real-World Examples</h3>
                    <ul className="examples-list">
                      {selectedFeature.examples.map((example, idx) => (
                        <li key={idx}>
                          <span className="example-icon">→</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <section className="schema-section" id="schema">
          <SchemaViewer />
        </section>

        <footer className="footer">
          <p>&copy; 2024 Social Media Database Project. Built with Next.js</p>
        </footer>

        <style jsx>{`
          .home-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .navbar {
            background: linear-gradient(135deg, #0070f3, #0051d5);
            color: white;
            padding: 1rem 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 100;
          }

          .nav-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .nav-content h1 {
            margin: 0;
            font-size: 1.5rem;
          }

          .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
          }

          .nav-links a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0.3s;
          }

          .nav-links a:hover {
            opacity: 0.8;
          }

          .hero {
            background: linear-gradient(135deg, #0070f3, #0051d5);
            color: white;
            padding: 4rem 2rem;
            text-align: center;
            flex-grow: 1;
          }

          .hero-content h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
          }

          .hero-content p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.95;
          }

          .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
          }

          .btn {
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s;
            border: 2px solid white;
          }

          .btn-primary {
            background: white;
            color: #0070f3;
          }

          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }

          .btn-secondary {
            background: transparent;
            color: white;
          }

          .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          .features {
            max-width: 1200px;
            margin: 4rem auto;
            padding: 0 2rem;
            width: 100%;
          }

          .features h2 {
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 3rem;
            color: #333;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
          }

          .feature-card {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s;
            cursor: pointer;
            border: 2px solid transparent;
          }

          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            border-color: #0070f3;
          }

          .feature-card h3 {
            color: #0070f3;
            margin-bottom: 1rem;
            font-size: 1.3rem;
          }

          .feature-card p {
            color: #666;
            line-height: 1.6;
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 2rem;
            animation: fadeIn 0.3s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .feature-modal {
            background: white;
            border-radius: 12px;
            max-width: 700px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease-out;
            position: relative;
          }

          @keyframes slideUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: #f5f5f5;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            z-index: 10;
          }

          .close-btn:hover {
            background: #e0e0e0;
            transform: rotate(90deg);
          }

          .modal-header {
            background: linear-gradient(135deg, #0070f3, #0051d5);
            color: white;
            padding: 2rem;
            border-radius: 12px 12px 0 0;
          }

          .modal-header h2 {
            margin: 0 0 1rem 0;
            font-size: 2rem;
          }

          .modal-subtitle {
            margin: 0;
            font-size: 1rem;
            opacity: 0.95;
            line-height: 1.6;
          }

          .modal-content {
            padding: 2rem;
          }

          .details-section {
            margin-bottom: 2rem;
          }

          .details-section h3 {
            color: #0070f3;
            font-size: 1.3rem;
            margin-bottom: 1rem;
            margin-top: 0;
          }

          .details-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .details-list li {
            padding: 0.8rem 0;
            padding-left: 1.5rem;
            color: #555;
            line-height: 1.6;
            border-left: 3px solid #0070f3;
            padding-left: 1rem;
            margin-left: 0.5rem;
            position: relative;
          }

          .details-list li::before {
            content: '✓';
            position: absolute;
            left: -0.8rem;
            color: #0070f3;
            font-weight: bold;
          }

          .examples-section {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            border-left: 4px solid #00d968;
          }

          .examples-section h3 {
            color: #00d968;
            font-size: 1.2rem;
            margin: 0 0 1rem 0;
            margin-top: 0;
          }

          .examples-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .examples-list li {
            padding: 0.8rem 0;
            color: #555;
            line-height: 1.6;
            display: flex;
            align-items: flex-start;
            gap: 0.8rem;
          }

          .example-icon {
            color: #00d968;
            font-weight: bold;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .schema-section {
            background: #f5f5f5;
            padding: 3rem 2rem;
            margin: 0;
            flex-grow: 1;
          }

          .footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 2rem;
            margin-top: auto;
          }

          @media (max-width: 768px) {
            .nav-content {
              flex-direction: column;
              gap: 1rem;
            }

            .hero-content h1 {
              font-size: 2rem;
            }

            .hero-buttons {
              flex-direction: column;
            }

            .btn {
              width: 100%;
            }
          }
        `}</style>
      </main>
    </>
  )
}
