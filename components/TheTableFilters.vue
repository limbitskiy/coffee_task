<template>
  <div class="table-filters">
    <div class="filters-header flex items-center justify-between gap-4">
      <span>Фильтры:</span>
      <UButton color="neutral" label="Сбросить" variant="soft" icon="material-symbols:cancel-outline" @click="onResetFilters" />
    </div>

    <div class="filter-list flex flex-col gap-2 py-2">
      <div class="w-full flex flex-col gap-1">
        <span class="text-xs">По дате создания:</span>
        <UPopover>
          <UButton class="w-full" color="neutral" variant="subtle" icon="i-lucide-calendar">
            <template v-if="filters.dateFilter?.start">
              <template v-if="filters.dateFilter.end">
                {{ df.format(filters.dateFilter.start.toDate(getLocalTimeZone())) }} - {{ df.format(filters.dateFilter.end.toDate(getLocalTimeZone())) }}
              </template>

              <template v-else>
                {{ df.format(filters.dateFilter.start.toDate(getLocalTimeZone())) }}
              </template>
            </template>
            <template v-else>Выберите дату</template>
          </UButton>

          <template #content>
            <UCalendar v-model="filters.dateFilter" class="p-2" range>
              <template #day="{ day }">
                <UChip :show="!!getColorByDate(day.toDate('UTC'))" :color="getColorByDate(day.toDate('UTC'))" size="2xs">
                  {{ day.day }}
                </UChip>
              </template>
            </UCalendar>
          </template>
        </UPopover>
      </div>

      <div class="select flex flex-col gap-1">
        <span class="text-xs">По тэгам:</span>
        <USelect v-model="filters.tagFilter" value-key="id" multiple :items="statuses" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import type { DateFilter, TableItem } from "~/types";

const filters = defineModel<{ dateFilter?: DateFilter; tagFilter: string[] }>("filters", { default: {} });

const props = defineProps<{
  items: TableItem[];
}>();

const statuses = shallowRef([
  {
    label: "Sale",
    id: "sale",
  },
  {
    label: "Limited",
    id: "limited",
  },
  {
    label: "Exclusive",
    id: "exclusive",
  },
  {
    label: "New",
    id: "new",
  },
  {
    label: "Popular",
    id: "popular",
  },
]);

const df = new DateFormatter("ru-RU", {
  dateStyle: "medium",
});

function getColorByDate(date: Date) {
  const found = props.items.find((item) => new Date(item.date_created).getTime() === date.getTime());

  if (found) {
    return "success";
  }
}

function onResetFilters() {
  filters.value.dateFilter = undefined;
  filters.value.tagFilter = [];
}
</script>
