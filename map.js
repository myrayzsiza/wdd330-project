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
        console.error('Leaflet library not loaded');
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
    markersGroup = null;

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
        map = L.map('map').setView([location.lat, location.lng], location.zoom);

        // Add OpenStreetMap tiles (free, no API key needed)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Create a feature group for markers
        markersGroup = L.featureGroup().addTo(map);

        // Add attractions markers
        addAttractionsMarkers(location);

        // Trigger resize to ensure map renders properly
        setTimeout(() => {
            if (map) map.invalidateSize();
        }, 100);

        console.log(`Map initialized for ${searchQuery}`);
        return true;
    } catch (error) {
        console.error('Error initializing map:', error);
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

    attractions.forEach((attraction) => {
        addMarker(attraction);
    });

    // Fit map bounds to show all markers
    if (markers.length > 0) {
        fitMapToMarkers();
    }
}

/**
 * Add a single marker to the map
 */
function addMarker(attraction) {
    if (!map || !markersGroup) return;

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
 * Clear all markers from map
 */
function clearMap() {
    if (markersGroup) {
        markersGroup.clearLayers();
    }
    markers = [];
}

/**
 * Show route between locations (stub for Leaflet/OSM)
 */
function showRoute(destinationName) {
    console.log('Route display for:', destinationName);
    alert('Directions: ' + destinationName + ' - Feature coming soon!');
}

/**
 * Zoom to a specific area
 */
function zoomToArea(areaName) {
    if (!map) return;
    
    // Find marker with matching name
    const marker = markers.find(m => m.options.title === areaName);
    if (marker) {
        map.setView(marker.getLatLng(), 15);
        marker.openPopup();
    }
}

// Export functions for external use
window.initMap = initMap;
window.showRoute = showRoute;
window.clearMap = clearMap;
window.zoomToArea = zoomToArea;
