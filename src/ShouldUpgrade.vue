<script setup lang="ts">
import { TBox, TNewline, TText } from '@temir/core'

defineProps<{
  local: string
  remote: string
  name: string
}>()
</script>

<template>
  <TBox border-style="round" :width="90" border-color="yellow">
    <TText>
      NOTICE this version is not up to date.
      <TText color="red">
        v{{ local }}
      </TText>
      ->
      <TText color="green">
        v{{ remote }}
      </TText>.
      <TNewline />
      <TText>
        PLEASE USE <TText color="#232CFF">
          npm install -g {{ name }}
        </TText> to upgrade
      </TText>
    </TText>
    <TNewline />
  </TBox>
</template>

<style scoped></style>
