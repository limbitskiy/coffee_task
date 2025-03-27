<template>
  <UTable :data="data" class="flex-1 h-full" :column-filters="columnFilters" :columns="columns" sticky />
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { DateFilter, TableItem } from "~/types";

const props = defineProps<{
  data: TableItem[];
  filters: {
    dateFilter?: DateFilter;
    tagFilter: string[];
  };
}>();

const UBadge = resolveComponent("UBadge");
const UIcon = resolveComponent("UIcon");

const columnFilters = computed(() => [
  {
    id: "date_created",
    value: props.filters.dateFilter,
  },
  {
    id: "tags",
    value: props.filters.tagFilter,
  },
]);

const columns: TableColumn<TableItem>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "date_created",
    header: "Дата создания",
    cell: ({ row }) => {
      return new Date(row.getValue("date_created")).toLocaleString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
    filterFn: (row) => {
      if (!props.filters.dateFilter) return true;

      const { start, end } = props.filters.dateFilter;

      if (!start && !end) return true;

      const value = row.getValue("date_created") as string;
      const startDate = new Date(start.year, start.month - 1, start.day);
      const endDate = new Date(end.year, end.month - 1, end.day);
      const rowDate = new Date(value);

      return compareDates(rowDate, startDate, endDate) ?? true;
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const color = {
        active: "success" as const,
        inactive: "error" as const,
      }[row.getValue("status") as string];

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () => row.getValue("status"));
    },
  },
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "category",
    header: "Категория",
    cell: ({ row }) => {
      return h("div", { class: "text-center font-bold text-xl" }, row.getValue("category"));
    },
  },
  {
    accessorKey: "tags",
    header: "Тэги",
    cell: ({ row }) => {
      const colors: Record<string, string> = {
        sale: "success",
        limited: "warning",
        exclusive: "error",
        new: "info",
        popular: "neutral",
      };
      const values = row.getValue("tags") as string[];
      const badges = values.map((tag) => h(UBadge, { class: "", variant: "soft", color: colors[tag] }, tag));
      return h("div", { class: "flex gap-2" }, badges);
    },
    filterFn: (row) => {
      if (!props.filters.tagFilter.length) return true;

      const values = row.getValue("tags") as string[];

      if (values.some((value) => props.filters.tagFilter.includes(value))) {
        return true;
      }
      return false;
    },
  },
  {
    accessorKey: "isAvailable",
    header: () => h("div", { class: "text-center" }, "Доступно"),
    cell: ({ row }) => {
      const icon = {
        true: "material-symbols:check" as const,
        false: "iconamoon:sign-times-circle-light" as const,
      }[row.getValue("isAvailable") as string];
      const color = {
        true: "text-green-400" as const,
        false: "text-red-400" as const,
      }[row.getValue("isAvailable") as string];

      return h("div", { class: "text-center" }, h(UIcon, { name: icon, class: [color, "text-center"], size: 20 }));
    },
  },
  {
    accessorKey: "price",
    header: () => h("div", { class: "text-right" }, "Цена"),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
      }).format(price);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
];
</script>
