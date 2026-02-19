/**
 * TRAVEL PLANNER - API Integration Module
 * Handles TripAdvisor, Google Maps, and Weather APIs
 * Includes caching and error handling
 */

class APIManager {
    constructor() {
        this.endpoints = {
            // TripAdvisor API v3
            tripAdvisor: {
                baseUrl: 'https://api.tripadvisor.com/v3',
                locations: '/locations/search',
                details: '/location/{id}/details',
                reviews: '/location/{id}/reviews'
            },
            // OpenWeather API
            weather: {
                baseUrl: 'https://api.openweathermap.org/data/2.5',
                current: '/weather',
                forecast: '/forecast'
            },
            // Google Maps API (used via library)
            googleMaps: {
                baseUrl: 'https://maps.googleapis.com/maps/api'
            }
        };

        this.apiKeys = {
            tripAdvisor: 'YOUR_TRIPADVISOR_API_KEY',
            openWeather: 'YOUR_OPENWEATHER_API_KEY',
            googleMaps: 'YOUR_GOOGLE_MAPS_API_KEY'
        };

        this.cache = new Map();
        this.cacheTimeout = 3600000; // 1 hour
    }

    // ==================== CACHE MANAGEMENT ====================

    /**
     * Get from cache
     * @param {string} key
     * @returns {any|null}
     */
    getFromCache(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;

        // Check if expired
        if (Date.now() - cached.timestamp > this.cacheTimeout) {
            this.cache.delete(key);
            return null;
        }

        return cached.data;
    }

