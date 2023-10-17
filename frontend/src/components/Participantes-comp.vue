<template>
  <div class="q-container-participants">
    <q-expansion-item expand-separator v-model="expanded" icon="perm_identity" label="Paricipantes" caption="Novo participante no grupo">
      <q-card>
        <q-card-section class="row justify-between items-center">
          <q-select filled v-model="groupName" use-input input-debounce="300" label="Participantes" :options="options"
            @filter="filterFn" @update:modelValue="handleUserSelection" style="width: 230px" behavior="dialog">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-btn push round icon="group_add" :class="mode
            ? 'q-card-color-secondary-dark-card'
            : 'q-card-color-secondary-light-card'
            " :disable="disable" @click="addUser" />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-separator inset style="margin: 10px 0;" />
    <q-scroll-area class="q-scroll-participantes-class">
      <q-banner :class="mode
        ? 'q-card-color-secondary-dark-card'
        : 'q-card-color-secondary-light-card'
        " v-for="user in users" :key="user.id" style="margin-bottom: 10px; border-radius: 10px" inline-actions>
        {{ user.name }}
        <template v-slot:action>
          <a style="font-size: 20px;" :href="getWhatsAppLink(user.phone)" target="_blank" rel="noreferrer"><q-icon name="chat" color="green" /></a>
        </template>
      </q-banner>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, computed, inject } from 'vue';
import Users from '../services/users';
import { useQuasar } from 'quasar';

const users = ref<Array<User>>([]);
const allUsers = ref<Array<User>>([]);
const selectedUserId = ref<number | null>(null);
const groupName = ref<string | null>(null);
const expanded = ref(false);
const disable = ref(false);
const usersService = inject('users') as Users;
const $q = useQuasar();

interface User {
  id: number;
  name: string;
  phone: string;
}

const mode = computed(() => $q.dark.isActive);

const fetchUsers = async () => {
  const userData = localStorage.getItem('userData');

  if (userData !== null) {
    const user = JSON.parse(userData);
    try {
      const response = await axios.get(
        `http://localhost:3001/users/groups/${user.groupId}`
      );
      users.value = Array.from(response.data);
    } catch (error) {
      console.error('Error fetching users of group:', error);
    }
  } else {
    console.error('User data not found in localStorage');
  }
};

const fetchAllUsers = async () => {
  const userData = localStorage.getItem('userData');

  if (userData !== null) {
    const user = JSON.parse(userData);
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${user.groupId}/user/${user.id}`
      );
      allUsers.value = Array.from(response.data);
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  } else {
    console.error('User data not found in localStorage');
  }
};

const handleUserSelection = (value: { label: string; value: number }) => {
  selectedUserId.value = value.value;
  groupName.value = value.label;
  if (disable.value && value.label.length) {
    disable.value = false;
  }
};

const addUser = async () => {
  const userData = localStorage.getItem('userData');
  if (groupName.value?.length) {
    if (selectedUserId.value && userData !== null) {
      const user = JSON.parse(userData);
      await axios.post(
        `http://localhost:3001/users/groups/${user.groupId}/users/${selectedUserId.value}`
      );
      fetchUsers();
      fetchAllUsers();
      usersService.fetchMeetings();
      groupName.value = '';
      expanded.value = false;
    }
  } else {
    disable.value = true;
  }
};

const options = ref<Array<{ label: string; value: string }>>([]);
const stringOptions = computed(() => {
  return allUsers.value.map((user) => ({
    label: user.name,
    value: user.id.toString(),
  }));
});

function filterFn(val: any, update: any) {
  if (val === '') {
    update(() => {
      options.value = stringOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.value.filter((user) =>
      user.label.toLowerCase().includes(needle)
    );
  });
}

function formatPhoneNumber(phoneNumber: string) {
  const cleanedNumber = phoneNumber
    .replace(/\s/g, '')
    .replace(/[\(\)\-]/g, '');

  if (cleanedNumber.startsWith('0')) {
    return cleanedNumber.substring(1);
  }

  return cleanedNumber;
};

function getWhatsAppLink(phone: string) {
  const formattedPhone = formatPhoneNumber(phone);

  return `https://wa.me/55${formattedPhone}?text=Olá`;
};

onMounted(() => {
  fetchUsers();
  fetchAllUsers();
});
</script>

<style lang="scss">
.q-scroll-participantes-class {
  height: 15vh;
  width: 30vw;
  margin: auto;
}

.q-container-participants {
  width: 30vw;
  margin: auto;
}

@media (max-width: $breakpoint-xs-max) {
  .q-container-participants {
    width: 90vw;
  }

  .q-scroll-participantes-class {
    width: 90vw;
  }
}
</style>
