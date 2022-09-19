import { TBox, TNewline, TSpacer, TText } from '@temir/core'
import { defineComponent, ref } from 'vue'
import { parseScripts, readScripts } from '../logic'
import Table from './Table'

export default defineComponent({
  setup() {
    const errorMsg = ref('')
    const scripts = ref<{ label: string;value: string }[]>()
    try {
      scripts.value = parseScripts(readScripts())
    }
    catch (error) {
      errorMsg.value = (error as Error).message
    }
    return () => (
      <>
        <TBox flexDirection="column">
          <TText>
            <TText color="#1796FF">NPM Script List</TText>
            <TNewline />
            <TText color="gray">Press Ctrl-C to quit</TText>
          </TText>
          <TSpacer />
          {
            errorMsg.value
              ? <TText color="#FF0C01">Panic!: {errorMsg.value}</TText>
              : <Table data={scripts.value} />
          }
        </TBox>
      </>
    )
  },
})
