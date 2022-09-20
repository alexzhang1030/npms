<script setup lang="ts">
import { TBox, TText } from '@temir/core'

defineProps<{
  data: { label: string; value: string }[]
}>()

const getColor = (index: number) => index % 2 === 0 ? '#cca' : '#aac'
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
        <TText :color="getColor(index)">
          {{ item.label }}
        </TText>
      </TBox>
      <TBox width="5%" />
      <TBox width="55%">
        <TText :color="getColor(index)">
          {{ item.value }}
        </TText>
      </TBox>
    </TBox>
  </TBox>
</template>
