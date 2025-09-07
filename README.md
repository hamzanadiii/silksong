# Hollow Knight: Silksong Mobile Landing Page

A high-converting, premium landing page designed for Hollow Knight: Silksong Mobile with dark, mystical aesthetics and optimized conversion funnels.

## 🎮 Features

- **Device Detection**: Automatically detects iOS/Android and displays appropriate CTA colors
- **Responsive Design**: Mobile-first design optimized for all devices
- **Interactive Carousel**: Touch/swipe enabled screenshot carousel with auto-advance
- **Video Integration**: Autoplay hero video with fallback to animated gradient
- **CPA Locker Ready**: Integrated loading modal ready for CPA locker integration
- **Performance Optimized**: <3s load time, lazy loading, service worker caching
- **Smooth Animations**: Subtle glow effects, pulse animations, and smooth scrolling

## 📁 Project Structure

```
hollowknight/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with dark theme
├── script.js           # JavaScript functionality
├── sw.js              # Service worker for performance
├── assets/            # Media files (add your content here)
│   ├── silksong-gameplay.mp4     # Hero background video
│   ├── silksong-trailer.mp4      # Game trailer
│   ├── trailer-poster.jpg        # Video poster image
│   ├── screenshot1.jpg           # Mobile screenshot 1
│   ├── screenshot2.jpg           # Mobile screenshot 2
│   ├── screenshot3.jpg           # Mobile screenshot 3
│   └── screenshot4.jpg           # Mobile screenshot 4
└── README.md          # This file
```

## 🎨 Design Specifications

### Colors
- **Background**: `#0B0C10` (deep black/blue)
- **CTA Green** (Android): `#1DB954` 
- **CTA Blue** (iOS): `#3B82F6`
- **Text White**: `#FFFFFF`
- **Text Muted**: `#B3B3B3`

### Fonts
- **Headings**: Cinzel Decorative (fantasy RPG vibe)
- **Body Text**: Inter (clean, modern)

### Animations
- Pulsing CTA buttons with glow effects
- Animated gradient background fallback
- Smooth scroll and carousel transitions
- Loading progress bar animation

## 🚀 Setup Instructions

1. **Add Media Assets**: Replace placeholder references in `assets/` folder:
   - `silksong-gameplay.mp4`: Hero background video (recommended: 1920x1080, <5MB)
   - `silksong-trailer.mp4`: Game trailer (recommended: 16:9 aspect ratio)
   - `trailer-poster.jpg`: Poster image for trailer
   - `screenshot1-4.jpg`: Mobile gameplay screenshots

2. **Configure CPA Locker**: 
   - Edit `script.js` function `triggerCPALocker()`
   - Replace the alert with your CPA locker integration code
   - Update the download URLs in `startDownload()`

3. **Deploy**:
   - Upload all files to your web server
   - Ensure HTTPS for video autoplay
   - Test on multiple devices and browsers

## 📱 Mobile Optimization

- **Performance**: Service worker caching, lazy loading, optimized animations
- **Touch Support**: Swipe gestures for carousel, touch-friendly buttons
- **Viewport**: Proper scaling and responsive breakpoints
- **Loading**: Progressive enhancement with fallbacks

## 🔧 Customization

### CTA Button Colors
Device detection automatically applies:
- Green (`#1DB954`) for Android devices
- Blue (`#3B82F6`) for iOS devices

### Video Fallback
If hero video fails to load, animated gradient background displays automatically.

### Analytics Integration
Uncomment and configure analytics in `script.js`:
- Google Analytics (gtag)
- Facebook Pixel (fbq)
- Custom event tracking

## 🎯 Conversion Optimization

### User Flow
1. **Hero Impact**: Full-screen video + compelling copy
2. **Trust Building**: Official branding, premium feel  
3. **Social Proof**: Gameplay screenshots, features
4. **Urgency**: "Early Access" messaging
5. **Action**: Prominent, device-specific CTAs

### A/B Testing Ready
- Easy CTA text/color modifications
- Modular sections for testing
- Analytics event tracking built-in

## ⚡ Performance Features

- **<3s Load Time**: Optimized assets, lazy loading
- **Service Worker**: Caching for return visits
- **Reduced Motion**: Respects user accessibility preferences
- **Progressive Enhancement**: Works without JavaScript

## 🔒 CPA Integration

The `triggerCPALocker()` function is ready for your CPA service:

```javascript
function triggerCPALocker() {
    // Replace with your CPA locker service
    CPALocker.show({
        onComplete: function() {
            startDownload();
        }
    });
}
```

## 📊 Built-in Analytics

Track key conversion events:
- Hero CTA clicks
- Download button clicks
- Video plays
- Carousel interactions
- JavaScript errors

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Fallbacks**: Graceful degradation for older browsers

## 📈 SEO Optimized

- Semantic HTML structure
- Meta tags and Open Graph
- Mobile-friendly viewport
- Accessible markup

---

**Ready to convert visitors into downloads!** 🎮✨