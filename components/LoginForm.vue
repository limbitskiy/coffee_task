<template>
  <UForm :state="formState" :schema="schema" class="space-y-4" @submit="onSubmit">
    <UFormField label="Логин" name="login">
      <UInput v-model="formState.login" class="w-full" :ui="{ trailing: 'pe-1' }">
        <template v-if="formState.login.length" #trailing>
          <UButton color="neutral" variant="link" size="sm" icon="i-lucide-circle-x" aria-label="Clear input" @click="formState.login = ''" />
        </template>
      </UInput>
    </UFormField>

    <UFormField label="Пароль" name="password">
      <UInput v-model="formState.password" type="password" class="w-full" :ui="{ trailing: 'pe-1' }">
        <template v-if="formState.password?.length" #trailing>
          <UButton color="neutral" variant="link" size="sm" icon="i-lucide-circle-x" aria-label="Clear input" @click="formState.password = ''" />
        </template>
      </UInput>
    </UFormField>

    <UButton class="text-center" type="submit" size="xl" block>Войти</UButton>
  </UForm>
</template>

<script setup lang="ts">
import * as v from "valibot";

const emit = defineEmits<{
  submit: [payload: object];
}>();

const formState = ref({
  login: "",
  password: "",
});

const schema = v.object({
  login: v.pipe(v.string(), v.minLength(1, "Логин должен состоять хотя бы из одного символа")),
  password: v.pipe(v.string(), v.minLength(1, "Пароль должен состоять хотя бы из одного символа")),
});

async function onSubmit() {
  emit("submit", formState.value);
}
</script>
