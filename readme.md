# Real-Time Price Data Mini-Website

A mini-website to collect and display real-time price data for stocks or crypto.

## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version >= 12.0.0)
- npm (version >= 6.0.0) or yarn (version >= 1.0.0)
- MongoDB (if using a database, version >= 4.0.0)

## Getting Started

To get a local copy up and running, follow these steps.

### Server Setup

1. **Navigate to the server directory**

   ```bash
   cd server
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the `server` directory with the following:

   ```
   PORT=3400
   MONGODB_URI=mongodb://localhost:27017/market-pulse
   TWELVE_DATA_API_KEY=api-key
   # Add any other necessary environment variables

   ```

4. Run the server
   ```bash
   npm start
   ```

### Client Setup

1. Navigate to the client directory

   ```bash
   cd client
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run the client
   ```bash
   npm start
   ```

### Usage

- Open your web browser and go to http://localhost:3000 to view the client application.
- Ensure the server (http://localhost:3400) is running for the client to fetch data and function properly.
