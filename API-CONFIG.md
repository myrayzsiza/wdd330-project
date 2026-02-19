/**
 * API CONFIGURATION & SETUP GUIDE
 * Travel Planner Application
 */

// ========================================
// LEAFLET MAPS SETUP (FREE - NO API KEY NEEDED)
// ========================================

/*
LEAFLET MIGRATION FROM GOOGLE MAPS:
The application now uses Leaflet with OpenStreetMap tiles instead of Google Maps.
This eliminates the need for API keys and reduces costs!

FEATURES:
✅ FREE to use - No API key required
✅ OpenStreetMap data - Community-maintained map data
✅ Lightweight library - Smaller bundle size than Google Maps
✅ Responsive design - Works great on mobile and desktop
✅ Open source - Customizable and transparent

IMPLEMENTATION (Already included in index.html):
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>

LEAFLET USAGE IN map.js:
- L.map() - Initialize and display map
- L.marker() - Add location markers
- L.polyline() - Draw routes between locations
- L.tileLayer() - Change map tile providers (OpenStreetMap, Stamen, etc.)
- L.featureGroup() - Group markers together
- L.latLngBounds() - Calculate map boundaries

TILE LAYER OPTIONS (All Free):
1. OpenStreetMap (Default)
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

2. Stamen Terrain
   L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.png')

3. OpenStreetMap.BlackAndWhite
   L.tileLayer('http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png')

GEOCODING (Address to Coordinates):
Uses OpenStreetMap Nominatim API (free):
https://nominatim.openstreetmap.org/search?format=json&q=ADDRESS

OPTIONAL EXTRAS:
- Leaflet.heat: Add heatmap layers
  <script src="https://unpkg.com/leaflet.heat"></script>

- Leaflet Control Search: Add search to map
- Leaflet Routing Machine: Show routes (uses free routing engines)

NO CONFIGURATION NEEDED - Just use it!
*/

// ========================================
// TRIPADVISOR API SETUP
// ========================================

/*
STEP 1: Register as Developer
1. Go to https://www.tripadvisor.com/developers
2. Click "Register" or "Sign up"
3. Complete the registration form
4. Verify your email address

STEP 2: Request API Access
1. Login to developer account
2. Go to "My Apps"
3. Click "Create New App"
4. Fill in application details:
   - App Name: "Travel Planner"
   - Website: Your domain
   - Description: Travel planning application
5. Agree to terms
6. Submit application

STEP 3: Wait for Approval
- TripAdvisor typically reviews in 24-48 hours
- Check email for approval notification
- Approval email contains your API key

STEP 4: Add Domain to Whitelist
1. In your TripAdvisor app settings
2. Add "Allowed Domains"
3. Add: localhost, 127.0.0.1, your-domain.com

STEP 5: Get API Key and API ID
- API Key: Used for authentication
- API ID: Used for location lookups
- Keep both secure!

PRICING:
Free Tier:
- 500 API calls per day
- Limited to development use

Commercial:
- Contact TripAdvisor sales
- Custom pricing based on usage

IMPLEMENTATION:
In data.js:
const TRIPADVISOR_API_KEY = 'YOUR_API_KEY';
const TRIPADVISOR_API_ID = 'YOUR_API_ID';

API Endpoints:
- Search locations: https://api.tripadvisor.com/api/internal/1.14.0/firehose
- Get reviews: https://api.tripadvisor.com/api/internal/1.14.0/location/{location_id}
- Search hotels: https://api.tripadvisor.com/api/internal/1.14.0/Hotel
*/

// ========================================
// CONFIGURATION OBJECT FOR TRAVEL PLANNER
// ========================================

