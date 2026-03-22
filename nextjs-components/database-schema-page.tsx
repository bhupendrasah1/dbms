// pages/database-schema.tsx (or app/database-schema/page.tsx for App Router)
import React from 'react';
import Head from 'next/head';
import { SchemaViewer } from '@/components/SchemaViewer';

export default function DatabaseSchemaPage() {
  return (
    <>
      <Head>
        <title>Social Media Database Schema | Your Website</title>
        <meta
          name="description"
          content="Visual ER diagram and detailed database schema documentation for the Social Media platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="page-container">
        <div className="nav-bar">
          <div className="nav-content">
            <h1 className="logo">📱 Social Media Platform</h1>
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/database-schema" className="active">
                Database Schema
              </a>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="hero">
            <h1>Database Schema Documentation</h1>
            <p>
              Explore the complete database structure for our social media platform, including 13 tables
              with all relationships, constraints, and data types.
            </p>
          </div>

          <SchemaViewer />

          <section className="info-section">
            <h2>📌 Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>13 Tables</h3>
                <p>Comprehensive database with users, posts, comments, likes, follows, and more</p>
              </div>
              <div className="feature-card">
                <h3>Relational Design</h3>
                <p>Normalized schema with proper foreign keys and relationships</p>
              </div>
              <div className="feature-card">
                <h3>Media Support</h3>
                <p>Handles photos and videos with size constraints</p>
              </div>
              <div className="feature-card">
                <h3>User Engagement</h3>
                <p>Tracks likes, comments, follows, bookmarks, and hashtags</p>
              </div>
            </div>
          </section>

          <section className="queries-section">
            <h2>📊 Sample Analytics Queries</h2>
            <div className="query-list">
              <div className="query-item">
                <h4>Most Followed Hashtags</h4>
                <p>Track trending topics by hashtag follow count</p>
              </div>
              <div className="query-item">
                <h4>Most Liked Posts</h4>
                <p>Identify top-performing content</p>
              </div>
              <div className="query-item">
                <h4>User Engagement Metrics</h4>
                <p>Calculate posts per user, comment rates, and activity levels</p>
              </div>
              <div className="query-item">
                <h4>Bot Detection</h4>
                <p>Identify suspicious user behavior patterns</p>
              </div>
            </div>
          </section>
        </div>

        <footer className="footer">
          <p>&copy; 2024 Social Media Database Project. All rights reserved.</p>
        </footer>

        <style jsx>{`
          .page-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: #fff;
          }

          .nav-bar {
            background: linear-gradient(135deg, #0070f3, #0051d5);
            color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 100;
          }

          .nav-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
          }

          .nav-links {
            display: flex;
            gap: 2rem;
          }

          .nav-links a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0.3s ease;
          }

          .nav-links a:hover,
          .nav-links a.active {
            opacity: 0.7;
          }

          .content {
            flex: 1;
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 2rem;
            width: 100%;
          }

          .hero {
            text-align: center;
            margin-bottom: 3rem;
          }

          .hero h1 {
            font-size: 2.5rem;
            color: #0070f3;
            margin-bottom: 1rem;
          }

          .hero p {
            font-size: 1.1rem;
            color: #666;
            line-height: 1.6;
          }

          .info-section {
            margin-top: 4rem;
          }

          .info-section h2 {
            font-size: 2rem;
            color: #333;
            margin-bottom: 2rem;
            text-align: center;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
          }

          .feature-card {
            background: linear-gradient(135deg, #f5f7fb, #ffffff);
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s ease;
          }

          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 112, 243, 0.1);
          }

          .feature-card h3 {
            color: #0070f3;
            margin-bottom: 0.5rem;
          }

          .feature-card p {
            color: #666;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          .queries-section {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 8px;
            margin-top: 3rem;
          }

          .queries-section h2 {
            color: #333;
            margin-bottom: 1.5rem;
          }

          .query-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }

          .query-item {
            background: white;
            padding: 1.5rem;
            border-radius: 6px;
            border-left: 4px solid #0070f3;
          }

          .query-item h4 {
            color: #0070f3;
            margin-bottom: 0.5rem;
          }

          .query-item p {
            color: #666;
            font-size: 0.9rem;
            margin: 0;
          }

          .footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 2rem;
            margin-top: auto;
          }

          .footer p {
            margin: 0;
          }

          @media (max-width: 768px) {
            .nav-content {
              flex-direction: column;
              gap: 1rem;
            }

            .nav-links {
              gap: 1rem;
            }

            .hero h1 {
              font-size: 1.75rem;
            }

            .content {
              padding: 1.5rem;
            }
          }
        `}</style>
      </main>
    </>
  );
}
