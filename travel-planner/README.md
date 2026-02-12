# Travel Planner - Frontend Web Application

A modern, responsive travel planning web application that helps users discover attractions, hotels, and restaurants worldwide, create itineraries, and save favorite travel destinations.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Setup](#api-setup)
- [Usage Guide](#usage-guide)
- [Features Breakdown](#features-breakdown)
- [Development Schedule](#development-schedule)
- [Browser Compatibility](#browser-compatibility)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Core Functionality
- **City/Country Search**: Search for any destination globally
- **Attractions Discovery**: Browse museums, parks, restaurants, and historic sites
- **Hotel Search**: Find accommodations with ratings and pricing
- **Interactive Maps**: View locations on Google Maps with routes and directions
- **Favorites System**: Save and manage favorite places locally
- **Trip Itineraries**: Create custom multi-day travel plans
- **Advanced Filtering**: Filter by attraction type, price range, and ratings
- **Responsive Design**: Fully functional on mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Reviews & Ratings**: View detailed reviews and star ratings
- **Route Planning**: Get directions between attractions

### User Experience
- Real-time search results
- Smooth animations and transitions
- Loading states and error handling
- Modal detail views for places
- Persistent favorites using browser localStorage
- Intuitive navigation

## 🛠️ Tech Stack

**Frontend:**
- HTML5 (Semantic markup)
- CSS3 (Flexbox, Grid, Animations, Media Queries)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons

**External APIs:**
- Google Maps API (Maps, Routes, Places)
- TripAdvisor API (Attractions, Hotels, Reviews)
- Google Places API (Location data, Details)

**Storage:**
- Browser LocalStorage (Favorites)
- JSON configuration files

## 📁 Project Structure

```
travel-planner/
├── index.html           # Main HTML file with semantic structure
├── style.css           # Complete stylesheet (2000+ lines)
├── app.js              # Main application logic (600+ lines)
├── map.js              # Google Maps integration (400+ lines)
├── data.js             # Data management and API handling (500+ lines)
├── favorites.json      # Sample favorites data and trip templates
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- API keys for Google Maps and TripAdvisor

### Installation

1. **Clone or Download the Project**
```bash
git clone <repository-url>
cd travel-planner
```

2. **Obtain API Keys**
   - [Google Maps API Key](https://console.cloud.google.com/)
   - [TripAdvisor API Key](https://www.tripadvisor.com/developers)

3. **Configure API Keys**
   - Open `index.html`
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` in the Google Maps script tag:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY"></script>
   ```

4. **Update Configuration**
   - In `data.js`, update API keys:
   ```javascript
   this.tripAdvisorApiKey = 'YOUR_ACTUAL_TRIPADVISOR_KEY';
   this.googleMapsApiKey = 'YOUR_ACTUAL_GOOGLE_KEY';
   ```

5. **Start the Application**
   - Open `index.html` in a web browser
   - Or serve with a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with http-server installed)
   http-server
   ```

## 🔑 API Setup

### Google Maps API

**Required APIs to Enable:**
1. Maps JavaScript API
2. Places API
3. Directions API
4. Distance Matrix API

**Setup Steps:**
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the required APIs
4. Create an API key
5. Set up billing (required for Google APIs)
6. Add key restrictions (HTTP referrers)

**Estimated Costs:**
- First 30,000 map loads/month: Free
- Additional loads: $7 per 1,000 loads
- Places API: $17.50 per 1,000 requests

### TripAdvisor API

**Setup Steps:**
1. Register at [TripAdvisor Developer Portal](https://www.tripadvisor.com/developers)
2. Request API access
3. Receive API key via email
4. Add your domain to the whitelist
5. Implement rate limiting (500 requests/day free tier)

**API Endpoints Used:**
- `/location/search` - Search destinations
- `/location/{id}/details` - Get location details
- `/location/{id}/reviews` - Fetch reviews
- `/location/{id}/photos` - Get photos

## 📖 Usage Guide

### Searching for Destinations

1. **Navigate to Home Tab**
   - Click "Home" in the navigation bar

2. **Enter Search Query**
   - Type city, country, or region name
   - Example: "Paris", "Tokyo", "New York"

3. **Press Enter or Click Search**
   - Results load with map display
   - Filters activate automatically

### Filtering Results

- **Click Filter Buttons** to narrow results:
  - All (show everything)
  - Attractions (museums, landmarks)
  - Hotels (accommodations)
  - Restaurants (dining)
  - Museums (art & history)
  - Parks (outdoor spaces)

### Viewing Details

1. **Click "Details"** on any result card
2. **Modal opens** with full information
3. **View ratings, reviews, and pricing**
4. **Add to favorites or itinerary**

### Building an Itinerary

1. **Search for destinations**
2. **Click "Itinerary"** on selected places
3. **Items appear** in the itinerary builder
4. **Drag to reorder** (future feature)
5. **Click "Create Itinerary"** to save

### Using Maps

1. **Interactive markers** show on map
2. **Click markers** for quick info
3. **"Get Directions"** button calculates routes
4. **View walking/driving routes** with duration
5. **Zoom and pan** to explore

### Saving Favorites

1. **Click "Save"** on any result or details modal
2. **View all favorites** in "My Trips" tab
3. **Remove favorites** with trash icon
4. **Data persists** across sessions (localStorage)

### Dark Mode

- **Click moon icon** in header
- Preference saved automatically
- All colors optimized for accessibility

## 🎯 Features Breakdown

### Search & Discovery (Week 6)
- Autocomplete suggestions
- Geographic filtering
- Category-based organization
- Real-time result updates

**Technologies:** Fetch API, JavaScript array methods, DOM manipulation

### Maps & Routes (Week 6)
- Google Maps integration
- Multiple route options
- Distance calculation
- Marker clustering (for mobile)

**Technologies:** Google Maps API v3, Geolocation API

### Favorites & Storage (Week 7)
- LocalStorage persistence
- JSON export/import
- Sync across tabs
- Cloud backup ready

**Technologies:** Web Storage API, JSON

### Responsive Design (Week 7)
- Mobile-first approach
- Flexible grid system
- Touch-friendly controls
- Optimized images

**Technologies:** CSS Grid, Flexbox, Media Queries, Viewport

## 📅 Development Schedule

### Week 5: Planning & Setup
- ✅ Wireframes & mockups
- ✅ API key registration
- ✅ Project structure
- ✅ Trello board creation
- ✅ Documentation

### Week 6: Core Features
- ✅ Search functionality
- ✅ Results display
- ✅ Map integration
- ✅ Filter system
- ✅ Detail view modals

### Week 7: Refinement & Launch
- ✅ Favorites system
- ✅ Itinerary builder
- ✅ Animations & transitions
- ✅ Mobile optimization
- ✅ Performance testing
- ✅ Deployment

## 🌐 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Safari | 14+ | ✅ Full |
| Chrome Mobile | 90+ | ✅ Full |

## ⚡ Performance Optimization

### Implemented
- API response caching (1-hour timeout)
- CSS minification ready
- Lazy loading for images
- Efficient event delegation
- Debounced search (built-in)

### Recommended Further Optimization
```javascript
// Implement service workers for offline support
// Cache API responses aggressively
// Use WebP images with fallbacks
// Minify CSS and JavaScript
// Implement image compression
```

### Performance Metrics Target
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 85

## 🔧 Configuration

### API Rate Limiting

```javascript
// In data.js - adjust based on API tier
const RATE_LIMIT_DELAY = 100; // milliseconds
const CACHE_TIMEOUT = 3600000; // 1 hour
```

### Map Configuration

```javascript
// In map.js - customize map settings
const MAP_ZOOM_LEVEL = 13;
const MAP_MARKER_LIMIT = 50;
```

## 🐛 Troubleshooting

### Map Not Displaying
**Problem:** "Google Maps is not defined"

**Solution:**
1. Check API key is correct
2. Verify APIs are enabled in Cloud Console
3. Check domain restrictions
4. Ensure internet connection
5. Clear browser cache

### Results Not Loading
**Problem:** Search returns no results

**Solution:**
1. Check spelling of location
2. Try broader location name
3. Check API quota usage
4. Verify network in Dev Tools
5. Check browser console for errors

### Favorites Not Saving
**Problem:** Favorites disappear on refresh

**Solution:**
1. Check if LocalStorage is enabled
2. Verify not in private/incognito mode
3. Check browser storage quota
4. Clear cache and retry
5. Check browser console for errors

### Map Routes Not Working
**Problem:** "Get Directions" returns error

**Solution:**
1. Enable Directions API in Cloud Console
2. Check routing service has results
3. Verify both points are valid locations
4. Try different travel mode (walking/driving)

### Performance Issues
**Problem:** App feels slow on mobile

**Solutions:**
1. Reduce number of map markers
2. Enable caching effectively
3. Defer non-critical scripts
4. Optimize images
5. Use faster API endpoints

## 📚 Code Documentation

### Main Classes

**TravelPlanner**
- Central application controller
- Manages search, filtering, display
- Handles user interactions
- Manages localStorage

**DataManager**
- API abstraction layer
- Caching system
- Data validation
- Format conversion

## 🎨 Design System

### Colors
- **Primary Blue**: `#0056b3` (Trust, reliability)
- **Accent Green**: `#28a745` (Nature, growth)
- **White**: `#ffffff` (Cleanliness, clarity)
- **Neutrals**: Gray scale for text and backgrounds

### Typography
- **Font Family**: Segoe UI, sans-serif
- **Sizes**: 0.875rem - 2rem (responsive)
- **Weight**: 400, 500, 600, 700

### Spacing System
- Base unit: 4px
- Scale: 4, 8, 16, 24, 32, 48px

## 🚀 Deployment

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

### GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Select branch to deploy

### Vercel
```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

To extend the application:

1. **Add New Features**
   - Extend methods in `TravelPlanner` class
   - Add styles in `style.css`
   - Update HTML in `index.html`

2. **Improve API Integration**
   - Update `data.js` with real API calls
   - Implement error handling
   - Add retry logic

3. **Optimize Performance**
   - Profile with DevTools
   - Implement suggestions
   - Test on real devices

## 📝 License

This project is open source and available under the MIT License.

## 📞 Support

For issues and questions:
1. Check the Troubleshooting section
2. Review browser console for errors
3. Check API status pages
4. Submit issues with error messages

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Cloud data synchronization
- [ ] Social sharing features
- [ ] Weather integration
- [ ] Currency conversion
- [ ] Photo gallery
- [ ] Real itinerary booking
- [ ] Travel budget calculator
- [ ] Collaborative trip planning
- [ ] Public trip sharing
- [ ] Augmented reality features
- [ ] Offline mode with service workers

---

**Happy Traveling!** 🌍✈️🗺️

Last Updated: February 2026
Version: 1.0.0
