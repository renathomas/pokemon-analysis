# Pokémon Types Distribution Visualizer

This is a Next.js application designed to visualize the distribution of Pokémon types from Generation 1 using data fetched from the PokéAPI. The application includes various features to handle data transformation and visualization, as well as additional functionalities for an enhanced user experience.

## Description

This application provides:

1. A bar chart displaying the count of Pokémon for each type.
2. A doughnut chart showing the distribution of single-type vs dual-type Pokémon.
3. A search functionality to filter Pokémon by name.
4. Toggle options to switch between viewing counts and percentages.
5. A responsive design for various screen sizes.

### Getting Started

Clone the repository:

```bash
git clone https://github.com/renathomas/pokemon-analysis.git

cd pokemon-analysis
```

### Install dependencies:

```bash
npm install
```

### Run the application:

```bash
npm run dev
```

### Run the tests:

```bash
npm test
```

### Build the app:

```bash
npm run build
```

### Features

1. Data Fetching: Fetches data from the PokéAPI for the first 151 Pokémon and their types.
2. Data Transformation: Counts Pokémon for each type and handles Pokémon with multiple types.
3. Data Visualization: Utilizes charting libraries to display Pokémon type distributions.
4. Loading State: Displays a loading indicator while data is being fetched.
5. Error Handling: Includes error handling for API calls.
6. Responsive Design: Ensures a visually appealing layout across different screen sizes.
7. Search functionality to filter Pokémon by name.
8. Toggle between counts and percentages.
9. Unit tests for data transformation logic.
