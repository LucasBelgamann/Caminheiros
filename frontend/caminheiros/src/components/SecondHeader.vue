<template>
  <div class="header-second-container">
    <div>
      <h5>Grupo,</h5>
      <h2>{{ groupName }}</h2>
    </div>
    <div>
      <q-btn
        class="arrow-btn"
        :class="darkMode ? 'dark-theme' : 'ligth-theme'"
        icon="arrow_back_ios_new"
        to="/Home"
      >
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
    const groupName = ref<string | null>(null);

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
      const userData = localStorage.getItem("userData");
      if (userData !== null) {
        const user = JSON.parse(userData);
        groupName.value = user.groupName;
      }
    });

    return {
      darkMode,
      toggleDarkMode,
      groupName
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

.header-second-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20vh;
  width: 50%;
  display: flex;
  margin: auto;
}

.header-second-container h2,
h5 {
  margin-top: 0;
  margin-bottom: 0;
}

.arrow-btn {
  border-radius: 50%;
  color: white;
  height: 6vh;
}

.header-second-container h5 {
  font-weight: 100;
  font-size: 30px;
}

.header-second-container h2 {
  font-family: "Inter", sans-serif;
  font-size: 35px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #61717d;
}

@media screen and (max-width: 599.99px) {
  .header-second-container {
    width: 90%;
    height: 20vh;
    margin: auto;
  }
  .header-second-container h5 {
    font-size: 23px;
  }

  .header-second-container h2 {
    font-size: 25px;
  }
}
</style>
