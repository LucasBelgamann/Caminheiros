<template>
  <Header />
  <ListCard />
  <UserCards />
  <History />
  <Participantes />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListCard from "src/components/listCard.vue";
import Header from "src/components/Header.vue";
import UserCards from "src/components/UserCards.vue";
import History from "src/components/History.vue";
import Participantes from "src/components/Participants.vue";
import Footer from "src/components/Footer.vue";

export default defineComponent({
  name: "IndexPage",

  setup() {
    return { ListCard, Header, UserCards, History, Participantes, Footer };
  },
  components: { ListCard, Header, UserCards, History, Participantes, Footer },
});
</script>
