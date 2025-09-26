import { type ClassicScheme, type RenderEmit, Presets } from "rete-react-plugin";
import styled, { css } from "styled-components";

const { RefSocket, RefControl } = Presets.classic;

type NodeExtraData = { 
  width?: number; 
  height?: number; 
  category?: string;
  icon?: string;
  color?: string;
};

const getCategoryBorder = (category: string) => {
  switch (category) {
    case "indicators":
      return "4px solid #0EA5E9";
    case "signals": 
      return "4px solid #F59E0B";
    case "position":
      return "4px solid #14B8A6";
    case "logic":
      return "4px solid #8B5CF6";
    case "data":
      return "4px solid #8B5CF6";
    default:
      return "4px solid #8B5CF6";
  }
};

const getCategoryIconBg = (category: string) => {
  switch (category) {
    case "indicators":
      return "#0EA5E9";
    case "signals":
      return "#F59E0B";
    case "position":
      return "#14B8A6";
    case "logic":
      return "#8B5CF6";
    case "data":
      return "#8B5CF6";
    default:
      return "#8B5CF6";
  }
};

export const StyledNodeWrapper = styled.div<NodeExtraData & { selected: boolean }>`
  background: var(--bt-card-bg);
  border: 1px solid var(--bt-border);
  border-radius: 12px;
  padding: 16px;
  min-width: 200px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-left: ${(props) => getCategoryBorder(props.category || "")};
  width: ${(props) => Number.isFinite(props.width) ? `${props.width}px` : "200px"};
  height: ${(props) => Number.isFinite(props.height) ? `${props.height}px` : "auto"};
  position: relative;
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(20, 184, 166, 0.2);
  }
  
  ${(props) => props.selected && css`
    border-color: var(--bt-primary);
    box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.3), 0 8px 24px rgba(20, 184, 166, 0.2);
  `}
  
  .node-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  
  .node-icon {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    background: ${(props) => getCategoryIconBg(props.category || "")};
    font-size: 12px;
  }
  
  .title {
    font-weight: 600;
    color: var(--bt-text-primary);
    font-size: 14px;
    margin: 0;
  }
  
  .output {
    right: 0;
    position: absolute;
  }
  
  .input {
    left: 0;
    position: absolute;
  }
  
  .output-socket {
    text-align: right;
    margin-right: -1px;
  }
  
  .input-socket {
    text-align: left;
    margin-left: -1px;
  }

  .output-socket > span > div{
    position: absolute;
    pointer-events: none;
    min-width: 5px;
    min-height: 5px;
    width: 6px;
    height: 6px;
    background-color: var(--xy-handle-background-color, var(--xy-handle-background-color-default));
    border: 1px solid var(--xy-handle-border-color, var(--xy-handle-border-color-default));
    border-radius: 100%;
    width: 12px !important;
    height: 12px !important;
    border: 2px solid var(--bt-dark) !important;
    transition: all 0.3s ease;
    transform-origin: center center;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
  }

  .input-socket > span > div{
    position: absolute;
    pointer-events: none;
    min-width: 5px;
    min-height: 5px;
    width: 6px;
    height: 6px;
    background-color: var(--xy-handle-background-color, var(--xy-handle-background-color-default));
    border: 1px solid var(--xy-handle-border-color, var(--xy-handle-border-color-default));
    border-radius: 100%;
    width: 12px !important;
    height: 12px !important;
    border: 2px solid var(--bt-dark) !important;
    transition: all 0.3s ease;
    transform-origin: center center;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
  }
  
  .input-title,
  .output-title {
    vertical-align: middle;
    color: var(--bt-text-muted);
    display: inline-block;
    font-family: sans-serif;
    font-size: 12px;
    font-weight: 500;
    margin: 4px 8px;
    line-height: 18px;
  }
  
  .input-control {
    z-index: 1;
    width: calc(100% - 36px);
    vertical-align: middle;
    display: inline-block;
  }
  
  .control {
    display: block;
    padding: 4px 0;
  }
`;

type Props<S extends ClassicScheme> = {
  data: S["Node"] & NodeExtraData;
  emit: RenderEmit<S>;
};

export function StyledNode<Scheme extends ClassicScheme>(props: Props<Scheme>) {
  const inputs = Object.entries(props.data.inputs);
  const outputs = Object.entries(props.data.outputs);
  const controls = Object.entries(props.data.controls);
  const selected = props.data.selected || false;
  const { id, label, width, height, category, icon, color } = props.data;

  inputs.sort((a, b) => (a[1]?.index || 0) - (b[1]?.index || 0));
  outputs.sort((a, b) => (a[1]?.index || 0) - (b[1]?.index || 0));
  controls.sort((a, b) => (a[1]?.index || 0) - (b[1]?.index || 0));

  return (
    <StyledNodeWrapper
      selected={selected}
      width={width}
      height={height}
      category={category}
      icon={icon}
      color={color}
      data-testid="node"
    >
      <div className="node-header">
        <div className="node-icon">
          {icon || "📊"}
        </div>
        <div className="title" data-testid="title">
          {label}
        </div>
      </div>
      
      {outputs.map(([key, output]) =>
        output && (
          <div className="output" key={key} data-testid={`output-${key}`}>
            <div className="output-title" data-testid="output-title">
              {output?.label}
            </div>
            <RefSocket
              name="output-socket"
              side="output"
              emit={props.emit}
              socketKey={key}
              nodeId={id}
              payload={output.socket}
            />
          </div>
        )
      )}
      
      {controls.map(([key, control]) => {
        return control ? (
          <RefControl
            key={key}
            name="control"
            emit={props.emit}
            payload={control}
          />
        ) : null;
      })}
      
      {inputs.map(([key, input]) =>
        input && (
          <div className="input" key={key} data-testid={`input-${key}`}>
            <RefSocket
              name="input-socket"
              emit={props.emit}
              side="input"
              socketKey={key}
              nodeId={id}
              payload={input.socket}
            />
            {input && (!input.control || !input.showControl) && (
              <div className="input-title" data-testid="input-title">
                {input?.label}
              </div>
            )}
            {input?.control && input?.showControl && (
              <span className="input-control">
                <RefControl
                  key={key}
                  name="input-control"
                  emit={props.emit}
                  payload={input.control}
                />
              </span>
            )}
          </div>
        )
      )}
    </StyledNodeWrapper>
  );
}