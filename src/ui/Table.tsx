import { TBox, TText } from '@temir/core'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<{ label: string; value: string }[]>,
    },
  },
  setup(props) {
    const getColor = (index: number) => index % 2 === 0 ? '#cca' : '#aac'
    return () => (
      <TBox flexDirection="column" width={80} borderStyle="round">
        <TBox>
          <TBox width="25%">
            <TText bold>Script Name</TText>
          </TBox>

          <TBox width="75%">
            <TText bold>Script Value</TText>
          </TBox>
        </TBox>
        {
          props.data?.map((item, index) => {
            return <TBox key={index}>
              <TBox width="25%">
                <TText color={ getColor(index) }>{item.label}</TText>
              </TBox>
              <TBox width="75%">
                <TText color={ getColor(index) }>{item.value}</TText>
              </TBox>
            </TBox>
          })
        }
      </TBox>
    )
  },
})
