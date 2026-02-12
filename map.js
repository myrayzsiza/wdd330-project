/**
 * TRAVEL PLANNER - Google Maps Integration
 * Handles maps, routes, and location-based features
 */

let map;
let markers = [];
let infoWindows = [];
let directionsService;
let directionsRenderer;

/**
 * Initialize Google Map for a location
 */
function initMap(searchQuery = 'New York') {
    // Clear previous markers and info windows
    markers.forEach(marker => marker.setMap(null));
    infoWindows.forEach(infoWindow => infoWindow.close());
    markers = [];
    infoWindows = [];

    // Set default location or use search query
    const defaultLocations = {
        'new york': { lat: 40.7128, lng: -74.0060 },
        'london': { lat: 51.5074, lng: -0.1278 },
        'paris': { lat: 48.8566, lng: 2.3522 },
        'tokyo': { lat: 35.6762, lng: 139.6503 },
        'sydney': { lat: -33.8688, lng: 151.2093 },
        'barcelona': { lat: 41.3851, lng: 2.1734 },
        'rome': { lat: 41.9028, lng: 12.4964 },
        'dubai': { lat: 25.2048, lng: 55.2708 }
    };

    let location = defaultLocations[searchQuery.toLowerCase()] || defaultLocations['new york'];

    // Create map
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        zoom: 13,
        center: location,
        styles: getMapStyles(),
        zoomControl: true,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true
    });

    // Initialize directions service and renderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: false
    });

    // Add markers for attractions
    addAttractionsMarkers(location);

    console.log(`Map initialized for ${searchQuery}`);
}

/**
 * Add markers for attractions
 */
function addAttractionsMarkers(location) {
    if (!map) return;

    const attractions = [
        {
            name: 'Main Museum',
            position: {
                lat: location.lat + 0.01,
                lng: location.lng + 0.01
            },
            type: 'museum',
            description: 'World-class museum collection'
        },
        {
            name: 'Central Park',
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

    const iconColor = getMarkerColor(attraction.type);
    
    const marker = new google.maps.Marker({
        position: attraction.position,
        map: map,
        title: attraction.name,
        icon: `http://maps.google.com/mapfiles/ms/icons/${iconColor}-dot.png`,
        animation: google.maps.Animation.DROP
    });

    // Create info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; max-width: 250px;">
                <h4 style="margin: 0 0 8px 0; color: #0056b3;">${attraction.name}</h4>
                <p style="margin: 0 0 8px 0; font-size: 0.9rem; color: #666;">
                    ${attraction.description}
                </p>
                <p style="margin: 0; font-size: 0.85rem; color: #999;">
                    Type: ${attraction.type}
                </p>
                <button onclick="showRoute('${attraction.name}')" style="
                    margin-top: 8px;
                    padding: 6px 12px;
                    background-color: #0056b3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.85rem;
                ">
                    Get Directions
                </button>
            </div>
        `
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
 * Fit map bounds to show all markers
 */
function fitMapToMarkers() {
    if (!map || markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    
    markers.forEach(marker => {
        bounds.extend(marker.getPosition());
    });

    map.fitBounds(bounds);
    map.setZoom(Math.min(map.getZoom(), 14));
}

/**
 * Show route to an attraction
 */
function showRoute(destinationName) {
    if (!map || !directionsService || markers.length === 0) return;

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
 * Get custom map styles for Travel Planner theme
 * Colors: Blue (trust), Green (nature), White (clean)
 */
function getMapStyles() {
    return [
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9e6fb' }]
        },
        {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f0f7f3' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#e7f3ff' }]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#d0f0e0' }]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#0056b3' }]
        },
        {
            featureType: 'administrative',
            elementType: 'labels',
            stylers: [{ color: '#0056b3' }]
        }
    ];
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
 * Search for nearby places
 */
function searchNearbyPlaces(location, placeType, radius = 5000) {
    if (!map) return;

    const service = new google.maps.places.PlacesService(map);

    const request = {
        location: location,
        radius: radius,
        type: placeType
    };

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(`Found ${results.length} ${placeType} places nearby`);
            
            // Process results
            results.slice(0, 5).forEach(place => {
                console.log(`- ${place.name}: ${place.rating || 'N/A'} stars`);
            });
        } else {
            console.error('Nearby search failed:', status);
        }
    });
}

/**
 * Get location details from Google Places API
 */
function getPlaceDetails(placeId) {
    if (!map) return;

    const service = new google.maps.places.PlacesService(map);
    const request = {
        placeId: placeId,
        fields: ['name', 'rating', 'reviews', 'formatted_address', 'website', 'opening_hours']
    };

    service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log('Place Details:', {
                name: place.name,
                rating: place.rating,
                address: place.formatted_address,
                website: place.website,
                hours: place.opening_hours
            });
        } else {
            console.error('Get place details failed:', status);
        }
    });
}

/**
 * Clear all routes and markers
 */
function clearMap() {
    markers.forEach(marker => marker.setMap(null));
    infoWindows.forEach(infoWindow => infoWindow.close());
    markers = [];
    infoWindows = [];
    
    if (directionsRenderer) {
        directionsRenderer.setDirections({ routes: [] });
    }
}

/**
 * Zoom to bounds
 */
function zoomToArea(bounds) {
    if (!map) return;
    
    const mapBounds = new google.maps.LatLngBounds();
    
    bounds.forEach(coord => {
        mapBounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
    });
    
    map.fitBounds(mapBounds);
}

/**
 * Add custom heatmap layer
 */
function addHeatmapLayer(locations) {
    if (!map) return;

    const heatmapData = locations.map(loc => 
        new google.maps.LatLng(loc.lat, loc.lng)
    );

    const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
        radius: 30,
        opacity: 0.5
    });

    return heatmap;
}

// Export functions for external use
window.initMap = initMap;
window.showRoute = showRoute;
window.clearMap = clearMap;
window.zoomToArea = zoomToArea;
