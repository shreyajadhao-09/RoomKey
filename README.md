# RoomKey

RoomKey is a modern full-stack web application inspired by Airbnb, designed for discovering, listing, and managing vacation rentals. While inspired by Airbnb's core concept, RoomKey features a unique UI, customized branding, enhanced user experience, and additional functionality.

The application follows the **MVC (Model-View-Controller)** architecture and implements secure authentication, authorization, image uploads, interactive maps, review management, and responsive design.

---

##  Features

- 🏡 Browse and explore vacation rental properties with a clean and responsive interface.
- 🔐 Secure user authentication and authorization using Passport.js and session-based authentication.
- 👤 User registration, login, and logout functionality with protected routes.
- 📝 Create, edit, and delete property listings with owner-only access.
- 📷 Upload and manage property images using Cloudinary and Multer.
- 🗺️ Display interactive property locations with MapTiler integration.
- 🔍 Search properties by title, location, or country.
- ⭐ Add, view, and manage reviews and ratings for listings.
- 💰 Display property pricing with an optional tax calculation feature.
- ✅ Server-side form validation using Joi to ensure data integrity.
- ⚡ Flash messages to provide real-time user feedback.
- 🛡️ Centralized error handling with custom middleware for improved reliability.
- 🍪 Cookie-based session management for secure authentication.
- 📱 Fully responsive design optimized for desktop, tablet, and mobile devices.
- 🏗️ Organized using the MVC (Model-View-Controller) architecture for scalability and maintainability.

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS
- EJS-Mate

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- Passport.js
- Passport Local
- Passport Local Mongoose
- Express Session
- Cookie Parser

### Cloud & Maps

- Cloudinary
- Multer
- Multer Storage Cloudinary
- MapTiler SDK
- MapTiler Client

### Validation & Utilities

- Joi
- Connect Flash
- Method Override
- Dotenv

---

## Project Structure

```text
RoomKey
│
├── controllers/
├── middleware/
├── models/
├── public/
├── routes/
├── utils/
├── views/
│
├── app.js
├── cloudConfig.js
├── package.json
├── package-lock.json
└── README.md
```

The project follows the **MVC (Model-View-Controller)** architecture to ensure better code organization, scalability, and maintainability.

---

## Authentication & Authorization

- User Registration
- Secure Login & Logout
- Cookie-based Session Authentication
- Protected Routes
- Owner-only Edit/Delete Access
- Passport.js Authentication

---

## Validation & Error Handling

### Validation

- Server-side validation using Joi
- Secure form validation before saving data

### Error Handling

- Centralized Error Handling
- Custom Express Error Class
- Async Error Wrapper
- Flash Messages

---

## Cloud Services

- Cloudinary for image storage
- Multer for image uploads
- MapTiler for maps and geolocation

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/shreyajadhao-09/RoomKey.git
```

### 2. Navigate to the project directory

```bash
cd RoomKey
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file in the root directory

```env
ATLASDB_URL=your_mongodb_connection_string

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAPTILER_API_KEY=your_maptiler_api_key

SECRET=your_session_secret
```

### 5. Start the application

```bash
npm start
```

Open your browser and visit:

```text
http://localhost:8080/listings
```

---

## Future Improvements

- Booking System
- Wishlist Feature
- Advanced Search Filters
- Payment Gateway Integration
- User Profile Management
- Email Notifications

---

## Author

**Shreya Jadhao**

Computer Science & Engineering Student

**GitHub:** https://github.com/shreyajadhao-09

---

## License

This project is licensed under the **MIT License**.

---

⭐ If you found this project useful, consider giving it a **Star** on GitHub!