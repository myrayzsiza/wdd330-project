/**
 * TRAVEL PLANNER - Leaflet Maps Integration
 * Handles maps, markers, and location-based features using free OpenStreetMap
 * No API key required!
 */

let map;
let markers = [];
let markersGroup;
let currentLocation = null;

/**
 * Initialize Leaflet Map for a location
 */
function initMap(searchQuery = 'New York') {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.warn('Leaflet library not loaded yet');
        showMapError('Maps library is loading. Please try again.');
        return false;
    }

    // Get map container
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('Map container element not found');
        return false;
    }

    // Clear previous map if exists
    if (map) {
        map.remove();
        map = null;
    }
    markers = [];

    // Set default location or use search query
    const defaultLocations = {
        'new york': { lat: 40.7128, lng: -74.0060, zoom: 13 },
        'london': { lat: 51.5074, lng: -0.1278, zoom: 13 },
        'paris': { lat: 48.8566, lng: 2.3522, zoom: 13 },
        'tokyo': { lat: 35.6762, lng: 139.6503, zoom: 13 },
        'sydney': { lat: -33.8688, lng: 151.2093, zoom: 13 },
        'barcelona': { lat: 41.3851, lng: 2.1734, zoom: 13 },
        'rome': { lat: 41.9028, lng: 12.4964, zoom: 13 },
        'dubai': { lat: 25.2048, lng: 55.2708, zoom: 13 },
        'amsterdam': { lat: 52.3676, lng: 4.9041, zoom: 13 },
        'bangkok': { lat: 13.7563, lng: 100.5018, zoom: 13 },
        'singapore': { lat: 1.3521, lng: 103.8198, zoom: 13 },
        'berlin': { lat: 52.5200, lng: 13.4050, zoom: 13 },
        'vienna': { lat: 48.2082, lng: 16.3738, zoom: 13 },
        'prague': { lat: 50.0755, lng: 14.4378, zoom: 13 },
        'istanbul': { lat: 41.0082, lng: 28.9784, zoom: 13 }
    };

    let location = defaultLocations[searchQuery.toLowerCase()] || defaultLocations['new york'];
    currentLocation = location;

    try {
        // Create map with OpenStreetMap tiles
        map = L.map('map', {
            center: [location.lat, location.lng],
            zoom: location.zoom,
            scrollWheelZoom: true
        });

        // Add OpenStreetMap tiles (free, no API key needed)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Create a feature group for markers
        markersGroup = L.featureGroup().addTo(map);

        // Add attractions markers
        addAttractionsMarkers(location);

        console.log(`Map initialized for ${searchQuery}`);
        return true;
    } catch (error) {
        console.error('Error initializing map:', error);
        showMapError('Failed to initialize map');
        return false;
    }
}

/**
 * Add markers for attractions
 */
function addAttractionsMarkers(location) {
    if (!map) return;

    const attractions = [
        {
            name: 'Main Museum',
            position: [location.lat + 0.01, location.lng + 0.01],
            type: 'museum',
            description: 'World-class museum collection',
            icon: '🏛️'
        },
        {
            name: 'Central Park',
            position: [location.lat - 0.01, location.lng + 0.01],
            type: 'park',
            description: 'Beautiful green space for recreation',
            icon: '🌳'
        },
        {
            name: 'Grand Hotel',
            position: [location.lat + 0.005, location.lng - 0.01],
            type: 'hotel',
            description: '5-star luxury accommodation',
            icon: '🏨'
        },
        {
            name: 'Local Restaurant',
            position: [location.lat - 0.005, location.lng - 0.01],
            type: 'restaurant',
            description: 'Authentic local cuisine',
            icon: '🍽️'
        },
        {
            name: 'Historic District',
            position: [location.lat, location.lng + 0.015],
            type: 'attraction',
            description: 'Charming historic area',
            icon: '🏰'
        }
    ];

    attractions.forEach((attraction, index) => {
        addMarker(attraction, index);
    });

    // Fit map bounds to show all markers
    if (markers.length > 0) {
        fitMapToMarkers();
    }
}

