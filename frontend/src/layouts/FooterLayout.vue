<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      bordered
      class="row items-center background"
      :class="
        mode
          ? 'q-card-color-primary-dark-card'
          : 'q-card-color-primary-light-card'
      "
    >
      <q-toolbar class="row justify-center items-center">
        <img
          src="https://static.wixstatic.com/media/4f4b22_a6ecbef17b754f1b9397c72e87c8aa3a~mv2.png/v1/fill/w_152,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/caminheiros-do-bem-png-branco.png"
        />
      </q-toolbar>
    </q-header>
    <q-footer
      reveal
      :class="
        mode
          ? 'q-card-color-primary-dark-card'
          : 'q-card-color-primary-light-card'
      "
      class="text-overline"
    >
      <q-toolbar>
        <q-toolbar-title class="text-center" style="font-size: 10px">
          &copy; 2023 Caminheiros do Bem &mdash; Developed by Lucas
          Agostinho</q-toolbar-title
        >
      </q-toolbar>
    </q-footer>

    <q-page-sticky
      v-if="$route.path !== '/' && $route.path !== '/groups' && $route.path !== '/password'"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="chevron_left"
        to="/home"
        :class="
          mode
            ? 'q-card-color-secondary-dark-card'
            : 'q-card-color-secondary-light-card'
        "
      />
    </q-page-sticky>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const darkMode = ref(false);

const mode = computed(() => $q.dark.isActive);

watch(darkMode, (newDarkMode) => {
  $q.dark.set(newDarkMode);
  localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
});

onMounted(() => {
  const darkModeIsActive = localStorage.getItem('darkMode');
  if (darkModeIsActive) {
    darkMode.value = darkModeIsActive === 'true';
    $q.dark.set(darkMode.value);
  } else {
    $q.dark.set(false);
  }
});
</script>

<style lang="scss">
.background {
  height: 28vh;
  width: 100vw;
  border-radius: 0 0 50% 50%;
}
</style>
