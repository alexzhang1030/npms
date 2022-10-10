<script setup lang="ts">
import readline from 'node:readline'
import { TBox, TText, useStdin } from '@temir/core'
import { onMounted, ref } from 'vue'
import { executeScript } from './logic/util'

const props = defineProps<{
  data: { label: string; value: string }[]
}>()

const getColor = (index: number) => index % 2 === 0 ? '#cca' : '#aac'
const selectedIndex = ref(0)
const getBgColor = (index: number) => index === selectedIndex.value ? '#C0CFFaF' : ''

const handleExecuteScript = (script: string) => {
  // eslint-disable-next-line no-console
  executeScript(script)
}

const onKeyPress = (_: string, key: null | { name: string; shift: boolean; meta: boolean }) => {
  if (key) {
    const index = selectedIndex.value
    const len = props.data.length
    switch (key.name) {
      case 'up':
        selectedIndex.value = index - 1 >= 0 ? index - 1 : len - 1
        break
      case 'down':
        selectedIndex.value = index + 1 < len ? index + 1 : 0
        break
      case 'return':
        handleExecuteScript(props.data[selectedIndex.value].value)
        break
    }
  }
}

onMounted(() => {
  const { stdin, isRawModeSupported, setRawMode } = useStdin()
  if (isRawModeSupported)
    setRawMode(true)

  readline.emitKeypressEvents(stdin)

  stdin.on('keypress', onKeyPress.bind(this))
})
</script>

<template>
  <TBox flex-direction="column" :width="90" border-style="round">
    <TBox>
      <TBox width="40%">
        <TText bold>
          Script Name
        </TText>
      </TBox>

      <TBox width="5%" />
      <TBox width="55%">
        <TText bold>
          Script Value
        </TText>
      </TBox>
    </TBox>
    <TBox v-for="(item, index) in data" :key="index">
      <TBox width="40%">
        <TText :color="getColor(index)" :background-color="getBgColor(index)">
          {{ item.label }}
        </TText>
      </TBox>
      <TBox width="5%" />
      <TBox width="55%">
        <TText :color="getColor(index)" :background-color="getBgColor(index)">
          {{ item.value }}
        </TText>
      </TBox>
    </TBox>
  </TBox>
</template>