/**
 * Add a single marker to the map
 */
function addMarker(attraction, index) {
    if (!map) return;

    const markerColor = getMarkerColor(attraction.type);
    const markerIcon = createMarkerIcon(markerColor, attraction.icon);

    // Create marker
    const marker = L.marker(attraction.position, {
        icon: markerIcon,
        title: attraction.name
    }).addTo(markersGroup);

    // Create popup content
    const popupContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-width: 250px;">
            <div style="text-align: center; font-size: 32px; margin-bottom: 10px;">
                ${attraction.icon}
            </div>
            <h4 style="margin: 0 0 8px 0; color: #0056b3; font-size: 16px;">
                ${attraction.name}
            </h4>
            <p style="margin: 0 0 12px 0; font-size: 13px; color: #666;">
                ${attraction.description}
            </p>
            <div style="display: flex; gap: 8px; justify-content: space-between; flex-wrap: wrap;">
                <span style="background: #e7f3ff; color: #0056b3; padding: 4px 8px; border-radius: 3px; font-size: 12px;">
                    📌 ${attraction.type.toUpperCase()}
                </span>
            </div>
        </div>
    `;

    marker.bindPopup(popupContent, { maxWidth: 300 });

    markers.push(marker);
}

/**
 * Create a custom marker icon using Leaflet's icon system
 */
function createMarkerIcon(color, emoji) {
    const colors = {
        'yellow': '#FBBC04',
        'red': '#EA4335',
        'orange': '#FF9800',
        'green': '#34A853',
        'blue': '#4285F4'
    };

    const baseColor = colors[color] || colors['blue'];

    return L.divIcon({
        html: `
            <div style="
                background-color: ${baseColor};
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 20px;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                cursor: pointer;
            ">
                ${emoji}
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        className: 'custom-marker'
    });
}

/**
 * Get marker color based on type
 */
function getMarkerColor(type) {
    const colors = {
        'museum': 'yellow',
        'hotel': 'red',
        'restaurant': 'orange',
        'park': 'green',
        'attraction': 'blue'
    };
    return colors[type] || 'blue';
}

/**
 * Fit map bounds to show all markers
 */
function fitMapToMarkers() {
    if (!map || markers.length === 0) return;

    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
}

/**
 * Show route between locations
 */
function showRoute(destinationName) {
    if (!map || markers.length === 0) {
        alert('Map is not properly initialized');
        return;
    }

    // Find the destination marker by checking popup content
    const destMarker = markers.find(m => {
        const popup = m.getPopup();
        return popup && popup.getContent().includes(destinationName);
    });
    
    if (!destMarker) {
        alert('Destination not found');
        return;
    }

    // Show route info
    const startCoords = markers[0].getLatLng();
    const endCoords = destMarker.getLatLng();

    // Draw a line between start and destination
    if (window.routeLine) {
        map.removeLayer(window.routeLine);
    }

    window.routeLine = L.polyline([startCoords, endCoords], {
        color: '#0056b3',
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5'
    }).addTo(map);

    // Fit bounds to show both points
    const group = new L.featureGroup([markers[0], destMarker]);
    map.fitBounds(group.getBounds().pad(0.1));

    // Calculate distance
    const distance = startCoords.distanceTo(endCoords) / 1000; // Convert to km
    const startName = markers[0].getPopup().getContent().match(/<h4[^>]*>([^<]+)<\/h4>/)?.[1] || 'Start';
    alert(`Route shown: ${distance.toFixed(2)} km from ${startName} to ${destinationName}`);
}

/**
 * Show map error message
 */
