import { Render } from "./Render";
import { Editor } from "../object/Editor";
import "./css/Panel.scss";
import { Actions } from "../object/editor.types";
export const Panel = ({ editor }: { editor: Editor }) => {
  return (
    <div
      class={"root"}
      onDragover={(e) => {
        e.preventDefault();
        editor.dispatch(Actions.EvtDrag, [e.clientX, e.clientY]);
      }}
      onDrop={(e) => {
        e.preventDefault();        
        editor.dispatch(Actions.EvtDrop, [e.clientX, e.clientY]);
      }}
    >
      <Render node={editor.getRoot()}></Render>
    </div>
  );
};
