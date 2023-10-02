<template>
  <SearchHistory />
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import SearchHistory from '../components/SearchHistory.vue';
import { useQuasar } from 'quasar';

const data: {
  darkMode: boolean;
} = reactive({
  darkMode: false,
});
const $q = useQuasar();

onMounted(() => {
  const darkModeIsActive = localStorage.getItem('darkMode');
  if (darkModeIsActive) {
    data.darkMode = darkModeIsActive === 'true';
    $q.dark.set(data.darkMode);
  } else {
    $q.dark.set(false);
  }
});
</script>

<style lang="scss"></style>
