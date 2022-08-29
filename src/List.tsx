import { TBox, TText } from '@temir/core'
import SelectInput from '@temir/select-input'
import { defineComponent, ref } from 'vue'
import { readScripts } from './init'

export default defineComponent({
  setup() {
    // const isInit = ref(false)
    const errorMsg = ref('')
    try {
      readScripts()
    }
    catch (error) {
      errorMsg.value = (error as Error).cause!.message
    }
    const items = [
      {
        label: 'dev - tsx ./src/index.ts',
        value: 'Vue',
      },
    ]
    return () => (errorMsg.value
      ? <TBox><TText color="#FF0C01">Panic!: {errorMsg.value}</TText></TBox>
      : <SelectInput items={items}></SelectInput>)
  },
})
