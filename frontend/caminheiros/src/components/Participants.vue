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
              v-model="groupName"
              :options="
                allUsers.map((user) => ({
                  label: user.name,
                  value: user.id.toString(),
                }))
              "
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
          <a
            :href="getWhatsAppLink(user.phone)"
            target="_blank"
            rel="noreferrer"
            ><q-icon
              style="font-size: 30px; color: white; margin: 10px"
              name="fab fa-whatsapp"
          /></a>
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
    const groupName = ref<string | null>(null);

    interface User {
      id: number;
      name: string;
    }

    const fetchUsers = async () => {
      const userData = localStorage.getItem("userData");

      if (userData !== null) {
        const user = JSON.parse(userData);
        try {
          const response = await axios.get(
            `http://localhost:3001/users/groups/${user.groupId}`
          );
          users.value = Array.from(response.data);
        } catch (error) {
          console.error("Error fetching users of group:", error);
        }
      } else {
        console.error("User data not found in localStorage");
      }
    };

    const fetchAllUsers = async () => {
      const userData = localStorage.getItem("userData");

      if (userData !== null) {
        const user = JSON.parse(userData);
        try {
          const response = await axios.get(
            `http://localhost:3001/users/${user.groupId}/user/${user.id}`
          );
          allUsers.value = Array.from(response.data);
        } catch (error) {
          console.error("Error fetching all users:", error);
        }
      } else {
        console.error("User data not found in localStorage");
      }
    };

    const handleUserSelection = (value: { label: string; value: number }) => {
      selectedUserId.value = value.value;
      groupName.value = value.label;
    };

    const addUser = async () => {
      const userData = localStorage.getItem("userData");
      if (selectedUserId.value && userData !== null) {
        const user = JSON.parse(userData);
        await axios.post(
          `http://localhost:3001/users/groups/${user.groupId}/users/${selectedUserId.value}`
        );
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
      handleUserSelection,
      addUser,
      groupName,
    };
  },
  methods: {
    formatPhoneNumber(phoneNumber) {
      const cleanedNumber = phoneNumber
        .replace(/\s/g, "")
        .replace(/[\(\)\-]/g, "");

      if (cleanedNumber.startsWith("0")) {
        return cleanedNumber.substring(1);
      }

      return cleanedNumber;
    },
    getWhatsAppLink(phone) {
      const formattedPhone = this.formatPhoneNumber(phone);

      // Constrói o URL do WhatsApp
      return `https://wa.me/55${formattedPhone}?text=Olá`;
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
.my-card {
  background-color: transparent;
}

.participants-container {
  display: flex;
  height: 35vh;
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

@media screen and (max-width: 599.99px) {
  .participants-container {
    width: 90%;
  }

  .participants-container h4 {
    font-size: 20px;
  }
}
</style>
