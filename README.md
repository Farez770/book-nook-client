# 📚 BookNook – A Small Online Library

BookNook is a modern online library platform where readers can explore books, discover new titles, manage their own book collections, and borrow books online. It provides a simple and convenient experience for book lovers to access and manage their reading journey.

🌐 **Live Website:** [BookNook](YOUR_LIVE_WEBSITE_URL)

## ✨ Key Features

- **Browse Books:** Explore a collection of books with details such as title, author, category, and description.
- **Book Details:** View comprehensive information about individual books before borrowing them.
- **User Authentication:** Register and log in securely using email/password or Google authentication.
- **Add Books:** Authenticated users can add new books with images, descriptions, categories, and available copies.
- **My Books:** Manage your contributed books with options to edit and delete existing book information.
- **Borrow Books:** Borrow available books for a seven-day period through a simple borrowing process.
- **My Borrows:** View borrowed books along with their borrowing and return dates.
- **Return Books:** Return borrowed books and automatically update available copies.
- **Stock Management:** Automatically decrease available copies when a book is borrowed and increase them when returned.
- **Responsive Design:** Enjoy a consistent experience across desktop, tablet, and mobile devices.
- **Protected Routes:** Restrict private features to authenticated users with secure JWT-based API authorization.
- **Interactive Notifications:** Receive feedback for successful actions and errors through toast notifications.

## 🛠️ Technologies Used

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- HeroUI
- Lucide React
- Swiper.js

### Backend

- Node.js
- Express.js
- JavaScript
- MongoDB
- Better Auth
- JSON Web Token (JWT)
- ImgBB API

## 🔐 Authentication & Security

- User authentication powered by Better Auth.
- Email and password authentication.
- Google social authentication.
- JWT-based authentication for protected backend APIs.
- Server-side token verification using JWKS.
- Protected operations for authenticated users.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database

### Frontend Setup

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
cd booknook-client
npm install
npm run dev
```

### Backend Setup

```bash
git clone YOUR_SERVER_REPOSITORY_URL
cd booknook-server
npm install
npm run dev
```

## ⚙️ Environment Variables

Configure the required environment variables in your `.env` files.

### Frontend

- BETTER_AUTH_URL
- BETTER_AUTH_SECRET
- NEXT_PUBLIC_SERVER_URL
- Google authentication credentials

### Backend

- MONGODB_URI
- CLIENT_URL
- IMGBB_API_KEY

Never commit actual environment variables or secret credentials to GitHub.

## 📂 Project Repositories

- **Client Repository:** [GitHub Client Repository](YOUR_CLIENT_REPOSITORY_URL)
- **Server Repository:** [GitHub Server Repository](YOUR_SERVER_REPOSITORY_URL)

## 👨‍💻 Author

Developed with ❤️ as a full-stack web development project.

**BookNook – Discover, Borrow, and Enjoy Reading!**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
