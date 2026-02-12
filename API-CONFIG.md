/**
 * API CONFIGURATION & SETUP GUIDE
 * Travel Planner Application
 */

// ========================================
// GOOGLE MAPS API SETUP
// ========================================

/*
STEP 1: Create a Google Cloud Project
1. Navigate to https://console.cloud.google.com/
2. Click on the project dropdown
3. Click "NEW PROJECT"
4. Enter "Travel Planner" as the project name
5. Click "CREATE"

STEP 2: Enable Required APIs
1. In the Cloud Console, go to "APIs & Services" > "Library"
2. Search for and enable these APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Distance Matrix API
   - Geocoding API (optional)

3. For each API:
   - Click the API name
   - Click "ENABLE"
   - Wait for confirmation

STEP 3: Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS"
3. Choose "API Key"
4. Copy the API key

STEP 4: Restrict API Key (Recommended)
1. In Credentials page, click on your API key
2. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add your domain (e.g., localhost:8000, example.com)
3. Under "API restrictions":
   - Select "Restrict key"
   - Select only the APIs you enabled
4. Click "SAVE"

STEP 5: Enable Billing
1. Go to "Billing" in Cloud Console
2. Link a billing account
3. Set up a budget alert (recommended)

PRICING:
- Maps: $7.00 per 1000 loads (after 28,000 free loads/month)
- Places: $17.50 per 1000 requests (after 25,000 free/month)
- Directions: $5.00 per 1000 requests (after 25,000 free/month)

IMPLEMENTATION:
Add this to index.html:
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,geometry"></script>

In map.js, the app uses:
- google.maps.Map for display
- google.maps.Marker for locations
- google.maps.DirectionsService for routes
- google.maps.PlacesService for place info
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
  // Google Maps Configuration
  googleMaps: {
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    defaultZoom: 13,
    defaultCenter: { lat: 40.7128, lng: -74.0060 }, // New York
    mapOptions: {
      zoomControl: true,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      maxZoom: 20,
      minZoom: 2
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
GOOGLE MAPS EXAMPLE:
const map = new google.maps.Map(document.getElementById('map'), {
  zoom: 10,
  center: { lat: 40.7128, lng: -74.0060 }
});

const marker = new google.maps.Marker({
  position: { lat: 40.7128, lng: -74.0060 },
  map: map,
  title: 'New York'
});

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
