# MERN Whiteboard App

## Overview

This is a whiteboard application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The app allows users to create drawings by drawing lines, shapes, and adding text annotations. Each drawing is stored in MongoDB and can be retrieved, updated, or deleted through the API. The project follows best practices for code structure and includes proper error handling and documentation.

## Features

- **Drawings Schema**: A MongoDB schema that supports lines, shapes, and text annotations.
- **RESTful API**: A full set of API endpoints to handle CRUD operations on the whiteboard drawings.
- **React Frontend**: A user interface for viewing, creating, and interacting with drawings.
- **Production-Ready Server**: A Node.js server that serves the React frontend and communicates with the Express.js API.

## Sections

### Section I: MongoDB Schema

The whiteboard schema is designed to store the following elements:

- **Coordinates**: Two-dimensional arrays that store the coordinates for drawing elements.
- **Color**: The color of the drawing elements.
- **Thickness**: The thickness of the lines or shapes drawn.
- **Optional Text Properties**: Content, font, and size for text annotations.

#### Example Drawing Data:

```json
{
  "title": "Sample Drawing 1",
  "description": "A simple drawing with lines and text annotations.",
  "elements": [
    {
      "type": "line",
      "properties": {
        "coordinates": [
          [
            { "x": 10, "y": 20 },
            { "x": 100, "y": 200 }
          ]
        ],
        "color": "#000000",
        "thickness": 2
      }
    },
    {
      "type": "shape",
      "properties": {
        "coordinates": [
          [
            { "x": 50, "y": 50 },
            { "x": 150, "y": 150 }
          ]
        ],
        "color": "#ff0000",
        "thickness": 3
      }
    },
    {
      "type": "text",
      "properties": {
        "coordinates": [[{ "x": 60, "y": 60 }]],
        "color": "#0000ff",
        "content": "Hello World",
        "font": "Arial",
        "size": 16
      }
    }
  ],
  "created_at": "2024-09-10T12:00:00.000Z",
  "updated_at": "2024-09-10T12:30:00.000Z"
}
```

### Section II: RESTful API

The API provides the following endpoints:

- `POST /api/v1/drawings`: Create a new drawing.
- `GET /api/v1/drawings`: Get all drawings.
- `GET /api/v1/drawings/:id`: Get a drawing by its ID.
- `PUT /api/v1/drawings/:id`: Update a drawing by its ID.
- `DELETE /api/v1/drawings/:id`: Delete a drawing by its ID.

### Section III: React Frontend

The frontend has the following pages:

- **All Drawings Page**: Displays a list of all saved drawings.
- **Drawing Page**: Allows users to view and interact with a specific drawing. Users can draw lines, shapes, and add text annotations.

### Section IV: Node.js Server

The Node.js server serves the React frontend and the Express API. It includes error handling to gracefully manage API errors and invalid requests.

## Getting Started

### Prerequisites

- Node.js
- MongoDB (MongoDB Atlas recommended for deployment)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ibnabdullah1/MERN-Interview-Test.git
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

### Configuration

1. Create a `.env` file in the `client` directory with the following fields:
   ```
   VITE_API_URL = your-server-url
   ```
2. Create a `.env` file in the `server` directory with the following fields:
   ```
   MONGO_URI= your-mongodb-database-url
   PORT= 5000
   ```

### Running the App

1. Start the server:

   ```bash
   cd server
   bun start:dev
   ```

2. Start the client:
   ```bash
   cd client
   bun dev
   ```

### Deployment

The application is deployed on Vercel. You can view the deployed version here: [Vercel Deployment Link](https://whiteboard-vercel-app).

## Technologies Used

- **Frontend**: React.js, redux, Tailwind CSS
- **Backend**: Node.js, typescript, Express.js, MongoDB, Mongoose
- **Deployment**: Vercel, MongoDB

## Contributions

Contributions are welcome! Feel free to submit a pull request or open an issue if you have any suggestions or improvements.
