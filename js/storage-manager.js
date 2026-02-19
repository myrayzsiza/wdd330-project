/**
 * TRAVEL PLANNER - Local Storage Manager
 * Handles favorites, search history, and user preferences
 */

class LocalStorageManager {
    constructor() {
        this.FAVORITES_KEY = 'travel_planner_favorites';
        this.SEARCH_HISTORY_KEY = 'travel_planner_search_history';
        this.USER_PREFS_KEY = 'travel_planner_preferences';
        this.MAX_HISTORY = 10;
    }

    // ==================== FAVORITES ====================

    /**
     * Get all favorite destinations
     * @returns {array}
     */
    getFavorites() {
        try {
            const data = localStorage.getItem(this.FAVORITES_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error retrieving favorites:', error);
            return [];
        }
    }

    /**
     * Add destination to favorites
     * @param {object} destination - Destination object with 8+ attributes
     * @returns {boolean} - Success status
     */
    addFavorite(destination) {
        try {
            // Validate required fields
            const requiredFields = ['id', 'name', 'type', 'location', 'rating', 'reviews', 'description', 'address'];
            const hasAllFields = requiredFields.every(field => destination.hasOwnProperty(field));
            
            if (!hasAllFields) {
                console.error('Destination missing required fields');
                return false;
            }

            const favorites = this.getFavorites();
            
            // Check if already exists
            if (favorites.some(fav => fav.id === destination.id)) {
                console.warn('Destination already in favorites');
                return false;
            }

            // Add timestamp
            destination.addedDate = new Date().toISOString();
            
            favorites.push(destination);
            localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
            
            // Dispatch custom event
            this.dispatchEvent('favoriteAdded', destination);
            return true;
        } catch (error) {
            console.error('Error adding favorite:', error);
            return false;
        }
    }

    /**
     * Remove destination from favorites
     * @param {string|number} destinationId - Destination ID
     * @returns {boolean}
     */
    removeFavorite(destinationId) {
        try {
            let favorites = this.getFavorites();
            const removed = favorites.find(fav => fav.id === destinationId);
            
            favorites = favorites.filter(fav => fav.id !== destinationId);
            localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
            
            if (removed) {
                this.dispatchEvent('favoriteRemoved', removed);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error removing favorite:', error);
            return false;
        }
    }

    /**
     * Check if destination is favorited
     * @param {string|number} destinationId
     * @returns {boolean}
     */
    isFavorited(destinationId) {
        return this.getFavorites().some(fav => fav.id === destinationId);
    }

    /**
     * Update favorite with notes/visit information
     * @param {string|number} destinationId
     * @param {object} updates - Updates to apply
     * @returns {boolean}
     */
    updateFavorite(destinationId, updates) {
        try {
            let favorites = this.getFavorites();
            const index = favorites.findIndex(fav => fav.id === destinationId);
            
            if (index !== -1) {
                favorites[index] = { ...favorites[index], ...updates, updatedDate: new Date().toISOString() };
                localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
                this.dispatchEvent('favoriteUpdated', favorites[index]);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating favorite:', error);
            return false;
        }
    }

    /**
     * Clear all favorites
     * @returns {boolean}
     */
    clearFavorites() {
        try {
            localStorage.removeItem(this.FAVORITES_KEY);
            this.dispatchEvent('favoritesClearedAll');
            return true;
        } catch (error) {
            console.error('Error clearing favorites:', error);
            return false;
        }
    }

    // ==================== SEARCH HISTORY ====================

    /**
     * Get search history
     * @param {number} limit - Maximum items to return
     * @returns {array}
     */
    getSearchHistory(limit = this.MAX_HISTORY) {
        try {
            const data = localStorage.getItem(this.SEARCH_HISTORY_KEY);
            const history = data ? JSON.parse(data) : [];
            return history.slice(0, limit);
        } catch (error) {
            console.error('Error retrieving search history:', error);
            return [];
        }
    }

    /**
     * Add search query to history
     * @param {string} query - Search query
     * @returns {boolean}
     */
    addSearchQuery(query) {
        try {
            if (!query || query.trim() === '') return false;

            const history = this.getSearchHistory(this.MAX_HISTORY - 1);
            const cleanQuery = query.trim();

            // Remove duplicate if exists
            const filtered = history.filter(item => item.query !== cleanQuery);

            // Add new query to beginning
            const newItem = {
                query: cleanQuery,
                timestamp: new Date().toISOString(),
                resultCount: 0
            };

            filtered.unshift(newItem);
            localStorage.setItem(this.SEARCH_HISTORY_KEY, JSON.stringify(filtered));
            
            this.dispatchEvent('searchHistoryAdded', newItem);
            return true;
        } catch (error) {
            console.error('Error adding search query:', error);
            return false;
        }
    }

    /**
     * Update search result count
     * @param {string} query
     * @param {number} resultCount
     * @returns {boolean}
     */
    updateSearchResultCount(query, resultCount) {
        try {
            const history = this.getSearchHistory(this.MAX_HISTORY);
            const index = history.findIndex(item => item.query === query);
            
            if (index !== -1) {
                history[index].resultCount = resultCount;
                history[index].timestamp = new Date().toISOString();
                localStorage.setItem(this.SEARCH_HISTORY_KEY, JSON.stringify(history));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating search result count:', error);
            return false;
        }
    }

    /**
     * Clear search history
     * @returns {boolean}
     */
    clearSearchHistory() {
        try {
            localStorage.removeItem(this.SEARCH_HISTORY_KEY);
            this.dispatchEvent('searchHistoryCleared');
            return true;
        } catch (error) {
            console.error('Error clearing search history:', error);
            return false;
        }
    }

    /**
     * Get last search query
     * @returns {string|null}
     */
    getLastSearchQuery() {
        const history = this.getSearchHistory(1);
        return history.length > 0 ? history[0].query : null;
    }

    // ==================== USER PREFERENCES ====================

    /**
     * Get all user preferences
     * @returns {object}
     */
    getUserPreferences() {
        try {
            const data = localStorage.getItem(this.USER_PREFS_KEY);
            return data ? JSON.parse(data) : this.getDefaultPreferences();
        } catch (error) {
            console.error('Error retrieving preferences:', error);
            return this.getDefaultPreferences();
        }
    }

    /**
     * Get default preferences
     * @returns {object}
     */
    getDefaultPreferences() {
        return {
            theme: 'light',
            currency: 'USD',
            language: 'en',
            distanceUnit: 'km',
            defaultFilters: {
                minRating: 0,
                maxPrice: null,
                categories: []
            },
            notifications: true,
            autoSaveTrips: true,
            resultsPerPage: 12
        };
    }

    /**
     * Update user preferences
     * @param {object} updates - Preference updates
     * @returns {boolean}
     */
    updatePreferences(updates) {
        try {
            const prefs = this.getUserPreferences();
            const updated = { ...prefs, ...updates };
            localStorage.setItem(this.USER_PREFS_KEY, JSON.stringify(updated));
            this.dispatchEvent('preferencesUpdated', updated);
            return true;
        } catch (error) {
            console.error('Error updating preferences:', error);
            return false;
        }
    }

    /**
     * Set specific preference value
     * @param {string} key - Preference key
     * @param {any} value - Preference value
     * @returns {boolean}
     */
    setPreference(key, value) {
        try {
            const prefs = this.getUserPreferences();
            prefs[key] = value;
            localStorage.setItem(this.USER_PREFS_KEY, JSON.stringify(prefs));
            this.dispatchEvent('preferenceUpdated', { key, value });
            return true;
        } catch (error) {
            console.error('Error setting preference:', error);
            return false;
        }
    }

    /**
     * Get specific preference
     * @param {string} key - Preference key
     * @param {any} defaultValue - Default value if not found
     * @returns {any}
     */
    getPreference(key, defaultValue = null) {
        const prefs = this.getUserPreferences();
        return prefs.hasOwnProperty(key) ? prefs[key] : defaultValue;
    }

    /**
     * Reset preferences to defaults
     * @returns {boolean}
     */
    resetPreferences() {
        try {
            localStorage.setItem(this.USER_PREFS_KEY, JSON.stringify(this.getDefaultPreferences()));
            this.dispatchEvent('preferencesReset');
            return true;
        } catch (error) {
            console.error('Error resetting preferences:', error);
            return false;
        }
    }

    // ==================== UTILITY METHODS ====================

    /**
     * Get storage usage statistics
     * @returns {object}
     */
    getStorageStats() {
        const stats = {
            favorites: this.getFavorites().length,
            searchHistory: this.getSearchHistory().length,
            preferences: Object.keys(this.getUserPreferences()).length,
            estimatedSize: this.getEstimatedSize()
        };
        return stats;
    }

    /**
     * Estimate local storage size
     * @returns {string}
     */
    getEstimatedSize() {
        let total = 0;
        const data = {
            favorites: localStorage.getItem(this.FAVORITES_KEY) || '',
            history: localStorage.getItem(this.SEARCH_HISTORY_KEY) || '',
            prefs: localStorage.getItem(this.USER_PREFS_KEY) || ''
        };
        
        for (let key in data) {
            total += data[key].length;
        }
        
        return (total / 1024).toFixed(2) + ' KB';
    }

    /**
     * Export all data as JSON
     * @returns {object}
     */
    exportData() {
        return {
            favorites: this.getFavorites(),
            searchHistory: this.getSearchHistory(this.MAX_HISTORY),
            preferences: this.getUserPreferences(),
            exportDate: new Date().toISOString()
        };
    }

    /**
     * Import data from exported JSON
     * @param {object} data - Data to import
     * @returns {boolean}
     */
    importData(data) {
        try {
            if (data.favorites && Array.isArray(data.favorites)) {
                localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(data.favorites));
            }
            if (data.searchHistory && Array.isArray(data.searchHistory)) {
                localStorage.setItem(this.SEARCH_HISTORY_KEY, JSON.stringify(data.searchHistory));
            }
            if (data.preferences && typeof data.preferences === 'object') {
                localStorage.setItem(this.USER_PREFS_KEY, JSON.stringify(data.preferences));
            }
            this.dispatchEvent('dataImported', data);
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    /**
     * Clear all data
     * @returns {boolean}
     */
    clearAllData() {
        try {
            localStorage.removeItem(this.FAVORITES_KEY);
            localStorage.removeItem(this.SEARCH_HISTORY_KEY);
            localStorage.removeItem(this.USER_PREFS_KEY);
            this.dispatchEvent('allDataCleared');
            return true;
        } catch (error) {
            console.error('Error clearing all data:', error);
            return false;
        }
    }

    /**
     * Dispatch custom event
     * @param {string} eventName
     * @param {any} detail
     */
    dispatchEvent(eventName, detail = null) {
        const event = new CustomEvent(`storage-${eventName}`, { detail });
        window.dispatchEvent(event);
    }
}

// Create singleton instance
const storageManager = new LocalStorageManager();

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocalStorageManager;
}
