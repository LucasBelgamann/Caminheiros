<template>
  <ActiveListCard />
  <UserCards />
  <History />
  <Participantes />
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import UserCards from '../components/UserCards.vue';
import History from '../components/History-comp.vue';
import Participantes from '../components/Participants-list.vue';
import ActiveListCard from '../components/ActiveListCard.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const data: {
  darkMode: boolean;
} = reactive({
  darkMode: false,
});

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