const travelPlannerConfig = {
  // Leaflet Maps Configuration (FREE - No API Key Needed!)
  maps: {
    // Default zoom level (0-19)
    defaultZoom: 13,
    // Default center location [latitude, longitude]
    defaultCenter: [40.7128, -74.0060], // New York
    // Map options
    mapOptions: {
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      maxZoom: 19,
      minZoom: 2
    },
    // Tile layer options (OpenStreetMap by default - FREE)
    tileLayer: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }
  },

  // TripAdvisor Configuration
  tripAdvisor: {
    apiKey: 'YOUR_TRIPADVISOR_API_KEY',
    apiId: 'YOUR_TRIPADVISOR_API_ID',
    baseUrl: 'https://api.tripadvisor.com/api/internal/1.14.0',
    rateLimit: {
      dailyQuota: 500, // Free tier limit
      requestsPerSecond: 1
    }
  },

  // Application Settings
  app: {
    appName: 'Travel Planner',
    version: '1.0.0',
    debug: true, // Set to false in production
    environment: 'development' // or 'production'
  },

  // Cache Configuration
  cache: {
    enabled: true,
    ttl: 3600000, // 1 hour in milliseconds
    maxSize: 50 // Maximum items to cache
  },

  // UI Configuration
  ui: {
    theme: 'light', // or 'dark'
    language: 'en',
    resultsPerPage: 10,
    mapHeight: 500 // pixels
  },

  // Feature Flags
  features: {
    mapEnabled: true,
    favoritesEnabled: true,
    itineraryEnabled: true,
    darkModeEnabled: true,
    offlineModeEnabled: false, // Future
    socialSharingEnabled: false // Future
  }
};

// ========================================
// EXAMPLE API CALLS
// ========================================

/*
LEAFLET MAP EXAMPLE:
// Initialize map
const map = L.map('map').setView([40.7128, -74.0060], 13);

// Add tile layer (OpenStreetMap - Free)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

// Add marker
const marker = L.marker([40.7128, -74.0060]).addTo(map);
marker.bindPopup('New York City');

// Draw route between two points
const polyline = L.polyline([[40.7128, -74.0060], [40.7580, -73.9855]], {
  color: 'blue'
}).addTo(map);

// Fit map to bounds
map.fitBounds(polyline.getBounds());

GEOCODING EXAMPLE (Address to Coordinates):
fetch('https://nominatim.openstreetmap.org/search?format=json&q=Paris')
  .then(response => response.json())
  .then(data => {
    console.log('Latitude:', data[0].lat);
    console.log('Longitude:', data[0].lon);
  })
  .catch(error => console.error('Error:', error));

TRIPADVISOR EXAMPLE:
fetch(`${config.tripAdvisor.baseUrl}/location/search?query=Paris&key=${config.tripAdvisor.apiKey}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
*/

// ========================================
// ENVIRONMENT VARIABLES (For Production)
// ========================================

/*
Create a .env file:
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_TRIPADVISOR_API_KEY=your_key_here
VITE_TRIPADVISOR_API_ID=your_id_here
VITE_APP_ENV=production

Then import:
const gmapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const taKey = import.meta.env.VITE_TRIPADVISOR_API_KEY;
*/

// ========================================
// SECURITY BEST PRACTICES
// ========================================

/*
1. NEVER commit API keys to GitHub
   - Add .env file to .gitignore
   - Use environment variables
   - Use API key restrictions

2. ROTATE API KEYS regularly
   - Every 90 days recommended
   - Immediately if exposed

3. MONITOR API USAGE
   - Set up billing alerts
   - Use quotas and limits
   - Review API logs regularly

4. VALIDATE USER INPUT
   - Sanitize search queries
   - Reject suspicious patterns
   - Rate limit user requests

5. CORS HANDLING
   - Use backend proxy for trusted API calls
   - Implement proper CORS headers
   - Validate origins
*/

// ========================================
// DEBUGGING & TROUBLESHOOTING
// ========================================

/*
COMMON ERRORS:

1. "Google Maps is not defined"
   Solution: Check API key is in HTML script tag
            Verify API is enabled in Cloud Console
            Check network tab for failed requests

2. "Quota exceeded"
   Solution: Check your API quotas in Cloud Console
            Upgrade to paid plan if needed
            Implement caching to reduce calls

3. "Unauthorized"
   Solution: Verify API key is correct
            Check key restrictions match your domain
            Ensure API is enabled

4. "CORS error"
   Solution: Check domain is whitelisted
            Verify request headers
            Consider using backend proxy

5. "Invalid API key"
   Solution: Regenerate API key
            Check for typos or extra spaces
            Verify in correct field
*/

// ========================================
// TESTING API CONFIGURATION
// ========================================

/*
Test your Google Maps setup:
console.log('Google Maps loaded:', typeof google !== 'undefined');
console.log('Maps library:', typeof google.maps !== 'undefined');

Test your TripAdvisor:
fetch(`https://api.tripadvisor.com/api/internal/1.14.0/location/search?query=Paris&key=YOUR_KEY`)
  .then(r => r.json())
  .then(d => console.log('TripAdvisor API works:', d))
  .catch(e => console.error('TripAdvisor API error:', e));
*/

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = travelPlannerConfig;
}
