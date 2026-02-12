/**
 * TRAVEL PLANNER - Data Management
 * Handles TripAdvisor API integration and data processing
 */

class DataManager {
    constructor() {
        this.tripAdvisorApiKey = 'YOUR_TRIPADVISOR_API_KEY';
        this.googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
        this.cache = {};
        this.cacheTimeout = 3600000; // 1 hour in milliseconds
    }

    /**
     * Fetch attractions from TripAdvisor API
     * In production, replace with real API calls
     */
    async fetchTripAdvisorAttractions(location, category = null) {
        try {
            // Check cache first
            const cacheKey = `attractions_${location}_${category || 'all'}`;
            if (this.cache[cacheKey] && !this.isCacheExpired(cacheKey)) {
                return this.cache[cacheKey];
            }

            // In production, make actual API call:
            // const response = await fetch(`https://api.tripadvisor.com/v2/location/search`, {
            //     params: {
            //         key: this.tripAdvisorApiKey,
            //         searchQuery: location,
            //         category: category
            //     }
            // });
            // const data = await response.json();

            // For demo, return mock data
            const mockData = this.getMockTripAdvisorData(location, category);
            
            // Cache the result
            this.setCacheItem(cacheKey, mockData);
            
            return mockData;
        } catch (error) {
            console.error('Error fetching TripAdvisor data:', error);
            throw error;
        }
    }

    /**
     * Fetch hotels from TripAdvisor API
     */
    async fetchTripAdvisorHotels(location, filters = {}) {
        try {
            const cacheKey = `hotels_${location}_${JSON.stringify(filters)}`;
            if (this.cache[cacheKey] && !this.isCacheExpired(cacheKey)) {
                return this.cache[cacheKey];
            }

            // In production, make actual API call:
            // const response = await fetch(`https://api.tripadvisor.com/v2/location/search`, {
            //     params: {
            //         key: this.tripAdvisorApiKey,
            //         searchQuery: location,
            //         category: 'hotels',
            //         filters: filters
            //     }
            // });

            const mockData = this.getMockHotelsData(location, filters);
            this.setCacheItem(cacheKey, mockData);

            return mockData;
        } catch (error) {
            console.error('Error fetching hotels:', error);
            throw error;
        }
    }

