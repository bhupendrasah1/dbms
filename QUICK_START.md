# 🚀 Quick Start Guide - Next.js Setup

## Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Neon DB connection string (already in .env)

## Installation & Running

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit: **http://localhost:3000**

---

## 📁 Project Structure

```
social-media-database-project/
├── pages/                      # Next.js pages
│   ├── _app.tsx               # Global app wrapper
│   ├── _document.tsx          # HTML document
│   ├── index.tsx              # Home page
│   └── database-schema.tsx    # Schema visualization page
├── components/                 # React components
│   ├── SchemaViewer.tsx       # Main schema viewer
│   ├── MermaidDiagram.tsx     # ER diagram component
│   └── TablesList.tsx         # Tables list component
├── .env                        # Environment variables (Neon DB URL)
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## 🌐 Available Pages

- **Home** (`/`) - Landing page with features overview
- **Database Schema** (`/database-schema`) - Interactive schema viewer with ER diagram

---

## 📊 Features

✅ Interactive ER Diagram showing all 13 tables
✅ Expandable tables list with column details
✅ PostgreSQL schema for Neon DB
✅ Beautiful, responsive UI
✅ TypeScript support
✅ Production-ready

---

## 🗄️ Database Setup (Neon)

The PostgreSQL schema is already optimized for Neon DB.

1. Go to Neon Console: https://console.neon.tech
2. Open SQL Editor
3. Copy the schema from `neon-schema-postgres.sql`
4. Run it in the SQL Editor

---

## 📝 Database Schema (13 Tables)

| Table | Purpose |
|-------|---------|
| users | User profiles |
| post | User posts |
| photos | Photo metadata |
| videos | Video metadata |
| comments | Comments on posts |
| post_likes | Likes on posts |
| comment_likes | Likes on comments |
| follows | Follower relationships |
| hashtags | Available hashtags |
| hashtag_follow | User-hashtag relationships |
| post_tags | Post-hashtag tagging |
| bookmarks | Bookmarked posts |
| login | Login history |

---

## 🛠️ Common Commands

```bash
# Run development server
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 📚 API Connection (Future)

To connect to Neon database, you can use:

```bash
npm install @neondatabase/serverless
```

Then create an API route:

```typescript
// pages/api/schema.ts
import { neon } from '@neondatabase/serverless';

const db = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  const tables = await db('SELECT * FROM information_schema.tables;');
  res.json(tables);
}
```

---

## 🚨 Troubleshooting

### npm run dev doesn't work
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port 3000 is already in use
```bash
npm run dev -- -p 3001
```

### Components not rendering
- Check browser console for errors
- Verify all files are in `components/` folder
- Restart development server

---

## 📖 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Neon DB Documentation](https://neon.tech/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🎉 You're All Set!

Your Social Media Database project is ready to use. Visit http://localhost:3000 to see the interactive documentation!

**Happy coding! 🚀**
