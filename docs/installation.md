# 🏗️ Installation Guide

This guide will help you set up AL-Cashier on your local machine or deploy it to a web server.

## 📋 Prerequisites

Before installing AL-Cashier, ensure you have the following:

- **Modern Web Browser**: Chrome 60+, Firefox 55+, Safari 12+, or Edge 79+
- **Local Web Server**: One of the following options:
  - VS Code with Live Server extension
  - Python 3.x
  - Node.js
  - Any other local web server

## 🚀 Local Development Setup

### Option 1: Using VS Code Live Server (Recommended)

1. **Install VS Code**
   - Download from [https://code.visualstudio.com/](https://code.visualstudio.com/)

2. **Install Live Server Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Install the extension by Ritwick Dey

3. **Clone and Setup Project**
   ```bash
   git clone https://github.com/ismaeilalrewany/alcashier.git
   cd alcashier
   ```

4. **Start the Application**
   - Open the project folder in VS Code
   - Right-click on `public/index.html`
   - Select "Open with Live Server"
   - The application will open at `http://localhost:5500`

### Option 2: Using Python

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ismaeilalrewany/alcashier.git
   cd alcashier/public
   ```

2. **Start Python Server**
   ```bash
   # Python 3.x
   python -m http.server 8000
   
   # Python 2.x (not recommended)
   python -m SimpleHTTPServer 8000
   ```

3. **Access the Application**
   - Open your browser and go to `http://localhost:8000`

### Option 3: Using Node.js

1. **Install Node.js**
   - Download from [https://nodejs.org/](https://nodejs.org/)

2. **Clone and Setup**
   ```bash
   git clone https://github.com/ismaeilalrewany/alcashier.git
   cd alcashier
   ```

3. **Start Server**
   ```bash
   npx serve public
   ```

4. **Access the Application**
   - The terminal will display the local URL (usually `http://localhost:3000`)

## 🌐 Production Deployment

### Netlify Deployment

The project includes a `netlify.toml` configuration file for easy deployment:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build settings:
     - Build command: (leave empty)
     - Publish directory: `public`
   - Click "Deploy site"

### Manual Server Deployment

1. **Upload Files**
   - Copy all files from the `public/` folder to your web server's public directory

2. **Configure Server**
   - Ensure your server supports HTML5 history API for single-page applications
   - Configure redirects as needed (refer to `netlify.toml` for examples)

## ⚙️ Configuration

### Default Users

The application comes with default user accounts for testing:

**Admin Account:**
- Username: `admin`
- Password: `1234admin`

**Cashier Account:**
- Username: `cashier`
- Password: `cashier123`

> **Important**: Change default passwords in production!

### Browser Storage

AL-Cashier uses local storage for data persistence. The following data is stored:

- User authentication tokens
- Menu categories and items
- Table configurations
- Order history
- User preferences (theme, language)

### Supported Languages

- **Arabic** (العربية) - Default
- **English** - Secondary

Language switching is available in the navigation bar.

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - **Problem**: Browser blocks file access when opening HTML directly
   - **Solution**: Always use a local web server (Live Server, Python, etc.)

2. **Missing Icons**
   - **Problem**: Font Awesome icons not loading
   - **Solution**: Ensure all files in `assets/webfonts/` are properly uploaded

3. **JavaScript Modules Not Loading**
   - **Problem**: ES6 modules require a server environment
   - **Solution**: Use HTTPS or localhost, never `file://` protocol

4. **Arabic Text Issues**
   - **Problem**: Arabic text not displaying correctly
   - **Solution**: Ensure UTF-8 encoding and RTL CSS is loaded

### Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 12+ | Full support |
| Edge | 79+ | Full support |
| IE | Not supported | Use modern browsers |

## 📱 Mobile Considerations

AL-Cashier is fully responsive and works on mobile devices:

- **iOS**: Safari 12+ or Chrome 60+
- **Android**: Chrome 60+ or Firefox 55+
- **Touch Interface**: Optimized for touch interactions
- **Viewport**: Properly configured for mobile screens

## 🔒 Security Notes

1. **HTTPS Recommended**: Use HTTPS in production for secure data transmission
2. **Local Storage**: Sensitive data is stored locally - ensure device security
3. **User Authentication**: Implement proper session management for production use
4. **Regular Updates**: Keep the application updated with security patches

## 📊 Performance Optimization

### Recommended Settings

1. **Gzip Compression**: Enable on your web server
2. **Caching**: Set appropriate cache headers for static assets
3. **CDN**: Consider using a CDN for better global performance
4. **Minification**: Already optimized for production

### Monitoring

Monitor the following metrics:
- Page load time
- JavaScript execution time
- Local storage usage
- Network requests

---

**Next Steps**: After installation, check out the [User Guide](user-guide.md) to learn how to use AL-Cashier effectively.
