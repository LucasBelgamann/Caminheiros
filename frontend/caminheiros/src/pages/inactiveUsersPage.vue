<template>
  <div style="width: 90vw; margin: 20px auto 0 auto">
    <span
      class="text-h6"
      style="font-size: 15px; line-height: 0; color: #807676"
      >Usuários Inativos</span
    >
    <q-separator
      :class="mode ? 'default-bg-dark' : 'default-bg-ligth'"
      style="width: 90vw; margin: 10px auto"
    />
    <div v-if="data.users.length">
      <div
        style="position: relative; height: 20vh"
        v-for="user in data.users"
        :key="user.id"
      >
        <q-card
          flat
          class="inactive-user-card"
          :class="mode ? 'dark-theme' : 'ligth-theme'"
        >
          <q-card-section
            class="text-white row items-center"
            :class="mode ? 'dark-theme' : 'ligth-theme'"
          >
            <q-icon name="person" style="color: white; margin-right: 15px" />
            <div>
              <span class="text-h6">{{ user.name }}</span
              ><br />
              <span class="text-subtitle2">{{ user.phone }}</span>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions
            align="right"
            :class="
              mode ? 'default-card-color-dark' : 'default-card-color-ligth'
            "
          >
            <q-btn
              @click="getWhatsAppLink(user.phone)"
              flat
              icon="fab fa-whatsapp"
            ></q-btn>
            <q-btn flat icon="delete" color="negative"></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
  <div
    v-if-else
    style="
      display: flex;
      justify-content: center;
      height: 20vh;
      align-items: center;
    "
  >
    <p
      style="color: #a5a5a5; width: 200px; font-size: 15px"
      class="text-center"
    >
      Não encontramos nenhum usuário que esteja inativo!
    </p>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { reactive, ref, computed, onMounted } from 'vue';
import { User } from '../interfaces/IUser';
import { useQuasar } from 'quasar';

const data: {
  darkMode: boolean;
  users: User[];
} = reactive({
  darkMode: ref(false),
  users: [],
});

const $q = useQuasar();

const mode = computed(() => $q.dark.isActive);

const formatPhoneNumber = (phoneNumber: any) => {
  const cleanedNumber = phoneNumber.replace(/\s/g, '').replace(/[\(\)\-]/g, '');

  if (cleanedNumber.startsWith('0')) {
    return cleanedNumber.substring(1);
  }

  return cleanedNumber;
};

const getWhatsAppLink = (phone: any) => {
  const formattedPhone = formatPhoneNumber(phone);

  return `https://wa.me/55${formattedPhone}?text=Olá`;
};

const fetchUsers = async () => {
  const userData = localStorage.getItem('userData');

  if (userData !== null) {
    const user = JSON.parse(userData);
    try {
      const response = await axios.get(
        `http://localhost:3001/users/inactives/${user.groupId}`
      );
      data.users = response.data;
    } catch (error) {
      console.error('Error fetching users of group:', error);
    }
  } else {
    console.error('User data not found in localStorage');
  }
};

onMounted(() => {
  fetchUsers();
  const darkModeIsActive = localStorage.getItem('darkMode');
  if (darkModeIsActive) {
    data.darkMode = darkModeIsActive === 'true';
    $q.dark.set(data.darkMode);
  } else {
    $q.dark.set(false);
  }
});
</script>

<style lang="scss">
.inactive-user-card {
  width: 90vw;
  border-radius: 20px;
  color: white;
}

.inactive-user-card i {
  font-size: 60px;
}

.default-bg-ligth {
  background-color: #646363;
}

.default-bg-dark {
  background-color: #ffffff;
}
</style>