function showMapError(message) {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 8px;
        font-size: 16px;
        color: white;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
    `;
    errorDiv.innerHTML = `
        <div>
            <p style="margin: 0 0 10px 0; font-size: 24px;">🗺️</p>
            <p style="margin: 0; font-weight: bold;">${message}</p>
            <p style="margin: 10px 0 0 0; font-size: 13px; opacity: 0.9;">
                Using free OpenStreetMap - No API key required!
            </p>
        </div>
    `;

    mapElement.innerHTML = '';
    mapElement.appendChild(errorDiv);
}

/**
 * Show attraction guide (placeholder)
 */
function showAttractionGuide(attractionName) {
    alert(`Guide for ${attractionName} would load here in a full version`);
}

// Export functions for global use
window.initMap = initMap;
window.showRoute = showRoute;
window.showAttractionGuide = showAttractionGuide;

            position: {
                lat: location.lat - 0.01,
                lng: location.lng + 0.01
            },
            type: 'park',
            description: 'Beautiful green space for recreation'
        },
        {
            name: 'Grand Hotel',
            position: {
                lat: location.lat + 0.005,
                lng: location.lng - 0.01
            },
            type: 'hotel',
            description: '5-star luxury accommodation'
        },
        {
            name: 'Local Restaurant',
            position: {
                lat: location.lat - 0.005,
                lng: location.lng - 0.01
            },
            type: 'restaurant',
            description: 'Authentic local cuisine'
        },
        {
            name: 'Historic District',
            position: {
                lat: location.lat,
                lng: location.lng + 0.015
            },
            type: 'attraction',
            description: 'Charming historic area'
        }
    ];

    attractions.forEach((attraction, index) => {
        addMarker(attraction);
    });

    // Center map to include all markers
    fitMapToMarkers();
}

/**
 * Add a single marker to the map
 */
function addMarker(attraction) {
    if (!map) return;

    const markerColor = getMarkerColor(attraction.type);
    const markerIcon = createMarkerIcon(markerColor, '📍');

    // Create Leaflet marker
    const marker = L.marker([attraction.position[0], attraction.position[1]], {
        icon: markerIcon,
        title: attraction.name
    }).addTo(markersGroup);

    // Create popup content with Leaflet popup
    const popupContent = `
        <div style="padding: 10px; max-width: 280px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <h4 style="margin: 0 0 8px 0; color: #0056b3;">${attraction.name}</h4>
            <p style="margin: 0 0 8px 0; font-size: 0.9rem; color: #666;">
                ${attraction.description}
            </p>
            <div style="display: flex; gap: 8px; margin-bottom: 8px; font-size: 0.85rem;">
                <span style="background: #e7f3ff; color: #0056b3; padding: 4px 8px; border-radius: 3px;">
                    📌 ${attraction.type.toUpperCase()}
                </span>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="showRoute('${attraction.name}')" style="
                    flex: 1;
                    padding: 8px;
                    background: #0056b3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: background 0.2s;
                    min-width: 80px;
                " onmouseover="this.style.background='#004085'" onmouseout="this.style.background='#0056b3'">
                    🛣️ Route
                </button>
            </div>
        </div>
    `;

    // Bind Leaflet popup to marker
    marker.bindPopup(popupContent, { maxWidth: 300 });

    // Open popup on click (Leaflet handles this automatically, but ensure it works)
    marker.on('click', function() {
        this.openPopup();
    });

    markers.push(marker);
}
                </span>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="showRoute('${attraction.name}')" style="
                    padding: 6px 12px;
                    background-color: #0056b3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    transition: background-color 0.3s;
                " onmouseover="this.style.backgroundColor='#003d82'" onmouseout="this.style.backgroundColor='#0056b3'">
                    📍 Get Directions
                </button>
                <button onclick="showAttractionGuide('${attraction.name}')" style="
                    padding: 6px 12px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    transition: background-color 0.3s;
                " onmouseover="this.style.backgroundColor='#1e7b34'" onmouseout="this.style.backgroundColor='#28a745'">
                    📖 Guide
                </button>
            </div>
        </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
    });

    // Show info window on marker click
    marker.addListener('click', () => {
        // Close all other info windows
        infoWindows.forEach(iw => iw.close());
        infoWindow.open(map, marker);
    });

    markers.push(marker);
    infoWindows.push(infoWindow);

    return marker;
}

/**
 * Get marker color based on type
 */
function getMarkerColor(type) {
    const colors = {
        'museum': 'yellow',
        'hotel': 'red',
        'restaurant': 'orange',
        'park': 'green',
        'attraction': 'blue'
    };
    return colors[type] || 'blue';
}

/**
 * Get HTTPS-compatible marker icon
 */
function getMarkerIcon(color) {
    // Using material design icons with SVG
    const colorMap = {
        'yellow': '#FBBC04',
        'red': '#EA4335',
        'orange': '#FF9800',
        'green': '#34A853',
        'blue': '#4285F4'
    };
    
    const baseColor = colorMap[color] || colorMap['blue'];
    
    return {
        path: 'M 0 0 C -2 -2 -2 -10 0 -10 C 2 -10 2 -2 0 0 Z',
        fillColor: baseColor,
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
        scale: 2
    };
}

/**
 * Fit map bounds to show all markers
 */
function fitMapToMarkers() {
    if (!map || markers.length === 0) return;

    // Create Leaflet feature group bounds
    const bounds = L.latLngBounds([]);
    
    markers.forEach(marker => {
        bounds.extend(marker.getLatLng());
    });

    // Fit map to bounds with padding
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
}

/**
 * Show route to an attraction
 */
function showRoute(destinationName) {
    if (!map || !directionsService || markers.length === 0) {
        alert('Map is not properly initialized. Please try again.');
        return;
    }

    if (typeof google === 'undefined' || !google.maps) {
        alert('Google Maps API is not loaded.');
        return;
    }

    const origin = markers[0].getPosition();
    const destination = markers.find(m => m.title === destinationName)?.getPosition() || markers[1].getPosition();

    if (!origin || !destination) {
        alert('Unable to calculate route. Please try again.');
        return;
    }

    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true
    }, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
        } else {
            console.error('Directions request failed due to ' + status);
            alert('Unable to calculate route. Please try again.');
        }
    });
}

/**
 * Show map error message to user
 */
function showMapError(message) {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Create error message overlay
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border-radius: 8px;
        font-size: 14px;
        color: #666;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
    `;
    errorDiv.innerHTML = `
        <div>
            <p style="margin: 0 0 10px 0;">⚠️</p>
            <p style="margin: 0;">${message}</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">
                Maps will be available once configured. You can still save places to your trips!
            </p>
        </div>
    `;
    
    mapElement.innerHTML = '';
    mapElement.appendChild(errorDiv);
}

