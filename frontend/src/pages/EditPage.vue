<template>
  <div class="q-container-search-history">
    <div>
      <div style="border-radius: 5px; padding: 10px;" class="row items-center" :class="mode
        ? 'q-card-color-secondary-dark-card'
        : 'q-card-color-secondary-light-card'
        ">
        <q-icon name="badge" style="font-size: 40px; margin-right: 30px;" />
        <div style="width: 65vw;">
          <span class="text-h5">Meus dados</span> <br>
          <span class="text-caption" style="font-size: 10px;">Para atualizar qualquer um dos seus dados, basta clicar
            sobre o
            dado que deseja
            modificar.</span>
        </div>
      </div>
      <q-separator inset style="margin: 10px 0;" />
    </div>
    <div v-for="user in data.users" :key="user.id">
      <div class="cursor-pointer text-caption" style="margin-bottom: 10px">
        <q-icon name="person" style="font-size: 25px; margin-right: 10px" />
        {{ data.name === '' ? user.name : data.name }}
        <q-popup-edit v-model="user.name" class="" v-slot="scope">
          <q-input v-model="data.name" dense autofocus counter @keyup.enter="scope.set">
            <template v-slot:append>
              <q-icon name="edit" />
            </template>
          </q-input>
        </q-popup-edit>
      </div>
      <div class="cursor-pointer text-caption" style="margin-bottom: 10px">
        <q-icon name="mail" style="font-size: 25px; margin-right: 10px" />
        {{ data.email === '' ? user.email : data.email }}
        <q-popup-edit v-model="user.email" class="" v-slot="scope">
          <q-input v-model="data.email" :rules="[
            (val) => isEmailValid(val) || 'Endereço de e-mail inválido',
          ]" dense autofocus counter @blur="handleEmailInput(scope)">
            <template v-slot:append>
              <q-icon name="edit" />
            </template>
          </q-input>
        </q-popup-edit>
      </div>
      <div class="cursor-pointer text-caption">
        <q-icon name="phone_iphone" style="font-size: 25px; margin-right: 10px" />
        {{ data.phone === '' ? user.phone : data.phone }}
        <q-popup-edit v-model="user.phone" class="" v-slot="scope">
          <q-input v-model="data.phone" :rules="[
            (val) => isPhoneValid(val) || 'Número de telefone inválido',
          ]" dense autofocus counter @keyup.enter="scope.set">
            <template v-slot:append>
              <q-icon name="edit" />
            </template>
          </q-input>
        </q-popup-edit>
      </div>
    </div>
    <div class="row justify-end">
      <q-btn label="Confirmar" :class="mode
        ? 'q-card-color-primary-dark-card'
        : 'q-card-color-primary-light-card'
        " @click="data.inception = true" />
    </div>
    <q-dialog v-model="data.inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">Atenção!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Tem certeza de que deseja atualizar os dados? Quaisquer novos dados
          inseridos nos campos preenchidos substituirão os dados existentes.
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat color="positive" v-close-popup label="Confirmar" />
          <q-btn flat color="primary" label="Cancelar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { reactive, ref, computed, onMounted } from 'vue';
import { User } from '../interfaces/IUser';
import { useQuasar } from 'quasar';

const data: {
  users: User[];
  label: string;
  darkMode: boolean;
  name: string;
  email: string;
  phone: string;
  inception: boolean;
} = reactive({
  users: [],
  label: 'Click me',
  darkMode: ref(false),
  name: '',
  email: '',
  phone: '',
  inception: false,
});

const $q = useQuasar();

const mode = computed(() => $q.dark.isActive);

const fetchUsers = async () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const user = JSON.parse(userData);
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${user.id}`
      );

      data.users = response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
};

const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleEmailInput = (scope: any) => {
  const { value } = scope;
  if (isEmailValid(value)) {
    data.email = value;
  } else {
    data.email = '';
  }
};

const isPhoneValid = (phone: string) => {
  const phoneRegex = /^\(\d{3}\) \d{5}-\d{4}$/;
  return phoneRegex.test(phone);
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
.q-container-search-history {
  width: 30VW;
  margin: auto;
}

.q-scroll-history-participantes-class {
  height: 22vh;
  width: 25vw;
  margin: auto;
}

.q-search-history input {
  width: 23vw;
}

@media (max-width: $breakpoint-xs-max) {
  .q-container-search-history {
    width: 90VW;
  }

  .q-search-history input {
    width: 65vw;
  }

  .q-scroll-history-participantes-class {
    width: 80vw;
  }
}
</style>