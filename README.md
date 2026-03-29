<div align="center">
  <img width="1200" height="475" alt="Sahitya Bari Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  # 📚 Sahitya Bari (সাহিত্য বাড়ি)
  
  **A premium, iOS-inspired literature platform for enthusiasts.**

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
  [![Auth.js](https://img.shields.io/badge/Auth.js-v5-611261?logo=lock)](https://authjs.dev/)
  [![Mongoose](https://img.shields.io/badge/Mongoose-9.2-880000?logo=mongodb)](https://mongoosejs.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
</div>

---

## ✨ Overview

**Sahitya Bari** is a high-end web platform designed for the Sahitya Bari YouTube channel. It bridges the gap between digital content and literary depth, providing a premium experience for users to explore videos, read blogs, and engage with literature-focused content through a stunning iOS 26 design language.

## 🚀 Key Features

- **🎭 iOS 26 Aesthetics**: A custom design system built with **OKLCH colors**, **Glassmorphism**, and **Mesh Gradients** for a state-of-the-art visual experience.
- **🎥 Video Discovery**: Seamlessly browse "Upcoming", "Popular", and "Featured" videos with deep YouTube integration.
- **📝 Literary Blog**: A clean, readable interface for long-form literary articles and stories.
- **🔐 Secure Authentication**: Integrated with **NextAuth v5** for robust user and admin management.
- **🛠 Comprehensive Admin Dashboard**: Full-featured control center for managing videos, comments, and application state.
- **🎧 Audio Section**: Dedicated area for literature-related audio content.
- **🍪 Privacy Focused**: Professional iOS-inspired cookie management system.
- **🌗 Adaptive Theme**: Full Dark/Light mode support with optimized colors for maximum readability.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with OKLCH & custom tokens
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Auth**: [NextAuth (Auth.js) v5](https://authjs.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Custom iOS-inspired UI components

## 🚦 Getting Started

### Prerequisites

- **Node.js**: 20.x or higher
- **MongoDB**: A running instance or MongoDB Atlas cluster

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd sahitya-bari
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication (NextAuth)
   AUTH_SECRET=your_auth_secret  # Generate with: npx auth secret
   GOOGLE_CLIENT_ID=your_google_id
   GOOGLE_CLIENT_SECRET=your_google_secret

   # Smart Features Setup (Optional)
   GEMINI_API_KEY=your_gen_api_key

   # YouTube/Google API (Optional for some features)
   GOOGLE_API_KEY=your_google_api_key
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```text
├── app/              # Next.js App Router (Layouts, Pages, Server Actions)
├── components/       # Reusable UI components (Hero, Cards, Navigation)
├── hooks/            # Custom React hooks
├── lib/              # Core utilities, DB connection, and shared logic
├── public/           # Static assets (images, icons)
├── types/            # TypeScript interface definitions
└── metadata.json     # App manifest/configuration
```

## 📄 License

This project is private and intended for the Sahitya Bari YouTube content ecosystem.

---

<div align="center">
  Built with ❤️ for literature lovers.
</div>
