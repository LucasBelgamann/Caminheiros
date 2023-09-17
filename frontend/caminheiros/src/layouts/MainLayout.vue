<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="route.path === '/Edit' || route.path === '/History' || route.path === '/Notifications'" :class="darkMode ? 'bg-footer' : 'bg-white'"
      style="height: 15vh; display: flex; align-items: center; justify-content: center;">
      <q-toolbar style="width: 90vw;">
        <q-toolbar-title class="header-title">
          <h5 :class="darkMode ? 'text-white' : 'text-black'">Grupo, </h5>
          <h2>{{ groupName }}</h2>
        </q-toolbar-title>
        <q-btn style="padding: 10px; font-size: 20px;" :class="darkMode ? 'dark-theme' : 'ligth-theme'" flat
          :to="role === 'admin' || role === 'manager' ? '/Home' : '/User'" round dense icon="chevron_left" />
      </q-toolbar>
    </q-header>

    <q-header v-else :class="darkMode ? 'bg-footer' : 'bg-white'"
      style="height: 15vh; display: flex; align-items: center; justify-content: center;">
      <q-toolbar style="width: 90vw;">
        <q-toolbar-title class="header-title">
          <h5 :class="darkMode ? 'text-white' : 'text-black'">Olá, </h5>
          <h2>{{ userName }}</h2>
        </q-toolbar-title>
        <q-btn style="padding: 10px;" :class="darkMode ? 'dark-theme' : 'ligth-theme'" flat @click="drawer = !drawer"
          round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer side="right" v-model="drawer" show-if-above :width="200" :breakpoint="500">
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item @click="toggleDarkMode" active clickable v-ripple>
            <q-item-section avatar>
              <q-icon :name="darkMode ? 'light_mode' : 'mode_night'" />
            </q-item-section>

            <q-item-section>
              <span v-if="darkMode">Claro</span>
              <span v-else>Escuro</span>
            </q-item-section>
          </q-item>

          <q-item v-if="role === 'manager'" to="/CreateGroup" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>

            <q-item-section>
              Criar um novo Grupo
            </q-item-section>
          </q-item>

          <q-item to="/Edit" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>
              Meus Dados
            </q-item-section>
          </q-item>

          <q-item v-if="role === 'manager'" to="/Notifications" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications" />
            </q-item-section>

            <q-item-section>
              Avisos
            </q-item-section>
          </q-item>

          <q-item @click="handleLogout" clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="negative" name="logout" />
            </q-item-section>

            <q-item-section style="color: #C10015;">
              Sair
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
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
import { useRoute } from "vue-router";

const darkMode = ref(false);
const $q = useQuasar();
const userName = ref("");
const groupName = ref("");
const role = ref("");
const drawer = ref(false);
const route = useRoute();

const handleLogout = () => {
  localStorage.removeItem("userData");
  window.location.href = "/";
};

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  drawer.value = !drawer;
};

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

  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    if (userData.name) {
      const firstName = userData.name.split(" ")[0];
      groupName.value = userData.groupName;
      userName.value = firstName;
      role.value = userData.role;
    }
  }
});
</script>

<style lang="scss">
.header-title h2,
h5 {
  margin-top: 0;
  margin-bottom: 0;
}

.header-title h5 {
  font-weight: 100;
  font-size: 20px;
}

.header-title h2 {
  font-family: "Inter", sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #61717d;
}

.bg-footer {
  background-color: #121517;
}
</style>
