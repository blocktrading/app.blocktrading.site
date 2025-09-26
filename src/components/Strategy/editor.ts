import { createRoot } from "react-dom/client";
import { NodeEditor, type GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets
} from "rete-connection-plugin";
import { ReactPlugin, Presets, type ReactArea2D } from "rete-react-plugin";
import { StyledNode } from "./builder-comps/StyledNode";
import { CustomSocket } from "./builder-comps/CustomSocket";
import { getDOMSocketPosition } from "rete-render-utils";

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = ReactArea2D<Schemes>;

export async function createEditor(container: HTMLElement) {
  const socket = new ClassicPreset.Socket("socket");

  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  render.addPreset(
    Presets.classic.setup({
      customize: {
        node() {
          return StyledNode;
        },
        socket() {
          return CustomSocket;
        },
      },
      socketPositionWatcher: getDOMSocketPosition({
        offset({ x, y }, nodeId, side) {
            return {
                x: x * (side === 'input' ? -1 : 1),
                y: y
            }
        }
      })
    })
  );

  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  AreaExtensions.simpleNodesOrder(area);

  const a = new ClassicPreset.Node("Moving Average") as any;
  a.category = "indicators";
  a.icon = "📊";  
  a.color = "#3B82F6";
  a.addOutput("a", new ClassicPreset.Output(socket));
  a.addOutput("b", new ClassicPreset.Output(socket));
  a.addOutput("c", new ClassicPreset.Output(socket));
  a.addOutput("d", new ClassicPreset.Output(socket));
  a.addOutput("e", new ClassicPreset.Output(socket));
  a.addOutput("f", new ClassicPreset.Output(socket));
  a.addOutput("g", new ClassicPreset.Output(socket));
  a.addInput("a", new ClassicPreset.Input(socket));
  a.addInput("b", new ClassicPreset.Input(socket));
  a.addInput("c", new ClassicPreset.Input(socket));
  a.addInput("d", new ClassicPreset.Input(socket));
  await editor.addNode(a);

  const b = new ClassicPreset.Node("RSI Signal") as any;
  b.category = "signals";
  b.icon = "⚡";
  b.color = "#10B981";
  b.addOutput("a", new ClassicPreset.Output(socket));
  b.addInput("a", new ClassicPreset.Input(socket));
  await editor.addNode(b);

  await area.translate(a.id, { x: 0, y: 0 });
  await area.translate(b.id, { x: 300, y: 0 });

  await editor.addConnection(new ClassicPreset.Connection(a, "a", b, "a"));

  setTimeout(() => {
    AreaExtensions.zoomAt(area, editor.getNodes());
  }, 100);

  return {
    destroy: () => area.destroy()
  };
}
