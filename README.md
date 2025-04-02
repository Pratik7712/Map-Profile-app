# Profile Map App

A modern web application that displays user profiles on an interactive map, allowing users to view profile details and their geographic locations simultaneously.

![Profile Map App](https://via.placeholder.com/800x400?text=Profile+Map+App)

## Overview

Profile Map App is a responsive React application that showcases a collection of user profiles with their locations plotted on Google Maps. The app enables users to browse through profile cards, filter them by location, and view their precise positions on the map.

## Key Features

- **Interactive Profile Cards**: Each profile is displayed in a visually appealing card with smooth hover effects and transitions
- **Google Maps Integration**: Real-time display of profile locations on an interactive map
- **Fully Responsive Design**: Optimized user experience across desktop, tablet, and mobile devices
- **Clickable Header Navigation**: Easy navigation between different sections of the application
- **Search & Filter Functionality**: Quick profile search by name or description, and filtering by location
- **Mobile-Friendly Interface**: Dedicated mobile view with a toggle between map and profiles
- **Modern UI**: Clean, professional design with subtle animations and color scheme

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/profile-map-app.git
   cd profile-map-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Google Maps API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Run the project**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`

## Technologies Used

- **React.js**: Front-end JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Google Maps API**: Integration for displaying interactive maps
- **React Router**: Navigation and routing between different views
- **JavaScript ES6+**: Modern JavaScript features
- **Responsive Design**: Mobile-first approach to ensure compatibility across devices

## Project Structure

```
src/
├── components/
│   ├── layout/         # Layout components (Header, NotFound)
│   ├── profiles/       # Profile-related components (ProfileList, ProfileCard, ProfileDetail)
│   ├── map/            # Map-related components (MapView)
│   └── admin/          # Admin panel components
├── data/               # Sample data for development
├── styles/             # CSS styles
├── App.js              # Main application component
└── index.js            # Entry point
```

## Future Enhancements

- User authentication and profile management
- Advanced filtering and sorting options
- Real-time location updates
- Directions between user location and profile locations
- Customizable map themes and markers

## License

This project is licensed for learning and development purposes only. All rights reserved. This code is not intended for commercial use without proper permission from the author.

## Author

Created by Pratik as a demonstration of modern web development techniques using React and Google Maps integration.

---

© 2025 Profile Map App. All Rights Reserved.
