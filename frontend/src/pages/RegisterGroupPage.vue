<template>
  <div class="q-form-login-container">
    <div class="q-gutter-md">
      <q-input standout clearable filled v-model="data.groupName" label="Nome" />

      <q-input standout clearable filled autogrow v-model="data.description" label="Descrição" />
      <q-select filled v-model="data.studyDays" :options="data.daysWeek" label="Dias de estudo"
        :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'" />
      <q-input v-model="data.hour" filled type="time" />
      <q-select filled v-model="data.modality" :options="data.modalityOptions" label="Modalidade"
        :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'" />
      <q-select filled v-model="data.userName" :options="options" label="Facilitadores" class="in-register"
        :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'" use-input input-debounce="300"
        behavior="menu" @filter="filterFn" @update:modelValue="handleUserSelection">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <div class="row justify-center">
        <q-btn label="Cadastrar" :class="mode
          ? 'q-card-color-secondary-dark-card'
          : 'q-card-color-secondary-light-card'
          " @click="handleCreate" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import axios from 'axios';
import { computed, ref, onMounted, reactive } from 'vue';
import { User } from '../interfaces/IUser'

const $q = useQuasar();

const data: {
  users: User[];
  darkMode: boolean;
  groupName: string;
  description: string;
  studyDays: string;
  hour: string;
  modality: string;
  userName: string;
  options: string[];
  daysWeek: string[];
  modalityOptions: string[];
} = reactive({
  users: [],
  darkMode: false,
  groupName: '',
  description: '',
  studyDays: '',
  hour: '',
  modality: '',
  userName: '',
  options: ['Participante', 'Facilitador', 'Administrador'],
  daysWeek: [
    'Domingos',
    'Segundas-feiras',
    'Terças-feiras',
    'Quartas-feiras',
    'Quintas-feiras',
    'Sextas-feiras',
    'Sábados'
  ],
  modalityOptions: ['Online', 'Presencial'],
});

const selectedUserId = ref<number | null>(null);
const mode = computed(() => $q.dark.isActive);

const handleUserSelection = (value: { label: string; value: number }) => {
  selectedUserId.value = value.value;
  data.userName = value.label;
};

const handleCreate = async () => {
  const newGroup = {
    name: data.groupName,
    description: data.description,
    studyDays: data.studyDays,
    hour: data.hour,
    modality: data.modality,
    userId: selectedUserId.value
  };

  try {
    await axios.post('http://localhost:3001/groups/create-group', newGroup);
    console.log('Group created successfully!');
    data.groupName = '';
    data.description = '';
    data.studyDays = '';
    data.hour = '';
    data.modality = '';
    data.userName = '';
    $q.notify({
      type: 'positive',
      message: 'Usuário criado com sucesso!',
    });
  } catch (error: any) {
    console.error('Error creating Group:', error);
    if (error.response && error.response.data) {
      $q.notify({
        type: 'negative',
        message: error.response.data.message,
      });
    }
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/users/');

    const filteredUsers = response.data.filter((user: any) => {
      return user.role === 'Administrador' || user.role === 'Facilitador';
    });

    data.users = Array.from(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const options = ref<Array<{ label: string; value: string }>>([]);
const stringOptions = computed(() => {
  return data.users.map((user) => ({
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
.q-form-login-container {
  margin: 70px auto;
  max-width: 20vw;
}

@media (max-width: $breakpoint-xs-max) {
  .q-form-login-container {
    max-width: 80vw;
  }
}
</style>
