import React from 'react';
import type { EdgeProps } from '@xyflow/react';
import { getSmoothStepPath, EdgeLabelRenderer } from '@xyflow/react';

export const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{
          stroke: selected ? '#06B6D4' : '#14B8A6',
          strokeWidth: selected ? 3 : 2,
          filter: selected ? 'drop-shadow(0 0 8px rgba(20, 184, 166, 0.6))' : 'none'
        }}
      />
      
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 10,
              background: 'rgba(31, 41, 55, 0.9)',
              padding: '2px 6px',
              borderRadius: 4,
              color: '#E5E7EB',
              border: '1px solid rgba(75, 85, 99, 0.4)',
              pointerEvents: 'all'
            }}
            className="nodrag nopan"
          >
            {String(data.label)}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};