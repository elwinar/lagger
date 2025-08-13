<script setup lang="ts">
import {ref, watch} from "vue"
import {debouncedRef} from "@/debouncedRef"
import { SearchSchema, MappingSchema } from "@/elasticsearch"

const indices = debouncedRef("vector-*", 1000)
const search = debouncedRef("", 1000)
const refreshCounter = ref(0)
const hits = ref([])
const mapping = ref({})
const columns = ref([])

watch([search, indices, refreshCounter], async () => {
  hits.value = await fetch(`${window.config.elasticsearch_url}/${indices.value}/_search`, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: {
        query_string: {
          query: search.value || "*",
        },
      },
    }),
  }).then(res => res.json())
  .then(body => SearchSchema.parse(body))
  .then(res => res.hits.hits)
}, {immediate: true})

watch([indices], async() => {
  const out = await fetch(`${window.config.elasticsearch_url}/${indices.value}/_mapping`, {
    method: "GET",
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
  .then(body => MappingSchema.parse(body))
  .then(res => Object.values(res)
    .flatMap(index => Object.entries(index.mappings.properties))
    .reduce((acc, [field, mapping]) => {
      // TODO Check here if the field already exists with a conflicting type.
      acc[field] = mapping
      return acc
    }, {})
  )
  mapping.value = out
}, {immediate: true})

function refresh() {
  refreshCounter.value += 1
}

</script>

<template>
  <h1>Lagger</h1>
  <p>Something something, MALT.</p>
  <input type="text" v-model="indices" />
  <input type="text" placeholder="search" v-model="search" debounce="500" />
  <button @click="refresh">refresh</button>
  <table>
    <tr v-for="(p, k) in mapping">
      <td>{{ k }}</td>
      <td>{{ p.type }}</td>
      <td><input type="checkbox" :value="k" v-model="columns" /></td>
    </tr>
  </table>
  <table>
    <template v-if="columns.length == 0">
      <tr v-for="h in hits">
        <td>{{ h._source }}</td>
      </tr>
    </template>
    <template v-else>
      <tr v-for="h in hits">
        <td v-for="c in columns">{{ h._source[c] }}</td>
      </tr>
    </template>
  </table>
</template>

<style scoped></style>
