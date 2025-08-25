#!/bin/bash

echo "📦 Creating local development package..."

# Create a directory for the local package
LOCAL_DIR="shopease-local-package"
rm -rf $LOCAL_DIR
mkdir $LOCAL_DIR

# Copy essential files and directories
echo "📁 Copying project files..."

# Copy main directories
cp -r client/ $LOCAL_DIR/
cp -r server/ $LOCAL_DIR/
cp -r shared/ $LOCAL_DIR/

# Copy configuration files
cp package.json $LOCAL_DIR/
cp package-lock.json $LOCAL_DIR/
cp tsconfig.json $LOCAL_DIR/
cp vite.config.ts $LOCAL_DIR/
cp tailwind.config.ts $LOCAL_DIR/
cp postcss.config.js $LOCAL_DIR/
cp components.json $LOCAL_DIR/
cp drizzle.config.ts $LOCAL_DIR/

# Copy documentation
cp README.md $LOCAL_DIR/
cp LOCAL_SETUP_GUIDE.md $LOCAL_DIR/
cp QUICK_START.txt $LOCAL_DIR/
cp install.sh $LOCAL_DIR/
cp install.bat $LOCAL_DIR/

# Copy .gitignore
cp .gitignore $LOCAL_DIR/

# Create .env template
cat > $LOCAL_DIR/.env << 'EOL'
# EmailJS Configuration (optional)
# Uncomment and add your credentials to enable real email sending
# VITE_EMAILJS_SERVICE_ID=your_service_id
# VITE_EMAILJS_PUBLIC_KEY=your_public_key
# VITE_EMAILJS_TEMPLATE_ID=your_template_id

# Development Configuration
NODE_ENV=development
EOL

# Create package info
cat > $LOCAL_DIR/PACKAGE_INFO.txt << 'EOL'
===============================================
     📦 SHOPEASE E-COMMERCE LOCAL PACKAGE
===============================================

This package contains everything you need to run ShopEase on your local computer.

QUICK SETUP:
1. Install Node.js 18+ from https://nodejs.org/
2. Open terminal in this folder
3. Run: npm install
4. Run: npm run dev
5. Open: http://localhost:5000

For detailed instructions, see:
- QUICK_START.txt (simple instructions)
- LOCAL_SETUP_GUIDE.md (comprehensive guide)

Admin access: /admin (password: admin123)

===============================================
EOL

echo "✅ Package created in: $LOCAL_DIR/"
echo ""
echo "To use:"
echo "1. Copy the '$LOCAL_DIR' folder to your local computer"
echo "2. Follow instructions in QUICK_START.txt"
echo ""