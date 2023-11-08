<template>
  <div class="q-form-login-container">
    <div class="q-gutter-md">
      <q-input standout clearable filled v-model="data.name" label="Nome" />

      <q-input standout clearable filled v-model="data.phone" label="Telefone" fill-mask mask="(##) #####-####" />

      <q-input type="email" standout clearable filled v-model="data.email" label="E-mail" />

      <q-input v-model="data.password" label="Senha" clearable filled :type="data.isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon :name="data.isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
            @click="data.isPwd = !data.isPwd" />
        </template>
      </q-input>

      <q-select v-if="data.role !== 'Administrador'" filled v-model="data.typeUser" :options="data.options"
        label="Tipo do usuário" class="in-register"
        :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'" />

      <div class="row justify-center">
        <q-btn label="Cadastrar" :disable="data.disable" @click="handleCadastro" :class="mode
          ? 'q-card-color-secondary-dark-card'
          : 'q-card-color-secondary-light-card'
          " />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import axios from 'axios';
import { computed, onMounted, reactive } from 'vue';

const $q = useQuasar();

const data: {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  isPwd: boolean;
  darkMode: boolean;
  typeUser: string;
  options: string[];
  disable: boolean;
} = reactive({
  name: '',
  phone: '',
  email: '',
  password: '',
  role: '',
  isPwd: true,
  darkMode: false,
  typeUser: '',
  options: ['Participante', 'Facilitador', 'Administrador'],
  disable: false,
});

const mode = computed(() => $q.dark.isActive);

const handleCadastro = async () => {
  const newUser = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    password: data.password,
    role: data.role === '' ? 'Participante' : data.role,
  };


  try {
    await axios.post('http://localhost:3001/users/create-user', newUser);
    console.log('User created successfully!');
    data.name = '';
    data.phone = '';
    data.email = '';
    data.password = '';
    data.role = '';
    data.typeUser = '';
    $q.notify({
      type: 'positive',
      message: 'Usuário criado com sucesso!',
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    if (error.response && error.response.data) {
      $q.notify({
        type: 'negative',
        message: error.response.data.message,
      });
    }
  }
};


onMounted(() => {
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
