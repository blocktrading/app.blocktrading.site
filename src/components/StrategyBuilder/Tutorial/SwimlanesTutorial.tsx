import React, { useState } from 'react';
import styles from './Tutorial.module.css';

interface TutorialProps {
  onClose: () => void;
}

export const SwimlanesTutorial: React.FC<TutorialProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "🏊‍♂️ Welcome to Strategy Lanes!",
      content: "Strategy Lanes help you organize your trading logic into parallel execution paths. Each lane has a different priority and purpose.",
      highlight: "swimlanes"
    },
    {
      title: "🎯 Main Strategy Lane",
      content: "This is where your primary trading logic goes. Start here with basic indicators like RSI, conditions, and buy/sell actions.",
      highlight: "main-strategy"
    },
    {
      title: "🛡️ Risk Management Lane",
      content: "The highest priority lane (999). Emergency stops and risk controls placed here will override all other actions.",
      highlight: "risk-management"
    },
    {
      title: "📊 How to Use",
      content: "1. Click 🔸 to activate a lane\n2. Drag blocks from the toolbox directly into the lane\n3. Connect the blocks on the main canvas\n4. Higher priority lanes can interrupt lower ones",
      highlight: "toolbox"
    }
  ];

  const currentStepData = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={styles.tutorialOverlay}>
      <div className={styles.tutorialModal}>
        <div className={styles.tutorialHeader}>
          <h3>{currentStepData.title}</h3>
          <button className={styles.closeButton} onClick={onClose}>✕</button>
        </div>
        
        <div className={styles.tutorialContent}>
          <div className={styles.stepContent}>
            {currentStepData.content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          
          <div className={styles.stepIndicator}>
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`${styles.stepDot} ${index === currentStep ? styles.active : ''} ${index < currentStep ? styles.completed : ''}`}
              />
            ))}
          </div>
        </div>
        
        <div className={styles.tutorialActions}>
          <button 
            className={styles.prevButton}
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            ← Previous
          </button>
          
          <span className={styles.stepCounter}>
            {currentStep + 1} of {steps.length}
          </span>
          
          <button 
            className={styles.nextButton}
            onClick={nextStep}
          >
            {currentStep === steps.length - 1 ? 'Get Started!' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};
