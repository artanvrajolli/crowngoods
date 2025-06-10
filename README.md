# CrownGoods

A modern, responsive e-commerce web application built with React, TypeScript, and Tailwind CSS. CrownGoods provides a seamless shopping experience with product browsing, filtering, cart management, and payment processing.

## Features

### Core Functionality
- **Product Catalog**: Browse products fetched from the Fake Store API
- **Advanced Filtering**: Filter by category, price range, and stock availability
- **Dynamic Sorting**: Sort products by name, price, or delivery time
- **Shopping Cart**: Add/remove items with persistent state management
- **Product Details**: View detailed product information in modal dialogs
- **Payment Processing**: Integrated payment modal for checkout

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with Flowbite React components
- **Real-time Updates**: Instant cart updates and stock status indicators
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: Smooth loading indicators for better UX

## Tech Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4.1.4** - Utility-first CSS framework
- **Flowbite React** - Pre-built UI components

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

### Icons & Assets
- **React Icons** - Comprehensive icon library
- **Fake Store API** - Product data source

## Project Structure

```
crowngoods/
├── src/
│   ├── components/          # React components
│   │   ├── ProductGrid.tsx  # Main product listing
│   │   ├── ProductCard.tsx  # Individual product display
│   │   ├── ProductModal.tsx # Product detail modal
│   │   ├── CartModal.tsx    # Shopping cart modal
│   │   ├── PaymentModal.tsx # Payment processing modal
│   │   └── ProductFilter.tsx # Product filtering controls
│   ├── context/             # React context providers
│   │   └── CartContext.tsx  # Shopping cart state management
│   ├── utils/               # Utility functions
│   │   ├── api.ts          # API integration
│   │   └── index.ts        # Utility exports
│   ├── layout/             # Layout components
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── eslint.config.js       # ESLint configuration
```

## Architecture

### State Management
- **React Context API** for cart state management
- **Local state** with useState hooks for component-specific state
- **Custom hooks** for cart operations (add, remove, update quantities)

### API Integration
- **Fake Store API** integration for product data
- **Error handling** with user-friendly error messages
- **Loading states** for better user experience
- **Data transformation** to match application interfaces

### Component Design
- **Functional components** with React hooks
- **TypeScript interfaces** for type safety
- **Modular architecture** with reusable components
- **Responsive design** with Tailwind CSS utilities



The build artifacts will be stored in the `dist/` directory.

### Deployment Options
- **Vercel**: Zero-config deployment for Vite projects
- **Netlify**: Drag-and-drop deployment
- **GitHub Pages**: Static site hosting
- **Docker**: Containerized deployment

## Acknowledgments

- **Fake Store API** for providing product data
- **Flowbite** for the beautiful UI components
- **Tailwind CSS** for the utility-first CSS framework
- **React Icons** for the comprehensive icon library


---
