# E-Commerce Website

## Overview

This is a modern, mobile-friendly e-commerce website built with React, Express.js, and PostgreSQL. The application provides a simple shopping experience with product browsing, detailed product views, and a streamlined checkout process. It features both customer-facing functionality and an admin panel for product management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints for products and orders
- **Development**: Hot reload with Vite integration

### Project Structure
```
├── client/          # React frontend application
├── server/          # Express.js backend
├── shared/          # Shared TypeScript types and schemas
├── migrations/      # Database migration files
└── attached_assets/ # Static assets and requirements
```

## Key Components

### Database Schema
- **Products**: Core product information (name, price, image, description)
- **Orders**: Customer orders with contact details and product references
- **Users**: Basic user authentication system (prepared for future expansion)

### Frontend Pages
- **Home**: Product grid with hero section
- **Product Details**: Individual product information with purchase option
- **Checkout**: Order form with customer information collection
- **Admin Panel**: Product management interface with CRUD operations
- **404 Page**: Error handling for invalid routes

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Product API**: Full CRUD operations for product management
- **Order API**: Order creation and retrieval
- **Email Integration**: EmailJS for order confirmations

## Data Flow

1. **Product Display**: Frontend fetches products from `/api/products` endpoint
2. **Product Details**: Individual products retrieved via `/api/products/:id`
3. **Order Creation**: Checkout form submits to `/api/orders` with customer and product data
4. **Email Notification**: Successful orders trigger email confirmation via EmailJS
5. **Admin Operations**: CRUD operations for products through protected admin interface

## External Dependencies

### Production Dependencies
- **Database**: Neon PostgreSQL for cloud hosting
- **Email Service**: EmailJS for order notifications
- **UI Components**: Radix UI and Lucide React icons
- **Form Handling**: React Hook Form with Zod validation

### Development Tools
- **Database Management**: Drizzle Kit for migrations and schema management
- **Type Safety**: TypeScript with strict configuration
- **Code Quality**: ESBuild for production bundling
- **Development**: Replit integration with hot reload support

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild compiles TypeScript server code to `dist/index.js`
- **Database**: Drizzle handles schema migrations and type generation

### Environment Configuration
- **Development**: Uses `tsx` for TypeScript execution with hot reload
- **Production**: Compiled JavaScript with Node.js execution
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Email**: EmailJS configuration through environment variables

### Deployment Architecture
- **Static Assets**: Frontend served from `dist/public`
- **API Routes**: Express server handles `/api/*` endpoints
- **Database**: Cloud PostgreSQL (Neon) with connection pooling
- **Session Storage**: PostgreSQL-backed sessions for authentication

The application is designed to be deployed on platforms like Replit, Vercel, or traditional hosting providers with PostgreSQL support. The development setup includes Replit-specific configurations for seamless cloud development.