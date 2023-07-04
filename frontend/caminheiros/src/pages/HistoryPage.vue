<template>
  <SecondHeader />
  <SearchHistory />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SecondHeader from "src/components/SecondHeader.vue";
import SearchHistory from "src/components/SearchHistory.vue";
import Footer from "src/components/Footer.vue";

export default defineComponent({
  setup() {
    return {};
  },
  components: { SecondHeader, SearchHistory, Footer },
  computed: {
    mode: function () {
      return this.$q.dark.isActive;
    },
  },
});
</script>

<style lang="scss">
</style>
