# Hedge Fund Manager (HFM) Web Application
<img src="https://github.com/mdoutt98/HFT/assets/101009895/916ef0b1-494c-4975-a28e-b857dca2bc12" width="60%">


## Overview

Hedge Fund Manager is an interactive web application that allows users to participate in simulated stock trading competitions within created leagues. Users can join or create leagues, manage portfolios, and trade various assets including stocks, currencies, commodities, and cryptocurrencies. The application offers a realistic trading environment with features like real-time market data and simulated market scenarios.

## Technologies Utilized

### Backend
- **Django**: A high-level Python web framework that encourages rapid development and clean, pragmatic design. Used for server-side logic.
- **Django REST Framework**: A powerful and flexible toolkit for building Web APIs in Django. Used for creating RESTful services.
- **PostgreSQL**: An advanced open-source relational database. Used as the primary data storage solution.
- **Python**: The primary programming language used for backend development.

### Frontend
- **React**: A JavaScript library for building user interfaces, particularly single-page applications.
- **Chart.js**: An open-source JavaScript library used to create interactive charts and graphs for displaying data.
- **HTML/CSS**: Used for structuring and styling web pages.

### Data and API Integration
- **Financial Market Data API**: Used for fetching real-time financial data (to be integrated).
- **Python Scripts**: Custom scripts for data handling, such as importing stock data and generating simulated market scenarios.

### Deployment and Containerization
- **Docker**: A platform used for developing, shipping, and running applications inside containers. Facilitates deployment on various environments, including local development setups.

### Version Control
- **Git**: Used for version control, allowing for efficient tracking of changes and collaboration.

### Additional Tools and Libraries
- Various Python libraries for tasks like data manipulation and API integration.
- Frontend libraries and frameworks compatible with React for UI components.

## Application Features

### Pages
- **Rules Page**: Explains the game mechanics and rules. Features a simple, user-friendly design with the game's logo.
- **League Page**: Displays a bar graph of user portfolio values, a line chart of portfolio value changes over time, and a rankings table.
- **Portfolio Page**: Shows a line chart of the user's portfolio value, a pie chart for asset allocation, and a table with detailed asset information. Includes transaction functionalities.
- **Market Page**: Enables users to search for stocks, view their performance, and trade. Offers a customizable time range for viewing stock performance.

### User Interaction
- **Account Creation and Management**: Users can create accounts to participate in leagues and manage their portfolios.
- **League Participation**: Users can join or create leagues with specific trading rules and asset limitations.
- **Trading Simulation**: Real and simulated trading environments, including Monte Carlo and hybrid models for price prediction.

### Future Implementations
- **Oauth2, New Asset Types, ML driven bots, Improved UI & Plotting**




