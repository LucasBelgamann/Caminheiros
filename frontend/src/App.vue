<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount, provide } from 'vue';
import Users from './services/users';

let users;

onBeforeMount(() => {
  users = new Users();
  provide('users', users);
});
</script>
