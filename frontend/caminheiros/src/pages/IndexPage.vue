<template>
  <Header />
  <ActiveListCard />
  <UserCards />
  <History />
  <Participantes />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import UserCards from "../components/UserCards.vue";
import History from "../components/History.vue";
import Participantes from "../components/Participants.vue";
import Footer from "../components/Footer.vue";
import ActiveListCard from '../components/ActiveListCard.vue'

export default defineComponent({
  name: "IndexPage",

  setup() {
    return { ActiveListCard, Header, UserCards, History, Participantes, Footer };
  },
  components: { ActiveListCard, Header, UserCards, History, Participantes, Footer },
});
</script>
