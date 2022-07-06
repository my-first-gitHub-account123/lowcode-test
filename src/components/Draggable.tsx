import { defineComponent, PropType, ref } from 'vue'
import { DragTopics, dragValue } from '../object/dragValue'
function useDrag({
  onDragend,
  onDragstart
}: {
  onDragend?: (vec: [number, number]) => void
  onDragstart?: () => void
}) {
  const value = new dragValue()
  const vNodeProps = {
    ondragstart(e: DragEvent) {
      value.start(e)
      onDragstart && onDragstart()
    },
    ondrag(e: DragEvent) {
      value.update(e)
    },
    ondragend(e: DragEvent) {
      value.update(e)
      let diffX = value.getDiffX()
      let diffY = value.getDiffY()
      onDragend && onDragend([diffX, diffY])
    }
  }
  return { value, vNodeProps }
}
export default defineComponent({
  name: 'Drag',

  props: {
    initialPosition: {
      type: Array as any as PropType<[number, number]>
    },
    onDragend: {
      type: Function as PropType<(vec: [number, number]) => void>
    },
    onDragstart: {
      type: Function as PropType<() => void>
    }
  },
  setup(props, ctx) {
    const { value, vNodeProps } = useDrag({ onDragend: props.onDragend })
    const ver = ref(0)
    return () => {
      const vNode = ctx.slots.default!()[0]
      value.on(DragTopics.DragValueChange).subscribe(() => {
        ver.value++
      })
      console.log('props.initialPosition', props.initialPosition)
      vNode.props = { ...vNode.props, ...vNodeProps, draggable: true }
      vNode.props.style = {
        ...vNode.props.style,
        position: 'absolute',
        left: (props.initialPosition?.[0] ?? 0) + 'px',
        top: (props.initialPosition?.[1] ?? 0) + 'px',
        transform: `translate(${value.getDiffX()}px,${value.getDiffY()}px)`
      }
      vNode.props.ver = ver.value

      return vNode
    }
  }
})
