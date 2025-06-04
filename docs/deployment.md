# 🚀 Deployment Guide

This guide covers deploying AL-Cashier to various hosting platforms.

## 🌐 Netlify Deployment (Recommended)

Best for static sites with automatic GitHub integration.

### Automatic Deployment

1. **Connect to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Import your GitHub repository
   - Build command: Leave empty
   - Publish directory: `public`

2. **Configure Redirects**
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   /login    /login.html    200
   /register    /register.html    200
   /menu    /menu.html    200
   /reports    /report.html    200
   /profile    /profile.html    200
   /order    /order.html    200
   /details    /details.html    200
   /404    /404.html    200
   ```

### Manual Deployment

```cmd
npm install -g netlify-cli
netlify deploy --dir=public --prod
```

## 🔥 Firebase Hosting

Excellent performance and global CDN.

### Setup

1. **Install and Initialize**
   ```cmd
   npm install -g firebase-tools
   firebase init hosting
   ```

2. **Configure** (`firebase.json`)
   ```json
   {
     "hosting": {
       "public": "public",
       "rewrites": [
         {"source": "/login", "destination": "/login.html"},
         {"source": "/register", "destination": "/register.html"},
         {"source": "/menu", "destination": "/menu.html"},
         {"source": "/reports", "destination": "/report.html"},
         {"source": "/profile", "destination": "/profile.html"},
         {"source": "/order", "destination": "/order.html"},
         {"source": "/details", "destination": "/details.html"}
       ]
     }
   }
   ```

3. **Deploy**
   ```cmd
   firebase deploy
   ```

## 🌊 Vercel Deployment

Fast deployment with excellent developer experience.

### Quick Deploy

1. **Connect Repository**
   - Visit [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Root directory: `public`
   - Build command: Leave empty

2. **Configure Routes** (`vercel.json`)
   ```json
   {
     "routes": [
       {"src": "/login", "dest": "/login.html"},
       {"src": "/register", "dest": "/register.html"},
       {"src": "/menu", "dest": "/menu.html"},
       {"src": "/reports", "dest": "/report.html"},
       {"src": "/profile", "dest": "/profile.html"},
       {"src": "/order", "dest": "/order.html"},
       {"src": "/details", "dest": "/details.html"},
       {"src": "/(.*)", "dest": "/404.html", "status": 404}
     ]
   }
   ```

## 📄 GitHub Pages

Free hosting for public repositories.

### Enable GitHub Pages

1. **Repository Settings**
   - Go to Settings → Pages
   - Source: GitHub Actions

2. **Create Workflow** (`.github/workflows/pages.yml`)
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/configure-pages@v2
         - uses: actions/upload-pages-artifact@v1
           with:
             path: ./public
         - uses: actions/deploy-pages@v1
   ```

## 🖥️ Traditional Web Server

Deploy to Apache, Nginx, or IIS.

### Apache Configuration

`.htaccess` in public folder:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Handle specific routes
RewriteRule ^login/?$ login.html [L]
RewriteRule ^register/?$ register.html [L]
RewriteRule ^menu/?$ menu.html [L]
RewriteRule ^reports/?$ report.html [L]
RewriteRule ^profile/?$ profile.html [L]
RewriteRule ^order/?$ order.html [L]
RewriteRule ^details/?$ details.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css text/js application/javascript application/json
</IfModule>
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/alcashier/public;
    index index.html;

    # Handle routes
    location = /login { try_files /login.html =404; }
    location = /register { try_files /register.html =404; }
    location = /menu { try_files /menu.html =404; }
    location = /reports { try_files /report.html =404; }
    location = /profile { try_files /profile.html =404; }
    location = /order { try_files /order.html =404; }
    location = /details { try_files /details.html =404; }

    # Assets caching
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

## 🐳 Docker Deployment

For containerized deployments.

### Dockerfile

```dockerfile
FROM nginx:alpine
COPY public/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### Build and Run

```cmd
docker build -t alcashier .
docker run -d -p 8080:80 alcashier
```

## ⚡ Performance Optimization

### Essential Optimizations

1. **Enable Compression**: Gzip/Brotli for text files
2. **Set Cache Headers**: Long-term caching for assets
3. **Optimize Images**: Use WebP format where possible
4. **Minification**: CSS/JS already minified

### Monitoring

Add analytics to track usage:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Troubleshooting

### Common Issues

1. **404 on Refresh**: Configure server redirects for SPA routing
2. **Assets Not Loading**: Check file paths and CORS headers
3. **Mobile Issues**: Verify responsive design and touch interactions

### Deployment Checklist

- ✅ All files uploaded correctly
- ✅ Server configuration applied
- ✅ HTTPS enabled
- ✅ All routes accessible
- ✅ Assets loading properly
- ✅ Mobile responsiveness working
- ✅ Performance optimized

---

**Ready for Production!** 🎉

Choose the deployment method that best fits your needs. Netlify is recommended for its simplicity and automatic deployments.
