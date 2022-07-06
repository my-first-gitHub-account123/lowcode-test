import './UIEditor.scss'
import { Editor } from '../object/Editor'
import ItemList from './ItemList'
import { Panel } from './Panel'
import { defineComponent } from 'vue'
let classes = {
  page: 'page',
  left: 'main-left'
}
const editor = new Editor()
export default defineComponent({
  provide: {
    editor
  },
  setup() {
    return () => (
      <div class={classes.page}>
        <div class={classes.left}>
          <ItemList editor={editor} />
        </div>
        <Panel editor={editor} />
      </div>
    )
  }
})
