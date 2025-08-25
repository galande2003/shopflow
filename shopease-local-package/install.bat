@echo off
echo 🛍️  ShopEase E-Commerce Setup
echo ==============================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo Minimum version required: 18.x
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo.

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies!
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully!
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    (
        echo # EmailJS Configuration ^(optional^)
        echo # VITE_EMAILJS_SERVICE_ID=your_service_id
        echo # VITE_EMAILJS_PUBLIC_KEY=your_public_key
        echo # VITE_EMAILJS_TEMPLATE_ID=your_template_id
    ) > .env
    echo ✅ .env file created
)

echo.
echo 🎉 Setup complete!
echo.
echo To start the development server:
echo   npm run dev
echo.
echo Then open http://localhost:5000 in your browser
echo.
echo Admin access: /admin ^(password: admin123^)
echo.
pause