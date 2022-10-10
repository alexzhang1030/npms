<script setup lang="ts">
import { ref } from 'vue'
import { TBox, TNewline, TSpacer, TText } from '@temir/core'
import { readScripts } from './logic'
import Container from './Container.vue'
import { checkVersion } from './logic/init'
import ShouldUpgrade from './ShouldUpgrade.vue'

const errorMsg = ref('')
const { shouldUpdate, localVersion, remoteVersion, name: libName } = checkVersion()
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
    <ShouldUpgrade v-if="shouldUpdate" :local="localVersion" :remote="remoteVersion" :name="libName" />
    <TBox flex-direction="column">
      <TText>
        <TText color="#1796FF">
          NPM Script List v{{ localVersion }}
        </TText>
        <TNewline />
        <TText color="gray">
          Quit:
          <TText color="cyan">
            Ctrl + C
          </TText>
          Switch Package:
          <TText color="cyan">
            Left/Right
          </TText>
          Select Scripts:
          <TText color="cyan">
            Up/Down
          </TText>
          Execute
          <TText color="cyan">
            Enter
          </TText>
        </TText>
        <TNewline />
      </TText>
      <TSpacer />
      <TText v-if="errorMsg" color="#FF0C01">
        Panic!: {{ errorMsg }}
      </TText>
      <Container v-else :names="data[0]" :data="data[1]" />
    </TBox>
  </TBox>
</template>

<style scoped></style>
