# KickOff - Turf Booking Platform

A modern web application for easy turf booking and management, built with the MERN stack.

## Overview

KickOff is a comprehensive turf booking platform that enables users to discover, book, and manage sports turf reservations seamlessly. The application features separate interfaces for customers and turf owners, providing a complete solution for sports facility management.

## Features

### For Users
- Browse and search available turfs
- Real-time booking with availability checking
- User profile management
- Email notifications for booking confirmations
- Secure authentication with JWT
- Google OAuth integration

### For Turf Owners/Listers
- Add and manage turf listings
- View booking analytics
- Manage turf availability
- Responsive dashboard

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animation library
- **React Bootstrap** - UI components

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Multer** - File upload handling
- **SendGrid** - Email service
- **bcrypt** - Password hashing

## Project Structure

```
KickOff-MERN/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── contexts/       # React contexts
│   │   └── assets/         # Static assets
├── backend/                 # Node.js backend application
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── templates/         # Email templates
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_sendgrid_api_key
```

Start the backend server:
```bash
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Turfs
- `GET /api/turfs` - Get all turfs
- `POST /api/turfs` - Create new turf (lister only)
- `GET /api/turfs/:id` - Get turf details

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/lister` - Get lister bookings

## Current Development Status

### Completed Features
- User authentication and authorization
- Turf listing and browsing
- Basic booking functionality
- File upload for turf images
- Email notifications
- Responsive design

### In Progress
- [ ] Enhanced booking system with conflict prevention
- [ ] Real-time availability updates
- [ ] User profile management improvements
- [ ] Advanced search and filtering
- [ ] Payment integration
- [ ] SMS notifications

### Upcoming Features
- [ ] Password reset functionality
- [ ] Enhanced Google OAuth integration
- [ ] Admin dashboard
- [ ] Booking analytics
- [ ] Review and rating system
- [ ] Mobile app development

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Note**: This project is currently in active development. Features and functionality may change as development progresses.

