import type { CalendarDate } from "@internationalized/date";

declare module "#auth-utils" {
  interface User {
    name: string;
  }
}

// declare module "@internationalized/date" {
//   interface DateFormatter {
//     name: string;
//   }
//   interface getLocalTimeZone {
//     name: string;
//   }
// }

interface DateFilter {
  start: CalendarDate;
  end: CalendarDate;
}

interface TableItem {
  id: number;
  status: "active" | "inactive";
  date_created: string;
  name: string;
  category: string;
  price: string;
  isAvailable: boolean;
  tags: string[];
}
