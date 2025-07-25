# Teacher Management App

A simple and modern web app to manage teacher records, built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com).

## Live Demo

- **Live Site:** https://teachermanagementdemo.netlify.app/
- **Demo Video:** https://www.loom.com/share/bae09ede9c694238b47085112fa9c89b?sid=2e85ae53-375d-4ade-94e1-2ffb01a1d45b

## Features

- Add, edit, and view teacher details
- Activity log to track all actions
- Clean, responsive UI with sidebar navigation

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

- **Sidebar & Top Bar:** Navigate the app easily.
- **Teacher List:** View all teachers. Click to edit.
- **Add/Edit Teacher:** Use the form to add or update teachers. Form is validated.
- **Activity Log:** See a real-time log of all add/edit actions.

## Code Highlights

- `TeacherForm.tsx`: Handles add/edit logic and logs actions.
- `ActivityLogTable.tsx`: Shows all activity logs from localStorage.
- Uses Tailwind CSS for fast, modern styling.

## Deployment

Deploy on [Vercel](https://vercel.com/) or any platform of your choice.

---

Feel free to contribute or suggest improvements!
