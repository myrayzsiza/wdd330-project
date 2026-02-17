/**
 * Authentication module for user account management
 * Handles registration, login, and profile updates
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const USERS_FILE = path.join(__dirname, 'users.json');

/**
 * Hash password using SHA256
 */
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Load users from JSON file
 */
function loadUsers() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading users:', err);
  }
  return { users: [] };
}

/**
 * Save users to JSON file
 */
function saveUsers(data) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error('Error saving users:', err);
    return false;
  }
}

/**
 * Register a new user
 */
function registerUser(userData) {
  const { email, password, firstName, lastName } = userData;

  // Validation
  if (!email || !password || !firstName || !lastName) {
    return { success: false, message: 'All fields are required' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters' };
  }

  const users = loadUsers();

  // Check if user already exists
  if (users.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'Email already registered' };
  }

  // Create new user
  const newUser = {
    id: crypto.randomBytes(8).toString('hex'),
    email: email.toLowerCase(),
    password: hashPassword(password),
    firstName,
    lastName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    favorites: [],
    preferences: {}
  };

  users.users.push(newUser);
  
  if (saveUsers(users)) {
    // Return user data without password
    const { password, ...userWithoutPassword } = newUser;
    return { 
      success: true, 
      message: 'Registration successful',
      user: userWithoutPassword 
    };
  }

  return { success: false, message: 'Error registering user' };
}

/**
 * Login user
 */
function loginUser(email, password) {
  if (!email || !password) {
    return { success: false, message: 'Email and password required' };
  }

  const users = loadUsers();
  const user = users.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, message: 'User not found' };
  }

  if (user.password !== hashPassword(password)) {
    return { success: false, message: 'Invalid password' };
  }

  // Return user data without password
  const { password: _, ...userWithoutPassword } = user;
  return {
    success: true,
    message: 'Login successful',
    user: userWithoutPassword
  };
}

/**
 * Update user profile
 */
function updateProfile(userId, updateData) {
  if (!userId) {
    return { success: false, message: 'User ID required' };
  }

  const users = loadUsers();
  const userIndex = users.users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return { success: false, message: 'User not found' };
  }

  // Update allowed fields
  const allowedFields = ['firstName', 'lastName', 'email', 'preferences'];
  const user = users.users[userIndex];

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      // Check for duplicate email
      if (field === 'email' && updateData[field].toLowerCase() !== user.email) {
        const emailExists = users.users.some(u => 
          u.id !== userId && 
          u.email.toLowerCase() === updateData[field].toLowerCase()
        );
        if (emailExists) {
          return { success: false, message: 'Email already in use' };
        }
      }
      user[field] = field === 'email' ? updateData[field].toLowerCase() : updateData[field];
    }
  }

  user.updatedAt = new Date().toISOString();

  if (saveUsers(users)) {
    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      message: 'Profile updated successfully',
      user: userWithoutPassword
    };
  }

  return { success: false, message: 'Error updating profile' };
}

/**
 * Get user by ID
 */
function getUserById(userId) {
  const users = loadUsers();
  const user = users.users.find(u => u.id === userId);

  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  return null;
}

/**
 * Change password
 */
function changePassword(userId, oldPassword, newPassword) {
  if (!userId || !oldPassword || !newPassword) {
    return { success: false, message: 'All fields required' };
  }

  if (newPassword.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters' };
  }

  const users = loadUsers();
  const user = users.users.find(u => u.id === userId);

  if (!user) {
    return { success: false, message: 'User not found' };
  }

  if (user.password !== hashPassword(oldPassword)) {
    return { success: false, message: 'Current password is incorrect' };
  }

  user.password = hashPassword(newPassword);
  user.updatedAt = new Date().toISOString();

  if (saveUsers(users)) {
    return { success: true, message: 'Password changed successfully' };
  }

  return { success: false, message: 'Error changing password' };
}

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  getUserById,
  changePassword
};
