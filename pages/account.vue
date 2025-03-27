<template>
  <div class="cnt flex-1 p-4">
    <div class="wrap grid place-items-center gap-4">
      <div class="filter-cnt border border-gray-700 p-4">
        <TheTableFilters v-model:filters="filters" :items="items" />
      </div>
      <div class="table-cnt w-[80vw] h-[calc(100dvh-350px)] border border-gray-700">
        <TheTable v-if="items" :data="items" :filters="filters" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";
// import { CalendarDate } from "@internationalized/date";
import TheTableFilters from "~/components/TheTableFilters.vue";

import type { TableItem } from "~/types";

definePageMeta({
  layout: "logged-in",
  middleware: "authenticated",
});

const store = useMainStore();

const { setItems } = store;
const { items } = storeToRefs(store);

const filters = ref({
  dateFilter: undefined,
  tagFilter: [],
});

const { data } = await useFetch("/api/data");

const itemsToSet = data.value?.items as TableItem[];

setItems(itemsToSet);
</script>
