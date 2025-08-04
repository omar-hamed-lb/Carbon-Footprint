# CO2 Emission Calculator

This is a one-page web application designed to estimate a user's annual carbon footprint based on their consumption habits. It provides a breakdown of CO2 emissions from various sources and offers context by showing how many trees would be needed to offset the emissions or what the equivalent carbon tax would be.

## Features

- **Mobile-First Responsive Design:** The UI is optimized for a seamless experience on both mobile and desktop devices.
- **Dynamic Calculations:** The calculator instantly updates CO2 emissions based on user inputs.
- **Grouped Inputs:** Inputs are logically grouped into "Transportation" and "Household Energy" for clarity.
- **Detailed Emission Sources:**
    - **Car:** Calculates emissions based on monthly fuel consumption and fuel type (Gasoline/Diesel).
    - **Flights:** Estimates emissions based on the number of short, medium, or long-haul flights taken annually.
    - **Electricity:** Calculates emissions from household electricity usage, with options for different power sources (Fossil Fuel/Grid, Solar, Wind).
    - **Natural Gas:** Estimates emissions from monthly natural gas consumption.
    - **Breathing:** Includes a baseline emission for human respiration.
- **Informational Modals:** Info icons next to each input provide details on the CO2 calculation factors used.
- **Modern Report Display:**
    - A detailed breakdown of emissions is presented in a modern, two-box layout.
    - The total annual carbon footprint is clearly displayed.
    - Offset options, including the number of trees required or the equivalent carbon tax ($30/tonne), are shown in a distinct section.
- **Smooth UI Transitions:** The results section appears with a smooth fade-in animation for a better user experience.

## How to Use

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```
3.  **Open `index.html` in your web browser.**

There are no dependencies or build steps required. Simply open the `index.html` file to run the application.
