<template>
  <div class="participants-container">
    <q-card class="my-card" flat>
      <q-card-actions>
        <q-card-title
          class="text-h6"
          :class="mode ? 'white-text' : 'black-text'"
          >Participantes</q-card-title
        >

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'add'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />

          <q-card-section class="q-gutter-md">
            <q-select
              v-model="selectedOption1"
              :options="allUsers.map(user => ({ label: user.name, value: user.id.toString() }))"
              label="Participantes"
              @update:modelValue="handleUserSelection"
            />
            <q-btn label="Adicionar" color="secondary" @click="addUser" />
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
    <div
      class="user-line"
      :class="mode ? 'default-card-color-ligth' : 'default-card-color-dark'"
    ></div>
    <div class="users-container">
      <div>
        <p
          class="user-link"
          :class="mode ? 'default-card-color-dark' : 'default-card-color-ligth'"
          v-for="user in users"
          :key="user.id"
        >
          {{ user.name }}
          <q-icon name="navigate_next" />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const users = ref<Array<User>>([]);
    const allUsers = ref<Array<User>>([]);
    const selectedUserId = ref<number | null>(null);

    interface User {
      id: number;
      name: string;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/groups/${1}`
        );
        users.value = Array.from(response.data);
      } catch (error) {
        console.error("Error fetching users of group:", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${1}`);
        allUsers.value = Array.from(response.data);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    const handleUserSelection = (value: { label: string; value: number }) => {
      selectedUserId.value = value.value;
    };

    const addUser = async () => {
      console.log(selectedUserId.value)
      if (selectedUserId.value !== null) {
        await axios.post(`http://localhost:3001/users/groups/${1}/users/${selectedUserId.value}`);
        location.reload();
      }
    };

    onMounted(() => {
      fetchUsers();
      fetchAllUsers();
    });

    return {
      users,
      allUsers,
      expanded: ref(false),
      selectedOption1: null,
      handleUserSelection,
      addUser,
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
.my-card {
  background-color: transparent;
}

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
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  padding: 12px;
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
