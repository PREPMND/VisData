# VisData Visualization Dashboard

A full-stack data visualization dashboard built to explore and analyze insight data through interactive filters and charts.

## Live Demo

Frontend: https://prepvisdata.netlify.app 
Backend API: https://visdata.onrender.com

## Features

- Interactive dashboard with multiple data visualizations
- Dynamic filtering by:
  - End Year
  - Topic
  - Sector
  - Region
  - PESTLE
  - Source
  - SWOT
  - Country
  - City
- Clear all filters functionality
- Dashboard data updates based on selected filters
- Filter options dynamically fetched from the database
- Visualizations for:
  - Intensity by Topic
  - Relevance by Country
  - Likelihood by Region
  - Insights by End Year
  - Insights by Region
  - Insights by Country
  - Insights by City
- Sorting and display controls for chart data
- Responsive dashboard UI
- Deployed backend API

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Recharts
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
PREVIS/
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── charts/
│   │   │   └── filters/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   │
├── Backend/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── data/
│
└── README.md