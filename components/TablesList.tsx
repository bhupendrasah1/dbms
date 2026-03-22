// components/TablesList.tsx
import React, { useState } from 'react';

interface Column {
  name: string;
  type: string;
  constraint?: string;
  details?: string;
}

interface Table {
  name: string;
  description: string;
  columns: Column[];
}

const TABLES_DATA: Table[] = [
  {
    name: 'users',
    description: 'Stores user profiles and account information',
    columns: [
      { name: 'user_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'username', type: 'VARCHAR(255)', constraint: 'UNIQUE, NOT NULL', details: 'Unique username per user' },
      { name: 'email', type: 'VARCHAR(255)', constraint: 'NOT NULL', details: 'User email address' },
      { name: 'profile_photo_url', type: 'VARCHAR(255)', constraint: 'DEFAULT', details: 'https://picsum.photos/100' },
      { name: 'bio', type: 'VARCHAR(255)', constraint: 'NULLABLE', details: 'User biography' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'NOW()' },
    ],
  },
  {
    name: 'post',
    description: 'Stores user posts with media and metadata',
    columns: [
      { name: 'post_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'photo_id', type: 'INTEGER', constraint: 'FOREIGN KEY', details: 'References photos table' },
      { name: 'video_id', type: 'INTEGER', constraint: 'FOREIGN KEY', details: 'References videos table' },
      { name: 'user_id', type: 'INTEGER', constraint: 'FOREIGN KEY, NOT NULL', details: 'References users table' },
      { name: 'caption', type: 'VARCHAR(200)', constraint: 'NULLABLE', details: 'Post caption text' },
      { name: 'location', type: 'VARCHAR(50)', constraint: 'NULLABLE', details: 'Post location' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'NOW()' },
    ],
  },
  {
    name: 'photos',
    description: 'Stores photo metadata for posts',
    columns: [
      { name: 'photo_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'photo_url', type: 'VARCHAR(255)', constraint: 'UNIQUE, NOT NULL', details: 'Unique photo URL' },
      { name: 'post_id', type: 'INTEGER', constraint: 'FOREIGN KEY, NOT NULL', details: 'References post table' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'NOW()' },
      { name: 'size', type: 'FLOAT', constraint: 'CHECK(size<5)', details: 'Max 5MB per photo' },
    ],
  },
  {
    name: 'videos',
    description: 'Stores video metadata for posts',
    columns: [
      { name: 'video_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'video_url', type: 'VARCHAR(255)', constraint: 'UNIQUE, NOT NULL', details: 'Unique video URL' },
      { name: 'post_id', type: 'INTEGER', constraint: 'FOREIGN KEY, NOT NULL', details: 'References post table' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'NOW()' },
      { name: 'size', type: 'FLOAT', constraint: 'CHECK(size<10)', details: 'Max 10MB per video' },
    ],
  },
  {
    name: 'comments',
    description: 'Stores comments on posts',
    columns: [
      { name: 'comment_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'comment_text', type: 'VARCHAR(255)', constraint: 'NOT NULL', details: 'Comment content' },
      { name: 'post_id', type: 'INTEGER', constraint: 'FOREIGN KEY, NOT NULL', details: 'References post table' },
      { name: 'user_id', type: 'INTEGER', constraint: 'FOREIGN KEY, NOT NULL', details: 'References users table' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'NOW()' },
    ],
  },
  {
    name: 'post_likes',
    description: 'Tracks likes on posts (junction table)',
    columns: [
      { name: 'user_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users table' },
      { name: 'post_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References post table' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'NOW()' },
    ],
  },
  {
    name: 'comment_likes',
    description: 'Tracks likes on comments (junction table)',
    columns: [
      { name: 'user_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users table' },
      { name: 'comment_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References comments table' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'NOW()' },
    ],
  },
  {
    name: 'follows',
    description: 'Tracks follower relationships between users',
    columns: [
      { name: 'follower_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users (follower)' },
      { name: 'followee_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users (following)' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'NOW()' },
    ],
  },
  {
    name: 'hashtags',
    description: 'Stores available hashtags for tagging posts',
    columns: [
      { name: 'hashtag_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'hashtag_name', type: 'VARCHAR(255)', constraint: 'UNIQUE', details: 'Unique hashtag name' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'NOW()' },
    ],
  },
  {
    name: 'hashtag_follow',
    description: 'Tracks which users follow which hashtags',
    columns: [
      { name: 'user_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users table' },
      { name: 'hashtag_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References hashtags table' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'NOW()' },
    ],
  },
  {
    name: 'post_tags',
    description: 'Associates hashtags with posts (junction table)',
    columns: [
      { name: 'post_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References post table' },
      { name: 'hashtag_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References hashtags table' },
    ],
  },
  {
    name: 'bookmarks',
    description: 'Stores user bookmarked posts (junction table)',
    columns: [
      { name: 'user_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users table' },
      { name: 'post_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References post table' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'NOW()' },
    ],
  },
  {
    name: 'login',
    description: 'Tracks user login history with IP addresses',
    columns: [
      { name: 'login_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'user_id', type: 'INTEGER', constraint: 'FOREIGN KEY, NOT NULL', details: 'References users table' },
      { name: 'ip', type: 'VARCHAR(50)', constraint: 'NOT NULL', details: 'Login IP address' },
      { name: 'login_time', type: 'TIMESTAMP', constraint: 'DEFAULT, NOT NULL', details: 'NOW()' },
    ],
  },
];

// Sample/Mock Data for each table
const SAMPLE_TABLE_DATA: { [key: string]: any[] } = {
  users: [
    { user_id: 1, username: 'john_doe', email: 'john@example.com', profile_photo_url: 'https://picsum.photos/100?random=1', bio: 'Photography enthusiast', created_at: '2024-01-15 10:30:00' },
    { user_id: 2, username: 'jane_smith', email: 'jane@example.com', profile_photo_url: 'https://picsum.photos/100?random=2', bio: 'Travel blogger', created_at: '2024-02-20 14:45:00' },
    { user_id: 3, username: 'mike_wilson', email: 'mike@example.com', profile_photo_url: 'https://picsum.photos/100?random=3', bio: 'Tech lover', created_at: '2024-03-10 09:15:00' },
    { user_id: 4, username: 'sarah_jones', email: 'sarah@example.com', profile_photo_url: 'https://picsum.photos/100?random=4', bio: 'Food critic', created_at: '2024-01-25 16:20:00' },
    { user_id: 5, username: 'alex_brown', email: 'alex@example.com', profile_photo_url: 'https://picsum.photos/100?random=5', bio: 'Fitness coach', created_at: '2024-02-05 11:00:00' },
  ],
  post: [
    { post_id: 1, user_id: 1, photo_id: 1, video_id: null, caption: 'Beautiful sunset at the beach', location: 'Malibu, CA', created_at: '2024-03-20 18:30:00' },
    { post_id: 2, user_id: 2, photo_id: 2, video_id: null, caption: 'Exploring ancient temples', location: 'Bangkok, Thailand', created_at: '2024-03-19 12:15:00' },
    { post_id: 3, user_id: 3, photo_id: null, video_id: 1, caption: 'New tech gadget review', location: null, created_at: '2024-03-18 10:45:00' },
    { post_id: 4, user_id: 4, photo_id: 3, video_id: null, caption: 'Delicious pasta workshop', location: 'Rome, Italy', created_at: '2024-03-17 19:00:00' },
    { post_id: 5, user_id: 5, photo_id: null, video_id: 2, caption: 'Morning workout routine', location: 'Gym', created_at: '2024-03-16 06:30:00' },
  ],
  photos: [
    { photo_id: 1, photo_url: 'https://imgur.com/sunset123.jpg', post_id: 1, size: 2.5, created_at: '2024-03-20 18:30:00' },
    { photo_id: 2, photo_url: 'https://imgur.com/temple456.jpg', post_id: 2, size: 3.2, created_at: '2024-03-19 12:15:00' },
    { photo_id: 3, photo_url: 'https://imgur.com/pasta789.jpg', post_id: 4, size: 2.1, created_at: '2024-03-17 19:00:00' },
    { photo_id: 4, photo_url: 'https://imgur.com/nature101.jpg', post_id: null, size: 4.0, created_at: '2024-03-15 15:20:00' },
    { photo_id: 5, photo_url: 'https://imgur.com/portrait202.jpg', post_id: null, size: 1.8, created_at: '2024-03-14 08:10:00' },
  ],
  videos: [
    { video_id: 1, video_url: 'https://youtube.com/watch?v=tech001', post_id: 3, size: 25.5, created_at: '2024-03-18 10:45:00' },
    { video_id: 2, video_url: 'https://youtube.com/watch?v=fitness001', post_id: 5, size: 15.3, created_at: '2024-03-16 06:30:00' },
    { video_id: 3, video_url: 'https://youtube.com/watch?v=travel001', post_id: null, size: 35.0, created_at: '2024-03-12 14:00:00' },
  ],
  comments: [
    { comment_id: 1, user_id: 2, post_id: 1, comment_text: 'Amazing view! When is this?', created_at: '2024-03-20 20:10:00' },
    { comment_id: 2, user_id: 1, post_id: 2, comment_text: 'Looks incredible! I want to go there', created_at: '2024-03-19 14:30:00' },
    { comment_id: 3, user_id: 3, post_id: 4, comment_text: 'Great workshop! Will attend next time', created_at: '2024-03-17 21:15:00' },
    { comment_id: 4, user_id: 4, post_id: 1, comment_text: 'Perfect composition!', created_at: '2024-03-20 22:45:00' },
  ],
  post_likes: [
    { user_id: 2, post_id: 1, created_at: '2024-03-20 19:20:00' },
    { user_id: 3, post_id: 1, created_at: '2024-03-20 19:45:00' },
    { user_id: 1, post_id: 2, created_at: '2024-03-19 13:10:00' },
    { user_id: 4, post_id: 3, created_at: '2024-03-18 11:30:00' },
    { user_id: 5, post_id: 4, created_at: '2024-03-17 20:00:00' },
  ],
  comment_likes: [
    { user_id: 1, comment_id: 1, created_at: '2024-03-20 20:30:00' },
    { user_id: 3, comment_id: 1, created_at: '2024-03-20 21:00:00' },
    { user_id: 2, comment_id: 3, created_at: '2024-03-17 21:45:00' },
    { user_id: 5, comment_id: 4, created_at: '2024-03-20 23:10:00' },
  ],
  follows: [
    { follower_id: 1, followee_id: 2, created_at: '2024-01-20 10:00:00' },
    { follower_id: 1, followee_id: 3, created_at: '2024-02-10 15:30:00' },
    { follower_id: 2, followee_id: 1, created_at: '2024-01-25 12:00:00' },
    { follower_id: 3, followee_id: 4, created_at: '2024-02-28 09:45:00' },
    { follower_id: 4, followee_id: 5, created_at: '2024-03-05 14:20:00' },
  ],
  hashtags: [
    { hashtag_id: 1, hashtag_name: '#sunset', created_at: '2024-01-10 08:00:00' },
    { hashtag_id: 2, hashtag_name: '#travel', created_at: '2024-01-12 10:00:00' },
    { hashtag_id: 3, hashtag_name: '#tech', created_at: '2024-01-15 09:30:00' },
    { hashtag_id: 4, hashtag_name: '#foodblog', created_at: '2024-01-18 11:15:00' },
    { hashtag_id: 5, hashtag_name: '#fitness', created_at: '2024-01-20 07:00:00' },
  ],
  hashtag_follow: [
    { user_id: 1, hashtag_id: 1, created_at: '2024-01-20 08:30:00' },
    { user_id: 2, hashtag_id: 2, created_at: '2024-02-05 14:00:00' },
    { user_id: 3, hashtag_id: 3, created_at: '2024-02-15 10:45:00' },
    { user_id: 4, hashtag_id: 4, created_at: '2024-02-20 12:30:00' },
    { user_id: 5, hashtag_id: 5, created_at: '2024-03-01 06:00:00' },
  ],
  post_tags: [
    { post_id: 1, hashtag_id: 1 },
    { post_id: 2, hashtag_id: 2 },
    { post_id: 3, hashtag_id: 3 },
    { post_id: 4, hashtag_id: 4 },
    { post_id: 5, hashtag_id: 5 },
  ],
  bookmarks: [
    { user_id: 1, post_id: 2, created_at: '2024-03-19 15:00:00' },
    { user_id: 2, post_id: 4, created_at: '2024-03-17 20:30:00' },
    { user_id: 3, post_id: 1, created_at: '2024-03-20 19:00:00' },
    { user_id: 4, post_id: 5, created_at: '2024-03-16 08:00:00' },
    { user_id: 5, post_id: 1, created_at: '2024-03-20 17:45:00' },
  ],
  login: [
    { login_id: 1, user_id: 1, ip: '192.168.1.100', login_time: '2024-03-20 09:00:00' },
    { login_id: 2, user_id: 2, ip: '10.0.0.50', login_time: '2024-03-20 10:15:00' },
    { login_id: 3, user_id: 3, ip: '172.16.0.1', login_time: '2024-03-20 08:30:00' },
    { login_id: 4, user_id: 4, ip: '192.168.1.105', login_time: '2024-03-20 11:45:00' },
    { login_id: 5, user_id: 1, ip: '192.168.1.100', login_time: '2024-03-20 14:20:00' },
  ],
};

interface TableDetailsModalProps {
  table: Table | null;
  onClose: () => void;
}

const DataViewerModal: React.FC<TableDetailsModalProps> = ({ table, onClose }) => {
  const [modalZoom, setModalZoom] = React.useState(100);

  if (!table) return null;

  const handleZoomIn = () => setModalZoom(prev => Math.min(prev + 25, 300));
  const handleZoomOut = () => setModalZoom(prev => Math.max(prev - 25, 50));
  const handleZoomReset = () => setModalZoom(100);

  const tableData = SAMPLE_TABLE_DATA[table.name] || [];
  const columns = table.columns.map(c => c.name);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 2.5rem;
          max-width: 1200px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          transform: scale(${modalZoom / 100});
          transform-origin: top center;
          transition: transform 0.3s ease-out;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #0070f3;
          padding-bottom: 1rem;
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 700;
          color: #0070f3;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #666;
          transition: color 0.3s;
        }

        .modal-close:hover {
          color: #000;
        }

        .modal-zoom-controls {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          justify-content: center;
        }

        .modal-zoom-btn {
          padding: 0.4rem 0.8rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .modal-zoom-btn:hover {
          background: #0051d5;
          transform: translateY(-2px);
        }

        .modal-zoom-info {
          text-align: center;
          font-size: 0.9rem;
          color: #666;
        }

        .table-description {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #f5f7fb;
          border-left: 4px solid #0070f3;
          border-radius: 4px;
        }

        .data-table-wrapper {
          overflow-x: auto;
          border: 2px solid #0070f3;
          border-radius: 8px;
          margin-top: 1.5rem;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background: linear-gradient(135deg, #0070f3, #0051d5);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #004bb8;
          white-space: nowrap;
        }

        .data-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e0e0e0;
          color: #333;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
        }

        .data-table tbody tr:hover {
          background: #f5f7fb;
        }

        .data-table tbody tr:nth-child(even) {
          background: #fafbfc;
        }

        .data-stats {
          margin-top: 1rem;
          padding: 1rem;
          background: #e6f3ff;
          border-left: 4px solid #0070f3;
          border-radius: 4px;
          font-size: 0.95rem;
          color: #0070f3;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .modal-content {
            padding: 1.5rem;
            max-width: 95vw;
          }

          .modal-title {
            font-size: 1.5rem;
          }

          .data-table th,
          .data-table td {
            padding: 0.5rem;
            font-size: 0.8rem;
          }
        }
      `}</style>

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📊 {table.name.toUpperCase()} - Sample Data</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-zoom-controls">
          <button className="modal-zoom-btn" onClick={handleZoomOut}>−</button>
          <span className="modal-zoom-info">{modalZoom}%</span>
          <button className="modal-zoom-btn" onClick={handleZoomIn}>+</button>
          <button className="modal-zoom-btn" onClick={handleZoomReset}>Reset</button>
        </div>

        <div className="table-description">
          {table.description}
        </div>

        <h3 style={{ marginBottom: '1rem', color: '#333' }}>Table Records ({tableData.length} rows)</h3>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((row, idx) => (
                  <tr key={idx}>
                    {columns.map((col) => (
                      <td key={`${idx}-${col}`}>
                        {typeof row[col] === 'string' && row[col].length > 50
                          ? row[col].substring(0, 47) + '...'
                          : String(row[col] !== undefined ? row[col] : 'NULL')}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: 'center', color: '#999' }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="data-stats">
          📈 Total Records: {tableData.length} | Columns: {columns.length}
        </div>
      </div>
    </div>
  );
};

export const TablesList: React.FC<{ onTableClick?: (tableName: string) => void }> = ({ onTableClick }) => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const handleTableCardClick = (table: Table) => {
    setSelectedTable(table);
    onTableClick?.(table.name);
  };

  const handleTableRowClick = (table: Table) => {
    setSelectedTable(table);
    onTableClick?.(table.name);
  };

  return (
    <div className="tables-list-container">
      <style jsx>{`
        .tables-list-container {
          padding: 2rem 0;
        }

        .view-toggle {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .toggle-btn {
          padding: 0.7rem 1.5rem;
          border: 2px solid #0070f3;
          background: white;
          color: #0070f3;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .toggle-btn.active {
          background: #0070f3;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 112, 243, 0.3);
        }

        .toggle-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 112, 243, 0.3);
        }

        .tables-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .table-card {
          background: white;
          border: 2px solid #0070f3;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          font-weight: 600;
          color: #0070f3;
          cursor: pointer;
          transition: all 0.3s ease;
          user-select: none;
        }

        .table-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px rgba(0, 112, 243, 0.25);
          background: linear-gradient(135deg, #0070f3, #0051d5);
          color: white;
          border-color: transparent;
        }

        .table-card-name {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .table-card-icon {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        .table-card-hint {
          font-size: 0.75rem;
          font-weight: 400;
          opacity: 0.7;
          margin-top: 0.5rem;
        }

        .all-tables-view {
          background: white;
          border: 2px solid #0070f3;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .all-tables-table {
          width: 100%;
          border-collapse: collapse;
        }

        .all-tables-table thead {
          background: linear-gradient(135deg, #0070f3, #0051d5);
          color: white;
          position: sticky;
          top: 0;
        }

        .all-tables-table th {
          padding: 1.2rem;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #004bb8;
        }

        .all-tables-table tbody tr {
          border-bottom: 1px solid #e0e0e0;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .all-tables-table tbody tr:hover {
          background: #f0f7ff;
          box-shadow: inset 0 0 10px rgba(0, 112, 243, 0.1);
        }

        .all-tables-table td {
          padding: 1rem 1.2rem;
          color: #333;
        }

        .table-name-cell {
          font-weight: 600;
          color: #0070f3;
          font-family: 'Courier New', monospace;
          font-size: 1rem;
        }

        .table-description-cell {
          color: #666;
          font-size: 0.95rem;
          max-width: 300px;
        }

        .column-count-cell {
          background: #f0f7ff;
          color: #0070f3;
          font-weight: 600;
          text-align: center;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          display: inline-block;
        }

        .columns-preview-cell {
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          color: #666;
          max-width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .view-icon {
          margin-right: 0.5rem;
        }

        .info-box {
          background: #f0f7ff;
          border-left: 4px solid #0070f3;
          padding: 1rem;
          border-radius: 4px;
          margin-top: 2rem;
        }

        .info-box p {
          margin: 0;
          color: #333;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .tables-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
          }

          .table-card {
            padding: 1rem;
          }

          .columns-preview-cell {
            display: none;
          }

          .all-tables-table th,
          .all-tables-table td {
            padding: 0.7rem;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="view-toggle">
        <button 
          className={`toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
          onClick={() => setViewMode('cards')}
        >
          <span className="view-icon">📋</span>Card View
        </button>
        <button 
          className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
          onClick={() => setViewMode('table')}
        >
          <span className="view-icon">📊</span>Table View
        </button>
      </div>

      {viewMode === 'cards' && (
        <>
          <div className="tables-grid">
            {TABLES_DATA.map((table) => (
              <div
                key={table.name}
                className="table-card"
                onClick={() => handleTableCardClick(table)}
              >
                <div className="table-card-icon">📋</div>
                <div className="table-card-name">{table.name}</div>
                <div className="table-card-hint">Click for details</div>
              </div>
            ))}
          </div>

          <div className="info-box">
            <p>💡 <strong>Tip:</strong> Click on any table card to view its columns, data types, and constraints.</p>
          </div>
        </>
      )}

      {viewMode === 'table' && (
        <>
          <div className="all-tables-view">
            <table className="all-tables-table">
              <thead>
                <tr>
                  <th>Table Name</th>
                  <th>Description</th>
                  <th>Columns</th>
                  <th>Column Count</th>
                </tr>
              </thead>
              <tbody>
                {TABLES_DATA.map((table) => (
                  <tr key={table.name} onClick={() => handleTableRowClick(table)}>
                    <td>
                      <span className="table-name-cell">🗂️ {table.name}</span>
                    </td>
                    <td>
                      <span className="table-description-cell">{table.description}</span>
                    </td>
                    <td>
                      <span className="columns-preview-cell">
                        {table.columns.map(c => c.name).join(', ')}
                      </span>
                    </td>
                    <td>
                      <span className="column-count-cell">{table.columns.length} cols</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="info-box">
            <p>💡 <strong>Tip:</strong> Click on any table row to view detailed column information with data types and constraints.</p>
          </div>
        </>
      )}

      <DataViewerModal 
        table={selectedTable} 
        onClose={() => setSelectedTable(null)} 
      />
    </div>
  );
};
