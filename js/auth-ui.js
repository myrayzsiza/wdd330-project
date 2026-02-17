/**
 * Authentication UI utilities
 * Shared utilities for authentication pages
 */

// Check if user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Open login page
function openLogin() {
    window.location.href = 'login.html';
}

// Open registration page
function openRegister() {
    window.location.href = 'register.html';
}

// Redirect to profile if logged in
function redirectIfLoggedIn() {
    if (isUserLoggedIn()) {
        window.location.href = 'profile.html';
    }
}

// Redirect to login if not logged in
function redirectIfNotLoggedIn() {
    if (!isUserLoggedIn()) {
        window.location.href = 'login.html';
    }
}
