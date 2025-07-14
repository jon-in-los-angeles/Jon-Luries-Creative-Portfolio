# Portfolio Website - Replit Guide

## Overview

This is a professional portfolio website for Jonathan Lurie, a Senior Producer & Creative Director. The application is built as a full-stack TypeScript application with a modern React frontend and Express backend, showcasing multimedia content and professional experience through a clean, responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for smooth interactions
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with JSON responses
- **File Structure**: Modular route handling with centralized storage interface

### Database & Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Configured for PostgreSQL (via Neon serverless)
- **Schema**: Centralized schema definitions in `/shared/schema.ts`
- **Storage Interface**: Abstract storage pattern with in-memory fallback for development

## Key Components

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling between sections
- **Hero Section**: Main introduction with professional headshot and navigation
- **Watch Section**: Video showcase with embedded player support
- **Experience Timeline**: Professional career progression display
- **Contact Section**: Contact form with validation and submission handling
- **PWA Features**: Progressive Web App capabilities with offline support

### Backend Services
- **Project Management**: CRUD operations for portfolio projects
- **Experience Management**: Career timeline data handling
- **Video Management**: Video content with embed URL processing
- **Contact Handling**: Form submission processing and storage
- **Static Asset Serving**: Serves attached assets and media files

### Database Schema
- **Projects**: Portfolio items with categories, descriptions, and metadata
- **Experiences**: Professional timeline entries with company and role information
- **Videos**: Video content with Vimeo/YouTube integration
- **Contact Messages**: Form submissions with timestamp tracking

## Data Flow

1. **Client Requests**: React components use TanStack Query for data fetching
2. **API Routes**: Express routes handle REST endpoints (`/api/projects`, `/api/experiences`, etc.)
3. **Storage Layer**: Abstract storage interface allows for easy database switching
4. **Response Handling**: Consistent JSON responses with error handling middleware

## External Dependencies

### UI Framework
- **shadcn/ui**: Pre-built accessible React components
- **Radix UI**: Primitive components for complex UI patterns
- **Tailwind CSS**: Utility-first CSS framework

### Data & State
- **TanStack React Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime type validation for forms and APIs

### Media & Assets
- **Framer Motion**: Animation library for smooth interactions
- **Canvas**: HTML5 Canvas API for graphics processing
- **Date-fns**: Date manipulation and formatting

### Development Tools
- **Vite**: Fast build tool with HMR
- **ESBuild**: Fast JavaScript bundler for production
- **TypeScript**: Static type checking
- **Replit Plugins**: Development environment integration

## Deployment Strategy

### Development
- **Command**: `npm run dev` starts both frontend and backend
- **Hot Reload**: Vite provides instant frontend updates
- **API Proxy**: Development server proxies API requests to Express backend

### Production Build
- **Frontend**: Vite builds optimized static assets to `/dist/public`
- **Backend**: ESBuild bundles Express server to `/dist/index.js`
- **Static Serving**: Express serves built frontend and handles API routes

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection
- **Build Process**: Single command builds both frontend and backend
- **Asset Management**: Static assets served from `/attached_assets` directory

### PWA Features
- **Service Worker**: Caches static assets for offline functionality
- **Manifest**: Web app manifest for mobile installation
- **Icons**: SVG icons for various device sizes
- **Install Prompt**: Custom installation prompt for supported browsers

The application follows a clean separation of concerns with shared TypeScript types between frontend and backend, ensuring type safety across the entire stack. The modular architecture allows for easy maintenance and feature additions while maintaining performance and user experience.