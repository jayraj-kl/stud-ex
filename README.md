# Stud-ex - AI-Powered Learning Platform

Gamedoora is an advanced educational platform that combines AI-powered chatbots with educational resources to provide personalized learning experiences. The platform features customizable AI tutors that can answer questions across various academic subjects, all powered by a Next.js-based web application.

## 📚 Features

- **AI Tutors**: Custom AI chatbots specialized in different academic subjects
- **Document-Based Learning**: Upload and learn from PDF resources
- **Authentication System**: Secure user accounts with role-based access (Admin/User)
- **Dashboard Interface**: Modern, responsive UI for managing learning resources
- **Vector Database Integration**: Uses Pinecone for efficient document embedding and retrieval
- **Custom Bot Creation**: Create and customize AI tutors for specific subjects

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm or bun
- PostgreSQL database (or Neon serverless Postgres)

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your_postgres_connection_string"
DIRECT_URL="your_direct_postgres_connection"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"

# OpenAI (for AI features)
OPENAI_API_KEY="your_openai_api_key"

# Pinecone (for vector database)
PINECONE_API_KEY="your_pinecone_api_key"
PINECONE_ENVIRONMENT="your_pinecone_environment"
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gamedoora-hackathon.git
cd gamedoora-hackathon
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

4. Prepare the vector database:

```bash
npm run prepare:data
# or
yarn prepare:data
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🧪 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Database**: PostgreSQL with [Prisma ORM](https://prisma.io)
- **Authentication**: NextAuth.js with credentials and OAuth providers
- **UI**: [Tailwind CSS](https://tailwindcss.com/) with Radix UI components
- **AI**: LangChain with OpenAI integration
- **Vector Database**: Pinecone for document embeddings
- **Styling**: Tailwind CSS with custom components
- **Animation**: Framer Motion
- **Email**: React Email for notification templates

## 📂 Project Structure

```
/app               # Next.js App Router structure
  /(auth)          # Authentication routes
  /(protected)     # Protected routes requiring auth
  /actions         # Server actions
  /api             # API routes
/components        # UI components
  /dashboard       # Dashboard-specific components
  /ui              # Shared UI components
/lib               # Utility functions and libraries
/prisma            # Prisma schema and migrations
/public            # Static assets
/types             # TypeScript type definitions
```

## 🔒 Authentication

The platform uses NextAuth.js for authentication with:

- Email/password credential login
- Role-based access control (Admin/User)
- Protected routes for authenticated users

## 🤖 AI Features

- Custom AI tutors powered by OpenAI
- PDF document analysis and question answering
- Vector search for relevant information retrieval
- Personalized learning experiences

## 📱 Responsive Design

The UI is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile devices

## 📊 Dashboard

The admin dashboard provides:

- Analytics on user engagement
- Bot management interface
- User role management
- Content upload and management

## 🚢 Deployment

The easiest way to deploy this application is with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform created by the makers of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
