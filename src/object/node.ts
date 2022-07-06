import { Emiter } from './Emiter'
import { Map as ImmutableMap, List } from 'immutable'
import { Topics } from './Topics'
export class Node extends Emiter<Topics> {
  private nodeData: ImmutableMap<string, any>
  constructor(type: string, x: number, y: number, w: number, h: number) {    
    super()
    this.nodeData = ImmutableMap({
      type,
      x,
      y,
      w,
      h,
      children: List<Node>()
    })
  }
  public add(child: Node) {
    this.nodeData = this.nodeData.update('children', (children) => {
      return children.push(child)
    })
  }
  public getType(): string {
    return this.nodeData.get('type')
  }
  public getW() {
    return this.nodeData.get('w')
  }
  public getH() {
    return this.nodeData.get('h')
  }
  public getX() {
    return this.nodeData.get('x')
  }
  public getY() {
    return this.nodeData.get('y')
  }
  public getChildren(): List<Node> {
    return this.nodeData.get('children').toJS()
  }
  public setXY(vec: [number, number]) {
    this.nodeData.set('X', vec[0] + this.getX()).set('Y', vec[1] + this.getY())
  }
}
