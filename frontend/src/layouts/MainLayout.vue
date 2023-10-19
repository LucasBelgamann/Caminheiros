<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="row justify-around" :style="{ backgroundColor: mode ? '#121212' : 'white' }">
      <q-toolbar class="q-toolbar-class">
        <q-toolbar-title v-if="$route.path !== '/home' && $route.path !== '/data' && $route.path !== '/user'">
          <span :class="mode ? 'text-white' : 'text-black'" class="text-weight-thin">Grupo,</span><br />
          <span :class="mode ? 'text-white' : 'text-black'" class="text-weight-medium">{{ data.groupName }}</span>
        </q-toolbar-title>

        <q-toolbar-title v-else>
          <span :class="mode ? 'text-white' : 'text-black'" class="text-weight-thin">Olá,</span><br />
          <span :class="mode ? 'text-white' : 'text-black'" class="text-weight-medium">{{ data.userName }}</span>
        </q-toolbar-title>

        <q-btn v-if="$route.path !== '/home' && $route.path !== '/user'" style="padding: 10px" dense round
          icon="chevron_left" :class="mode
            ? 'q-card-color-primary-dark-card'
            : 'q-card-color-primary-light-card'
            " aria-label="Menu" :to="data.role === 'Participante' ? '/user' : '/home'" />

        <q-btn v-else style="padding: 10px" dense round icon="menu" :class="mode
          ? 'q-card-color-primary-dark-card'
          : 'q-card-color-primary-light-card'
          " aria-label="Menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="data.rightDrawerOpen" show-if-above bordered side="right">
      <q-list>
        <q-item-label header> Barra de Navegação </q-item-label>
        <div :class="mode
          ? 'q-card-color-primary-dark-card'
          : 'q-card-color-primary-light-card'
          ">
          <q-toggle v-model="darkMode" color="secondary" checked-icon="light_mode" unchecked-icon="mode_night" />
        </div>
        <q-item v-if="data.role === 'Administrador' || data.role === 'Facilitador'" clickable to="/register-group">
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Criar um novo Grupo</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/data">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Meus dados</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="data.role === 'Administrador' || data.role === 'Facilitador'" clickable to="/notifications">
          <q-item-section avatar>
            <q-icon name="notifications" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Avisos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="handleLogout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-footer reveal :class="mode
      ? 'q-card-color-primary-dark-card'
      : 'q-card-color-primary-light-card'
      " class="text-overline">
      <q-toolbar>
        <q-toolbar-title class="text-center" style="font-size: 10px">
          &copy; 2023 Caminheiros do Bem &mdash; Developed by Lucas
          Agostinho</q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useQuasar } from 'quasar';

const data: {
  userName: string;
  groupName: string;
  role: string;
  rightDrawerOpen: boolean;
} = reactive({
  userName: '',
  groupName: '',
  role: '',
  rightDrawerOpen: false,
});

const $q = useQuasar();
const darkMode = ref(false);

const handleLogout = () => {
  localStorage.removeItem('userData');
  window.location.href = '/';
};

const mode = computed(() => $q.dark.isActive);

function toggleRightDrawer() {
  data.rightDrawerOpen = !data.rightDrawerOpen;
}

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

  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    if (userData.name) {
      const firstName = userData.name.split(' ')[0];
      data.groupName = userData.groupName;
      data.userName = firstName;
      data.role = userData.role;
    }
  }
});
</script>

<style lang="scss">
.q-toolbar-class {
  width: 30vw;
  height: 15vh;
}

@media (max-width: $breakpoint-xs-max) {
  .q-toolbar-class {
    width: 90vw;
    height: 20vh;
  }
}
</style>
