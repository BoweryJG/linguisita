# Linguisita

![Linguisita Logo](https://via.placeholder.com/150x50?text=Linguisita)

Linguisita is a beautiful, award-winning bilingual chat application that helps users learn languages while chatting. It provides real-time translation between English and Spanish, making it easy to practice and learn a new language.

## Overview

This project consists of:

1. **Client**: A React-based frontend application with a beautiful UI
2. **Server**: Configuration for Supabase backend services

## Features

- **Simple Authentication**: Email/password login and registration
- **Real-time Chat**: Instant message delivery
- **Automatic Translation**: Seamless English ↔ Spanish translation
- **Beautiful UI**: Award-winning visual design with attention to detail
- **Responsive Design**: Works perfectly on mobile and desktop

## Technology Stack

- **Frontend**: React with styled-components
- **Backend**: Supabase (Authentication, Database, Real-time)
- **Translation**: Mock translation (can be replaced with Google Translate API)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Setup

1. **Set up the Supabase backend**:
   - Follow the instructions in the [server README](server/README.md)

2. **Set up the React frontend**:
   - Follow the instructions in the [client README](client/README.md)

## Project Structure

```
linguisita/
├── client/             # React frontend application
│   ├── public/         # Static files
│   ├── src/            # Source code
│   └── README.md       # Frontend documentation
└── server/             # Supabase configuration
    ├── schema.sql      # Database schema
    └── README.md       # Backend documentation
```

## Screenshots

![Login Screen](https://via.placeholder.com/400x200?text=Login+Screen)
![Chat Interface](https://via.placeholder.com/400x200?text=Chat+Interface)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Supabase for providing an excellent backend-as-a-service
- React and styled-components for the frontend framework
- All contributors and users of the application
