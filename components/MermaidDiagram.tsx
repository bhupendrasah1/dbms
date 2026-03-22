// components/MermaidDiagram.tsx
import React, { useEffect, useState, useRef } from 'react';

interface MermaidDiagramProps {
  selectedTable?: string | null;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ selectedTable }) => {
  const [zoom, setZoom] = useState(120);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load mermaid library with configuration
    if (typeof window !== 'undefined' && !window.mermaid) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
      script.async = true;
      script.onload = () => {
        window.mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          logLevel: 'error',
          securityLevel: 'loose',
          ER: {
            diagramMarginX: 50,
            diagramMarginY: 50,
            entityPadding: 20,
            width: '100%',
            height: '100%'
          }
        });
        window.mermaid.contentLoaded();
      };
      document.body.appendChild(script);
    } else if (window.mermaid) {
      window.mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        ER: {
          diagramMarginX: 50,
          diagramMarginY: 50,
          entityPadding: 20,
        }
      });
      window.mermaid.contentLoaded();
    }
  }, []);

  useEffect(() => {
    if (selectedTable) {
      // Highlight the selected table with a glow effect
      const svg = containerRef.current?.querySelector('svg');
      if (svg) {
        // Remove previous highlights
        svg.querySelectorAll('.highlighted-entity').forEach(el => {
          el.classList.remove('highlighted-entity');
          (el as HTMLElement).style.filter = 'none';
        });

        // Find and highlight the table matching the selectedTable name
        const tableNameUpper = selectedTable.toUpperCase();
        const textElements = svg.querySelectorAll('text, tspan');
        
        textElements.forEach(el => {
          if (el.textContent?.trim() === tableNameUpper) {
            // Find parent entity box
            let parent = el.parentElement;
            while (parent && !parent.className.baseVal?.includes('entityBox')) {
              parent = parent.parentElement;
            }
            
            if (parent) {
              parent.classList.add('highlighted-entity');
              (parent as HTMLElement).style.filter = 'drop-shadow(0 0 10px #0070f3) drop-shadow(0 0 20px rgba(0, 112, 243, 0.8))';
            }
          }
        });

        // Auto zoom in slightly when table is selected
        setZoom(150);
      }
    }
  }, [selectedTable]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 600));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="diagram-wrapper">
      <style jsx>{`
        .diagram-wrapper {
          width: 100%;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .diagram-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
          border-bottom: 2px solid #0070f3;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .controls-left {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .control-label {
          font-weight: 600;
          color: #333;
          font-size: 0.95rem;
        }

        .zoom-info {
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid #ddd;
          font-weight: 600;
          color: #0070f3;
          min-width: 70px;
          text-align: center;
        }

        .control-btn {
          padding: 0.6rem 1.2rem;
          background: #ffffff;
          border: 2px solid #0070f3;
          color: #0070f3;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .control-btn:hover {
          background: #0070f3;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 112, 243, 0.3);
        }

        .control-btn:active {
          transform: translateY(0);
        }

        .control-btn.fullscreen {
          background: #0070f3;
          color: white;
        }

        .control-btn.fullscreen:hover {
          background: #0051d5;
        }

        .mermaid-container {
          overflow: auto;
          padding: 3rem;
          background: white;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 600px;
          max-height: 1200px;
          position: relative;
        }

        .mermaid-container.fullscreen {
          min-height: 100vh;
          max-height: none;
        }

        .mermaid-content {
          transform: scale(${zoom / 100});
          transform-origin: top center;
          transition: transform 0.2s ease-out;
          min-width: 100%;
          display: flex;
          justify-content: center;
        }

        .diagram-info {
          padding: 1.5rem;
          background: #f0f7ff;
          border-top: 1px solid #ddd;
          color: #333;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .diagram-info strong {
          color: #0070f3;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .diagram-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .controls-left {
            flex-wrap: wrap;
            justify-content: center;
          }

          .control-btn {
            flex: 1;
            min-width: 60px;
            padding: 0.5rem 0.8rem;
            font-size: 0.9rem;
          }

          .mermaid-container {
            max-height: 800px;
            padding: 1.5rem;
          }
        }

        :global(.mermaid) {
          display: flex;
          justify-content: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: white;
        }

        :global(.entityBox) {
          stroke: #0070f3 !important;
          stroke-width: 3px !important;
          fill: #f0f7ff !important;
        }

        :global(.entityLabel) {
          fill: #0070f3 !important;
          font-weight: 700 !important;
          font-size: 14px !important;
        }

        :global(.relationshipLine) {
          stroke: #00d968 !important;
          stroke-width: 3px !important;
        }

        :global(.relationshipLabel) {
          fill: #00d968 !important;
          font-weight: 600 !important;
          font-size: 12px !important;
        }

        :global(.attributeBoxOdd) {
          stroke: #0070f3 !important;
          stroke-width: 2px !important;
          fill: #ffffff !important;
        }

        :global(.attributeLabel) {
          fill: #0070f3 !important;
          font-weight: 600 !important;
          font-size: 13px !important;
        }

        :global(.pk) {
          fill: #0070f3 !important;
        }

        :global(.fk) {
          fill: #0070f3 !important;
        }
      `}</style>

      <div className="diagram-controls">
        <div className="controls-left">
          <span className="control-label">Zoom Level:</span>
          <button className="control-btn" onClick={handleZoomOut}>−</button>
          <div className="zoom-info">{zoom}%</div>
          <button className="control-btn" onClick={handleZoomIn}>+</button>
          <button className="control-btn" onClick={handleResetZoom}>Reset</button>
        </div>
        <button 
          className="control-btn fullscreen" 
          onClick={toggleFullscreen}
        >
          {isFullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen'}
        </button>
      </div>

      <div 
        className={`mermaid-container ${isFullscreen ? 'fullscreen' : ''}`}
        ref={containerRef}
      >
        <div className="mermaid-content" ref={mermaidRef}>
          <div className="mermaid">
{`erDiagram
    USERS ||--o{ POST : creates
    USERS ||--o{ COMMENTS : writes
    USERS ||--o{ POST_LIKES : gives
    USERS ||--o{ COMMENT_LIKES : gives
    USERS ||--o{ FOLLOWS : "has/is"
    USERS ||--o{ HASHTAG_FOLLOW : follows
    USERS ||--o{ BOOKMARKS : bookmarks
    USERS ||--o{ LOGIN : "logs in"
    POST ||--o{ PHOTOS : contains
    POST ||--o{ VIDEOS : contains
    POST ||--o{ COMMENTS : receives
    POST ||--o{ POST_LIKES : receives
    POST ||--o{ POST_TAGS : uses
    POST ||--o{ BOOKMARKS : "liked by"
    COMMENTS ||--o{ COMMENT_LIKES : receives
    HASHTAGS ||--o{ HASHTAG_FOLLOW : "followed by"
    HASHTAGS ||--o{ POST_TAGS : "tags"

    USERS {
        int user_id PK "Primary Key"
        string username UK "Unique"
        string email "User Email"
        string profile_photo_url "Profile Picture"
        string bio "User Bio"
        timestamp created_at "Registration Date"
    }

    POST {
        int post_id PK "Primary Key"
        int user_id FK "Creator ID"
        string caption "Post Content"
        string location "Location Tag"
        timestamp created_at "Posted Date"
    }

    PHOTOS {
        int photo_id PK "Primary Key"
        int post_id FK "Parent Post"
        string photo_url "Image URL"
        float size "File Size"
        timestamp created_at "Upload Date"
    }

    VIDEOS {
        int video_id PK "Primary Key"
        int post_id FK "Parent Post"
        string video_url "Video URL"
        float size "File Size"
        timestamp created_at "Upload Date"
    }

    COMMENTS {
        int comment_id PK "Primary Key"
        int post_id FK "Post ID"
        int user_id FK "Commenter ID"
        string comment_text "Comment Content"
        timestamp created_at "Comment Date"
    }

    POST_LIKES {
        int post_id FK "Post ID"
        int user_id FK "User ID"
        timestamp created_at "Like Date"
    }

    COMMENT_LIKES {
        int comment_id FK "Comment ID"
        int user_id FK "User ID"
        timestamp created_at "Like Date"
    }

    FOLLOWS {
        int follower_id FK "Follower ID"
        int followee_id FK "Following ID"
        timestamp created_at "Follow Date"
    }

    HASHTAGS {
        int hashtag_id PK "Primary Key"
        string hashtag_name UK "Hashtag Name"
        timestamp created_at "Created Date"
    }

    HASHTAG_FOLLOW {
        int hashtag_id FK "Hashtag ID"
        int user_id FK "User ID"
        timestamp created_at "Follow Date"
    }

    POST_TAGS {
        int post_id FK "Post ID"
        int hashtag_id FK "Hashtag ID"
    }

    BOOKMARKS {
        int post_id FK "Post ID"
        int user_id FK "User ID"
        timestamp created_at "Bookmark Date"
    }

    LOGIN {
        int login_id PK "Primary Key"
        int user_id FK "User ID"
        string ip "IP Address"
        timestamp login_time "Login Time"
    }`}
          </div>
        </div>
      </div>

      <div className="diagram-info">
        <strong>📋 ER Diagram Legend:</strong> 
        <br />• <strong>PK</strong> = Primary Key | <strong>FK</strong> = Foreign Key | <strong>UK</strong> = Unique Key
        <br />• One-to-Many relationships shown with lines connecting tables
        <br />• Use zoom controls to explore different parts of the diagram
        <br />• Fullscreen mode for detailed viewing on large displays
      </div>
    </div>
  );
};

declare global {
  interface Window {
    mermaid: any;
  }
}
