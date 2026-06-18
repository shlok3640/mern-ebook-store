# MERN Stack E-Book Store

A premium, full-stack e-commerce application for digital e-books, built with the MERN stack (MongoDB, Express, React, Node.js) and integrated with the Stripe Payment API.

## 🚀 Features Built So Far

### 1. Modern UI/UX Design
- **Premium Custom CSS**: Built without heavy UI libraries to allow for custom micro-animations, glassmorphism effects, and a highly responsive layout.
- **Dynamic Header**: A sticky navigation bar that dynamically updates based on the user's authentication state and cart item count.

### 2. Product Catalog & Browsing
- **Database Seeding**: An automated script (`seeder.js`) to instantly populate the MongoDB database with mock e-books.
- **Home Page**: Displays a responsive grid of available e-books with high-quality cover images and pricing.
- **Book Details Page**: A dedicated page (`/book/:id`) for each book, displaying full descriptions, author details, stock status, and an "Add to Cart" button.

### 3. Shopping Cart System
- **State Management**: Powered by Redux Toolkit (`cartSlice`) for instant UI updates.
- **Local Storage Persistence**: Cart items are saved to the browser's local storage so users don't lose their items if they refresh the page.
- **Cart Page**: A dedicated summary page where users can review their subtotal, view itemized lists, and remove items from their cart.

### 4. User Authentication & Security
- **JWT (JSON Web Tokens)**: Secure, stateless authentication system.
- **Password Hashing**: User passwords are encrypted in MongoDB using `bcryptjs`.
- **Protected Routes**: Certain API endpoints (like placing an order or viewing the library) require a valid JWT token via Express middleware.
- **Login & Registration Pages**: Custom forms with error handling for user onboarding.

### 5. Stripe API Payment Integration
- **Live Checkout Flow**: Integrated with `@stripe/react-stripe-js` to embed secure, PCI-compliant credit card input fields directly on the checkout page.
- **Payment Intents**: The backend securely communicates with Stripe using a Secret Key to generate secure transaction sessions.
- **Order Tracking**: Upon successful payment, the complete order details (including the transaction ID and total price) are saved to the MongoDB `Order` collection.

### 6. Digital Delivery ("My Library")
- **Order History Retrieval**: A protected backend route (`/api/orders/myorders`) that fetches all orders specific to the logged-in user.
- **My Library Page**: A personalized dashboard where users can view all the e-books they have successfully purchased.
- **Digital Access**: Each purchased book includes a "Download PDF" button, bridging the gap between purchase and delivery of the digital asset.

## 🛠 Technology Stack
- **Frontend**: React.js, Vite, Redux Toolkit, React Router DOM, Lucide React (Icons).
- **Backend**: Node.js, Express.js, Mongoose.
- **Database**: MongoDB.
- **Payments**: Stripe API.
