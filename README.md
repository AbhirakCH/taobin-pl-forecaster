# Tao Bin P/L Forecaster

This is a web application developed as a practical assignment for the Frontend Engineer position at Forth Vending (Tao Bin). The project consists of an Admin Panel for managing beverage machine data and a dynamic Dashboard that forecasts daily and weekly Profit/Loss based on that data and live weather information.

**[ Live Demo URL ]** https://taobin-pl-forecaster.vercel.app/

---

## Features

- **Machine Management (CRUD):**

  - **Create:** Add new machines via a modal form with comprehensive input validation.
  - **Read:** Display a list of all machines in a clean, organized table.
  - **Update:** Edit existing machine data with pre-filled forms.
  - **Delete:** Remove machines with a confirmation step to prevent accidental deletion.

- **P/L Forecasting Dashboard:**
  - **Best-Selling Location:** Instantly identifies the most profitable location type based on aggregated expected sales.
  - **7-Day Forecast:** Calculates and displays a 7-day profit/loss forecast, dynamically adjusting for electricity costs based on real-time weather data from the Open-Meteo API.
  - **Cumulative Weekly Summary:** Provides a clear summary of total revenue, costs, and net profit for the upcoming week.
  - **Data Visualization:** Presents the 7-day forecast as an intuitive line chart for easy trend analysis.

---

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **UI Library:** Material-UI (MUI)
- **API Client:** Axios
- **Charting Library:** Recharts
- **Code Quality:** ESLint

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or later) and npm installed on your computer.

### Installation & Setup

1.  **Clone the repository to your local machine:**

    ```bash
    git clone [Your-GitHub-Repository-URL]
    ```

2.  **Navigate into the project directory:**

    ```bash
    cd taobin-pl-forecaster
    ```

3.  **Install all the required dependencies:**

    ```bash
    npm install
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal) to see the application in action.

---

## Project Structure

The project follows a feature-based architecture to ensure scalability and maintainability.
