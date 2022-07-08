import { Topics } from './Topics'
import { Emiter } from './Emiter'

export class dragValue extends Emiter<number> {
  private startX = 0
  private startY = 0
  private diffX = 0
  private diffY = 0
  
  start(e: DragEvent) {
    this.startX = e.clientX
    this.startY = e.clientY
    this.diffX = 0
    this.diffY = 0
    this.emit(Topics.NodeChildrenUpdate)
  }
  initDiff(){
    this.diffX = 0
    this.diffY = 0
  }
  update(e: DragEvent) {
    this.diffX = e.clientX - this.startX
    this.diffY = e.clientY - this.startY
    this.emit(Topics.NodeChildrenUpdate)
  }
  getDiffX() {
    return this.diffX
  }
  getDiffY() {
    return this.diffY
  }
}
