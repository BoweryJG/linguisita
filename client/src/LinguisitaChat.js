import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { supabase } from './supabaseClient';

// Styled components for the chat interface
const ChatContainer = styled.div`
  max-width: 1000px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  box-shadow: var(--shadow);
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-width: 100%;
    border-radius: 0;
  }
`;

const Header = styled.header`
  background: linear-gradient(135deg, #00A3FF 0%, #0081cc 100%);
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #333;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f9f9f9;
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  
  ${props => props.sent ? `
    align-self: flex-end;
    background: linear-gradient(135deg, #00A3FF 0%, #0081cc 100%);
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    align-self: flex-start;
    background-color: white;
    border-bottom-left-radius: 4px;
  `}
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const OriginalText = styled.p`
  margin: 0;
  font-family: ${props => props.language === 'en' ? 'var(--english-font)' : 'var(--spanish-font)'};
  font-weight: 500;
`;

const TranslatedText = styled.p`
  margin: 0;
  font-family: ${props => props.language === 'en' ? 'var(--spanish-font)' : 'var(--english-font)'};
  font-style: italic;
  opacity: 0.8;
  font-size: 0.95em;
  padding-top: 0.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const MessageTime = styled.span`
  font-size: 0.7rem;
  opacity: 0.7;
  align-self: flex-end;
  margin-top: 0.25rem;
`;

const MessageForm = styled.form`
  display: flex;
  padding: 1rem;
  gap: 0.5rem;
  background-color: white;
  border-top: 1px solid var(--light-gray);
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--light-gray);
  border-radius: 24px;
  font-size: 1rem;
  transition: var(--transition);

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 163, 255, 0.1);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #00A3FF 0%, #0081cc 100%);
  color: white;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Mock translation function (in a real app, this would call a translation API)
const translateMessage = async (text, fromLang, toLang) => {
  // This is a placeholder. In a real app, you would call a translation API
  // For example: Google Translate API, DeepL API, etc.
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simple mock translations for demo purposes
  const translations = {
    en: {
      'Hello': 'Hola',
      'How are you?': '¿Cómo estás?',
      'I am learning Spanish': 'Estoy aprendiendo español',
      'What are you doing?': '¿Qué estás haciendo?',
      'I love chatting with you': 'Me encanta chatear contigo'
    },
    es: {
      'Hola': 'Hello',
      '¿Cómo estás?': 'How are you?',
      'Estoy aprendiendo inglés': 'I am learning English',
      '¿Qué estás haciendo?': 'What are you doing?',
      'Me encanta chatear contigo': 'I love chatting with you'
    }
  };
  
  // Return the translation if available, otherwise return the original text
  // with a note that it's a mock translation
  return translations[fromLang]?.[text] || `[Mock translation of: ${text}]`;
};

const LinguisitaChat = ({ session }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userLanguage, setUserLanguage] = useState('en'); // Default to English
  const [partnerLanguage, setPartnerLanguage] = useState('es'); // Default to Spanish
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load messages from Supabase
  useEffect(() => {
    const fetchMessages = async () => {
      // In a real app, you would fetch messages from Supabase
      // For now, let's use mock data
      const mockMessages = [
        {
          id: 1,
          sender_id: session.user.id,
          original_text: 'Hello',
          original_language: 'en',
          translated_text: 'Hola',
          created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString() // 10 minutes ago
        },
        {
          id: 2,
          sender_id: 'partner-id',
          original_text: '¿Cómo estás?',
          original_language: 'es',
          translated_text: 'How are you?',
          created_at: new Date(Date.now() - 1000 * 60 * 9).toISOString() // 9 minutes ago
        },
        {
          id: 3,
          sender_id: session.user.id,
          original_text: 'I am learning Spanish',
          original_language: 'en',
          translated_text: 'Estoy aprendiendo español',
          created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString() // 8 minutes ago
        },
        {
          id: 4,
          sender_id: 'partner-id',
          original_text: 'Estoy aprendiendo inglés',
          original_language: 'es',
          translated_text: 'I am learning English',
          created_at: new Date(Date.now() - 1000 * 60 * 7).toISOString() // 7 minutes ago
        }
      ];
      
      setMessages(mockMessages);
    };

    fetchMessages();

    // In a real app, you would subscribe to new messages
    // const subscription = supabase
    //   .channel('messages')
    //   .on('INSERT', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
    //     setMessages(prev => [...prev, payload.new]);
    //   })
    //   .subscribe();
    
    // return () => {
    //   subscription.unsubscribe();
    // };
  }, [session.user.id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    try {
      // Translate the message
      const translatedText = await translateMessage(
        newMessage,
        userLanguage,
        partnerLanguage
      );
      
      // Create a new message object
      const newMessageObj = {
        id: Date.now(), // In a real app, this would be generated by the database
        sender_id: session.user.id,
        original_text: newMessage,
        original_language: userLanguage,
        translated_text: translatedText,
        created_at: new Date().toISOString()
      };
      
      // In a real app, you would insert the message into Supabase
      // await supabase.from('messages').insert(newMessageObj);
      
      // For now, just add it to the local state
      setMessages(prev => [...prev, newMessageObj]);
      
      // Clear the input
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ChatContainer>
      <Header>
        <Title>Linguisita Chat</Title>
        <UserInfo>
          <span>{session.user.email}</span>
          <Avatar>{session.user.email[0].toUpperCase()}</Avatar>
        </UserInfo>
      </Header>
      
      <MessageList>
        {messages.map(message => (
          <MessageBubble 
            key={message.id} 
            sent={message.sender_id === session.user.id}
          >
            <MessageContent>
              <OriginalText language={message.original_language}>
                {message.original_text}
              </OriginalText>
              <TranslatedText language={message.original_language}>
                {message.translated_text}
              </TranslatedText>
              <MessageTime>{formatTime(message.created_at)}</MessageTime>
            </MessageContent>
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </MessageList>
      
      <MessageForm onSubmit={handleSendMessage}>
        <MessageInput
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <SendButton type="submit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </SendButton>
      </MessageForm>
    </ChatContainer>
  );
};

export default LinguisitaChat;