/**
 * Get map tile layer options for Travel Planner theme
 * OpenStreetMap tiles are free and require no API key
 * Alternative providers available for different styles
 */
function getMapTileLayer() {
    // Default OpenStreetMap (free)
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    });

    // Alternative Stamen Terrain layer (free)
    const stamenLayer = L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>',
        maxZoom: 18
    });

    return {
        osm: osmLayer,
        stamen: stamenLayer
    };
}

/**
 * Calculate distance between two locations
 */
function calculateDistance(location1, location2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (location2.lat - location1.lat) * Math.PI / 180;
    const dLng = (location2.lng - location1.lng) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(location1.lat * Math.PI / 180) * Math.cos(location2.lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Search for nearby places (Leaflet-compatible)
 * Note: Full place search requires backend API integration
 * This can be enhanced with TripAdvisor or local data
 */
function searchNearbyPlaces(location, placeType, radius = 5000) {
    if (!map) return;

    console.log(`Searching for ${placeType} near location:`, location);
    
    // For full place search functionality, integrate with backend API
    // or TripAdvisor API through your apiManager
    if (typeof apiManager !== 'undefined') {
        // Use apiManager to search destinations
        apiManager.searchDestinations(placeType, placeType).then(results => {
            console.log(`Found ${results.length} ${placeType} places`);
            results.slice(0, 5).forEach(place => {
                console.log(`- ${place.name}: ${place.rating || 'N/A'} stars`);
            });
        });
    } else {
        console.warn('apiManager not available for place search');
    }
}

/**
 * Get location details from integrated APIs
 * Works with apiManager to fetch destination details
 */
function getPlaceDetails(placeName) {
    if (!apiManager) return;

    console.log('Fetching details for:', placeName);
    
    // Get destination details from apiManager
    apiManager.getDestinationDetails(placeName).then(details => {
        console.log('Place Details:', details);
        return details;
    }).catch(error => {
        console.error('Failed to get place details:', error);
    });
}

/**
 * Clear all routes and markers
 */
function clearMap() {
    // Remove all markers from the map
    if (markersGroup) {
        markersGroup.clearLayers();
    }
    markers = [];
    
    // Clear any polylines (routes)
    if (window.currentRoute) {
        map.removeLayer(window.currentRoute);
        window.currentRoute = null;
    }
}

/**
 * Zoom to bounds
 */
function zoomToArea(bounds) {
    if (!map || !bounds || bounds.length === 0) return;
    
    const latLngBounds = L.latLngBounds([]);
    
    bounds.forEach(coord => {
        latLngBounds.extend([coord.lat, coord.lng]);
    });
    
    map.fitBounds(latLngBounds, { padding: [50, 50] });
}

/**
 * Add custom heatmap layer using Leaflet.heat
 * Requires Leaflet.heat library: https://unpkg.com/leaflet.heat
 */
function addHeatmapLayer(locations) {
    if (!map || !window.L || !L.heatLayer) return;

    // Convert locations to [lat, lng, intensity] format for Leaflet.heat
    const heatmapData = locations.map((loc, index) => [
        loc.lat,
        loc.lng,
        0.5 // Intensity value (0-1)
    ]);

    // Create and add heatmap layer
    const heatmap = L.heatLayer(heatmapData, {
        radius: 30,
        blur: 15,
        maxZoom: 17,
        opacity: 0.8
    }).addTo(map);

    return heatmap;
}

// Export functions for external use
window.initMap = initMap;
window.showRoute = showRoute;
window.clearMap = clearMap;
window.zoomToArea = zoomToArea;

/**
 * Show attraction guide information
 */
function showAttractionGuide(attractionName) {
    if (typeof travelGuide === 'undefined') return;
    
    // You could enhance this to show specific attraction info from the travel guide
    console.log(`Showing guide for: ${attractionName}`);
    alert(`Guide info for ${attractionName} - Check the Travel Guide section for more details!`);
}

/**
 * Initialize map with travel guide integration
 */
function initMapWithGuide(searchQuery = 'New York') {
    initMap(searchQuery);
    
    // Display travel guide if available
    if (typeof travelGuide !== 'undefined') {
        travelGuide.displayGuide(searchQuery);
    }
}

/**
 * Add multiple attractions with travel guide data
 */
function addAttractionsFromGuide(destination) {
    if (typeof travelGuide === 'undefined') return;
    
    const guide = travelGuide.getGuide(destination);
    if (!guide || !guide.highlights) return;
    
    // Get base location from first marker
    let baseLat = 40.7128;
    let baseLng = -74.0060;
    
    if (markers.length > 0) {
        const firstMarkerLatLng = markers[0].getLatLng();
        baseLat = firstMarkerLatLng.lat;
        baseLng = firstMarkerLatLng.lng;
    }
    
    // Add highlight attractions to map
    guide.highlights.slice(0, 4).forEach((highlight, index) => {
        const offset = 0.005 * (index + 1);
        addMarker({
            name: highlight.title,
            position: [baseLat + offset, baseLng + offset],
            type: 'attraction',
            description: highlight.description
        });
    });
}
