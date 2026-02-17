/**
 * TRAVEL PLANNER - Travel Guide Module
 * Manages destination guides, travel tips, and comprehensive travel information
 */

class TravelGuide {
    constructor() {
        this.currentDestination = null;
        this.guides = this.initializeGuides();
    }

    /**
     * Initialize comprehensive travel guides for popular destinations
     */
    initializeGuides() {
        return {
            'paris': {
                name: 'Paris',
                country: 'France',
                emoji: '🇫🇷',
                description: 'The City of Light, known for its art, fashion, and iconic landmarks.',
                image: '🗼',
                bestTime: 'April-May, September-October',
                currency: 'Euro (€)',
                language: 'French',
                timeZone: 'CET (UTC+1)',
                population: '2.2 million',
                highlights: [
                    { title: 'Eiffel Tower', description: 'Iconic iron lattice tower with panoramic city views' },
                    { title: 'Louvre Museum', description: 'World\'s largest art museum housing the Mona Lisa' },
                    { title: 'Notre-Dame Cathedral', description: 'Gothic masterpiece on the Île de la Cité' },
                    { title: 'Montmartre', description: 'Charming hilltop neighborhood with artistic heritage' }
                ],
                tips: [
                    'Purchase a Paris Museum Pass for unlimited entry to major attractions',
                    'Use the metro system - it\'s efficient and cost-effective',
                    'Try regional specialties: croissants, macarons, escargots',
                    'Visit during shoulder seasons to avoid crowds',
                    'Book restaurants in advance, especially during peak season'
                ],
                neighborhoods: [
                    { name: 'Marais', vibe: 'Historic, trendy with galleries and boutiques' },
                    { name: 'Latin Quarter', vibe: 'Academic atmosphere with bookstores and cafes' },
                    { name: 'Champs-Élysées', vibe: 'Luxurious shopping and grand avenues' },
                    { name: 'Saint-Germain', vibe: 'Bohemian charm with literary history' }
                ],
                transportation: {
                    metro: 'Fast, affordable, covers entire city',
                    taxi: 'Available but expensive',
                    bus: 'Good option for sightseeing',
                    bike: 'Vélib bike-sharing system available'
                },
                cuisine: [
                    'Café au lait and croissants for breakfast',
                    'Bistro steaks and duck confit',
                    'Fresh seafood from Brittany',
                    'Cheese and wine selection'
                ],
                buget: {
                    budget: '$50-80/day',
                    midrange: '$100-200/day',
                    luxury: '$250+/day'
                }
            },
            'london': {
                name: 'London',
                country: 'United Kingdom',
                emoji: '🇬🇧',
                description: 'Historic capital blending ancient traditions with modern culture.',
                image: '🎭',
                bestTime: 'May-September',
                currency: 'British Pound (£)',
                language: 'English',
                timeZone: 'GMT (UTC+0)',
                population: '9 million',
                highlights: [
                    { title: 'Big Ben & Parliament', description: 'Iconic Gothic Revival architecture' },
                    { title: 'Tower of London', description: 'Historic fortress and royal residence' },
                    { title: 'British Museum', description: 'Vast collection of world civilizations' },
                    { title: 'Buckingham Palace', description: 'Official residence of the British monarch' }
                ],
                tips: [
                    'Get an Oyster Card for efficient public transport',
                    'Many museums offer free admission',
                    'Visit markets like Borough and Camden for local culture',
                    'Explore neighborhoods beyond central London',
                    'Take a Thames river cruise for unique perspectives'
                ],
                neighborhoods: [
                    { name: 'Westminster', vibe: 'Political center with historic monuments' },
                    { name: 'Soho', vibe: 'Vibrant entertainment and dining district' },
                    { name: 'Bloomsbury', vibe: 'Literary heritage and academics' },
                    { name: 'Shoreditch', vibe: 'Trendy with street art and indie culture' }
                ],
                transportation: {
                    underground: 'Extensive tube network covering the city',
                    bus: 'Reliable red buses crisscrossing London',
                    taxi: 'Black cabs available throughout',
                    rail: 'Overground and national rail options'
                },
                cuisine: [
                    'Full English breakfast',
                    'Fish and chips from traditional shop',
                    'Sunday roast',
                    'Indian curry and international cuisines'
                ],
                budget: {
                    budget: '$60-90/day',
                    midrange: '$120-250/day',
                    luxury: '$300+/day'
                }
            },
            'tokyo': {
                name: 'Tokyo',
                country: 'Japan',
                emoji: '🇯🇵',
                description: 'Ultra-modern metropolis where traditional temples meet neon-lit streets.',
                image: '🗯️',
                bestTime: 'March-April (Cherry blossoms), October-November',
                currency: 'Japanese Yen (¥)',
                language: 'Japanese (English limited)',
                timeZone: 'JST (UTC+9)',
                population: '14 million',
                highlights: [
                    { title: 'Senso-ji Temple', description: 'Ancient Buddhist temple in Asakusa district' },
                    { title: 'Shibuya Crossing', description: 'World\'s busiest pedestrian intersection' },
                    { title: 'Meiji Shrine', description: 'Serene Shinto shrine surrounded by forest' },
                    { title: 'Tokyo Skytree', description: '634m broadcasting tower with observation deck' }
                ],
                tips: [
                    'Get a Suica/Pasmo card for seamless transportation',
                    'Chief coins and small bills for vending machines',
                    'Respect queue etiquette and temple rules',
                    'Learn basic phrases or use translation app',
                    'Try vending machine drinks and convenience store food'
                ],
                neighborhoods: [
                    { name: 'Shibuya', vibe: 'Youth culture and trendy fashion' },
                    { name: 'Asakusa', vibe: 'Traditional Tokyo with temples and markets' },
                    { name: 'Shinjuku', vibe: 'Bustling commerce and entertainment' },
                    { name: 'Harajuku', vibe: 'Quirky fashion and youth culture' }
                ],
                transportation: {
                    trains: 'Extensive rail network, punctual and affordable',
                    subway: 'Easy navigation with English signage',
                    bus: 'Useful for neighborhoods not served by rail',
                    taxi: 'Expensive but clean and professional'
                },
                cuisine: [
                    'Sushi and sashimi',
                    'Ramen and udon noodles',
                    'Tempura and tonkatsu',
                    'Izakaya (pub) dining experience'
                ],
                budget: {
                    budget: '$40-70/day',
                    midrange: '$100-180/day',
                    luxury: '$250+/day'
                }
            },
            'new york': {
                name: 'New York',
                country: 'United States',
                emoji: '🇺🇸',
                description: 'The city that never sleeps - iconic landmarks and diverse culture.',
                image: '🏢',
                bestTime: 'April-May, September-October',
                currency: 'US Dollar ($)',
                language: 'English',
                timeZone: 'EST (UTC-5)',
                population: '8.3 million',
                highlights: [
                    { title: 'Statue of Liberty', description: 'Iconic symbol of freedom with Ellis Island views' },
                    { title: 'Times Square', description: 'Dazzling nexus of entertainment and advertising' },
                    { title: 'Central Park', description: '843 acres of green space in Manhattan' },
                    { title: 'Empire State Building', description: 'Legendary Art Deco skyscraper with observation deck' }
                ],
                tips: [
                    'Purchase a MetroCard for unlimited subway/bus access',
                    'Visit attractions on weekdays to avoid crowds',
                    'Walk whenever possible to discover neighborhoods',
                    'Enjoy diverse food from street vendors and restaurants',
                    'Use the Highline elevated park for unique perspectives'
                ],
                neighborhoods: [
                    { name: 'Manhattan', vibe: 'Urban energy and iconic landmarks' },
                    { name: 'Brooklyn', vibe: 'Cool, creative with local vibe' },
                    { name: 'Greenwich Village', vibe: 'Bohemian charm and historic streets' },
                    { name: 'Chinatown', vibe: 'Authentic culture and cuisine' }
                ],
                transportation: {
                    subway: 'Extensive network, 24/7 service',
                    bus: 'Covers areas not served by subway',
                    taxi: 'Yellow cabs plentiful and convenient',
                    walking: 'Best way to explore neighborhoods'
                },
                cuisine: [
                    'New York pizza slice',
                    'Bagels with cream cheese and lox',
                    'Hot dogs from street vendors',
                    'Chinese, Italian, and international cuisine'
                ],
                budget: {
                    budget: '$70-100/day',
                    midrange: '$150-300/day',
                    luxury: '$400+/day'
                }
            },
            'default': {
                name: 'Your Destination',
                country: 'Unknown',
                emoji: '🌍',
                description: 'Explore this amazing destination with our travel guide features.',
                image: '✈️',
                bestTime: 'Year-round',
                currency: 'Local currency',
                language: 'Local language',
                timeZone: 'Check local time',
                population: 'See local info',
                highlights: [
                    { title: 'Local Attractions', description: 'Explore unique sites and landmarks' },
                    { title: 'Museums', description: 'Discover art, history, and culture' },
                    { title: 'Parks', description: 'Enjoy nature and outdoor activities' },
                    { title: 'Markets', description: 'Experience local commerce and food' }
                ],
                tips: [
                    'Research the destination before you go',
                    'Check visa requirements and travel advisories',
                    'Learn basic phrases in the local language',
                    'Use public transportation to save money',
                    'Respect local customs and traditions'
                ],
                neighborhoods: [
                    { name: 'City Center', vibe: 'Main attractions and urban energy' },
                    { name: 'Old Town', vibe: 'Historic charm and heritage' },
                    { name: 'Waterfront', vibe: 'Scenic views and dining' },
                    { name: 'Local District', vibe: 'Authentic neighborhoods' }
                ],
                transportation: {
                    public: 'Check local public transportation options',
                    taxi: 'Available in most cities',
                    rental: 'Consider renting a car if needed',
                    walking: 'Great for exploring at your own pace'
                },
                cuisine: [
                    'Try local specialties',
                    'Visit traditional restaurants',
                    'Explore street food markets',
                    'Taste authentic regional dishes'
                ],
                budget: {
                    budget: 'Budget-friendly hostels and street food',
                    midrange: 'Comfortable hotels and casual dining',
                    luxury: 'Premium hotels and fine dining'
                }
            }
        };
    }

