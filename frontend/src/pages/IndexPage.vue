<template>
  <q-page>
    <ActiveCardList />
    <UsersCard />
    <HistoryCard />
    <ParticipantesComp />
  </q-page>
</template>

<script setup lang="ts">
import ListCard from 'src/components/List-card.vue';
import UsersCard from 'src/components/Users-card.vue';
import HistoryCard from 'src/components/History-card.vue';
import ParticipantesComp from 'src/components/Participantes-comp.vue';
import ActiveCardList from 'src/components/Active-card-list.vue';
import Users from '../services/users';
import { inject, onMounted } from 'vue';

const users = inject('users') as Users;

onMounted(() => {
  console.log(users.data.meetings)
})
</script>

<style lang="scss"></style>
