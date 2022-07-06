export enum States {
  Start,
  DragStart,
  Moving,
  Stoped,
  Selected,
  PlacingComponent,
  AddingComponent,
  Auto,
}
export enum Actions {
  EvtDragStart,
  EvtDrag,
  EvtDrop,
  EvtDragEnd,
  StartAddComponent,
  AUTO = "<auto>",
}
export type Meta = {
  type: string;
  w: number;
  h: number;
};
