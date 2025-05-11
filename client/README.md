# Linguisita - Bilingual Chat Application

Linguisita is a beautiful, award-winning bilingual chat application that helps users learn languages while chatting. It provides real-time translation between English and Spanish, making it easy to practice and learn a new language.

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

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/linguisita.git
   cd linguisita/client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a Supabase project:
   - Go to [Supabase](https://supabase.com/) and create a new project
   - Create the following tables in your Supabase database:
     - `profiles` table with columns:
       - `id` (uuid, primary key)
       - `email` (text)
       - `preferred_language` (text)
     - `messages` table with columns:
       - `id` (uuid, primary key)
       - `sender_id` (uuid, references auth.users.id)
       - `original_text` (text)
       - `original_language` (text)
       - `translated_text` (text)
       - `created_at` (timestamp with time zone)

4. Set up environment variables:
   - Copy the `.env.example` file to `.env`:
     ```
     cp .env.example .env
     ```
   - Fill in your Supabase URL and anon key in the `.env` file

5. Start the development server:
   ```
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

```
client/
├── public/             # Static files
├── src/
│   ├── components/     # React components
│   │   ├── Auth/       # Authentication components
│   │   └── Chat/       # Chat components
│   ├── App.js          # Main App component
│   ├── index.js        # Entry point
│   ├── index.css       # Global styles
│   ├── LinguisitaChat.js # Main chat component
│   └── supabaseClient.js # Supabase client configuration
└── package.json        # Dependencies and scripts
```

## Customization

- **Colors**: Edit the CSS variables in `src/index.css` to change the color scheme
- **Fonts**: Replace the Google Fonts import in `src/index.css`
- **Translation**: Replace the mock translation function in `LinguisitaChat.js` with a real translation API

## License

This project is licensed under the MIT License - see the LICENSE file for details.
