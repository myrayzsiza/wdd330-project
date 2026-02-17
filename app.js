/**
 * TRAVEL PLANNER - Main Application Logic
 * Handles search, filtering, results display, and favorites management
 */

class TravelPlanner {
    constructor() {
        this.allResults = [];
        this.filteredResults = [];
        this.selectedItems = [];
        this.currentFilter = 'all';
        this.currentLocation = null;
        this.favorites = this.loadFavorites();
        
        // Popular destinations for suggestions
        this.destinations = [
            { name: 'Paris', icon: '🇫🇷' },
            { name: 'London', icon: '🇬🇧' },
            { name: 'Tokyo', icon: '🇯🇵' },
            { name: 'New York', icon: '🇺🇸' },
            { name: 'Barcelona', icon: '🇪🇸' },
            { name: 'Rome', icon: '🇮🇹' },
            { name: 'Dubai', icon: '🇦🇪' },
            { name: 'Sydney', icon: '🇦🇺' },
            { name: 'Amsterdam', icon: '🇳🇱' },
            { name: 'Bangkok', icon: '🇹🇭' },
            { name: 'Singapore', icon: '🇸🇬' },
            { name: 'Berlin', icon: '🇩🇪' },
            { name: 'Vienna', icon: '🇦🇹' },
            { name: 'Prague', icon: '🇨🇿' },
            { name: 'Istanbul', icon: '🇹🇷' },
            { name: 'Canada', icon: '🇨🇦' },
            { name: 'Mexico', icon: '🇲🇽' },
            { name: 'Brazil', icon: '🇧🇷' },
            { name: 'Peru', icon: '🇵🇪' },
            { name: 'Greece', icon: '🇬🇷' }
        ];
        this.currentSuggestionIndex = -1;
        
        this.initializeEventListeners();
        this.displayFavorites();
    }

