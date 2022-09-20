<script setup lang="ts">
import { ref } from 'vue'
import { TBox, TNewline, TSpacer, TText } from '@temir/core'
import { readScripts } from './logic'
import Container from './Container.vue'

const errorMsg = ref('')
let data: ReturnType<typeof readScripts>
try {
  data = readScripts()
}
catch (error) {
  errorMsg.value = (error as Error).message
}
</script>

<template>
  <TBox flex-direction="column">
    <TText>
      <TText color="#1796FF">
        NPM Script List
      </TText>
      <TNewline />
      <TText color="gray">
        Press Ctrl-C to quit, Press ←/→ to switch package
      </TText>
      <TNewline />
    </TText>
    <TSpacer />
    <TText v-if="errorMsg" color="#FF0C01">
      Panic!: {{ errorMsg }}
    </TText>
    <Container v-else :names="data[0]" :data="data[1]" />
  </TBox>
</template>

<style scoped></style>
