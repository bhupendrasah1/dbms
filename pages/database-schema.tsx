import React from 'next/router'
import Head from 'next/head'
import { SchemaViewer } from '@/components/SchemaViewer'

export default function DatabaseSchemaPage() {
  return (
    <>
      <Head>
        <title>Database Schema | Social Media Database Project</title>
        <meta
          name="description"
          content="Visual ER diagram and detailed database schema documentation"
        />
      </Head>

      <main className="schema-page">
        <nav className="navbar">
          <div className="nav-content">
            <h1>📱 Social Media DB</h1>
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/database-schema" className="active">Database Schema</a></li>
            </ul>
          </div>
        </nav>

        <SchemaViewer />

        <footer className="footer">
          <p>&copy; 2024 Social Media Database Project. All rights reserved.</p>
        </footer>

        <style jsx>{`
          .schema-page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: #f5f5f5;
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

          .nav-links a:hover,
          .nav-links a.active {
            opacity: 0.7;
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
          }
        `}</style>
      </main>
    </>
  )
}
