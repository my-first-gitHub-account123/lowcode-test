import { defineComponent, nextTick, PropType, ref } from 'vue'
import { dragValue } from '../object/dragValue'
import { Topics } from '../object/Topics'
function useDrag({
  onDragend,
  onDragstart
}: {
  onDragend?: (vec: [number, number]) => void
  onDragstart?: () => void
}) {
  const value = new dragValue()
  const diffX = ref(value.getDiffX())
  const diffY = ref(value.getDiffY())
  const vNodeProps = {
    ondragstart(e: DragEvent) {
      value.start(e)
      onDragstart && onDragstart()
    },
    ondrag(e: DragEvent) {
      value.update(e)
      diffX.value = value.getDiffX()
      diffY.value = value.getDiffY()
    },
    ondragend(e: DragEvent) {
      value.update(e)
      onDragend && onDragend([value.getDiffX(), value.getDiffY()])
      value.emit(Topics.NodePositionMoved)
    }
  }
  return { value, vNodeProps, diffX, diffY }
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
    const { value, vNodeProps, diffX, diffY } = useDrag({
      onDragend: props.onDragend,
      onDragstart: props.onDragstart
    })
    const ver = ref(0)
    return () => {
      const vNode = ctx.slots.default!()[0]
      value.on(Topics.NodeChildrenUpdate).subscribe(() => {
        ver.value++
      })
      value.on(Topics.NodePositionMoved).subscribe(() => {
        diffX.value = diffY.value = 0
      })

      vNode.props = { ...vNode.props, ...vNodeProps, draggable: true }

      vNode.props.style = {
        ...vNode.props.style,
        position: 'absolute',
        left: (props.initialPosition?.[0] ?? 0) + 'px',
        top: (props.initialPosition?.[1] ?? 0) + 'px',
        transform: `translate(${diffX.value}px,${diffY.value}px)`
      }
      vNode.props.ver = ver.value

      return vNode
    }
  }
})
