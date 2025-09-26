import { createEditor } from "./editor";
import { useRete } from "rete-react-plugin";
import styles from "./StrategyCanvas.module.css";

export const StrategyCanvas: React.FC = () => {
  const [ref] = useRete(createEditor);

  return (
    <div className={styles.strategyCanvas}>
      <div ref={ref} className={styles.reteContainer}></div>
    </div>
  );
}