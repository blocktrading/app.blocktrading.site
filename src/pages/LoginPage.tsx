import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthLayout } from '../components/Layout/AuthLayout';
import { LoginForm } from '../components/Auth/LoginForm';
import { useAuthStore } from '../stores/useAuthStore';

export const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};