/**
 * TRAVEL PLANNER - Utilities Module
 * Input validation, JSON parsing, DOM rendering, filtering & sorting
 */

class TravelUtils {
    /**
     * Validate destination input
     * @param {string} input - User input
     * @returns {object} - {isValid: boolean, error: string}
     */
    static validateDestinationInput(input) {
        if (!input || input.trim() === '') {
            return { isValid: false, error: 'Please enter a destination name' };
        }
        if (input.trim().length < 2) {
            return { isValid: false, error: 'Destination must be at least 2 characters' };
        }
        if (!/^[a-zA-Z\s\-']+$/.test(input)) {
            return { isValid: false, error: 'Destination can only contain letters, spaces, hyphens, and apostrophes' };
        }
        return { isValid: true, error: null };
    }

    /**
     * Validate date input
     * @param {string} dateString - Date to validate
     * @returns {object} - {isValid: boolean, error: string}
     */
    static validateDate(dateString) {
        if (!dateString) {
            return { isValid: false, error: 'Please select a date' };
        }
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (date < today) {
            return { isValid: false, error: 'Travel date cannot be in the past' };
        }
        return { isValid: true, error: null };
    }

    /**
     * Validate budget input
     * @param {number} budget - Budget amount
     * @returns {object} - {isValid: boolean, error: string}
     */
    static validateBudget(budget) {
        const budgetNum = parseFloat(budget);
        if (isNaN(budgetNum) || budgetNum <= 0) {
            return { isValid: false, error: 'Please enter a valid budget amount' };
        }
        if (budgetNum > 1000000) {
            return { isValid: false, error: 'Budget amount is too high' };
        }
        return { isValid: true, error: null };
    }

    /**
     * Validate rating
     * @param {number} rating - Rating value
     * @returns {boolean}
     */
    static validateRating(rating) {
        return rating >= 0 && rating <= 5;
    }

    /**
     * Parse and validate complex JSON with 8+ attributes
     * @param {object} jsonData - JSON object to validate
     * @returns {array} - Array of validated objects
     */
    static parseDestinationJSON(jsonData) {
        const requiredFields = [
            'id', 'name', 'type', 'location', 'rating', 
            'reviews', 'description', 'address'
        ];

        if (!Array.isArray(jsonData)) {
            console.error('JSON data must be an array');
            return [];
        }

        return jsonData.filter(item => {
            // Validate all required fields exist
            const hasAllFields = requiredFields.every(field => {
                return item.hasOwnProperty(field) && item[field] !== null && item[field] !== undefined;
            });

            if (!hasAllFields) {
                console.warn('Skipping item with missing fields:', item);
                return false;
            }

            // Validate data types
            if (typeof item.id !== 'number' && typeof item.id !== 'string') return false;
            if (typeof item.name !== 'string') return false;
            if (typeof item.type !== 'string') return false;
            if (typeof item.location !== 'string') return false;
            if (!this.validateRating(item.rating)) return false;
            if (typeof item.reviews !== 'number') return false;
            if (typeof item.description !== 'string') return false;
            if (typeof item.address !== 'string') return false;

            return true;
        });
    }

    /**
     * Render destination cards from JSON array
     * @param {array} destinations - Array of destination objects
     * @param {string} containerId - Target container ID
     * @param {function} onCardClick - Callback when card is clicked
     */
    static renderDestinationCards(destinations, containerId, onCardClick = null) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }

        // Clear existing cards
        container.innerHTML = '';

        if (!destinations || destinations.length === 0) {
            container.innerHTML = '<div class="no-results"><p>No destinations found</p></div>';
            return;
        }

