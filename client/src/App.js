import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from './supabaseClient';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Chat from './components/Chat/Chat';
import LinguisitaChat from './LinguisitaChat';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <AppContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Loading...</p>
        </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Routes>
        <Route 
          path="/" 
          element={session ? <Navigate to="/chat" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={session ? <Navigate to="/chat" /> : <Register />} 
        />
        <Route 
          path="/chat" 
          element={session ? <Chat session={session} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/linguisita" 
          element={session ? <LinguisitaChat session={session} /> : <Navigate to="/" />} 
        />
      </Routes>
    </AppContainer>
  );
}

export default App;
