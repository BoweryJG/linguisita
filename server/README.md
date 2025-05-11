# Linguisita Server

This directory contains the server-side configuration for the Linguisita bilingual chat application. The application uses Supabase as the backend service, which provides authentication, database, and real-time functionality.

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project
3. Note your project URL and anon key (you'll need these for the client application)

### 2. Set Up Database Schema

1. Navigate to the SQL Editor in your Supabase dashboard
2. Copy the contents of `schema.sql` from this directory
3. Paste and run the SQL in the SQL Editor
4. This will create the necessary tables, policies, and triggers for the application

### 3. Configure Authentication

1. In your Supabase dashboard, go to Authentication > Settings
2. Configure the authentication providers you want to use:
   - Email/Password (enabled by default)
   - (Optional) Google, GitHub, etc.
3. Customize email templates if desired

### 4. Set Up Row Level Security (RLS)

The `schema.sql` file already includes RLS policies, but make sure they are correctly applied:

1. Go to the Database section in your Supabase dashboard
2. Check that RLS is enabled for all tables
3. Verify that the policies are correctly applied

### 5. (Optional) Set Up Edge Functions for Translation

For a production application, you might want to use a real translation API instead of the mock translations in the client code. You can set up a Supabase Edge Function for this:

1. Install the Supabase CLI
2. Create a new Edge Function for translation
3. Implement the translation logic using a service like Google Translate API
4. Deploy the Edge Function to your Supabase project

## Database Schema

### Profiles Table

Stores user profile information:

- `id`: UUID (references auth.users.id)
- `email`: TEXT
- `preferred_language`: TEXT
- `created_at`: TIMESTAMP WITH TIME ZONE
- `updated_at`: TIMESTAMP WITH TIME ZONE

### Messages Table

Stores chat messages:

- `id`: UUID
- `sender_id`: UUID (references auth.users.id)
- `original_text`: TEXT
- `original_language`: TEXT
- `translated_text`: TEXT
- `created_at`: TIMESTAMP WITH TIME ZONE

### Conversations Table (for future expansion)

Stores conversation metadata:

- `id`: UUID
- `participant1_id`: UUID (references auth.users.id)
- `participant2_id`: UUID (references auth.users.id)
- `created_at`: TIMESTAMP WITH TIME ZONE
- `updated_at`: TIMESTAMP WITH TIME ZONE

### Conversation Messages Table (for future expansion)

Links messages to conversations:

- `id`: UUID
- `conversation_id`: UUID (references conversations.id)
- `message_id`: UUID (references messages.id)
- `created_at`: TIMESTAMP WITH TIME ZONE

## Security

The application uses Row Level Security (RLS) to ensure that users can only access their own data. The policies are defined in the `schema.sql` file.

## Future Enhancements

- Implement real-time translation using Supabase Edge Functions
- Add support for more languages
- Implement conversation management for multiple chat partners
- Add user profiles with avatars and additional information
