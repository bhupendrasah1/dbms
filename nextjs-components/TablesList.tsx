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
      { name: 'username', type: 'VARCHAR(255)', constraint: 'UNIQUE, NOT NULL', details: '' },
      { name: 'email', type: 'VARCHAR(30)', constraint: 'NOT NULL', details: '' },
      { name: 'profile_photo_url', type: 'VARCHAR(255)', constraint: 'DEFAULT', details: 'Default: https://picsum.photos/100' },
      { name: 'bio', type: 'VARCHAR(255)', constraint: 'NULLABLE', details: '' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
  {
    name: 'post',
    description: 'Stores user posts with media and metadata',
    columns: [
      { name: 'post_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'user_id', type: 'INTEGER', constraint: 'FOREIGN KEY', details: 'References users' },
      { name: 'photo_id', type: 'INTEGER', constraint: 'FOREIGN KEY', details: 'References photos' },
      { name: 'video_id', type: 'INTEGER', constraint: 'FOREIGN KEY', details: 'References videos' },
      { name: 'caption', type: 'VARCHAR(200)', constraint: 'NULLABLE', details: '' },
      { name: 'location', type: 'VARCHAR(50)', constraint: 'NULLABLE', details: '' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
  {
    name: 'photos',
    description: 'Stores photo metadata for posts',
    columns: [
      { name: 'photo_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'photo_url', type: 'VARCHAR(255)', constraint: 'UNIQUE, NOT NULL', details: '' },
      { name: 'post_id', type: 'INTEGER', constraint: 'FOREIGN KEY', details: 'References post' },
      { name: 'size', type: 'FLOAT', constraint: 'CHECK(size<5)', details: 'Max 5MB' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
  {
    name: 'videos',
    description: 'Stores video metadata for posts',
    columns: [
      { name: 'video_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'video_url', type: 'VARCHAR(255)', constraint: 'UNIQUE, NOT NULL', details: '' },
      { name: 'post_id', type: 'INTEGER', constraint: 'FOREIGN KEY', details: 'References post' },
      { name: 'size', type: 'FLOAT', constraint: 'CHECK(size<10)', details: 'Max 10MB' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
  {
    name: 'comments',
    description: 'Stores comments on posts',
    columns: [
      { name: 'comment_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'comment_text', type: 'VARCHAR(255)', constraint: 'NOT NULL', details: '' },
      { name: 'post_id', type: 'INTEGER', constraint: 'FOREIGN KEY', details: 'References post' },
      { name: 'user_id', type: 'INTEGER', constraint: 'FOREIGN KEY', details: 'References users' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
  {
    name: 'post_likes',
    description: 'Tracks likes on posts',
    columns: [
      { name: 'user_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users' },
      { name: 'post_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References post' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
  {
    name: 'comment_likes',
    description: 'Tracks likes on comments',
    columns: [
      { name: 'user_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users' },
      { name: 'comment_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References comments' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
  {
    name: 'follows',
    description: 'Tracks follower relationships',
    columns: [
      { name: 'follower_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users' },
      { name: 'followee_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
  {
    name: 'hashtags',
    description: 'Stores available hashtags',
    columns: [
      { name: 'hashtag_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'hashtag_name', type: 'VARCHAR(255)', constraint: 'UNIQUE', details: '' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
  {
    name: 'hashtag_follow',
    description: 'Tracks which users follow which hashtags',
    columns: [
      { name: 'user_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users' },
      { name: 'hashtag_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References hashtags' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
  {
    name: 'post_tags',
    description: 'Associates hashtags with posts',
    columns: [
      { name: 'post_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References post' },
      { name: 'hashtag_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References hashtags' },
    ],
  },
  {
    name: 'bookmarks',
    description: 'Stores user bookmarked posts',
    columns: [
      { name: 'user_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References users' },
      { name: 'post_id', type: 'INTEGER', constraint: 'PRIMARY KEY, FOREIGN KEY', details: 'References post' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
  {
    name: 'login',
    description: 'Tracks user login history',
    columns: [
      { name: 'login_id', type: 'INTEGER', constraint: 'PRIMARY KEY', details: 'Auto-increment' },
      { name: 'user_id', type: 'INTEGER', constraint: 'FOREIGN KEY', details: 'References users' },
      { name: 'ip', type: 'VARCHAR(50)', constraint: 'NOT NULL', details: 'IP address' },
      { name: 'login_time', type: 'TIMESTAMP', constraint: 'DEFAULT', details: 'Current timestamp' },
    ],
  },
];

interface ExpandedTables {
  [key: string]: boolean;
}

export const TablesList: React.FC = () => {
  const [expanded, setExpanded] = useState<ExpandedTables>({
    users: true,
    post: false,
  });

  const toggleTable = (tableName: string) => {
    setExpanded((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  return (
    <div className="tables-list">
      <style jsx>{`
        .tables-list {
          display: grid;
          gap: 1.5rem;
        }

        .table-card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .table-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .table-header {
          background: linear-gradient(135deg, #0070f3, #0051d5);
          color: white;
          padding: 1.5rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
        }

        .table-header:hover {
          background: linear-gradient(135deg, #0051d5, #003fa0);
        }

        .table-header-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .table-name {
          font-size: 1.25rem;
        }

        .table-description {
          font-size: 0.85rem;
          opacity: 0.9;
        }

        .toggle-icon {
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }

        .toggle-icon.open {
          transform: rotate(180deg);
        }

        .table-columns {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .table-columns.expanded {
          max-height: 1000px;
        }

        .columns-table {
          width: 100%;
          border-collapse: collapse;
        }

        .columns-table th {
          background: #f5f5f5;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #333;
          border-bottom: 2px solid #e0e0e0;
        }

        .columns-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .columns-table tr:hover {
          background: #fafafa;
        }

        .column-name {
          font-family: 'Courier New', monospace;
          font-weight: 600;
          color: #0070f3;
        }

        .column-type {
          font-family: 'Courier New', monospace;
          color: #666;
        }

        .constraint-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #e3f2fd;
          color: #0070f3;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .constraint-badge.primary-key {
          background: #fff3cd;
          color: #856404;
        }

        .constraint-badge.foreign-key {
          background: #d4edda;
          color: #155724;
        }

        .constraint-badge.unique {
          background: #d1ecf1;
          color: #0c5460;
        }

        .details {
          font-size: 0.85rem;
          color: #666;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .table-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .columns-table {
            font-size: 0.9rem;
          }

          .columns-table th,
          .columns-table td {
            padding: 0.5rem;
          }
        }
      `}</style>

      <div className="tables-list">
        {TABLES_DATA.map((table) => (
          <div key={table.name} className="table-card">
            <div
              className="table-header"
              onClick={() => toggleTable(table.name)}
            >
              <div className="table-header-info">
                <div className="table-name">📊 {table.name.toUpperCase()}</div>
                <div className="table-description">{table.description}</div>
              </div>
              <div className={`toggle-icon ${expanded[table.name] ? 'open' : ''}`}>
                ▼
              </div>
            </div>

            <div
              className={`table-columns ${
                expanded[table.name] ? 'expanded' : ''
              }`}
            >
              <table className="columns-table">
                <thead>
                  <tr>
                    <th>Column Name</th>
                    <th>Type</th>
                    <th>Constraints</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {table.columns.map((column, idx) => (
                    <tr key={idx}>
                      <td>
                        <span className="column-name">{column.name}</span>
                      </td>
                      <td>
                        <span className="column-type">{column.type}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {column.constraint && (
                            <>
                              {column.constraint
                                .split(',')
                                .map((c, i) => {
                                  const trimmed = c.trim();
                                  let badgeClass = '';
                                  if (
                                    trimmed.includes('PRIMARY') ||
                                    trimmed.includes('PK')
                                  ) {
                                    badgeClass = 'primary-key';
                                  } else if (
                                    trimmed.includes('FOREIGN') ||
                                    trimmed.includes('FK')
                                  ) {
                                    badgeClass = 'foreign-key';
                                  } else if (trimmed.includes('UNIQUE')) {
                                    badgeClass = 'unique';
                                  }
                                  return (
                                    <span
                                      key={i}
                                      className={`constraint-badge ${badgeClass}`}
                                    >
                                      {trimmed}
                                    </span>
                                  );
                                })}
                            </>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="details">{column.details}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f7ff', borderRadius: '8px', borderLeft: '4px solid #0070f3' }}>
        <p style={{ margin: 0, color: '#333' }}>
          <strong>💡 Tip:</strong> Click on any table to expand and see its columns, data types, and constraints.
        </p>
      </div>
    </div>
  );
};
