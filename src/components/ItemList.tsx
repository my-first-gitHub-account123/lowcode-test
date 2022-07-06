import items from "../object/metes";
import { Editor } from "../object/Editor";
import { Actions } from "../object/editor.types";
export default ({ editor }: { editor: Editor }) => {
  return (
    <>
      {items.map((item) => (
        // <Draggable>
        <div
          draggable={true}
          onDragstart={() => {       
            console.log('EvtDragStart');
                 
            editor.dispatch(Actions.EvtDragStart, item);
          }}
          key={item.title}
        >
          {item.title}
        </div>
        // </Draggable>
      ))}
    </>
  );
};
