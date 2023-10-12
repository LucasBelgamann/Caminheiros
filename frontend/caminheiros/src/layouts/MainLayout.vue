<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      v-if="
        route.path === '/Edit' ||
        route.path === '/History' ||
        route.path === '/Notifications' ||
        route.path === '/Inactive-users'
      "
      :class="darkMode ? 'bg-footer' : 'bg-white'"
      style="
        height: 15vh;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <q-toolbar style="width: 90vw">
        <q-toolbar-title class="header-title">
          <h5 :class="darkMode ? 'text-white' : 'text-black'">Grupo,</h5>
          <h2>{{ data.groupName }}</h2>
        </q-toolbar-title>
        <q-btn
          style="padding: 10px; font-size: 20px"
          :class="darkMode ? 'dark-theme' : 'ligth-theme'"
          flat
          :to="
            data.role === 'Administrador' || data.role === 'Facilitador' ? '/Home' : '/User'
          "
          round
          dense
          icon="chevron_left"
        />
      </q-toolbar>
    </q-header>

    <q-header
      v-else
      :class="darkMode ? 'bg-footer' : 'bg-white'"
      style="
        height: 15vh;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <q-toolbar style="width: 90vw">
        <q-toolbar-title class="header-title">
          <h5 :class="darkMode ? 'text-white' : 'text-black'">Olá,</h5>
          <h2>{{ data.userName }}</h2>
        </q-toolbar-title>
        <q-btn
          style="padding: 10px"
          :class="darkMode ? 'dark-theme' : 'ligth-theme'"
          flat
          @click="data.drawer = !data.drawer"
          round
          dense
          icon="menu"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      side="right"
      v-model="data.drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
    >
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

          <q-item
            v-if="data.role === 'Administrador'"
            to="/CreateGroup"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>

            <q-item-section> Criar um novo Grupo </q-item-section>
          </q-item>

          <q-item to="/Edit" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section> Meus Dados </q-item-section>
          </q-item>

          <q-item
            v-if="data.role === 'Administrador' || data.role === 'Facilitador'"
            to="/Notifications"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="notifications" />
            </q-item-section>

            <q-item-section> Avisos </q-item-section>
          </q-item>

          <q-item @click="handleLogout" clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="negative" name="logout" />
            </q-item-section>

            <q-item-section style="color: #c10015"> Sair </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer
      bordered
      :class="darkMode ? 'bg-footer' : 'bg-white'"
      style="
        height: 4vh;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <p
        style="font-size: 10px; margin: 0"
        :class="darkMode ? 'text-white' : 'text-black'"
      >
        &copy; 2023 Caminheiros do Bem &mdash; Developed by Lucas Agostinho
      </p>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

const data: {
  userName: string;
  groupName: string;
  role: string;
  drawer: boolean;
} = reactive({
  userName: '',
  groupName: '',
  role: '',
  drawer: ref(false),
});

const $q = useQuasar();
const route = useRoute();
const darkMode = ref(false);

const handleLogout = () => {
  localStorage.removeItem('userData');
  window.location.href = '/';
};

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  data.drawer = !data.drawer;
};

watch(darkMode, (darkMode) => {
  $q.dark.set(darkMode);
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
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
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #61717d;
}

.bg-footer {
  background-color: #121517;
}

.dark-theme {
  background-color: #262c30;
}

.ligth-theme {
  background-color: #314B68;
}

.white-text {
  color: white;
}

.black-text {
  color: black;
}
</style>