    /**
     * Set cache
     * @param {string} key
     * @param {any} data
     */
    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    }

    // ==================== TRIPADVISOR API ====================

    /**
     * Search locations (TripAdvisor API)
     * Returns array with 8+ attributes
     * @param {string} query - Search query
     * @param {string} category - Category filter (hotels, attractions, restaurants)
     * @returns {Promise<array>}
     */
    async searchDestinations(query, category = 'attractions') {
        try {
            // Validate input
            if (!query || query.trim() === '') {
                throw new Error('Search query cannot be empty');
            }

            const cacheKey = `destination_${query}_${category}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;

            // In production, make real API call:
            // const response = await fetch(
            //     `${this.endpoints.tripAdvisor.baseUrl}${this.endpoints.tripAdvisor.locations}`,
            //     {
            //         method: 'GET',
            //         headers: {
            //             'Accept': 'application/json',
            //             'X-TripAdvisor-API-Key': this.apiKeys.tripAdvisor
            //         },
            //         params: {
            //             searchQuery: query,
            //             category: category
            //         }
            //     }
            // );
            // const data = await response.json();

            // Demo data with 8+ attributes
            const mockData = this.generateMockDestinations(query, category);
            this.setCache(cacheKey, mockData);
            return mockData;
        } catch (error) {
            console.error('Error searching destinations:', error);
            return [];
        }
    }

    /**
     * Get destination details
     * @param {string|number} destinationId
     * @returns {Promise<object>}
     */
    async getDestinationDetails(destinationId) {
        try {
            const cacheKey = `destination_details_${destinationId}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;

            // In production:
            // const response = await fetch(
            //     `${this.endpoints.tripAdvisor.baseUrl}${this.endpoints.tripAdvisor.details}`.replace('{id}', destinationId),
            //     {
            //         headers: { 'X-TripAdvisor-API-Key': this.apiKeys.tripAdvisor }
            //     }
            // );

            const mockData = this.generateMockDestinationDetails(destinationId);
            this.setCache(cacheKey, mockData);
            return mockData;
        } catch (error) {
            console.error('Error fetching destination details:', error);
            return null;
        }
    }

    /**
     * Get reviews for a destination
     * @param {string|number} destinationId
     * @param {number} limit
     * @returns {Promise<array>}
     */
    async getDestinationReviews(destinationId, limit = 10) {
        try {
            const cacheKey = `reviews_${destinationId}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;

            // In production:
            // const response = await fetch(
            //     `${this.endpoints.tripAdvisor.baseUrl}${this.endpoints.tripAdvisor.reviews}`.replace('{id}', destinationId),
            //     {
            //         headers: { 'X-TripAdvisor-API-Key': this.apiKeys.tripAdvisor },
            //         params: { limit }
            //     }
            // );

            const mockData = this.generateMockReviews(destinationId, limit);
            this.setCache(cacheKey, mockData);
            return mockData;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return [];
        }
    }

    // ==================== WEATHER API ====================

    /**
     * Get current weather for location
     * @param {string} location - City name or coordinates
     * @param {string} units - Metric, imperial, or standard
     * @returns {Promise<object>}
     */
    async getCurrentWeather(location, units = 'metric') {
        try {
            if (!location || location.trim() === '') {
                throw new Error('Location cannot be empty');
            }

            const cacheKey = `weather_current_${location}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;

            // In production:
            // const response = await fetch(
            //     `${this.endpoints.weather.baseUrl}${this.endpoints.weather.current}?q=${location}&units=${units}&appid=${this.apiKeys.openWeather}`
            // );
            // const data = await response.json();

            const mockData = this.generateMockWeather(location, units);
            this.setCache(cacheKey, mockData);
            return mockData;
        } catch (error) {
            console.error('Error fetching weather:', error);
            return null;
        }
    }

    /**
     * Get weather forecast
     * @param {string} location
     * @param {string} units
     * @returns {Promise<object>}
     */
    async getWeatherForecast(location, units = 'metric') {
        try {
            const cacheKey = `weather_forecast_${location}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;

            // In production:
            // const response = await fetch(
            //     `${this.endpoints.weather.baseUrl}${this.endpoints.weather.forecast}?q=${location}&units=${units}&appid=${this.apiKeys.openWeather}`
            // );

            const mockData = this.generateMockForecast(location, units);
            this.setCache(cacheKey, mockData);
            return mockData;
        } catch (error) {
            console.error('Error fetching forecast:', error);
            return null;
        }
    }

    // ==================== GOOGLE MAPS HELPERS ====================

    /**
     * Geocode address to coordinates
     * Requires Google Maps API loaded in HTML
     * @param {string} address
     * @returns {Promise<object|null>}
     */
    async geocodeAddress(address) {
        try {
            if (typeof google === 'undefined' || !google.maps) {
                throw new Error('Google Maps API not loaded');
            }

            const geocoder = new google.maps.Geocoder();
            return new Promise((resolve, reject) => {
                geocoder.geocode({ address }, (results, status) => {
                    if (status === 'OK') {
                        resolve({
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng(),
                            formattedAddress: results[0].formatted_address
                        });
                    } else {
                        reject(new Error(`Geocoding failed: ${status}`));
                    }
                });
            });
        } catch (error) {
            console.error('Geocoding error:', error);
            return null;
        }
    }

    /**
     * Create map marker
     * @param {object} map - Google Map instance
     * @param {object} location - {lat, lng}
     * @param {object} options - Marker options
     * @returns {google.maps.Marker}
     */
    createMapMarker(map, location, options = {}) {
        if (typeof google === 'undefined' || !google.maps) {
            console.error('Google Maps API not loaded');
            return null;
        }

        const markerOptions = {
            position: location,
            map: map,
            title: options.title || 'Destination',
            ...options
        };

        return new google.maps.Marker(markerOptions);
    }

    /**
     * Calculate route and display on map
     * @param {object} map
     * @param {object} origin - {lat, lng}
     * @param {object} destination - {lat, lng}
     * @returns {Promise<object>}
     */
    async calculateRoute(map, origin, destination) {
        try {
            if (typeof google === 'undefined' || !google.maps) {
                throw new Error('Google Maps API not loaded');
            }

            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({ map });

            return new Promise((resolve, reject) => {
                directionsService.route(
                    {
                        origin,
                        destination,
                        travelMode: google.maps.TravelMode.DRIVING
                    },
                    (result, status) => {
                        if (status === 'OK') {
                            directionsRenderer.setDirections(result);
                            resolve(result);
                        } else {
                            reject(new Error(`Directions request failed: ${status}`));
                        }
                    }
                );
            });
        } catch (error) {
            console.error('Route calculation error:', error);
            return null;
        }
    }

    // ==================== MOCK DATA GENERATORS ====================

    /**
     * Generate mock destination data (8+ attributes)
     * @param {string} query
     * @param {string} category
     * @returns {array}
     */
    generateMockDestinations(query, category) {
        const types = ['attraction', 'hotel', 'restaurant', 'museum', 'park'];
        const destinations = [];

        for (let i = 1; i <= 12; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            destinations.push({
                id: i,
                name: `${query} ${type.charAt(0).toUpperCase() + type.slice(1)} ${i}`,
                type: type,
                location: query,
                description: `A wonderful ${type} offering great experiences and memories in ${query}.`,
                address: `${i} Main Street, ${query}, Country`,
                rating: (Math.random() * 2 + 3).toFixed(1),
                reviews: Math.floor(Math.random() * 5000 + 100),
                priceLevel: ['$', '$$', '$$$'][Math.floor(Math.random() * 3)],
                openingHours: '9:00 AM - 9:00 PM',
                imageUrl: `https://via.placeholder.com/300x200?text=${query}+${i}`,
                website: `https://example.com/${type}${i}`,
                phone: '+1 (555) 123-' + String(i).padStart(4, '0'),
                distance: (Math.random() * 15).toFixed(1),
                verified: Math.random() > 0.5
            });
        }

        return destinations.filter(d => category === 'all' || d.type === category);
    }

    /**
     * Generate mock destination details
     * @param {string|number} destinationId
     * @returns {object}
     */
    generateMockDestinationDetails(destinationId) {
        return {
            id: destinationId,
            name: `Destination ${destinationId}`,
            type: 'attraction',
            description: 'A world-class destination offering unforgettable experiences.',
            fullDescription: 'This is a comprehensive description of the destination with rich details about what makes it special, historical significance, and visitor information.',
            address: `${destinationId} Main Street, City, Country`,
            phone: '+1 (555) 123-4567',
            website: 'https://example.com',
            hours: 'Mon-Sun: 9AM-9PM',
            rating: 4.7,
            reviews: 2341,
            price: '$$',
            amenities: ['WiFi', 'Parking', 'Restaurant', 'Gift Shop', 'Guided Tours'],
            accessibility: ['Wheelchair Accessible', 'Elevator', 'Accessible Restrooms'],
            coordinates: { lat: 40.7128, lng: -74.0060 },
            nearbyTransport: 'Subway Station 5 mins walk',
            bestTime: 'Early morning or late afternoon',
            duration: '2-3 hours'
        };
    }

    /**
     * Generate mock reviews
     * @param {string|number} destinationId
     * @param {number} limit
     * @returns {array}
     */
    generateMockReviews(destinationId, limit) {
        const reviews = [];
        const titles = [
            'Amazing experience!',
            'Worth visiting',
            'Beautiful location',
            'Great service',
            'Exceeded expectations'
        ];

        for (let i = 0; i < limit; i++) {
            reviews.push({
                id: i + 1,
                author: `Traveler${i + 1}`,
                rating: Math.floor(Math.random() * 2 + 4),
                title: titles[i % titles.length],
                text: 'This was an incredible experience. The destination offers everything and more.',
                date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                helpful: Math.floor(Math.random() * 100),
                verified: Math.random() > 0.3
            });
        }

        return reviews;
    }

    /**
     * Generate mock weather data
     * @param {string} location
     * @param {string} units
     * @returns {object}
     */
    generateMockWeather(location, units) {
        const temp = Math.floor(Math.random() * 30 + 5);
        const conditions = ['Clear', 'Cloudy', 'Rainy', 'Partly Cloudy'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];

        return {
            location: location,
            temperature: temp,
            condition: condition,
            humidity: Math.floor(Math.random() * 50 + 40),
            windSpeed: Math.floor(Math.random() * 15 + 5),
            feelsLike: temp - 2,
            pressure: 1013,
            visibility: 10,
            uvIndex: Math.floor(Math.random() * 8 + 2),
            unit: units,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Generate mock weather forecast
     * @param {string} location
     * @param {string} units
     * @returns {object}
     */
    generateMockForecast(location, units) {
        const forecast = {
            location: location,
            unit: units,
            forecast: []
        };

        for (let day = 0; day < 5; day++) {
            const date = new Date();
            date.setDate(date.getDate() + day);
            
            forecast.forecast.push({
                date: date.toISOString().split('T')[0],
                tempHigh: Math.floor(Math.random() * 20 + 15),
                tempLow: Math.floor(Math.random() * 10 + 5),
                condition: ['Clear', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
                humidity: Math.floor(Math.random() * 50 + 40),
                windSpeed: Math.floor(Math.random() * 15 + 5),
                rainChance: Math.floor(Math.random() * 50)
            });
        }

        return forecast;
    }

    // ==================== UTILITY METHODS ====================

    /**
     * Set API key
     * @param {string} service - Service name
     * @param {string} key - API key
     */
    setAPIKey(service, key) {
        if (this.apiKeys.hasOwnProperty(service)) {
            this.apiKeys[service] = key;
            return true;
        }
        console.error(`Unknown service: ${service}`);
        return false;
    }

    /**
     * Get API status
     * @returns {object}
     */
    getAPIStatus() {
        return {
            tripAdvisor: this.apiKeys.tripAdvisor !== 'YOUR_TRIPADVISOR_API_KEY',
            openWeather: this.apiKeys.openWeather !== 'YOUR_OPENWEATHER_API_KEY',
            googleMaps: this.apiKeys.googleMaps !== 'YOUR_GOOGLE_MAPS_API_KEY',
            cacheSize: this.cache.size,
            cachedItems: Array.from(this.cache.keys())
        };
    }
}

// Create singleton instance
const apiManager = new APIManager();

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIManager;
}
