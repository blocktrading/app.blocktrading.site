import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthLayout } from '../components/Layout/AuthLayout';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { useAuthStore } from '../stores/useAuthStore';

export const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};