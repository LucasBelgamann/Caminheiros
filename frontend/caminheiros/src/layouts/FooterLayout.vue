<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer bordered :class="darkMode ? 'bg-footer' : 'bg-white'"
      style="height: 4vh; display: flex; align-items: center; justify-content: center;">
      <p style="font-size: 10px; margin: 0;" :class="darkMode ? 'text-white' : 'text-black'">&copy; 2023 Caminheiros do
        Bem
        &mdash; Developed by Lucas Agostinho</p>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";

const darkMode = ref(false);
const $q = useQuasar();

watch(darkMode, (darkMode) => {
  $q.dark.set(darkMode);
  $q.localStorage.set("darkMode", darkMode);
});

onMounted(() => {
  const darkModeIsActive = localStorage.getItem("darkMode");
  if (darkModeIsActive) {
    darkMode.value = darkModeIsActive === "__q_bool|1";
    $q.dark.set(darkMode.value);
  } else {
    $q.dark.set(false);
  }
});
</script>

<style lang="scss">
.bg-footer {
  background-color: #121517;
}
</style>
