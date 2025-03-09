# Role-Based Ticketing System

---

## Overview

The **Role-Based Ticketing System** is a full-stack web application designed to manage support tickets with distinct roles for users and admins. Users can create and view their tickets, while admins can manage all tickets, including updating statuses. Built with a React frontend and a Node.js backend, this project showcases role-based access control, real-time state management, and a user-friendly interface.

**[Live Demo](https://ticketing-system-malike.vercel.app/)**

---

## Features

### General Features
- **Role-Based Access Control**: Separate dashboards for users (`/dashboard`) and admins (`/admin`) based on JWT-decoded roles.
- **Responsive Design**: Fully responsive UI styled with TailwindCSS, optimized for desktop and mobile.
- **Loading & Error States**: Visual feedback during API calls with error messages when actions fail.
- **Client-Side Routing**: Seamless navigation using React Router

### Authentication
- **User Signup**: Register with username and password (`/signup`), validated with Zod schemas.
- **User Login**: Secure login (`/login`) with JWT tokens stored in localStorage.
- **Logout**: Clear token and redirect to login page from dashboards.
- **Protected Routes**: Restrict access to `/dashboard` (users) and `/admin` (admins).

### Ticket Management
- **Ticket Creation**: Users can submit tickets with title and description 
- **Ticket Listing**: View all tickets.
  - Title, description, status (`Open`, `In Progress`, `Closed`).
  - Creator’s username .
  - Formatted `createdAt` (e.g., "Monday-09-03-2025").
- **Admin Status Updates**: Admins can update ticket statuses via a dropdown.
- **Real-Time Updates**: Ticket status changes reflect immediately without page refresh.

### Frontend Tech Stack
- **React**: Component-based UI Library.
- **Redux Toolkit**: Centralized state management.
- **TypeScript**: Type safety for components, Redux slices, and API responses.
- **Vite**: Fast build tool for development and production.
- **TailwindCSS**: Utility-first CSS for styling.
- **React Hook Form + Zod**: Form handling and validation for signup, login, and ticket creation.
- **Axios**: API requests with token-based authentication.

### Backend Tech Stack
- **Node.js + Express**: RESTful API for auth and ticket management.
- **Mongoose**: MongoDB ORM for ticket and user data.
- **JWT**: Token-based authentication with role encoding.
- **Bcrypt**: Password hashing for secure storage.

### Deployment
- **Vercel**: For Frontend Deployment
- **Render**: For Backend Deployment
  
