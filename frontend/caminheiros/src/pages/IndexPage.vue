<template>
  <ActiveListCard />
  <UserCards />
  <History />
  <Participantes />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Header from "../components/Header.vue";
import UserCards from "../components/UserCards.vue";
import History from "../components/History.vue";
import Participantes from "../components/Participants.vue";
import ActiveListCard from "../components/ActiveListCard.vue";
import { useQuasar } from "quasar";
import { ref } from "vue";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const $q = useQuasar();
    const darkMode = ref(false);

    onMounted(() => {
      const darkModeIsActive = localStorage.getItem("darkMode");
      if (darkModeIsActive) {
        darkMode.value = darkModeIsActive === "__q_bool|1";
        $q.dark.set(darkMode.value);
      } else {
        $q.dark.set(false);
      }
    });

    return {
      ActiveListCard,
      Header,
      UserCards,
      History,
      Participantes,
    };
  },
  components: {
    ActiveListCard,
    Header,
    UserCards,
    History,
    Participantes,
  },
  computed: {
    mode: function () {
      return localStorage.getItem("darkMode") === "true";
    },
  },
});
</script>