    /**
     * Fetch reviews for a specific place
     */
    async fetchPlaceReviews(placeId, limit = 10) {
        try {
            const cacheKey = `reviews_${placeId}`;
            if (this.cache[cacheKey] && !this.isCacheExpired(cacheKey)) {
                return this.cache[cacheKey];
            }

            // In production:
            // const response = await fetch(`https://api.tripadvisor.com/v2/location/${placeId}/reviews`, {
            //     params: {
            //         key: this.tripAdvisorApiKey,
            //         limit: limit
            //     }
            // });

            const mockData = this.getMockReviewsData(placeId);
            this.setCacheItem(cacheKey, mockData);

            return mockData;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    }

    /**
     * Get mock TripAdvisor attractions data
     */
    getMockTripAdvisorData(location, category = null) {
        const allAttractions = [
            {
                id: 'att_1',
                location: location,
                name: `${location} National Museum`,
                category: 'museum',
                rating: 4.6,
                reviewCount: 324,
                description: 'World-class museum featuring local history and culture',
                address: `123 History Street, ${location}`,
                phone: '+1-XXX-XXX-XXXX',
                website: 'https://example.com/museum',
                hours: '9:00 AM - 6:00 PM',
                price: '$15',
                image: '🏛️',
                coordinates: { lat: 40.7128, lng: -74.0060 },
                reviews: this.getMockReviewsData('att_1')
            },
            {
                id: 'att_2',
                location: location,
                name: `${location} Central Park`,
                category: 'park',
                rating: 4.8,
                reviewCount: 892,
                description: 'Beautiful urban park perfect for walking and picnicking',
                address: `Park Lane, ${location}`,
                phone: '+1-XXX-XXX-XXXX',
                website: 'https://example.com/park',
                hours: '6:00 AM - 11:00 PM',
                price: 'Free',
                image: '🌳',
                coordinates: { lat: 40.7829, lng: -73.9654 },
                reviews: this.getMockReviewsData('att_2')
            },
            {
                id: 'att_3',
                location: location,
                name: `${location} Zoo`,
                category: 'attraction',
                rating: 4.4,
                reviewCount: 567,
                description: 'Family-friendly attraction with diverse wildlife',
                address: `Zoo Avenue, ${location}`,
                phone: '+1-XXX-XXX-XXXX',
                website: 'https://example.com/zoo',
                hours: '9:00 AM - 5:00 PM',
                price: '$25',
                image: '🦁',
                coordinates: { lat: 40.7678, lng: -73.9518 },
                reviews: this.getMockReviewsData('att_3')
            },
            {
                id: 'att_4',
                location: location,
                name: `${location} Art Gallery`,
                category: 'museum',
                rating: 4.7,
                reviewCount: 445,
                description: 'Contemporary and classical art from renowned artists',
                address: `Art District, ${location}`,
                phone: '+1-XXX-XXX-XXXX',
                website: 'https://example.com/gallery',
                hours: '10:00 AM - 8:00 PM',
                price: '$12',
                image: '🎨',
                coordinates: { lat: 40.7489, lng: -73.9680 },
                reviews: this.getMockReviewsData('att_4')
            }
        ];

        if (category && category !== 'all') {
            return allAttractions.filter(a => a.category === category);
        }

        return allAttractions;
    }

    /**
     * Get mock hotels data
     */
    getMockHotelsData(location, filters = {}) {
        const hotels = [
            {
                id: 'hotel_1',
                name: `${location} Grand Hotel`,
                rating: 4.9,
                reviewCount: 612,
                price: '$250',
                priceRange: '$200 - $350/night',
                description: '5-star luxury hotel with modern amenities',
                address: `123 Main Street, ${location}`,
                amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant'],
                rooms: 250,
                checkIn: '3:00 PM',
                checkOut: '11:00 AM',
                phone: '+1-XXX-XXX-XXXX',
                website: 'https://example.com/grand-hotel',
                image: '🏨',
                coordinates: { lat: 40.7128, lng: -74.0060 }
            },
            {
                id: 'hotel_2',
                name: `${location} Boutique Inn`,
                rating: 4.6,
                reviewCount: 289,
                price: '$120',
                priceRange: '$80 - $150/night',
                description: 'Charming boutique hotel with personalized service',
                address: `456 Park Avenue, ${location}`,
                amenities: ['WiFi', 'Restaurant', 'Bar'],
                rooms: 50,
                checkIn: '2:00 PM',
                checkOut: '12:00 PM',
                phone: '+1-XXX-XXX-XXXX',
                website: 'https://example.com/boutique-inn',
                image: '🏩',
                coordinates: { lat: 40.7580, lng: -73.9855 }
            },
            {
                id: 'hotel_3',
                name: `${location} Budget Hostel`,
                rating: 4.2,
                reviewCount: 145,
                price: '$45',
                priceRange: '$40 - $65/night',
                description: 'Affordable accommodation for budget travelers',
                address: `789 Central Lane, ${location}`,
                amenities: ['WiFi', 'Kitchen', 'Common Areas'],
                rooms: 80,
                checkIn: '2:00 PM',
                checkOut: '11:00 AM',
                phone: '+1-XXX-XXX-XXXX',
                website: 'https://example.com/budget-hostel',
                image: '🏠',
                coordinates: { lat: 40.7489, lng: -73.9680 }
            }
        ];

        // Apply filters if provided
        if (filters.maxPrice) {
            return hotels.filter(h => {
                const price = parseInt(h.price.replace('$', ''));
                return price <= filters.maxPrice;
            });
        }

        return hotels;
    }

    /**
     * Get mock reviews data
     */
    getMockReviewsData(placeId, limit = 5) {
        const reviewsDatabase = {
            'att_1': [
                { author: 'John D.', rating: 5, date: '2024-01-15', text: 'Excellent collection and well-organized exhibits!' },
                { author: 'Sarah M.', rating: 4, date: '2024-01-10', text: 'Great museum, very informative.' },
                { author: 'Mike T.', rating: 5, date: '2024-01-05', text: 'Hidden gem! Must visit when in the city.' }
            ],
            'att_2': [
                { author: 'Emma L.', rating: 5, date: '2024-01-20', text: 'Perfect place for a relaxing walk!' },
                { author: 'David K.', rating: 5, date: '2024-01-18', text: 'Beautiful views and peaceful atmosphere.' },
                { author: 'Lisa R.', rating: 4, date: '2024-01-15', text: 'Great for families and picnicking.' }
            ],
            'att_3': [
                { author: 'Tom W.', rating: 4, date: '2024-01-12', text: 'Fun for kids, good selection of animals.' },
                { author: 'Anna P.', rating: 4, date: '2024-01-10', text: 'Educational and entertaining.' }
            ],
            'att_4': [
                { author: 'Robert N.', rating: 5, date: '2024-01-22', text: 'Stunning art collection!' },
                { author: 'Julia S.', rating: 5, date: '2024-01-19', text: 'Incredible pieces and inspiring exhibitions.' }
            ]
        };

        return (reviewsDatabase[placeId] || []).slice(0, limit);
    }

    /**
     * Merge data from multiple sources
     */
    mergeDataSources(googleData, tripAdvisorData) {
        const merged = {};

        // Combine unique attractions
        const allItems = [...googleData, ...tripAdvisorData];
        
        allItems.forEach(item => {
            const key = item.name.toLowerCase();
            if (!merged[key]) {
                merged[key] = {
                    ...item,
                    sources: [item.source || 'default']
                };
            } else {
                merged[key].sources.push(item.source || 'default');
                // Combine ratings if available
                if (item.rating && merged[key].rating) {
                    merged[key].rating = (merged[key].rating + item.rating) / 2;
                }
            }
        });

        return Object.values(merged);
    }

    /**
     * Cache management
     */
    setCacheItem(key, value) {
        this.cache[key] = {
            value: value,
            timestamp: Date.now()
        };
    }

    isCacheExpired(key) {
        if (!this.cache[key]) return true;
        return Date.now() - this.cache[key].timestamp > this.cacheTimeout;
    }

    clearCache() {
        this.cache = {};
    }

    /**
     * Format price for display
     */
    formatPrice(price) {
        if (typeof price === 'number') {
            return `$${price.toFixed(2)}`;
        }
        return price;
    }

    /**
     * Rate limiting helper
     */
    async withRateLimit(fn, delayMs = 100) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
        return fn();
    }

