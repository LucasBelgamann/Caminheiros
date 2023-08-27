<template>
  <Header />
  <ActiveListCard />
  <UserCards />
  <History />
  <Participantes />
  <Footer />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Header from "../components/Header.vue";
import UserCards from "../components/UserCards.vue";
import History from "../components/History.vue";
import Participantes from "../components/Participants.vue";
import Footer from "../components/Footer.vue";
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
        darkMode.value = darkModeIsActive === "true";
        $q.dark.set(darkMode.value);
      }
    });

    return {
      ActiveListCard,
      Header,
      UserCards,
      History,
      Participantes,
      Footer,
    };
  },
  components: {
    ActiveListCard,
    Header,
    UserCards,
    History,
    Participantes,
    Footer,
  },
  computed: {
    mode: function () {
      return localStorage.getItem("darkMode") === "true";
    },
  },
});
</script>
