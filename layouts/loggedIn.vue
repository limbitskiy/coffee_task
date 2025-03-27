<template>
  <div class="logged-in-layout flex flex-col h-dvh overflow-hidden">
    <div class="header flex w-full items-center justify-between gap-4 p-4 border-b border-b-gray-700">
      <div class="logo">
        <UIcon name="i-lucide-lightbulb" size="24" />
      </div>
      <div class="end flex items-center gap-8">
        <span>{{ user?.name }}</span>
        <UButton color="error" variant="soft" @click="logout">Выход</UButton>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const toast = useToast();

const { user, clear: clearSession } = useUserSession();

async function logout() {
  await clearSession();
  await navigateTo("/login");
  toast.add({ title: "Успешный выход", description: "Вы вышли из аккаунта", icon: "material-symbols:check" });
}
</script>
