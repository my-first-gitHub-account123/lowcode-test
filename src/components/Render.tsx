import { defineComponent, Ref, ref, createElementVNode, version, inject } from 'vue'
import { Topics } from '../object/Topics'
import { Node } from '../object/node'
import Draggable from './Draggable'
import { Editor } from '../object/Editor'
import { Actions } from '../object/editor.types'
function render(node: Node, ver: Ref<number>) {
  switch (node.getType()) {
    case 'root':
      return <Root node={node} key={ver.value} />
    case 'rect':
    case 'image':
    case 'text':
      console.log('render', node.getType())

      return <ItemRenderForDraggable node={node} />
    default:
      throw new Error('unsupported type:' + node.getType())
  }
}
type SkedoComponent = {
  node: Node
}

export const RenderItem = ({ node }: SkedoComponent) => {
  console.log('ItemRender', node.getW())

  switch (node.getType()) {
    case 'image':
      return (
        <img
          class={node.getType()}
          src={
            'https://ts1.cn.mm.bing.net/th?id=OIP-C.QPH1IBosDYBqaU3O6wV3YAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2'
          }
        ></img>
      )
    case 'rect':
      return <div class={node.getType()}>div</div>
    case 'text':
      return <h2 class={node.getType()}>text</h2>
  }
}

const ItemRenderForDraggable = ({ node }: SkedoComponent) => {
  console.log('ItemRenderForDraggable', node.getX())
  const editor = inject('editor') as Editor
  // editor.on()
  return (
    <Draggable
      initialPosition={[node.getX(), node.getY()]}
      onDragstart={() => {
        editor.dispatch(Actions.EvtDragStart, node)
      }}
      onDragend={(vec) => {
        editor.dispatch(Actions.EvtDragEnd, vec)
      }}
    >
      {RenderItem({ node })}
    </Draggable>
  )
}

const Root = ({ node }: SkedoComponent) => {
  const children = node.getChildren()
  return (
    <div data-skedo="root">
      {children.map((no: Node, i) => {
        console.log(no.getType())

        return <Render node={no} key={i} />
      })}
    </div>
  )
}
export const Render = defineComponent({
  name: 'Render',
  props: {
    node: {
      type: Node,
      required: true
    }
  },
  setup({ node }) {
    let ver = ref(0)
    node.on(Topics.NodeChildrenUpdate).subscribe(() => {
      ver.value++
    })
    return () => {
      console.log(ver.value)

      return render(node, ver) ?? <div></div>
    }
  }
})
