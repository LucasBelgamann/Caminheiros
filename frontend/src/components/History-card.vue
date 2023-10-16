<template>
  <q-card @click="irParaOutraRota" :class="mode ? 'q-card-color-primary-dark-card' : 'q-card-color-primary-light-card'"
    flat class="q-card-history-class row justify-between items-center">
    <div>
      <q-icon name="history" class="q-icon-history-class" />
      <span>Histórico</span>
    </div>
    <div>
      <q-icon name="chevron_right" flat class="q-btn-card-history-class" />
    </div>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const darkMode = ref(false);
const $router = useRouter();

const mode = computed(() => $q.dark.isActive);

const irParaOutraRota = () => {
  $router.push('/history');
};

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
})
</script>

<style lang="scss">
.q-card-history-class {
  width: 30vw;
  height: 15vh;
  margin: 20px auto;
  border-radius: 15px;
}

.q-btn-card-history-class {
  border-radius: 10px;
  font-size: 80px;
  margin-right: 10px;
}

.q-icon-history-class {
  font-size: 70px;
  margin: 0 15px;
}

@media (max-width: $breakpoint-xs-max) {
  .q-card-history-class {
    width: 90vw;
    height: 12vh;
    margin: 15px auto;
  }

  .q-btn-card-history-class {
    width: 13vw;
  }

  .q-icon-history-class {
    font-size: 50px;
  }

  .q-btn-card-history-class {
    border-radius: 10px;
    font-size: 60px;
  }
}
</style>
