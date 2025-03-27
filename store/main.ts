import { defineStore } from "pinia";
import type { TableItem } from "~/types";

export const useMainStore = defineStore("main", () => {
  const state = ref({
    items: <TableItem[]>[],
  });

  const items = computed(() => state.value.items);

  function setItems(items: TableItem[]) {
    state.value.items = items;
  }

  return {
    items,
    setItems,
  };
});
