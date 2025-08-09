# Maliga Kadai - Product Management System

A modern product management system built with React, TypeScript, and Node.js for managing inventory with real-time search and filtering capabilities.

## 🚀 Features

- **Product Management**: Add, edit, delete products with full CRUD operations
- **Real-time Search**: Instant search across product names and categories
- **Advanced Filtering**: Filter by category, date range, and sorting options
- **Price History**: Track price changes over time with detailed history
- **Responsive Design**: Modern UI that works on all devices
- **Tamil Language Support**: Full Tamil language interface

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **Lucide React** for icons

### Backend

- **Node.js** with TypeScript
- **Express.js** for API server
- **MongoDB** with Mongoose for database
- **CORS** enabled for cross-origin requests

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** installed and running locally

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Maliga-Kadai
```

### 2. Install Dependencies

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

### 3. Set Up Database

Make sure MongoDB is running on your system. The application will connect to `mongodb://localhost:27017/maliga-kadai` by default.

### 4. Configure Environment Variables

Create a `.env` file in the Backend directory (optional - uses default values):

```env
PORT=
MONGODB_URI=
FRONTEND_URL=
```

Create a `.env` file in the Frontend directory:

```env
VITE_BACKEND_URL=
```

### 5. Run the Application

#### Start Backend Server

```bash
cd Backend
npm run dev
```

The backend will start on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd Frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📁 Project Structure

```
Maliga-Kadai/
├── Backend/
│   ├── config/
│   │   └── connectDb.ts
│   ├── controller/
│   │   └── productController.ts
│   ├── models/
│   │   └── ProductModel.ts
│   ├── router/
│   │   └── productRouter.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── validate.ts
│   └── index.ts
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Backend Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
```

### Frontend Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

## 📚 API Endpoints

### Products

- `GET /products/get/all` - Get all products
- `GET /products/get/each/:id` - Get specific product
- `POST /products/add` - Add new product
- `PUT /products/edit/:id` - Update product
- `DELETE /products/delete/:id` - Delete product

## 🎯 Key Features Explained

### Real-time Search & Filtering

- **Instant Search**: Type to search across product names and categories
- **Category Filter**: Filter products by specific categories
- **Date Range**: Filter by creation/modification dates
- **Sorting**: Sort by name, cost price, selling price, or date
- **Frontend-only**: All filtering happens client-side for instant results

### Product Management

- **Add Products**: Complete product information with validation
- **Edit Products**: Update product details with price history tracking
- **Delete Products**: Remove products with confirmation
- **Price History**: Automatic tracking of price changes over time

## 🎨 UI Components

- **Product Cards**: Display product information with action buttons
- **Modal Dialogs**: Edit and delete confirmations
- **Price History Modal**: View detailed price change history
- **Responsive Grid**: Adapts to different screen sizes
- **Loading States**: Smooth user experience during operations

## 🔍 Search & Filter Usage

1. **Search**: Type in the search box to find products by name or category
2. **Category Filter**: Use the dropdown to filter by specific categories
3. **Date Range**: Set from and to dates to filter by creation date
4. **Sorting**: Choose sorting criteria from the dropdown
5. **Clear Filters**: Reset all filters to see all products

## 🚀 Deployment

### Backend Deployment

1. Build the backend: `npm run build`
2. Set environment variables for production
3. Deploy to your preferred hosting service (Heroku, Vercel, etc.)

### Frontend Deployment

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the console for error messages
2. Ensure MongoDB is running
3. Verify all dependencies are installed
4. Check network connectivity for API calls

## 🎉 Features in Action

- **Add a Product**: Click "பொருள் சேர்க்க" to add new products
- **Search Products**: Type in the search box for instant results
- **Filter by Category**: Use the filter dropdown to narrow results
- **View Price History**: Click the history icon to see price changes
- **Edit Products**: Click edit to modify product details
- **Delete Products**: Click delete to remove products

---

**Built with ❤️ for efficient product management**
