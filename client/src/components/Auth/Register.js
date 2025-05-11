import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../../supabaseClient';

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

const AuthCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const AuthTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--text-color);
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--text-color);
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  font-size: 1rem;
  transition: var(--transition);

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 163, 255, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  font-size: 1rem;
  transition: var(--transition);
  background-color: white;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 163, 255, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #00A3FF 0%, #0081cc 100%);
  color: white;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.5rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: var(--dark-gray);
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const AuthLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: var(--primary-color);
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    color: #0081cc;
  }
`;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Register the user
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            preferred_language: preferredLanguage,
          },
        },
      });

      if (signUpError) throw signUpError;

      // If successful, create a user profile in the database
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: email,
              preferred_language: preferredLanguage,
            },
          ]);

        if (profileError) throw profileError;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthTitle>Create an Account</AuthTitle>
        <AuthForm onSubmit={handleRegister}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="language">Preferred Language</Label>
            <Select
              id="language"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </Select>
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </SubmitButton>
        </AuthForm>
        <AuthLink to="/">Already have an account? Log in</AuthLink>
      </AuthCard>
    </AuthContainer>
  );
};

export default Register;
