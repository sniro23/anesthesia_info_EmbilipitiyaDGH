# Safe Anaesthesia SL

A comprehensive patient information website for understanding anaesthesia before, during, and after surgery. Developed for DGH Embilipitya.

## Project Overview

This website provides trustworthy patient information about anaesthesia, developed as a collaborative initiative by anaesthesia and critical care teams at DGH Embilipitya.

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone https://github.com/sniro23/anesthesia_info_EmbilipitiyaDGH.git
cd anesthesia-info-hub-guide
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

- `/src` - Source code
  - `/components` - React components
  - `/pages` - Page components
  - `/contexts` - React contexts (Language, ImageData)
  - `/lib` - Utility functions and API clients
- `/public` - Static assets
- `/src/components/ui` - shadcn-ui components

## Features

- Multi-language support (English, Sinhala, Tamil)
- Responsive design for mobile and desktop
- Admin interface for managing images
- Patient information sections:
  - Before Surgery
  - During Surgery
  - After Surgery
  - Resources

## Development

To work on this project:

1. Create a feature branch
2. Make your changes
3. Test locally
4. Commit and push your changes
5. Create a pull request

## Deployment

Build the project for production:

```sh
npm run build
```

The built files will be in the `/dist` directory, ready to be deployed to any static hosting service.

## License

© 2025 Safe Anaesthesia SL. All rights reserved.

## Contributors

- Developed by Dr Niroshan Sivaranjan
- Supervisor: Dr Danushka Samarasinghe
- Mentor: Dr Kalpani Kannangara
