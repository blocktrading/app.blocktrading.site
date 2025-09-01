import React, { useState, useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { StrategyBuilderLayout } from '../components/StrategyBuilder/StrategyBuilderLayout';
import { EnhancedToolbox } from '../components/StrategyBuilder/EnhancedToolbox';
import { EnhancedCanvas } from '../components/StrategyBuilder/EnhancedCanvas';
import { EnhancedPropertiesPanel } from '../components/StrategyBuilder/EnhancedPropertiesPanel';
import { SwimlaneManager } from '../components/StrategyBuilder/Swimlane/SwimlaneManager';
import { SwimlanesTutorial } from '../components/StrategyBuilder/Tutorial/SwimlanesTutorial';
import { useStrategyStore } from '../stores/useStrategyStore';
import styles from '../components/StrategyBuilder/StrategyBuilder.module.css';

export const StrategyBuilder: React.FC = () => {
  const { 
    swimlanes, 
    nodes, 
    setSwimlanes,
    toggleSwimlaneCollapse, 
    toggleSwimlaneActive,
    addNodeToSwimlane 
  } = useStrategyStore();

  const [showTutorial, setShowTutorial] = useState(false);

  // Show tutorial on first visit
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenSwimlanesTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenSwimlanesTutorial', 'true');
  };

  const handleShowTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <StrategyBuilderLayout>
        <ReactFlowProvider>
          <div className={styles.strategyBuilderContent}>
            {/* Left: Toolbox */}
            <EnhancedToolbox />
            
            {/* Center: Canvas */}
            <div className={styles.canvasSection}>
              <EnhancedCanvas />
              
              {/* Tutorial Button */}
              <div className={styles.tutorialButton}>
                <button 
                  className={styles.helpButton}
                  onClick={handleShowTutorial}
                  title="Show Swimlanes Tutorial"
                >
                  💡 How to use Lanes
                </button>
              </div>
            </div>
            
            {/* Right: Split between Properties and Swimlanes */}
            <div className={styles.rightPanel}>
              {/* Properties Panel (Upper) */}
              <div className={styles.propertiesSection}>
                <EnhancedPropertiesPanel />
              </div>
              
              {/* Swimlanes Manager (Lower) */}
              <div className={styles.swimlanesSection}>
                <SwimlaneManager
                  swimlanes={swimlanes}
                  nodes={nodes}
                  onToggleCollapse={toggleSwimlaneCollapse}
                  onToggleActive={toggleSwimlaneActive}
                  onDropNode={addNodeToSwimlane}
                  onUpdateSwimlanes={setSwimlanes}
                />
              </div>
            </div>
          </div>
          
          {/* Tutorial Modal */}
          {showTutorial && (
            <SwimlanesTutorial onClose={handleCloseTutorial} />
          )}
        </ReactFlowProvider>
      </StrategyBuilderLayout>
    </DndProvider>
  );
};