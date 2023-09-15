<template>
  <SearchHistory />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import SecondHeader from "../components/SecondHeader.vue";
import SearchHistory from "../components/SearchHistory.vue";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const darkMode = ref(false);
    const $q = useQuasar();

    onMounted(() => {
      const darkModeIsActive = localStorage.getItem("darkMode");
      if (darkModeIsActive) {
        darkMode.value = darkModeIsActive === "true";
        $q.dark.set(darkMode.value);
      } else {
        $q.dark.set(false);
      }
    });
    return {};
  },
  components: { SecondHeader, SearchHistory },
  computed: {
    mode: function () {
      return this.$q.dark.isActive;
    },
  },
});
</script>

<style lang="scss"></style>
