import { Topics } from './Topics'
import { StateMachine } from './stateMachine'
import { Node } from './node'
import { Actions, Meta, States } from './editor.types'
export class Editor extends StateMachine<States, Actions, Topics> {
  private root: Node
  constructor() {
    super(States.Start)
    this.root = new Node('root', 0, 0, 800, 800)
    this.describeAddComponent()
    // this.describeDrag()
  }
  private describeAddComponent() {
    let componentToPlace: Meta | null = null
    // 位置信息
    let addVector: [number, number] = [0, 0]
    this.register(States.Start, States.PlacingComponent, Actions.EvtDragStart, (meta) => {
      console.log('drag start', meta)
      // 拖拽组件
      componentToPlace = meta
    })

    this.register(States.PlacingComponent, States.PlacingComponent, Actions.EvtDrag, (Vec) => {
      // 持续拖拽更新位置信息
      addVector = Vec
      // console.log("drag over");
    })
    this.register(States.PlacingComponent, States.AddingComponent, Actions.EvtDrop, (Vec) => {
      // 拖拽结束计算位置
      addVector = Vec
      if (!componentToPlace) {
        throw new Error('no component to create! ')
      }
      console.log('mouser position is', Vec)

      const node = new Node(
        componentToPlace.type,
        addVector[0] - componentToPlace.w / 2 - 120,
        addVector[1] - componentToPlace.h / 2,
        componentToPlace.w,
        componentToPlace.h
      )
      this.root.add(node)
      this.root.emit(Topics.NodeChildrenUpdate as number)
    })
    this.register(States.AddingComponent, States.Start, Actions.AUTO, () => {
      console.log('drag reset')
    })
  }
  private describeUI() {}
  private describeDrag() {
    let DragNode: Node
    this.register(States.Start, States.DragStart, Actions.EvtDragStart, (node) => {
      DragNode = node
    })
    this.register(States.Start, States.Stoped, Actions.EvtDragEnd, (vec: [number, number]) => {
      DragNode.setXY(vec)
      DragNode.emit(Topics.NodePositionMoved)
      console.log('NodePositionMoved');
      
    })
    this.register(States.Stoped, States.Start, Actions.AUTO, (vec: [number, number]) => {})
  }
  public getRoot() {
    return this.root
  }
}
