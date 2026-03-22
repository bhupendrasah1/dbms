// components/MermaidDiagram.tsx
import React, { useEffect } from 'react';

export const MermaidDiagram: React.FC = () => {
  useEffect(() => {
    // Load mermaid library if not already loaded
    if (typeof window !== 'undefined' && !window.mermaid) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
      script.async = true;
      script.onload = () => {
        window.mermaid.contentLoaded();
      };
      document.body.appendChild(script);
    } else if (window.mermaid) {
      window.mermaid.contentLoaded();
    }
  }, []);

  return (
    <div className="mermaid-container">
      <style jsx>{`
        .mermaid-container {
          display: flex;
          justify-content: center;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          overflow-x: auto;
        }

        .mermaid {
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .mermaid-container {
            overflow-x: scroll;
          }
        }
      `}</style>

      <div className="mermaid">
        {`
erDiagram
    USERS ||--o{ POST : creates
    USERS ||--o{ COMMENTS : writes
    USERS ||--o{ POST_LIKES : gives
    USERS ||--o{ COMMENT_LIKES : gives
    USERS ||--o{ FOLLOWS : has_followers
    USERS ||--o{ FOLLOWS : follows
    USERS ||--o{ HASHTAG_FOLLOW : follows
    USERS ||--o{ BOOKMARKS : bookmarks
    USERS ||--o{ LOGIN : logs_in
    POST ||--o{ PHOTOS : contains
    POST ||--o{ VIDEOS : contains
    POST ||--o{ COMMENTS : receives
    POST ||--o{ POST_LIKES : receives
    POST ||--o{ POST_TAGS : uses
    POST ||--o{ BOOKMARKS : bookmarked_by
    COMMENTS ||--o{ COMMENT_LIKES : receives
    HASHTAGS ||--o{ HASHTAG_FOLLOW : followed_by
    HASHTAGS ||--o{ POST_TAGS : tags

    USERS {
        int user_id PK
        string username UK
        string email
        string profile_photo_url
        string bio
        timestamp created_at
    }

    POST {
        int post_id PK
        int user_id FK
        int photo_id FK
        int video_id FK
        string caption
        string location
        timestamp created_at
    }

    PHOTOS {
        int photo_id PK
        string photo_url UK
        int post_id FK
        float size
        timestamp created_at
    }

    VIDEOS {
        int video_id PK
        string video_url UK
        int post_id FK
        float size
        timestamp created_at
    }

    COMMENTS {
        int comment_id PK
        string comment_text
        int post_id FK
        int user_id FK
        timestamp created_at
    }

    POST_LIKES {
        int user_id FK
        int post_id FK
        timestamp created_at
    }

    COMMENT_LIKES {
        int user_id FK
        int comment_id FK
        timestamp created_at
    }

    FOLLOWS {
        int follower_id FK
        int followee_id FK
        timestamp created_at
    }

    HASHTAGS {
        int hashtag_id PK
        string hashtag_name UK
        timestamp created_at
    }

    HASHTAG_FOLLOW {
        int user_id FK
        int hashtag_id FK
        timestamp created_at
    }

    POST_TAGS {
        int post_id FK
        int hashtag_id FK
    }

    BOOKMARKS {
        int post_id FK
        int user_id FK
        timestamp created_at
    }

    LOGIN {
        int login_id PK
        int user_id FK
        string ip
        timestamp login_time
    }
        `}
      </div>
    </div>
  );
};

declare global {
  interface Window {
    mermaid: any;
  }
}
