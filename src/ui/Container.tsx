import type { PropType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import { TBox } from '@temir/core'
import { TTab, TTabs } from '@temir/tab'
import Table from './Table'

export default defineComponent({
  props: {
    names: {
      type: Array as PropType<string[]>,
      required: true,
    },
    data: {
      type: Array as PropType<{ label: string; value: string }[][]>,
    },
  },
  setup(props) {
    const selectIndex = ref(0)
    const data = computed(() => props.data?.[selectIndex.value] ?? [])
    return () => (
      <>
        <TBox>
          <TTabs onChange={i => selectIndex.value = +i}>
            {
              props.names.map((name, index) => <TTab key={index}>{name}</TTab>)
            }
          </TTabs>
        </TBox>
        <Table data={data.value} />
      </>
    )
  },
})
