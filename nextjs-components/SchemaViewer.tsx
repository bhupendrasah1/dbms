// components/SchemaViewer.tsx
import React, { useState } from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { TablesList } from './TablesList';

export const SchemaViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tables' | 'diagram'>('diagram');

  return (
    <div className="schema-viewer-container">
      <style jsx>{`
        .schema-viewer-container {
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 8px;
          margin: 2rem 0;
        }

        .tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #e0e0e0;
        }

        .tab-button {
          padding: 0.75rem 1.5rem;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: #666;
          transition: all 0.3s ease;
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
        }

        .tab-button.active {
          color: #0070f3;
          border-bottom-color: #0070f3;
        }

        .tab-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #0070f3;
          margin-bottom: 1.5rem;
          font-size: 2rem;
        }

        h2 {
          color: #333;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
      `}</style>

      <h1>📊 Social Media Database Schema</h1>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'diagram' ? 'active' : ''}`}
          onClick={() => setActiveTab('diagram')}
        >
          🔗 ER Diagram
        </button>
        <button
          className={`tab-button ${activeTab === 'tables' ? 'active' : ''}`}
          onClick={() => setActiveTab('tables')}
        >
          📋 Tables & Columns
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'diagram' && (
          <div>
            <h2>Entity-Relationship Diagram</h2>
            <MermaidDiagram />
          </div>
        )}

        {activeTab === 'tables' && (
          <div>
            <h2>Database Tables</h2>
            <TablesList />
          </div>
        )}
      </div>
    </div>
  );
};
