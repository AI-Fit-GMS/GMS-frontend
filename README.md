# GymPro - Gym Management System

A comprehensive gym management system built with React, TypeScript, and modern web technologies.

## Features

- 🏋️ **Member Management** - Complete CRUD operations for gym members
- 👨‍🏫 **Trainer Management** - Manage trainers and their schedules
- 📅 **Class Scheduling** - Schedule and manage fitness classes
- 💰 **Billing & Payments** - Invoice management and payment tracking
- 📊 **Dashboard Analytics** - Revenue tracking and member statistics
- 🔐 **Authentication** - Secure login and role-based access control
- 🌍 **Multi-language** - Support for English, Hindi, Arabic, French
- 📱 **Responsive Design** - Works on all devices
- 🔄 **PWA Ready** - Progressive Web App capabilities

## Tech Stack

- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **Vite 6** - Build tool
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **Tailwind CSS** - Styling
- **Material UI** - Component library
- **React Router** - Routing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── features/          # Feature modules
│   ├── auth/         # Authentication
│   ├── members/      # Member management
│   ├── trainers/     # Trainer management
│   ├── classes/      # Class scheduling
│   ├── billing/      # Billing & payments
│   └── dashboard/    # Dashboard & analytics
├── commonComponents/  # Reusable UI components
├── services/         # API services
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript types
└── redux/            # Redux store
```

## Environment Variables

Create `.env.development` and `.env.production` files:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=GymPro
VITE_ENABLE_DEVTOOLS=true
```

## License

Proprietary - GymPro © 2024

