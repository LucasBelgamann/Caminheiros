<template>
  <div class="users-cards-container">
    <div
      class="card-user"
      @click="irParaOutraRota()"
      :class="mode ? 'dark-theme' : 'ligth-theme'"
    >
      <div class="card-user-title">
        <h6>Novo</h6>
        <h4>Usuário</h4>
      </div>
      <q-icon name="add" :color="!mode ? 'white' : 'primary'" />
    </div>
    <div class="card-user" :class="mode ? 'dark-theme' : 'ligth-theme'">
      <div class="card-user-title">
        <h6>Usuários</h6>
        <h4>Inativos</h4>
      </div>
      <q-icon name="warning" class="isInative" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "",

  setup() {
    return {};
  },
  components: {},
  methods: {
    irParaOutraRota() {
      this.$router.push("/Register");
    },
  },
  computed: {
    mode: function () {
      return this.$q.dark.isActive;
    },
  },
});
</script>

<style lang="scss">
.users-cards-container {
  margin: auto;
  width: 50%;
  display: flex;
  justify-content: space-between;
}

.card-user {
  cursor: pointer;
  position: relative;
  background-color: black;
  border-radius: 20px;
  margin-top: 30px;
  width: 24vw;
  height: 25vh;
  transition: transform 0.4s ease-in-out;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
}

.card-user:hover {
  transform: scale(1.02);
}

.card-user-title h6 {
  font-weight: 100;
  font-size: 30px;
  margin: 20px 0;
}

.card-user-title h4 {
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 3px;
  margin: 0;
}

.card-user-title {
  color: white;
  margin: 30px;
}

.card-user i {
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-size: 50px;
}

@media screen and (max-width: 599.99px) {
  .users-cards-container {
    width: 90%;
  }

  .card-user {
    margin-top: 20px;
    width: 43vw;
    height: 18vh;
  }

  .card-user-title {
    margin: 20px;
  }

  .card-user-title h6 {
    font-size: 17px;
    margin: 0;
  }

  .card-user-title h4 {
    font-size: 17px;
    line-height: 20px;
  }

  .card-user i {
    font-size: 30px;
  }
}

.isInative {
  animation: change-color 4s ease-in-out infinite;
}

@keyframes change-color {
  0% {
    color: $warning;
  }
  85% {
    color: $negative;
  }
  100% {
    color: rgb(231, 119, 119);
  }
}

.dark-theme {
  background-color: #262c30;
}

.ligth-theme {
  background-color: #314B68;
}
</style>
