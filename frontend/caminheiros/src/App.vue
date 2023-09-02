<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { onBeforeMount, provide } from 'vue';
import Users from './services/users';

export default {
  name: "App",
  setup() {
    let users;

    onBeforeMount(() => {
      users = new Users();
      provide("users", users);
    })
    return {};
  },
};
</script>