        destinations.forEach((destination, index) => {
            const card = this.createDestinationCard(destination, index);
            container.appendChild(card);

            // Add click event
            if (onCardClick) {
                card.addEventListener('click', () => onCardClick(destination));
            }

            // Add hover event for CSS class manipulation
            card.addEventListener('mouseenter', () => {
                card.classList.add('card-hovered');
            });
            card.addEventListener('mouseleave', () => {
                card.classList.remove('card-hovered');
            });
        });
    }

    /**
     * Create a single destination card element
     * @param {object} destination - Destination data object (8+ attributes)
     * @param {number} index - Card index for staggered animation
     * @returns {HTMLElement}
     */
    static createDestinationCard(destination, index = 0) {
        const card = document.createElement('div');
        card.className = 'destination-card card-item';
        card.style.animationDelay = `${index * 0.05}s`;
        card.setAttribute('data-id', destination.id);
        card.setAttribute('data-type', destination.type);

        // Inner card for flip effect
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        // Front of card
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.innerHTML = `
            <div class="card-image-wrapper">
                <img 
                    src="https://via.placeholder.com/300x200?text=${encodeURIComponent(destination.name)}" 
                    alt="${destination.name}" 
                    class="card-image"
                    loading="lazy"
                >
                <span class="card-type-badge">${destination.type}</span>
            </div>
            <div class="card-content">
                <h3 class="card-title">${this.escapeHtml(destination.name)}</h3>
                <p class="card-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${this.escapeHtml(destination.location)}
                </p>
                <div class="card-rating">
                    <span class="star-rating">${this.renderStars(destination.rating)}</span>
                    <span class="rating-number">${destination.rating}/5 (${destination.reviews} reviews)</span>
                </div>
            </div>
        `;

        // Back of card (flip effect)
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.innerHTML = `
            <div class="card-back-content">
                <p class="card-description">${this.escapeHtml(destination.description)}</p>
                <p class="card-address">
                    <i class="fas fa-building"></i>
                    ${this.escapeHtml(destination.address)}
                </p>
                <div class="card-extra-info">
                    ${destination.openingHours ? `<p><i class="fas fa-clock"></i> ${destination.openingHours}</p>` : ''}
                    ${destination.priceLevel ? `<p><i class="fas fa-dollar-sign"></i> ${destination.priceLevel}</p>` : ''}
                </div>
            </div>
        `;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        // Add flip event on click
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        return card;
    }

    /**
     * Render star rating display
     * @param {number} rating - Rating value (0-5)
     * @returns {string} - HTML string with stars
     */
    static renderStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    /**
     * Filter destinations by type and other criteria
     * @param {array} destinations - Array of destinations
     * @param {string} filterType - Type to filter by
     * @param {object} additionalFilters - Additional filter criteria
     * @returns {array} - Filtered array
     */
    static filterDestinations(destinations, filterType = 'all', additionalFilters = {}) {
        let filtered = destinations;

        // Filter by type
        if (filterType && filterType !== 'all') {
            filtered = filtered.filter(dest => dest.type.toLowerCase() === filterType.toLowerCase());
        }

        // Filter by rating
        if (additionalFilters.minRating) {
            filtered = filtered.filter(dest => dest.rating >= additionalFilters.minRating);
        }

        // Filter by location
        if (additionalFilters.location) {
            const searchLoc = additionalFilters.location.toLowerCase();
            filtered = filtered.filter(dest => 
                dest.location.toLowerCase().includes(searchLoc) ||
                dest.name.toLowerCase().includes(searchLoc)
            );
        }

        // Filter by price level
        if (additionalFilters.priceLevel) {
            filtered = filtered.filter(dest => dest.priceLevel === additionalFilters.priceLevel);
        }

        return filtered;
    }

    /**
     * Sort destinations by criteria
     * @param {array} destinations - Array to sort
     * @param {string} sortBy - Sort criteria: 'rating', 'reviews', 'name', 'type'
     * @param {string} order - 'asc' or 'desc'
     * @returns {array} - Sorted array
     */
    static sortDestinations(destinations, sortBy = 'rating', order = 'desc') {
        const sorted = [...destinations];

        sorted.sort((a, b) => {
            let compareA = a[sortBy];
            let compareB = b[sortBy];

            // Handle string comparisons
            if (typeof compareA === 'string') {
                compareA = compareA.toLowerCase();
                compareB = compareB.toLowerCase();
                return order === 'asc' 
                    ? compareA.localeCompare(compareB)
                    : compareB.localeCompare(compareA);
            }

            // Handle numeric comparisons
            return order === 'asc' 
                ? compareA - compareB 
                : compareB - compareA;
        });

        return sorted;
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string}
     */
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Format number as currency
     * @param {number} amount - Amount to format
     * @param {string} currency - Currency code (default: USD)
     * @returns {string}
     */
    static formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    /**
     * Format date for display
     * @param {string|Date} date - Date to format
     * @param {string} format - Format style ('short', 'long', 'full')
     * @returns {string}
     */
    static formatDate(date, format = 'short') {
        const dateObj = new Date(date);
        const options = {
            short: { year: '2-digit', month: '2-digit', day: '2-digit' },
            long: { year: 'numeric', month: 'long', day: 'numeric' },
            full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        };
        return dateObj.toLocaleDateString('en-US', options[format] || options.short);
    }

    /**
     * Calculate distance between two coordinates
     * @param {number} lat1, {number} lon1, {number} lat2, {number} lon2
     * @returns {number} - Distance in kilometers
     */
    static calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /**
     * Debounce function for optimized event handling
     * @param {function} func - Function to debounce
     * @param {number} wait - Debounce delay in ms
     * @returns {function}
     */
    static debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function for frequent events
     * @param {function} func - Function to throttle
     * @param {number} limit - Throttle limit in ms
     * @returns {function}
     */
    static throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TravelUtils;
}
