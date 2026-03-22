# 📊 Social Media Database Schema Components for Next.js

## Overview

These components provide a complete visualization of your Social Media Database schema with:
- ✅ Interactive ER Diagram (Mermaid)
- ✅ Expandable Tables List with detailed columns
- ✅ Beautiful, responsive UI
- ✅ Full database documentation

## Files Included

```
nextjs-components/
├── SchemaViewer.tsx          # Main component with tabs
├── MermaidDiagram.tsx         # ER Diagram visualization
├── TablesList.tsx             # Database tables list
├── database-schema-page.tsx   # Complete page example
└── SETUP_GUIDE.md            # This file
```

## Setup Instructions

### Step 1: Copy Components to Your Project

```bash
# Copy components to your Next.js project
cp SchemaViewer.tsx src/components/
cp MermaidDiagram.tsx src/components/
cp TablesList.tsx src/components/
```

### Step 2: Create the Page

**For Pages Router (pages directory):**
```bash
cp database-schema-page.tsx pages/database-schema.tsx
```

**For App Router (app directory):**
```bash
mkdir -p app/database-schema
# Rename and modify database-schema-page.tsx for app/database-schema/page.tsx
```

### Step 3: Add Mermaid CDN (Optional - Already Included)

The Mermaid library loads automatically from CDN in the `MermaidDiagram.tsx` component.

If you want to customize it, add to your `_document.tsx` or `layout.tsx`:

```tsx
// Optional: Add Mermaid to globals for better performance
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: true });
```

### Step 4: Create Navigation Link

Add a link to your navigation/header:

```tsx
<Link href="/database-schema">
  📊 Database Schema
</Link>
```

## Usage

Once set up, visit `/database-schema` to see:

1. **ER Diagram Tab** - Full entity-relationship diagram showing all table relationships
2. **Tables & Columns Tab** - Expandable list of all 13 tables with columns, types, and constraints

## Component Details

### SchemaViewer.tsx
Main container component that manages tabs and layout.

**Props:** None (self-contained)

```tsx
import { SchemaViewer } from '@/components/SchemaViewer';

export default function Page() {
  return <SchemaViewer />;
}
```

### MermaidDiagram.tsx
Renders the ER diagram using Mermaid.js.

Features:
- Auto-loads Mermaid library from CDN
- Responsive design
- Shows all table relationships and constraints

### TablesList.tsx
Interactive list of all database tables with expandable details.

Features:
- Color-coded constraint badges (PK, FK, UNIQUE, etc.)
- Expandable/collapsible tables
- Column names, types, and details
- Responsive table layout

## Customization

### Modify Colors

Edit the `<style jsx>` blocks in each component:

```tsx
.table-header {
  background: linear-gradient(135deg, #0070f3, #0051d5); // Change these colors
}
```

### Add More Tables

If you add new tables, update `TABLES_DATA` in `TablesList.tsx`:

```tsx
const TABLES_DATA: Table[] = [
  // ... existing tables
  {
    name: 'your_new_table',
    description: 'Description of your table',
    columns: [
      { name: 'column_name', type: 'VARCHAR(255)', constraint: 'NOT NULL', details: '' },
      // ... more columns
    ],
  },
];
```

### Update ER Diagram

Edit the Mermaid diagram string in `MermaidDiagram.tsx`:

```tsx
<div className="mermaid">
  {`
erDiagram
    // Add your new relationships here
  `}
</div>
```

## Dependencies

None! These components use:
- **React** (built-in with Next.js)
- **Mermaid.js** (loaded from CDN)
- **CSS-in-JS** (styled-jsx, built-in with Next.js)

## Browser Support

- Chrome, Firefox, Safari, Edge (all modern versions)
- Mobile responsive
- Works in Next.js 12+ and 13+

## Performance

- Lazy-loads Mermaid from CDN
- Minimal JavaScript footprint
- CSS-in-JS scoped to components
- No external dependencies

## Screenshots

### ER Diagram View
Shows all 13 tables with relationships, keys, and constraints.

### Tables & Columns View
Expandable list of all tables with detailed column information.

## Database Tables Included

1. **users** - User profiles
2. **post** - User posts
3. **photos** - Photo metadata
4. **videos** - Video metadata
5. **comments** - Comments on posts
6. **post_likes** - Post likes
7. **comment_likes** - Comment likes
8. **follows** - Follower relationships
9. **hashtags** - Available hashtags
10. **hashtag_follow** - User-hashtag relationships
11. **post_tags** - Post-hashtag tagging
12. **bookmarks** - User bookmarks
13. **login** - Login history

## Troubleshooting

### Mermaid diagram not showing
- Clear browser cache
- Check console for errors
- Ensure JavaScript is enabled
- Try a different browser

### Components won't import
- Verify file paths match your project structure
- Check `tsconfig.json` has correct path aliases
- Ensure `.tsx` file extensions match

### Styling looks off
- Check if styled-jsx is properly configured in Next.js
- May need to update colors in CSS blocks
- Test in different browsers

## API Integration (Future)

To connect to actual database queries:

```tsx
// In TablesList.tsx
const [tablesData, setTablesData] = useState<Table[]>([]);

useEffect(() => {
  // Fetch from your API
  fetch('/api/schema/tables')
    .then(res => res.json())
    .then(data => setTablesData(data));
}, []);
```

## License

Same as the main Social Media Database Project

## Support

For issues or questions, check the main project README or create an issue.

---

**Happy coding! 🚀**
