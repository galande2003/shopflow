# 🛍️ ShopEase E-Commerce - Complete Local Setup Guide

## ⚠️ IMPORTANT: Read This First!

This project is currently running on Replit. To run it on your local computer, you need to follow these **exact steps** in order.

## 📋 Requirements Check

Before starting, verify you have:

### 1. Node.js (REQUIRED)
- **Download**: https://nodejs.org/
- **Version needed**: 18.0 or higher
- **Check if installed**: Open terminal/command prompt and type:
  ```bash
  node --version
  ```
  Should show something like `v18.17.0` or higher

### 2. npm (comes with Node.js)
- **Check if installed**:
  ```bash
  npm --version
  ```
  Should show version number like `9.6.7`

## 📁 Step 1: Download Project Files

### Option A: Download from Replit
1. Go to your Replit project
2. Click the **three dots menu** (⋯) in the file explorer
3. Select **"Download as zip"**
4. Extract the zip file to a folder on your computer

### Option B: Copy Files Manually
Create a new folder on your computer and copy these files/folders:
```
📁 your-project-folder/
├── 📁 client/
├── 📁 server/
├── 📁 shared/
├── 📁 node_modules/  (optional - will be recreated)
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
├── 📄 tailwind.config.ts
├── 📄 postcss.config.js
├── 📄 components.json
├── 📄 README.md
└── 📄 .gitignore
```

## 💻 Step 2: Open Terminal/Command Prompt

### Windows:
- Press `Win + R`, type `cmd`, press Enter
- OR Press `Win + X`, select "Command Prompt" or "PowerShell"
- OR Open folder, right-click, select "Open in Terminal"

### Mac:
- Press `Cmd + Space`, type "Terminal", press Enter
- OR Open Finder, go to Applications > Utilities > Terminal

### Linux:
- Press `Ctrl + Alt + T`
- OR Right-click in folder, select "Open in Terminal"

## 📂 Step 3: Navigate to Project Folder

In the terminal, use `cd` command to go to your project folder:

```bash
# Example (replace with your actual path):
cd C:\Users\YourName\Desktop\shopease-project
# OR on Mac/Linux:
cd /Users/YourName/Desktop/shopease-project
```

**Verify you're in the right folder** by typing:
```bash
ls          # Mac/Linux
dir         # Windows
```
You should see files like `package.json`, `client/`, `server/`, etc.

## 📦 Step 4: Install Dependencies

Run this command (it might take 2-5 minutes):

```bash
npm install
```

**What this does:**
- Downloads all required packages (React, Express, TypeScript, etc.)
- Creates `node_modules` folder
- Sets up the project dependencies

**If you get errors:**
- Make sure you have internet connection
- Try: `npm cache clean --force` then `npm install` again
- On Windows, you might need to run terminal as Administrator

## 🚀 Step 5: Start the Development Server

Run this command:

```bash
npm run dev
```

**You should see output like:**
```
> rest-express@1.0.0 dev
> NODE_ENV=development tsx server/index.ts

[express] serving on port 5000
```

## 🌐 Step 6: Open in Browser

1. Open your web browser (Chrome, Firefox, Safari, etc.)
2. Go to: **http://localhost:5000**
3. You should see the ShopEase website!

## 🔧 Troubleshooting Common Issues

### ❌ "node is not recognized" or "npm is not recognized"
**Problem**: Node.js not installed or not in PATH
**Solution**: 
1. Download and install Node.js from https://nodejs.org/
2. Restart your terminal/command prompt
3. Try again

### ❌ "EADDRINUSE: address already in use :::5000"
**Problem**: Port 5000 is already being used
**Solutions**:

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F
```

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

**OR** Change the port in `server/index.ts`:
```typescript
const port = 3001; // Change from 5000 to 3001
```

### ❌ "Cannot find module" errors
**Problem**: Dependencies not installed properly
**Solution**:
```bash
rm -rf node_modules package-lock.json  # Delete existing
npm install                            # Reinstall everything
```

### ❌ Page shows "Cannot GET /"
**Problem**: Server not starting properly
**Solution**:
1. Check terminal for error messages
2. Make sure you're in the correct folder
3. Try: `npm run dev` again

## 📱 Testing the Application

Once running, test these features:

### 1. Browse Products
- Home page should show product grid
- Click on any product to see details

### 2. Place an Order
- Click "Buy Now" on any product
- Fill out checkout form (use any 10-digit mobile number)
- Submit order

### 3. View Orders
- Click "Orders" in navigation
- Should show your order history

### 4. Admin Panel
- Go to: http://localhost:5000/admin
- Password: `admin123`
- Add/edit/delete products

## 🔍 Console Logs (Email Simulation)

The email system is currently in simulation mode:

1. Open browser developer tools (F12)
2. Go to "Console" tab
3. When you place/cancel orders, you'll see email content logged there

## 📁 Project Structure Explanation

```
📁 client/              # Frontend (React)
  └── src/
      ├── components/    # Reusable UI components
      ├── pages/         # Main application pages
      ├── lib/           # Utilities and services
      └── hooks/         # Custom React hooks

📁 server/              # Backend (Express.js)
  ├── index.ts          # Main server file
  ├── routes.ts         # API endpoints
  └── storage.ts        # Data management

📁 shared/              # Shared code between frontend/backend
  └── schema.ts         # Database schemas

📄 package.json        # Project dependencies and scripts
📄 vite.config.ts      # Build configuration
📄 tailwind.config.ts  # Styling configuration
```

## 🔧 Available Scripts

After installation, you can use these commands:

```bash
npm run dev      # Start development server (what you need)
npm run build    # Build for production
npm run start    # Start production server
npm run check    # Check TypeScript types
```

## 💡 Development Tips

1. **Auto-reload**: Changes to code automatically refresh the browser
2. **Hot reload**: React components update without page refresh
3. **Console**: Check browser console (F12) for errors or logs
4. **Network**: In browser dev tools, check Network tab for API calls

## 🆘 Still Having Issues?

If you're still stuck:

1. **Check Node.js version**: Must be 18+ (`node --version`)
2. **Check if files copied correctly**: Ensure all folders exist
3. **Try a clean install**:
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```
4. **Check terminal output**: Look for specific error messages
5. **Try different port**: Edit `server/index.ts` to use port 3001 instead of 5000

## 📧 Contact & Support

If you encounter any specific error messages:
1. Copy the exact error message
2. Note which step you were on
3. Include your operating system (Windows/Mac/Linux)
4. Include Node.js version (`node --version`)

## 🎉 Success!

When everything works, you should have:
- ✅ Website running at http://localhost:5000
- ✅ Product browsing and details pages
- ✅ Working checkout process
- ✅ Orders history page
- ✅ Admin panel at /admin (password: admin123)
- ✅ Mobile-responsive design
- ✅ Console email simulation