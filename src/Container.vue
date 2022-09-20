<script setup lang="ts">
import { computed, ref } from 'vue'
import { TBox } from '@temir/core'
import { TTab, TTabs } from '@temir/tab'
import Table from './Table.vue'

const props = defineProps<{
  names: string[]
  data: { label: string; value: string }[][]
}>()

const selectIndex = ref(0)
const data = computed(() => props.data?.[selectIndex.value] ?? [])
</script>

<template>
  <TBox>
    <TTabs :on-change="i => selectIndex = +i">
      <TTab v-for="(name, index) in names" :key="index">
        {{ name }}
      </TTab>
    </TTabs>
  </TBox>
  <Table :data="data" />
</template>

<style scoped></style>
