<template>
  <div class="q-container-inactive-users">
    <div>
      <div style="border-radius: 5px; padding: 10px;" class="row items-center" :class="mode
        ? 'q-card-color-secondary-dark-card'
        : 'q-card-color-secondary-light-card'
        ">
        <q-icon name="error" style="font-size: 40px; margin-right: 30px;" />
        <div class="q-content">
          <span class="text-h5">Participante Inativos</span> <br>
          <span class="text-caption" style="font-size: 10px;">Aqui estão todos os membros do grupo que acumularam um total
            de 6 faltas consecutivas.</span>
        </div>
      </div>
      <q-separator inset style="margin: 10px 0;" />
      <div v-if="data.users.length">
        <div v-for="user in data.users" :key="user.id">
          <q-card style="position: relative; height: 20vh" flat class="q-inactive-user-card"
            :class="mode ? 'q-card-color-primary-dark-card' : 'q-card-color-primary-light-card'">
            <q-card-section class="text-white row items-center"
              :class="mode ? 'q-card-color-primary-dark-card' : 'q-card-color-primary-light-card'">
              <q-icon name="person" style="color: white; margin-right: 15px; font-size: 50px;" />
              <div>
                <span class="text-h6">{{ user.name }}</span><br />
                <span class="text-subtitle2">{{ user.phone }}</span>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right" :class="mode ? 'default-card-color-dark' : 'default-card-color-ligth'
              ">
              <q-btn flat icon="chat" @click="getWhatsAppLink(user.phone)"></q-btn>
              <q-btn flat icon="delete" color="negative"></q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div v-if-else style="
      display: flex;
      justify-content: center;
      height: 20vh;
      align-items: center;
    ">
        <p style="color: #a5a5a5; width: 200px; font-size: 15px" class="text-center">
          Não encontramos nenhum participante que esteja inativo!
        </p>
      </div>
    </div>
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
.q-container-inactive-users {
  width: 30VW;
  margin: auto;
}

.q-inactive-user-card {
  width: 30vw;
  border-radius: 10px;
}

.q-content {
  width: 20vw;
}

@media (max-width: $breakpoint-xs-max) {
  .q-container-inactive-users {
    width: 90VW;
  }

  .q-inactive-user-card {
    width: 90vw;
  }

  .q-content {
    width: 60vw;
  }
}
</style>
