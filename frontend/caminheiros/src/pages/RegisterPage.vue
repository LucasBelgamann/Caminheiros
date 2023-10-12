<template>
  <div
    class="background"
    :class="mode ? 'default-card-color-dark' : 'default-card-color-ligth'"
  >
    <q-btn
      class="arrow-btn-header"
      :class="mode ? 'dark-theme' : 'ligth-theme'"
      icon="arrow_back_ios_new"
      to="/Home"
    />
    <img
      src="https://static.wixstatic.com/media/4f4b22_a6ecbef17b754f1b9397c72e87c8aa3a~mv2.png/v1/fill/w_152,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/caminheiros-do-bem-png-branco.png"
    />
  </div>
  <div class="form-login">
    <q-input
      class="in-register"
      :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'"
      clearable
      filled
      color="primary"
      v-model="data.nome"
      label="Nome"
    />
    <q-input
      class="in-register"
      :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'"
      clearable
      filled
      color="primary"
      v-model="data.telefone"
      label="Telefone"
    />
    <q-input
      class="in-register"
      :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'"
      clearable
      filled
      color="primary"
      v-model="data.email"
      label="E-mail"
    />
    <q-input
      :type="data.isPwd ? 'password' : 'text'"
      class="in-register"
      :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'"
      clearable
      filled
      color="primary"
      v-model="data.password"
      label="Senha"
    >
      <template v-slot:append>
        <q-icon
          :name="data.isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="data.isPwd = !data.isPwd"
        />
      </template>
    </q-input>

    <q-select
      filled
      v-model="data.typeUser"
      :options="data.options"
      v-if="data.role === 'Administrador'"
      label="Tipo do usuário"
      class="in-register"
      :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'"
    />
    <q-btn
      to="/Home"
      @click="handleCadastro"
      class="login-btn"
      color="secondary"
      label="Cadastrar"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

const data: {
  password: string;
  email: string;
  nome: string;
  nomeGrupo: string;
  telefone: string;
  typeUser: string;
  role: string;
  isPwd: boolean;
  darkMode: boolean;
  options: string[];
} = reactive({
  password: '',
  email: '',
  nome: '',
  nomeGrupo: '',
  telefone: '',
  typeUser: '',
  role: '',
  isPwd: true,
  darkMode: false,
  options: ['Participante', 'Facilitador', 'Administrador'],
});

const $q = useQuasar();

const mode = computed(() => $q.dark.isActive);

const handleCadastro = async () => {
  const newUser = {
    name: data.nome,
    phone: data.telefone,
    email: data.email,
    password: data.password,
    role: data.role === '' ? 'Participante' : data.role,
  };
  try {
    if (!newUser) {
      console.log('não foi possivel');
    }
    await axios.post('http://localhost:3001/users/create-user', newUser);
    console.log('User created successfully!');
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

onMounted(() => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    if (userData.role) {
      const roleUser = userData.role;
      data.role = roleUser;
    }
  }
});
</script>

<style lang="scss">
.background {
  height: 35vh;
  width: 100vw;
  border-radius: 0 0 50% 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.in-register {
  width: 20vw;
  background-color: #e9edf1;
  margin: 10px 0;
}

.form-login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-btn {
  margin-top: 20px;
  border-radius: 10px;
}

.arrow-btn-header {
  border-radius: 50%;
  color: white;
  height: 6vh;
  position: absolute;
  top: 10px;
  right: 10px;
}

@media screen and (max-width: 599.99px) {
  .in-register {
    width: 80vw;
  }

  .form-login {
    height: 40vh;
  }
}

.default-input-color-ligth {
  background-color: #dbdbdb;
}

.default-input-color-dark {
  background-color: #3b3a3a;
}

.default-card-color-ligth {
  background-color: #182634;
}

.default-card-color-dark {
  background-color: #000000;
}

.dark-theme {
  background-color: #262c30;
}

.ligth-theme {
  background-color: #314b68;
}
</style>
