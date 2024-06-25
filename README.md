# Application Setup Guide

## Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

## Installation Steps

1. **Install Dependencies:**
   Execute the following command to install all necessary dependencies:
   ```sh
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root directory of the project. Add the following variable to configure the API base URL:
   ```sh
   VITE_API_BASE_URL=<your-api-base-url>
   ```

3. **Start the Application:**
   To launch the application, run:
   ```sh
   npm run dev
   ```

4. **Access the Application:**
   The URL where the application is running will be displayed in the CLI output. Open this URL in your web browser to use the application.

## Notes

- Ensure that your `.env` file is correctly formatted and placed in the root directory.