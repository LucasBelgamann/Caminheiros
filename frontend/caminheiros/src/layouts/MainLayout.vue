<template>
  <div class="header-container">
    <div class="header">
      <div>
        <h5>Olá,</h5>
        <h2>Leonardo</h2>
      </div>
      <div>
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const darkMode = ref(false);
    const $q = useQuasar();
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
    });
    return {
      darkMode,
      toggleDarkMode,
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

.header-container {
  width: 50%;
  margin: auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18vh;
}

.header h2,
h5 {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 25px;
}

.header h5 {
  font-weight: 100;
  font-size: 23px;
}

.header h2 {
  font-family: "Inter", sans-serif;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 2px;
}

.mode-btn {
  margin-right: 20px;
  border: none;
  border-radius: 50%;
  padding: 5px;
  color: white;
}

.dark-theme {
  background-color: #1f1b24;
}

.ligth-theme {
  background-color: #262626;
}
</style>
