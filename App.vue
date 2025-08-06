<script setup lang="ts">
import {ref, watch} from "vue"
import {debouncedRef} from "@/debouncedRef"
import { SearchResponseSchema} from "@/elasticsearch"

const indices = debouncedRef("vector-*", 1000)
const search = debouncedRef("", 1000)
const result = ref([])

watch([search, indices], async () => {
  result.value = await fetch(`${window.config.elasticsearch_url}/${indices.value}/_search`, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: {
        query_string: {
          query: search.value,
        },
      },
    }),
  }).then(res => res.json())
  .then(body => SearchResponseSchema.parse(body))
  .then(res => res.hits.hits)
})
</script>

<template>
  <h1>Lagger</h1>
  <p>Something something, MALT.</p>
  <input type="text" v-model="indices" />
  <input type="text" placeholder="search" v-model="search" debounce="500" />
  <table>
    <tr v-for="r in result">
      <td>{{ r._source }}</td>
    </tr>
  </table>
</template>

<style scoped></style>
