import { TBox, TNewline, TSpacer, TText } from '@temir/core'
import { defineComponent, ref } from 'vue'
import { readScripts } from '../logic'
import Container from './Container'

export default defineComponent({
  setup() {
    const errorMsg = ref('')
    let data: ReturnType<typeof readScripts>
    try {
      data = readScripts()
    }
    catch (error) {
      errorMsg.value = (error as Error).message
    }
    return () => (
      <TBox flexDirection="column">
        <TText>
          <TText color="#1796FF">NPM Script List</TText>
          <TNewline />
          <TText color="gray">Press Ctrl-C to quit, Press ←/→ to switch package</TText>
        </TText>
        <TSpacer />
        {
          errorMsg.value
            ? <TText color="#FF0C01">Panic!: {errorMsg.value}</TText>
            : <Container names={data[0]} data={data[1]} />
        }
      </TBox>
    )
  },
})
