/**
 * TRAVEL PLANNER - Integration & Event Handler Module
 * Shows how to integrate all utilities, demonstrating:
 * - Input validation
 * - Card rendering with JSON parsing
 * - Event handling (click, focus/blur, hover, submit)
 * - Local storage management
 * - API integration
 */

class TravelPlannerIntegration {
    constructor() {
        this.utils = TravelUtils;
        this.storage = storageManager;
        this.api = apiManager;
        this.currentDestinations = [];
        
        // Initialize on DOMContentLoaded
        this.initializeApp();
    }

    /**
     * INITIALIZATION - ONLOAD EVENT
     * Called when page loads to restore previous state
     */
    initializeApp() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Travel Planner initialized');
            
            // Set up all event listeners
            this.setupEventListeners();
            
            // Restore last search query from storage
            this.restoreLastSearch();
            
            // Load user preferences
            this.loadUserPreferences();
            
            // Initialize weather if location available
            this.initializeWeather();
            
            // Load and display favorites
            this.loadFavoritesDisplay();
        });
    }

    /**
     * Setup all event listeners
     * Covers: onclick, onfocus, onblur, onhover, onsubmit
     */
    setupEventListeners() {
        // ========== SEARCH FORM SUBMISSION ==========
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');
        
        if (searchBtn) {
            // ONCLICK event - Search button clicked
            searchBtn.addEventListener('click', () => this.handleSearch());
        }

        if (searchInput) {
            // ONFOCUS event - Input field focused (enlarge)
            searchInput.addEventListener('focus', (e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 86, 179, 0.3)';
                this.showSearchSuggestions();
            });

            // ONBLUR event - Input field loses focus (shrink)
            searchInput.addEventListener('blur', (e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
                setTimeout(() => this.hideSuggestions(), 200);
            });

            // ONKEYPRESS event - Enter key submits search
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSearch();
                }
            });

            // ONINPUT event - Show suggestions while typing
            searchInput.addEventListener('input', (e) => {
                this.handleInputChange(e);
            });
        }

        // ========== FILTER BUTTONS ==========
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });

        // ========== CARD HOVER EFFECTS ==========
        // These are handled in CSS but can add JavaScript effects too
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.destination-card')) {
                const card = e.target.closest('.destination-card');
                if (card) {
                    card.classList.add('card-hovered');
                }
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.destination-card')) {
                const card = e.target.closest('.destination-card');
                if (card) {
                    card.classList.remove('card-hovered');
                }
            }
        });

        // ========== FAVORITE BUTTON CLICKS ==========
        document.addEventListener('click', (e) => {
            if (e.target.closest('.favorite-btn')) {
                this.handleFavoriteClick(e);
            }
        });

        // ========== MODAL CONTROLS ==========
        document.addEventListener('click', (e) => {
            if (e.target.closest('.modal-close')) {
                const modal = e.target.closest('.modal');
                if (modal) modal.style.display = 'none';
            }
        });

        // ========== SORT & FILTER SELECTS ==========
        const sortSelect = document.getElementById('sort-by');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.handleSortChange(e.target.value);
            });
        }

        // ========== BUDGET FILTER ==========
        const budgetInput = document.getElementById('budget-filter');
        if (budgetInput) {
            budgetInput.addEventListener('change', (e) => {
                this.handleBudgetFilter(e.target.value);
            });
        }
    }

    /**
     * HANDLE SEARCH - Main search with input validation
     * Demonstrates: Input validation, DOM manipulation, API calls, JSON parsing
     */
    async handleSearch() {
        const searchInput = document.getElementById('search-input');
        const resultGrid = document.getElementById('results-grid');
        const loading = document.getElementById('loading');
        const noResults = document.getElementById('no-results');
        const errorMessage = document.getElementById('error-message');

        // ========== INPUT VALIDATION ==========
        const validation = this.utils.validateDestinationInput(searchInput.value);
        if (!validation.isValid) {
            this.showError(validation.error);
            searchInput.focus();
            searchInput.style.borderColor = '#dc3545';
            return;
        }
        searchInput.style.borderColor = '';

        // Show loading indicator
        if (loading) loading.style.display = 'block';
        if (resultGrid) resultGrid.innerHTML = '';
        if (noResults) noResults.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';

        try {
            const query = searchInput.value.trim();
            
            // Save search to history
            this.storage.addSearchQuery(query);
            
            // Fetch destinations from API
            const destinations = await this.api.searchDestinations(
                query,
                this.getCurrentFilter()
            );

            // Parse and validate JSON data
            const validatedDestinations = this.utils.parseDestinationJSON(destinations);
            this.currentDestinations = validatedDestinations;

            // Update search result count
            this.storage.updateSearchResultCount(query, validatedDestinations.length);

            // Render destination cards
            if (validatedDestinations.length > 0) {
                this.utils.renderDestinationCards(
                    validatedDestinations,
                    'results-grid',
                    (destination) => this.showDestinationDetails(destination)
                );
                if (resultGrid) resultGrid.style.display = 'grid';
            } else {
                if (noResults) noResults.style.display = 'block';
            }

        } catch (error) {
            console.error('Search error:', error);
            if (errorMessage) {
                errorMessage.textContent = 'Error searching destinations: ' + error.message;
                errorMessage.style.display = 'block';
            }
        } finally {
            if (loading) loading.style.display = 'none';
        }
    }

    /**
     * HANDLE FILTER CLICK - Filter cards by type
     * Demonstrates: DOM class manipulation, filtering arrays
     */
    handleFilterClick(event) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Filter destinations
        const filterType = event.target.dataset.filter;
        const filtered = this.utils.filterDestinations(
            this.currentDestinations,
            filterType
        );

        // Re-render cards
        this.utils.renderDestinationCards(
            filtered,
            'results-grid',
            (destination) => this.showDestinationDetails(destination)
        );
    }

    /**
     * HANDLE SORT CHANGE - Sort displayed destinations
     * Demonstrates: Array sorting, DOM re-rendering
     */
    handleSortChange(sortBy) {
        const order = document.getElementById('sort-order')?.value || 'desc';
        const sorted = this.utils.sortDestinations(
            this.currentDestinations,
            sortBy,
            order
        );

        this.utils.renderDestinationCards(
            sorted,
            'results-grid',
            (destination) => this.showDestinationDetails(destination)
        );
    }

    /**
     * HANDLE BUDGET FILTER - Filter by budget
     * Demonstrates: Input validation, conditional filtering
     */
    handleBudgetFilter(budget) {
        const validation = this.utils.validateBudget(budget);
        if (!validation.isValid) {
            this.showError(validation.error);
            return;
        }

        const filtered = this.currentDestinations.filter(dest => {
            const priceMap = { '$': 25, '$$': 75, '$$$': 150 };
            return (priceMap[dest.priceLevel] || 0) <= budget;
        });

        this.utils.renderDestinationCards(
            filtered,
            'results-grid',
            (destination) => this.showDestinationDetails(destination)
        );
    }

    /**
     * HANDLE INPUT CHANGE - Show suggestions while typing
     * Demonstrates: Debouncing, dynamic DOM updates
     */
    handleInputChange(event) {
        const query = event.target.value.trim();
        
        // Validate input
        if (!query || query.length < 2) {
            this.hideSuggestions();
            return;
        }

        // Get search history for suggestions
        const history = this.storage.getSearchHistory();
        const suggestions = history
            .filter(item => item.query.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5);

        this.displaySuggestions(suggestions, query);
    }

    /**
     * HANDLE FAVORITE CLICK - Add/remove favorites
     * Demonstrates: Local storage operations, event dispatch
     */
    handleFavoriteClick(event) {
        const btn = event.target.closest('.favorite-btn');
        const destinationId = btn.dataset.destinationId;
        
        // Find destination data
        const destination = this.currentDestinations.find(d => d.id == destinationId);
        if (!destination) return;

        // Toggle favorite
        const isFavorited = this.storage.isFavorited(destinationId);
        
        if (isFavorited) {
            this.storage.removeFavorite(destinationId);
            btn.classList.remove('liked');
            btn.innerHTML = '<i class="far fa-heart"></i>';
            this.showNotification('Removed from favorites');
        } else {
            this.storage.addFavorite(destination);
            btn.classList.add('liked');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            this.showNotification('Added to favorites');
        }
    }

    /**
     * Show destination details in modal
     * Demonstrates: Complex data display, modal DOM manipulation
     */
    async showDestinationDetails(destination) {
        // Create or get modal
        let modal = document.getElementById('detail-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'detail-modal';
            modal.className = 'modal';
            document.body.appendChild(modal);
        }

        // Fetch additional details from API
        const details = await this.api.getDestinationDetails(destination.id);
        const reviews = await this.api.getDestinationReviews(destination.id, 5);
        const weather = await this.api.getCurrentWeather(destination.location);

        // Build modal content
        const isFavorited = this.storage.isFavorited(destination.id);
        const reviewsHtml = reviews.map(r => `
            <div class="review-item">
                <div class="review-header">
                    <span class="reviewer">${r.author}</span>
                    <span class="rating">${this.utils.renderStars(r.rating)}</span>
                </div>
                <p>${r.text}</p>
                <small>${this.utils.formatDate(r.date)}</small>
            </div>
        `).join('');

        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header" style="background: url('${destination.imageUrl}') cover;">
                    <h2>${destination.name}</h2>
                </div>
                <div class="modal-body">
                    <div class="detail-section">
                        <h3>Overview</h3>
                        <p>${destination.description}</p>
                        <p><strong>Address:</strong> ${destination.address}</p>
                        <p><strong>Phone:</strong> ${destination.phone || 'N/A'}</p>
                        <p><strong>Website:</strong> <a href="${destination.website || '#'}">${destination.website || 'N/A'}</a></p>
                    </div>

                    ${weather ? `
                    <div class="detail-section">
                        <h3>Current Weather</h3>
                        <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
                        <p><strong>Condition:</strong> ${weather.condition}</p>
                        <p><strong>Humidity:</strong> ${weather.humidity}%</p>
                    </div>
                    ` : ''}

                    <div class="detail-section">
                        <h3>Reviews (${reviews.length})</h3>
                        ${reviewsHtml || '<p>No reviews yet</p>'}
                    </div>

                    <div class="detail-actions">
                        <button id="add-to-trip-btn" class="btn btn-primary">
                            <i class="fas fa-calendar-plus"></i> Add to Itinerary
                        </button>
                        <button class="favorite-btn ${isFavorited ? 'liked' : ''}" 
                                data-destination-id="${destination.id}">
                            <i class="fas ${isFavorited ? 'fa-heart' : 'far fa-heart'}"></i>
                            ${isFavorited ? 'Favorited' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    /**
     * Display search suggestions
     */
    displaySuggestions(suggestions, query) {
        const list = document.getElementById('suggestions-list');
        if (!list) return;

        list.innerHTML = '';
        suggestions.forEach(suggestion => {
            const item = document.createElement('li');
            item.className = 'suggestion-item';
            item.textContent = suggestion.query;
            item.onclick = () => {
                document.getElementById('search-input').value = suggestion.query;
                this.handleSearch();
            };
            list.appendChild(item);
        });
        list.style.display = 'block';
    }

    /**
     * Show search suggestions
     */
    showSearchSuggestions() {
        const list = document.getElementById('suggestions-list');
        if (list && list.innerHTML) list.style.display = 'block';
    }

    /**
     * Hide suggestions
     */
    hideSuggestions() {
        const list = document.getElementById('suggestions-list');
        if (list) list.style.display = 'none';
    }

    /**
     * Load and display favorites section
     */
    loadFavoritesDisplay() {
        const favorites = this.storage.getFavorites();
        const favoritesList = document.getElementById('favorites-list');

        if (favoritesList) {
            if (favorites.length > 0) {
                this.utils.renderDestinationCards(
                    favorites,
                    'favorites-list',
                    (destination) => this.showDestinationDetails(destination)
                );
            } else {
                document.getElementById('no-favorites').style.display = 'block';
            }
        }
    }

    /**
     * Restore last search from local storage
     */
    restoreLastSearch() {
        const lastSearch = this.storage.getLastSearchQuery();
        if (lastSearch) {
            document.getElementById('search-input').value = lastSearch;
            // Optionally auto-run: this.handleSearch();
        }
    }

    /**
     * Load user preferences
     */
    loadUserPreferences() {
        const prefs = this.storage.getUserPreferences();
        
        // Apply theme preference
        if (prefs.theme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        // Apply currency if visible
        const currencyDisplay = document.getElementById('currency-display');
        if (currencyDisplay) {
            currencyDisplay.textContent = prefs.currency;
        }
    }

    /**
     * Initialize weather display
     */
    async initializeWeather() {
        const weatherSection = document.getElementById('weather-widget');
        if (!weatherSection) return;

        try {
            const lastSearch = this.storage.getLastSearchQuery() || 'New York';
            const weather = await this.api.getCurrentWeather(lastSearch);
            
            if (weather) {
                weatherSection.innerHTML = `
                    <div class="weather-card">
                        <h4>${weather.location}</h4>
                        <p class="temp">${weather.temperature}°${weather.unit === 'metric' ? 'C' : 'F'}</p>
                        <p class="condition">${weather.condition}</p>
                        <p class="humidity">Humidity: ${weather.humidity}%</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Weather initialization error:', error);
        }
    }

    /**
     * Get current active filter
     */
    getCurrentFilter() {
        const activeBtn = document.querySelector('.filter-btn.active');
        return activeBtn ? activeBtn.dataset.filter : 'all';
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        }
    }

    /**
     * Show notification
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Initialize when DOM is ready
let travelApp;
document.addEventListener('DOMContentLoaded', () => {
    travelApp = new TravelPlannerIntegration();
});

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TravelPlannerIntegration;
}
