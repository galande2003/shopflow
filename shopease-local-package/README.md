# ShopEase - E-Commerce Website

A modern, mobile-friendly e-commerce website built with React, Express.js, and TypeScript.

## Features

- **Product Browsing**: View products with detailed information and images
- **Shopping Cart**: Add products to cart and proceed to checkout
- **Order Management**: Complete order history with cancellation functionality
- **Admin Panel**: Full CRUD operations for product management
- **Email Notifications**: Order confirmations and cancellation requests
- **Mobile Responsive**: Optimized for all device sizes

## Prerequisites

Before running this project locally, make sure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

## Local Setup Instructions

### 1. Download/Clone the Project

If you have Git installed:
```bash
git clone <your-repository-url>
cd shopease-ecommerce
```

Or download the project files and extract them to a folder.

### 2. Install Dependencies

Open terminal/command prompt in the project folder and run:

```bash
npm install
```

This will install all required packages including React, Express, TypeScript, and UI components.

### 3. Environment Setup (Optional - for Email Features)

Create a `.env` file in the project root:

```bash
# EmailJS Configuration (optional)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

**Note**: Email features will work in simulation mode without these credentials.

### 4. Start the Development Server

Run the following command:

```bash
npm run dev
```

This will start both the backend server and frontend development server.

### 5. Access the Application

Open your web browser and go to:
```
http://localhost:5000
```

The application will be running with:
- **Frontend**: React development server with hot reload
- **Backend**: Express.js API server
- **Database**: In-memory storage (data resets on server restart)

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server (after build)

## Admin Access

- **URL**: `/admin`
- **Password**: `admin123`

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   ├── lib/         # Utilities and services
│   │   └── hooks/       # Custom React hooks
├── server/          # Express.js backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   └── storage.ts   # Data storage layer
├── shared/          # Shared TypeScript schemas
└── package.json     # Dependencies and scripts
```

## Usage Guide

### For Customers:
1. **Browse Products**: View available products on the home page
2. **Product Details**: Click any product to see detailed information
3. **Place Order**: Click "Buy Now" and fill out the checkout form
4. **Order History**: Visit `/orders` to see all your orders
5. **Cancel Orders**: Use the cancel button with name/phone verification

### For Administrators:
1. **Access Admin Panel**: Go to `/admin` and use password `admin123`
2. **Manage Products**: Add, edit, or delete products
3. **View Orders**: See all customer orders (feature can be extended)

## Email Notifications

The system includes email notifications for:
- Order confirmations
- Order cancellation requests

Currently running in **simulation mode** - check browser console (F12) to see email content.

To enable real emails:
1. Create account at [EmailJS](https://www.emailjs.com/)
2. Set up email service and template
3. Add credentials to `.env` file

## Troubleshooting

### Port Already in Use
If you get "EADDRINUSE" error:
```bash
# Kill process using port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Kill process using port 5000 (Mac/Linux)
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Issues
```bash
# Clean build and restart
rm -rf dist
npm run build
```

## Production Deployment

For production deployment:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Set up environment variables** on your hosting platform

3. **Deploy** to platforms like:
   - Vercel
   - Netlify
   - Heroku
   - Railway
   - DigitalOcean

## Support

If you encounter any issues:
1. Check the console for error messages (F12 in browser)
2. Ensure all dependencies are installed correctly
3. Verify Node.js version is 18 or higher
4. Check that port 5000 is available

## License

This project is open source and available under the MIT License.