    /**
     * Initialize all event listeners
     */
    initializeEventListeners() {
        // Search functionality
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');
        
        searchBtn.addEventListener('click', () => this.handleSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        // Search suggestions
        searchInput.addEventListener('input', (e) => this.handleSuggestionInput(e));
        searchInput.addEventListener('keydown', (e) => this.handleSuggestionKeydown(e));
        
        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-input-wrapper')) {
                this.closeSuggestions();
            }
        });

        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Navigation - handle both sidebar and bottom nav
        const navLinks = document.querySelectorAll('.sidebar-link, .nav-bottom-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Modal
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('detail-modal');
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                document.getElementById('detail-modal').style.display = 'none';
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Itinerary creation
        const createItineraryBtn = document.getElementById('create-itinerary-btn');
        if (createItineraryBtn) {
            createItineraryBtn.addEventListener('click', () => this.createItinerary());
        }
    }

    /**
     * Handle search functionality
     */
    async handleSearch() {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();

        if (!query) {
            this.showError('Please enter a city or country name');
            return;
        }

        this.showLoading(true);
        this.clearError();

        try {
            // For demo: combine mock data + API data
            this.allResults = await this.fetchPlaces(query);
            this.currentLocation = query;
            this.currentFilter = 'all';

            // Reset filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');

            this.displayResults(this.allResults);
            this.showMapSection();
            this.showItinerarySection();

            // Display travel guide for the destination
            if (typeof travelGuide !== 'undefined') {
                travelGuide.displayGuide(query);
            }

            // Initialize map
            if (typeof initMap === 'function') {
                initMap(query);
            }
        } catch (error) {
            this.showError(`Error: ${error.message}`);
            console.error('Search error:', error);
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Fetch places from combined data sources
     */
    async fetchPlaces(query) {
        try {
            // Use mock data for demonstration
            const mockData = this.getMockData(query);
            
            // In production, you would call actual APIs:
            // const tripadvisorData = await fetchTripAdvisorData(query);
            // const googleData = await fetchGooglePlacesData(query);

            return mockData;
        } catch (error) {
            throw new Error('Failed to fetch places data');
        }
    }

    /**
     * Get mock data for demonstration
     */
    getMockData(query) {
        const attractions = [
            {
                id: 1,
                name: `${query} National Museum`,
                type: 'museum',
                description: 'Explore the rich history and culture of the region with interactive exhibits.',
                rating: 4.6,
                reviews: 324,
                image: '🏛️',
                price: 'Free - $15'
            },
            {
                id: 2,
                name: `${query} Central Park`,
                type: 'park',
                description: 'Beautiful urban park perfect for walking, picnicking, and outdoor activities.',
                rating: 4.8,
                reviews: 892,
                image: '🌳',
                price: 'Free'
            },
            {
                id: 3,
                name: `${query} Historic District`,
                type: 'attraction',
                description: 'Charming old town area with cobblestone streets and historic buildings.',
                rating: 4.5,
                reviews: 567,
                image: '🏰',
                price: 'Free'
            },
            {
                id: 4,
                name: `Local Cuisine Restaurant`,
                type: 'restaurant',
                description: 'Best traditional dishes and authentic local flavors.',
                rating: 4.7,
                reviews: 445,
                image: '🍽️',
                price: '$25 - $50'
            },
            {
                id: 5,
                name: `${query} Grand Hotel`,
                type: 'hotel',
                description: '5-star luxury hotel with modern amenities and stunning views.',
                rating: 4.9,
                reviews: 612,
                image: '🏨',
                price: '$200 - $350/night'
            },
            {
                id: 6,
                name: `${query} Boutique Inn`,
                type: 'hotel',
                description: 'Cozy boutique hotel with personalized service and charm.',
                rating: 4.4,
                reviews: 289,
                image: '🏩',
                price: '$80 - $150/night'
            },
            {
                id: 7,
                name: `Art Gallery & Exhibition`,
                type: 'museum',
                description: 'Contemporary and classical art collections from local and international artists.',
                rating: 4.3,
                reviews: 198,
                image: '🎨',
                price: '$10 - $12'
            },
            {
                id: 8,
                name: `${query} Farmers Market`,
                type: 'attraction',
                description: 'Fresh produce, local crafts, and street food from vendors.',
                rating: 4.6,
                reviews: 534,
                image: '🛒',
                price: 'Free'
            }
        ];

        return attractions;
    }

    /**
     * Handle search input for suggestions
     */
    handleSuggestionInput(e) {
        const query = e.target.value.trim().toLowerCase();
        const suggestionsList = document.getElementById('suggestions-list');
        
        if (!query) {
            this.closeSuggestions();
            return;
        }
        
        // Filter destinations that match the query
        const matches = this.destinations.filter(dest => 
            dest.name.toLowerCase().startsWith(query)
        );
        
        if (matches.length === 0) {
            this.closeSuggestions();
            return;
        }
        
        // Display suggestions
        this.displaySuggestions(matches);
    }

    /**
     * Display suggestions in the dropdown
     */
    displaySuggestions(matches) {
        const suggestionsList = document.getElementById('suggestions-list');
        suggestionsList.innerHTML = '';
        this.currentSuggestionIndex = -1;
        
        matches.forEach(destination => {
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            li.innerHTML = `<i class="fas fa-map-pin"></i><span>${destination.name}</span>`;
            
            li.addEventListener('click', () => {
                this.selectSuggestion(destination.name);
            });
            
            suggestionsList.appendChild(li);
        });
        
        suggestionsList.style.display = 'block';
    }

    /**
     * Handle keyboard navigation in suggestions
     */
    handleSuggestionKeydown(e) {
        const suggestionsList = document.getElementById('suggestions-list');
        const items = suggestionsList.querySelectorAll('.suggestion-item');
        
        if (items.length === 0) return;
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.currentSuggestionIndex = Math.min(
                    this.currentSuggestionIndex + 1, 
                    items.length - 1
                );
                this.updateSuggestionHighlight(items);
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.currentSuggestionIndex = Math.max(
                    this.currentSuggestionIndex - 1, 
                    -1
                );
                this.updateSuggestionHighlight(items);
                break;
                
            case 'Enter':
                if (this.currentSuggestionIndex >= 0 && items[this.currentSuggestionIndex]) {
                    e.preventDefault();
                    const selectedText = items[this.currentSuggestionIndex].querySelector('span').textContent;
                    this.selectSuggestion(selectedText);
                }
                break;
                
            case 'Escape':
                this.closeSuggestions();
                break;
        }
    }

    /**
     * Update the highlighted suggestion
     */
    updateSuggestionHighlight(items) {
        items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentSuggestionIndex);
        });
    }

    /**
     * Select a suggestion
     */
    selectSuggestion(destination) {
        document.getElementById('search-input').value = destination;
        this.closeSuggestions();
    }

    /**
     * Close suggestions dropdown
     */
    closeSuggestions() {
        const suggestionsList = document.getElementById('suggestions-list');
        suggestionsList.style.display = 'none';
        this.currentSuggestionIndex = -1;
    }

    /**
     * Handle filter functionality
     */
    handleFilter(e) {
        const filterBtn = e.target.closest('.filter-btn');
        if (!filterBtn) return;

        // Update button states
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        filterBtn.classList.add('active');

        this.currentFilter = filterBtn.dataset.filter;
        this.displayResults(this.allResults);
    }

    /**
     * Display results with current filter applied
     */
    displayResults(results) {
        const resultsGrid = document.getElementById('results-grid');
        const noResults = document.getElementById('no-results');

        // Apply filter
        if (this.currentFilter === 'all') {
            this.filteredResults = results;
        } else {
            this.filteredResults = results.filter(r => r.type === this.currentFilter);
        }

        // Show/hide no results message
        if (this.filteredResults.length === 0) {
            resultsGrid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        // Render results
        resultsGrid.innerHTML = this.filteredResults.map(place => `
            <div class="result-card">
                <div class="card-image">
                    ${place.image}
                    <span class="card-badge">${place.type.toUpperCase()}</span>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${place.name}</h3>
                    <p class="card-description">${place.description}</p>
                    <div class="card-meta">
                        <div class="rating">
                            <span>⭐</span>
                            <span class="rating-value">${place.rating}</span>
                            <span>(${place.reviews} reviews)</span>
                        </div>
                        <div class="price">${place.price}</div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary btn-sm" onclick="travelPlanner.viewDetails(${place.id})">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="travelPlanner.toggleFavorite(${place.id}, '${place.name}')">
                            <i class="fas fa-heart"></i> Save
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="travelPlanner.addToItinerary(${place.id}, '${place.name}')">
                            <i class="fas fa-plus"></i> Itinerary
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * View place details in modal
     */
    viewDetails(placeId) {
        const place = this.allResults.find(p => p.id === placeId);
        if (!place) return;

        const modal = document.getElementById('detail-modal');
        const modalBody = document.getElementById('modal-body');

        modalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px; font-size: 4rem;">
                ${place.image}
            </div>
            <h3>${place.name}</h3>
            <div class="rating" style="margin-bottom: 15px;">
                <span>⭐</span>
                <span class="rating-value">${place.rating}</span>
                <span>(${place.reviews} reviews)</span>
            </div>
            <div class="price" style="margin-bottom: 20px;">${place.price}</div>
            <p style="margin-bottom: 20px; color: #495057;">${place.description}</p>
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f0f7f3; border-radius: 4px;">
                <h4 style="color: #0056b3; margin-bottom: 10px;">About this place</h4>
                <p>This is a ${place.type} in ${this.currentLocation}. It's highly rated by visitors and offers a unique experience.</p>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="travelPlanner.toggleFavorite(${placeId}, '${place.name}')">
                    <i class="fas fa-heart"></i> Add to Favorites
                </button>
                <button class="btn btn-success" onclick="travelPlanner.addToItinerary(${placeId}, '${place.name}')">
                    <i class="fas fa-calendar"></i> Add to Trip
                </button>
                <button class="btn btn-secondary" onclick="document.getElementById('detail-modal').style.display='none'">
                    Close
                </button>
            </div>
        `;

        modal.style.display = 'flex';
    }

    /**
     * Toggle favorite status and save
     */
    toggleFavorite(placeId, placeName) {
        const place = this.allResults.find(p => p.id === placeId);
        if (!place) return;

        const index = this.favorites.findIndex(f => f.id === placeId);
        if (index === -1) {
            // Add to favorites
            this.favorites.push({
                id: placeId,
                name: place.name,
                type: place.type,
                description: place.description,
                rating: place.rating,
                savedDate: new Date().toLocaleDateString()
            });
            alert(`Added "${place.name}" to favorites!`);
        } else {
            // Remove from favorites
            this.favorites.splice(index, 1);
            alert(`Removed "${place.name}" from favorites!`);
        }

        this.saveFavorites();
        this.displayFavorites();
    }

    /**
     * Add place to itinerary
     */
    addToItinerary(placeId, placeName) {
        const item = this.allResults.find(p => p.id === placeId);
        if (!item) return;

        // Check if already added
        if (this.selectedItems.some(i => i.id === placeId)) {
            alert(`"${placeName}" is already in your itinerary!`);
            return;
        }

        this.selectedItems.push({
            id: placeId,
            name: item.name,
            type: item.type,
            price: item.price
        });

        this.displaySelectedItems();
        alert(`Added "${placeName}" to your itinerary!`);
    }

    /**
     * Display selected itinerary items
     */
    displaySelectedItems() {
        const selectedItems = document.getElementById('selected-items');
        
        if (this.selectedItems.length === 0) {
            selectedItems.innerHTML = '<p style="color: #495057; text-align: center;">No items selected yet</p>';
            return;
        }

        selectedItems.innerHTML = this.selectedItems.map((item, index) => `
            <div class="itinerary-item">
                <div>
                    <div class="itinerary-item-title">Day ${index + 1}: ${item.name}</div>
                    <div class="itinerary-item-details">${item.type.toUpperCase()} • ${item.price}</div>
                </div>
                <button class="btn-icon" onclick="travelPlanner.removeFromItinerary(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    /**
     * Remove item from itinerary
     */
    removeFromItinerary(index) {
        this.selectedItems.splice(index, 1);
        this.displaySelectedItems();
    }

    /**
     * Create and save itinerary
     */
    createItinerary() {
        if (this.selectedItems.length === 0) {
            alert('Please add at least one place to your itinerary!');
            return;
        }

        const itinerary = {
            id: Date.now(),
            location: this.currentLocation,
            items: this.selectedItems,
            createdDate: new Date().toLocaleDateString(),
            estimatedDays: this.selectedItems.length
        };

        // Save to localStorage (in production, save to backend)
        let itineraries = JSON.parse(localStorage.getItem('itineraries') || '[]');
        itineraries.push(itinerary);
        localStorage.setItem('itineraries', JSON.stringify(itineraries));

        alert(`Itinerary created for ${this.currentLocation} (${itinerary.estimatedDays} days)!`);
        this.selectedItems = [];
        this.displaySelectedItems();
    }

    /**
     * Load favorites from localStorage
     */
    loadFavorites() {
        try {
            const stored = localStorage.getItem('travelPlannerFavorites');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Error loading favorites:', e);
            return [];
        }
    }

    /**
     * Save favorites to localStorage
     */
    saveFavorites() {
        try {
            localStorage.setItem('travelPlannerFavorites', JSON.stringify(this.favorites));
        } catch (e) {
            console.error('Error saving favorites:', e);
        }
    }

    /**
     * Display saved favorites
     */
    displayFavorites() {
        const favoritesList = document.getElementById('favorites-list');
        const noFavorites = document.getElementById('no-favorites');

        if (this.favorites.length === 0) {
            favoritesList.innerHTML = '';
            noFavorites.style.display = 'block';
            return;
        }

        noFavorites.style.display = 'none';

        favoritesList.innerHTML = this.favorites.map(fav => `
            <div class="favorite-card">
                <h4>${fav.name}</h4>
                <p><strong>Type:</strong> ${fav.type}</p>
                <p><strong>Rating:</strong> ${fav.rating} ⭐</p>
                <p><strong>Saved:</strong> ${fav.savedDate}</p>
                <p>${fav.description}</p>
                <button class="btn btn-secondary btn-sm" onclick="travelPlanner.removeFavorite(${fav.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `).join('');
    }

    /**
     * Remove favorite by ID
     */
    removeFavorite(favId) {
        this.favorites = this.favorites.filter(f => f.id !== favId);
        this.saveFavorites();
        this.displayFavorites();
    }

    /**
     * Handle navigation between sections
     */
    handleNavigation(e) {
        const target = e.target.closest('.sidebar-link, .nav-bottom-link');
        if (!target) return;
        
        const section = target.dataset.section;
        
        // Update active nav link
        document.querySelectorAll('.sidebar-link, .nav-bottom-link').forEach(link => {
            link.classList.remove('active');
        });
        target.classList.add('active');

        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const sectionId = section === 'map' ? 'map-fullview-section' : `${section}-section`;
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.classList.add('active');
        }

        // Display travel guide if guide section is selected
        if (section === 'guide' && this.currentLocation) {
            travelGuide.displayGuide(this.currentLocation);
        }
    }

    /**
     * Show/hide loading spinner
     */
    showLoading(show) {
        const loading = document.getElementById('loading');
        if (show) {
            loading.style.display = 'block';
        } else {
            loading.style.display = 'none';
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    /**
     * Clear error message
     */
    clearError() {
        const errorDiv = document.getElementById('error-message');
        errorDiv.style.display = 'none';
    }

    /**
     * Show map section
     */
    showMapSection() {
        const mapSection = document.getElementById('map-section');
        if (mapSection) {
            mapSection.style.display = 'block';
        }
    }

    /**
     * Show itinerary section
     */
    showItinerarySection() {
        const itinerarySection = document.getElementById('itinerary-section');
        if (itinerarySection) {
            itinerarySection.style.display = 'block';
        }
    }

    /**
     * Toggle dark/light theme
     */
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        const icon = document.querySelector('#theme-toggle i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }
}

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.travelPlanner = new TravelPlanner();

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Set active home section
    document.getElementById('home-section').classList.add('active');
    document.querySelector('.sidebar-link[data-section="home"]')?.classList.add('active');
    document.querySelector('.nav-bottom-link[data-section="home"]')?.classList.add('active');

    console.log('Travel Planner App Initialized');
});
