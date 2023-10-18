<template>
  <q-page>
    <ActiveCardList />
    <UsersCard />
    <HistoryCard />
    <ParticipantesComp />
  </q-page>
</template>

<script setup lang="ts">
import UsersCard from 'src/components/Users-card.vue';
import HistoryCard from 'src/components/History-card.vue';
import ParticipantesComp from 'src/components/Participantes-comp.vue';
import ActiveCardList from 'src/components/Active-card-list.vue';
</script>

<style lang="scss"></style>
