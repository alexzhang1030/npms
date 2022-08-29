import { TBox, TSpacer, TText } from '@temir/core'
import { defineComponent } from 'vue'
import List from './List'

export default defineComponent({
  setup() {
    return () => (
      <>
        <TBox>
          <TText color="#1796FF">NPM Script List</TText>
        </TBox>
        <TSpacer />
        <List></List>
        <TSpacer />
        <TBox>
          <TText>Press Ctrl-C to quit program</TText>
        </TBox>
      </>
    )
  },
})
