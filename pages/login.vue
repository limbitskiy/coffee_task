<template>
  <div class="form-cnt h-full flex-1 grid place-items-center">
    <div class="login-form-wrap flex flex-col gap-4 w-[230px]">
      <div class="title flex items-center gap-4">
        <UIcon name="ph:coffee-bold" size="34" />
        <h1 class="capitalize text-4xl">Cofee task</h1>
      </div>
      <LoginForm @submit="onSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "#auth-utils";

const { fetch: refreshSession } = useUserSession();

const toast = useToast();

async function onSubmit(data: object) {
  try {
    const { user } = await $fetch("/api/login", {
      method: "POST",
      body: data,
    });

    showSuccessToast(user);
  } catch (error) {
    console.error(error);
    showErrorToast();
  } finally {
    await refreshSession();
    await navigateTo("/account");
  }
}

function showSuccessToast(user: User) {
  toast.add({ title: "Успешный вход", description: `Вы успешно вошли в свой аккаунт, ${user.name}`, icon: "material-symbols:check" });
}

function showErrorToast() {
  toast.add({ title: "Ошибка авторизации", description: "Введены неверные данные авторизации. Попробуйте ещё раз", icon: "iconamoon:sign-times-circle-light", color: "error" });
}
</script>