    /**
     * Get guide for a specific destination
     */
    getGuide(destination) {
        const key = destination.toLowerCase().trim();
        return this.guides[key] || this.guides['default'];
    }

    /**
     * Display travel guide for a destination
     */
    displayGuide(destination) {
        this.currentDestination = destination;
        const guide = this.getGuide(destination);
        const guideContent = document.getElementById('guide-content');

        if (!guideContent) return;

        guideContent.innerHTML = `
            <div class="guide-container">
                <!-- Destination Header -->
                <div class="guide-header">
                    <div class="guide-header-image">${guide.image}</div>
                    <div class="guide-header-info">
                        <h1>${guide.emoji} ${guide.name}</h1>
                        <p class="guide-country">${guide.country}</p>
                        <p class="guide-description">${guide.description}</p>
                    </div>
                </div>

                <!-- Quick Facts -->
                <div class="quick-facts">
                    <div class="fact-item">
                        <i class="fas fa-calendar"></i>
                        <div>
                            <strong>Best Time</strong>
                            <p>${guide.bestTime}</p>
                        </div>
                    </div>
                    <div class="fact-item">
                        <i class="fas fa-dollar-sign"></i>
                        <div>
                            <strong>Currency</strong>
                            <p>${guide.currency}</p>
                        </div>
                    </div>
                    <div class="fact-item">
                        <i class="fas fa-language"></i>
                        <div>
                            <strong>Language</strong>
                            <p>${guide.language}</p>
                        </div>
                    </div>
                    <div class="fact-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <strong>Time Zone</strong>
                            <p>${guide.timeZone}</p>
                        </div>
                    </div>
                    <div class="fact-item">
                        <i class="fas fa-users"></i>
                        <div>
                            <strong>Population</strong>
                            <p>${guide.population}</p>
                        </div>
                    </div>
                </div>

                <!-- Top Highlights -->
                <section class="guide-section">
                    <h2><i class="fas fa-star"></i> Top Highlights</h2>
                    <div class="highlights-grid">
                        ${guide.highlights.map(highlight => `
                            <div class="highlight-card">
                                <h3>${highlight.title}</h3>
                                <p>${highlight.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Travel Tips -->
                <section class="guide-section">
                    <h2><i class="fas fa-lightbulb"></i> Travel Tips</h2>
                    <ul class="tips-list">
                        ${guide.tips.map(tip => `
                            <li><i class="fas fa-check-circle"></i> ${tip}</li>
                        `).join('')}
                    </ul>
                </section>

                <!-- Neighborhoods -->
                <section class="guide-section">
                    <h2><i class="fas fa-map-marker-alt"></i> Neighborhoods</h2>
                    <div class="neighborhoods-grid">
                        ${guide.neighborhoods.map(neighborhood => `
                            <div class="neighborhood-card">
                                <h3>${neighborhood.name}</h3>
                                <p>${neighborhood.vibe}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Transportation -->
                <section class="guide-section">
                    <h2><i class="fas fa-bus"></i> Transportation</h2>
                    <div class="transport-grid">
                        ${Object.entries(guide.transportation).map(([type, desc]) => `
                            <div class="transport-card">
                                <h3>${this.capitalizeFirstLetter(type)}</h3>
                                <p>${desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Food & Cuisine -->
                <section class="guide-section">
                    <h2><i class="fas fa-utensils"></i> Food & Cuisine</h2>
                    <div class="cuisine-list">
                        ${guide.cuisine.map(food => `
                            <div class="cuisine-item">
                                <i class="fas fa-circle"></i>
                                <span>${food}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Budget Guide -->
                <section class="guide-section">
                    <h2><i class="fas fa-wallet"></i> Budget Guide</h2>
                    <div class="budget-grid">
                        ${Object.entries(guide.budget).map(([level, amount]) => `
                            <div class="budget-card">
                                <h3>${this.capitalizeFirstLetter(level)}</h3>
                                <p>${amount}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>
        `;
    }

    /**
     * Helper: Capitalize first letter
     */
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * Search guides by keyword
     */
    searchGuides(keyword) {
        const key = keyword.toLowerCase().trim();
        return Object.values(this.guides).filter(guide =>
            guide.name.toLowerCase().includes(key) ||
            guide.country.toLowerCase().includes(key) ||
            guide.description.toLowerCase().includes(key)
        );
    }
}

// Initialize travel guide globally
const travelGuide = new TravelGuide();
