<template>
  <div class="q-container-users-cards">
    <q-card @click="irParaOutraRota"
      :class="mode ? 'q-card-color-secondary-dark-card' : 'q-card-color-secondary-light-card'" flat
      class="q-card-user-class">
      <q-card-section>
        <span class="text-caption" style="font-weight: 100;">Novo</span><br>
        <span class="text-h6">Participante</span>
      </q-card-section>
      <q-icon name="person_add" style="position: absolute; right: 9px; bottom: 9px; font-size: 35px;" />
    </q-card>
    <q-card @click="irParaRotaInactives"
      :class="mode ? 'q-card-color-secondary-dark-card' : 'q-card-color-secondary-light-card'" flat
      class="q-card-user-class">
      <q-card-section>
        <span class="text-caption" style="font-weight: 100;">Participantes</span><br>
        <span class="text-h6">Inativos</span>
      </q-card-section>
      <q-icon name="error" style="position: absolute; right: 9px; bottom: 9px; font-size: 35px;" />
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const $router = useRouter();
const darkMode = ref(false);

const mode = computed(() => $q.dark.isActive);

const irParaOutraRota = () => {
  $router.push('/Register');
};

const irParaRotaInactives = () => {
  $router.push('/inactives');
};

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
.q-container-users-cards {
  width: 30vw;
  display: flex;
  justify-content: space-between;
  margin: auto;
}

.q-card-user-class {
  width: 14.5vw;
  height: 15vh;
  margin-top: 15px;
  border-radius: 15px;
}

.q-card-user-class span {
  font-size: 14px;
}

@media (max-width: $breakpoint-xs-max) {
  .q-container-users-cards {
    width: 90vw;
  }

  .q-card-user-class {
    position: relative;
    width: 43vw;
    height: 16vh;
    border-radius: 15px;
  }
}
</style>
