import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './RegisterForm.module.css';

interface FormData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  exchange: {
    platform: string;
    apiKey: string;
    secretKey: string;
    sandboxMode: boolean;
  };
}

const EXCHANGES = [
  { id: 'binance', name: 'Binance', logo: '🔶' },
  { id: 'coinbase', name: 'Coinbase Pro', logo: '🔵' },
  { id: 'kraken', name: 'Kraken', logo: '🐙' },
  { id: 'bybit', name: 'Bybit', logo: '🟡' },
  { id: 'kucoin', name: 'KuCoin', logo: '🟢' },
];

export const RegisterForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    exchange: {
      platform: '',
      apiKey: '',
      secretKey: '',
      sandboxMode: true,
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, isLoading } = useAuthStore();

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('exchange.')) {
      const exchangeField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        exchange: {
          ...prev.exchange,
          [exchangeField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nickname.trim()) {
      newErrors.nickname = 'Nickname is required';
    } else if (formData.nickname.length < 3) {
      newErrors.nickname = 'Nickname must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.exchange.platform) {
      newErrors['exchange.platform'] = 'Please select an exchange';
    }
    
    if (!formData.exchange.apiKey.trim()) {
      newErrors['exchange.apiKey'] = 'API Key is required';
    }
    
    if (!formData.exchange.secretKey.trim()) {
      newErrors['exchange.secretKey'] = 'Secret Key is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      handleNext();
      return;
    }
    
    if (validateStep2()) {
      const success = await register(formData.email, formData.password, formData.nickname);
      if (success) {
        // In una vera app, qui salveresti anche i dati dell'exchange
        console.log('Registration successful with exchange:', formData.exchange);
      }
    }
  };

  return (
    <div className={styles.registerForm}>
      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${(currentStep / 2) * 100}%` }}
          ></div>
        </div>
        <div className={styles.stepIndicators}>
          <div className={`${styles.stepIndicator} ${currentStep >= 1 ? styles.active : ''}`}>
            <span>1</span>
          </div>
          <div className={`${styles.stepIndicator} ${currentStep >= 2 ? styles.active : ''}`}>
            <span>2</span>
          </div>
        </div>
      </div>

      {/* Form Header */}
      <div className={styles.formHeader}>
        <h1>
          {currentStep === 1 ? 'Create Account' : 'Connect Exchange'}
        </h1>
        <p>
          {currentStep === 1 
            ? 'Join BlockTrading and start your automated trading journey'
            : 'Connect your exchange to start trading with our strategies'
          }
        </p>
      </div>

      {/* Error Display */}
      {Object.keys(errors).length > 0 && (
        <div className={styles.errorMessage}>
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          Please fix the errors below
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {currentStep === 1 ? (
          <div className={styles.stepContent}>
            {/* Step 1: Basic Info */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nickname</label>
              <div className={styles.inputGroup}>
                <svg className={styles.inputIcon} viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  placeholder="Your trading nickname"
                  className={`${styles.formInput} ${errors.nickname ? styles.error : ''}`}
                  disabled={isLoading}
                />
              </div>
              {errors.nickname && <span className={styles.errorText}>{errors.nickname}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address</label>
              <div className={styles.inputGroup}>
                <svg className={styles.inputIcon} viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <div className={styles.inputGroup}>
                <svg className={styles.inputIcon} viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a secure password"
                  className={`${styles.formInput} ${errors.password ? styles.error : ''}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Confirm Password</label>
              <div className={styles.inputGroup}>
                <svg className={styles.inputIcon} viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ''}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
            </div>
          </div>
        ) : (
          <div className={styles.stepContent}>
            {/* Step 2: Exchange Connection */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Select Exchange</label>
              <div className={styles.exchangeGrid}>
                {EXCHANGES.map((exchange) => (
                  <button
                    key={exchange.id}
                    type="button"
                    className={`${styles.exchangeCard} ${
                      formData.exchange.platform === exchange.id ? styles.selected : ''
                    }`}
                    onClick={() => handleInputChange('exchange.platform', exchange.id)}
                    disabled={isLoading}
                  >
                    <div className={styles.exchangeLogo}>{exchange.logo}</div>
                    <span className={styles.exchangeName}>{exchange.name}</span>
                  </button>
                ))}
              </div>
              {errors['exchange.platform'] && <span className={styles.errorText}>{errors['exchange.platform']}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>API Key</label>
              <div className={styles.inputGroup}>
                <svg className={styles.inputIcon} viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
                <input
                  type="text"
                  value={formData.exchange.apiKey}
                  onChange={(e) => handleInputChange('exchange.apiKey', e.target.value)}
                  placeholder="Enter your API key"
                  className={`${styles.formInput} ${errors['exchange.apiKey'] ? styles.error : ''}`}
                  disabled={isLoading}
                />
              </div>
              {errors['exchange.apiKey'] && <span className={styles.errorText}>{errors['exchange.apiKey']}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Secret Key</label>
              <div className={styles.inputGroup}>
                <svg className={styles.inputIcon} viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type="password"
                  value={formData.exchange.secretKey}
                  onChange={(e) => handleInputChange('exchange.secretKey', e.target.value)}
                  placeholder="Enter your secret key"
                  className={`${styles.formInput} ${errors['exchange.secretKey'] ? styles.error : ''}`}
                  disabled={isLoading}
                />
              </div>
              {errors['exchange.secretKey'] && <span className={styles.errorText}>{errors['exchange.secretKey']}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.exchange.sandboxMode}
                  onChange={(e) => handleInputChange('exchange.sandboxMode', e.target.checked)}
                  disabled={isLoading}
                />
                <span className={styles.checkmark}></span>
                Use Sandbox Mode (Recommended for testing)
              </label>
            </div>

            <div className={styles.infoBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              <div>
                <p><strong>Your API keys are encrypted and secure.</strong></p>
                <p>We only need read and trade permissions. Never share withdrawal permissions.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className={styles.formActions}>
          {currentStep === 2 && (
            <button
              type="button"
              className={styles.backButton}
              onClick={handleBack}
              disabled={isLoading}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path d="M19 12H5"/>
                <path d="M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
          )}
          
          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                {currentStep === 1 ? 'Processing...' : 'Creating Account...'}
              </>
            ) : (
              <>
                {currentStep === 1 ? (
                  <>
                    Next Step
                    <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                      <path d="M5 12h14"/>
                      <path d="M12 5l7 7-7 7"/>
                    </svg>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                    Create Account
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </form>

      <div className={styles.loginPrompt}>
        <p>
          Already have an account?{' '}
          <Link to="/login" className={styles.loginLink}>
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};