    /**
     * Validate API response
     */
    validateResponse(response) {
        if (!response) {
            throw new Error('Empty response received');
        }
        if (response.error) {
            throw new Error(`API Error: ${response.error.message}`);
        }
        return response;
    }

    /**
     * Format location data for display
     */
    formatLocationData(location) {
        return {
            name: location.name || 'Unknown',
            rating: location.rating || 0,
            reviewCount: location.reviewCount || 0,
            address: location.address || 'No address',
            description: location.description || 'No description available',
            price: this.formatPrice(location.price),
            amenities: location.amenities || [],
            coordinates: location.coordinates || { lat: 0, lng: 0 }
        };
    }

    /**
     * Search locations by criteria
     */
    searchLocations(locations, criteria) {
        return locations.filter(location => {
            if (criteria.minRating && location.rating < criteria.minRating) {
                return false;
            }
            if (criteria.maxPrice && this.getPriceValue(location.price) > criteria.maxPrice) {
                return false;
            }
            if (criteria.category && location.category !== criteria.category) {
                return false;
            }
            return true;
        });
    }

    /**
     * Extract numeric value from price string
     */
    getPriceValue(price) {
        const match = price.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    }

    /**
     * Sort locations by criteria
     */
    sortLocations(locations, sortBy = 'rating') {
        const sorted = [...locations];
        
        switch (sortBy) {
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'reviews':
                return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
            case 'price-low':
                return sorted.sort((a, b) => this.getPriceValue(a.price) - this.getPriceValue(b.price));
            case 'price-high':
                return sorted.sort((a, b) => this.getPriceValue(b.price) - this.getPriceValue(a.price));
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return sorted;
        }
    }
}

/**
 * Initialize data manager globally
 */
const dataManager = new DataManager();

// Export for use in other modules
window.dataManager = dataManager;
