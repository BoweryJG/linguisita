import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../../supabaseClient';

const ChatPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

const WelcomeCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--dark-gray);
  margin-bottom: 2rem;
`;

const Button = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #00A3FF 0%, #0081cc 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: white;
  }

  &:active {
    transform: translateY(0);
  }
`;

const LogoutButton = styled.button`
  background: none;
  color: var(--dark-gray);
  border: 1px solid var(--light-gray);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-top: 2rem;
  transition: var(--transition);

  &:hover {
    background-color: var(--light-gray);
  }
`;

const UserInfo = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--light-gray);
`;

const UserEmail = styled.p`
  font-size: 1rem;
  color: var(--dark-gray);
`;

const Chat = ({ session }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          throw error;
        }
        
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getProfile();
  }, [session]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  if (loading) {
    return (
      <ChatPageContainer>
        <WelcomeCard>
          <Title>Loading...</Title>
        </WelcomeCard>
      </ChatPageContainer>
    );
  }

  return (
    <ChatPageContainer>
      <WelcomeCard>
        <Title>Welcome to Linguisita</Title>
        <Subtitle>
          Your bilingual chat application for learning languages while chatting
        </Subtitle>
        
        <Button to="/linguisita">Start Chatting</Button>
        
        <UserInfo>
          <UserEmail>Logged in as: {session.user.email}</UserEmail>
          <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
        </UserInfo>
      </WelcomeCard>
    </ChatPageContainer>
  );
};

export default Chat;
