<template>
  <div class="header">
    <div>
      <h5>Olá,</h5>
      <h2>{{ userName }}</h2>
    </div>
    <div>
      <q-btn
        class="menu-btn"
        :class="darkMode ? 'dark-theme' : 'ligth-theme'"
        icon="menu"
      >
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <q-btn
              @click="handleLogout"
              style="border-radius: 10px; color: white; background-color: red;"
              icon="logout"
            ></q-btn>

            <q-separator vertical inset class="q-mx-lg" />

            <q-btn
              type="button"
              class="mode-btn"
              :class="darkMode ? 'dark-theme' : 'ligth-theme'"
              @click="toggleDarkMode"
            >
              <q-avatar
                v-model="darkMode"
                :icon="darkMode ? 'light_mode' : 'mode_night'"
              />
            </q-btn>
          </div>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const darkMode = ref(false);
    const $q = useQuasar();
    const userName = ref("");

    const handleLogout = () => {
      localStorage.removeItem("userData");

      window.location.href = "/";
    };

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
    };

    watch(darkMode, (darkMode) => {
      $q.dark.set(darkMode);
      $q.localStorage.set("darkMode", darkMode);
    });

    onMounted(() => {
      const darkModeIsActive = $q.localStorage.getItem("darkMode");
      if (darkModeIsActive) {
        darkMode.value = true;
      }

      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData.name) {
          const firstName = userData.name.split(" ")[0];
          userName.value = firstName;
        }
      }
    });

    return {
      darkMode,
      toggleDarkMode,
      mobileData: ref(true),
      bluetooth: ref(false),
      handleLogout,
      userName
    };
  },
  components: {},
});
</script>

<style lang="scss">
body {
  transition: all;
  transition-duration: 0.4s;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20vh;
  width: 50%;
  display: flex;
  margin: auto;
}

.header h2,
h5 {
  margin-top: 0;
  margin-bottom: 0;
}

.menu-btn {
  border-radius: 50%;
  color: white;
  height: 6vh;
}

.header h5 {
  font-weight: 100;
  font-size: 30px;
}

.header h2 {
  font-family: "Inter", sans-serif;
  font-size: 35px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #61717d;
}

.mode-btn {
  border: none;
  border-radius: 50%;
  padding: 5px;
  color: white;
}

.mode-btn .q-icon {
  font-size: 25px;
}

@media screen and (max-width: 599.99px) {
  .header {
    width: 90%;
    height: 20vh;
    margin: auto;
  }
  .header h5 {
    font-size: 23px;
  }

  .header h2 {
    font-size: 25px;
  }
}
</style>
