<template>
  <div class="participants-container">
    <h4>Participantes</h4>
    <div
      class="user-line"
      :class="mode ? 'default-card-color-ligth' : 'default-card-color-dark'"
    ></div>
    <div class="users-container">
      <div
        class="user-link"
        :class="mode ? 'default-card-color-dark' : 'default-card-color-ligth'"
        v-for="user in users"
      >
        <h6>{{ user.name }}</h6>
        <q-icon name="navigate_next" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      users: [
        {
          name: "José",
        },
        {
          name: "Pedro",
        },
        {
          name: "Socrates",
        },
        {
          name: "Platão",
        },
        {
          name: "José",
        },
        {
          name: "Pedro",
        },
        {
          name: "Socrates",
        },
        {
          name: "Platão",
        },
        {
          name: "José",
        },
      ],
    };
  },

  computed: {
    mode: function () {
      return this.$q.dark.isActive;
    },
  },
});
</script>

<style lang="scss">
.participants-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: flex-start;
  width: 50%;
}

.participants-container h4 {
  font-weight: 400;
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 5px;
}

.user-line {
  height: 1px;
  width: 100%;
  margin-bottom: 10px;
}

.users-container {
  display: flex;
  flex-direction: column;
  height: 24vh;
  width: 100%;
  overflow-y: scroll;
}

.user-link {
  color: white;
  border-radius: 10px;
  cursor: pointer;
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-link h6 {
  margin: 15px;
  font-weight: 300;
}

.user-link i {
  font-size: 30px;
  margin-right: 15px;
}

@media screen and (max-width: 599.99px) {
  .participants-container {
    width: 90%;
  }

  .participants-container h4 {
    font-size: 20px;
  }
}
</style>
