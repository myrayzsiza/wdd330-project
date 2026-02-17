# User Account Management System - Setup Guide

## Overview
Your Travel Planner application now includes a complete user account management system with the following features:

### Features Implemented
- **User Registration** - Create new accounts with email and password
- **User Login** - Sign in to existing accounts
- **Profile Management** - View and update user profile information
- **Password Management** - Change password securely
- **Session Management** - Automatic logout capability
- **User Menu** - Easy access to account features from main page

## Files Created/Modified

### New Files Created
1. **`users.json`** - Database for storing user account data
2. **`auth.js`** - Backend authentication module
3. **`register.html`** - User registration page
4. **`login.html`** - User login page
5. **`profile.html`** - User profile management page
6. **`js/auth-ui.js`** - Frontend authentication utilities
7. **`ACCOUNT-MANAGEMENT.md`** - This file

### Files Modified
1. **`server.js`** - Added API endpoints for authentication
2. **`index.html`** - Added account menu to header
3. **`styles/style.css`** - Added styles for account menu and auth pages

## API Endpoints

The server now supports the following API endpoints:

### Register User
```
POST /api/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    ...
  }
}
```

### Login User
```
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    ...
  }
}
```

### Update Profile
```
POST /api/update-profile
Content-Type: application/json

{
  "userId": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "newemail@example.com"
}

Response:
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

### Change Password
```
POST /api/change-password
Content-Type: application/json

{
  "userId": "user_id",
  "oldPassword": "currentpassword",
  "newPassword": "newpassword123"
}

Response:
{
  "success": true,
  "message": "Password changed successfully"
}
```

## User Data Structure

Each user account is stored with the following structure:

```json
{
  "id": "unique_user_id",
  "email": "user@example.com",
  "password": "hashed_password",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2026-02-17T10:30:00.000Z",
  "updatedAt": "2026-02-17T10:30:00.000Z",
  "favorites": [],
  "preferences": {}
}
```

## How to Use

### For End Users

#### Creating an Account
1. Click the **"Register"** button in the top right of the main page
2. Fill in your first name, last name, email, and password
3. Confirm your password matches
4. Click **"Create Account"**
5. You'll be redirected to your profile page

#### Logging In
1. Click the **"Sign In"** button in the top right of the main page
2. Enter your email and password
3. Optionally check "Remember me" to stay logged in
4. Click **"Sign In"**
5. You'll be redirected to your profile page

#### Managing Your Profile
1. Log in to your account
2. You'll see your user menu in the top right corner
3. Click on your name to see the dropdown menu
4. Select **"My Profile"** to access your profile page
5. From there you can:
   - View your account information
   - Edit your first name, last name, and email
   - Change your password
   - View your member stats
   - Logout

#### Logging Out
1. Click on your name in the top right corner
2. Select **"Logout"** from the dropdown menu
3. Confirm logout
4. You'll be logged out and returned to the main page

### Security Features

- **Password Hashing** - Passwords are hashed using SHA256 before storage
- **Input Validation** - All user inputs are validated on the server side
- **Email Verification** - Duplicate emails are prevented
- **Session Management** - User sessions are managed via localStorage
- **Password Requirements** - Minimum 6 characters required
- **Password Strength Indicator** - Visual feedback on password strength during registration

## File Structure

```
wdd330-project/
├── index.html                 (Updated with account menu)
├── register.html              (NEW - Registration page)
├── login.html                 (NEW - Login page)
├── profile.html               (NEW - Profile management page)
├── server.js                  (Updated with API endpoints)
├── auth.js                    (NEW - Backend authentication module)
├── users.json                 (NEW - User data storage)
├── styles/
│   └── style.css             (Updated with account menu styles)
├── js/
│   └── auth-ui.js            (NEW - Frontend auth utilities)
└── ... (other existing files)
```

## Testing the System

### Test Registration
1. Start your server: `npm start`
2. Navigate to `http://localhost:3000`
3. Click "Register"
4. Create a test account with:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: Test@123
5. You should be redirected to your profile page

### Test Login
1. Click the "Sign In" button in the header
2. Log in with the test account credentials
3. You should be redirected to your profile page
4. Your name should appear in the account menu

### Test Profile Update
1. On the profile page, click "Edit Profile"
2. Change your first name
3. Click "Save Changes"
4. Changes should appear immediately

### Test Password Change
1. On the profile page, click "Change Password"
2. Enter your current password and new password
3. Click "Change Password"
4. Password should be updated

## Browser Compatibility

- **Desktop**: Chrome, Firefox, Safari, Edge (all modern versions)
- **Mobile**: iOS Safari, Chrome Mobile, Firefox Mobile
- **Responsive**: Works on all screen sizes from 320px to 4K

## Notes

- User data is stored in `users.json` in the root directory
- For production deployment, consider using a proper database (MongoDB, PostgreSQL, etc.)
- Currently uses simple JSON storage; this is suitable for development/small deployments
- For production, add SSL/TLS encryption for passwords
- Consider implementing email verification for new accounts
- Add password reset functionality via email
- Implement rate limiting for login attempts

## Future Enhancements

Potential features to add:
- Email verification for new accounts
- Password reset via email
- Account deletion
- Two-factor authentication
- Social login (Google, Facebook)
- User profile pictures
- Activity logging
- Account recovery options
- Terms and conditions acceptance

## Support

For issues or questions about the account management system, refer to the comments in:
- `auth.js` - Backend functions
- `register.html` - Registration page logic
- `login.html` - Login page logic
- `profile.html` - Profile management logic
