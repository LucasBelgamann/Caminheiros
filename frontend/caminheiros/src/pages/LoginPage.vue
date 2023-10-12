<template>
  <div
    class="background"
    :class="
      data.darkMode ? 'default-card-color-dark' : 'default-card-color-ligth'
    "
  >
    <img
      src="https://static.wixstatic.com/media/4f4b22_a6ecbef17b754f1b9397c72e87c8aa3a~mv2.png/v1/fill/w_152,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/caminheiros-do-bem-png-branco.png"
    />
  </div>
  <div class="form-login">
    <q-input
      class="in-email"
      :class="
        data.darkMode ? 'default-input-color-dark' : 'default-input-color-ligth'
      "
      clearable
      filled
      color="primary"
      v-model="data.email"
      label="E-mail"
    />
    <q-input
      :type="data.isPwd ? 'password' : 'text'"
      class="in-pass"
      :class="
        data.darkMode ? 'default-input-color-dark' : 'default-input-color-ligth'
      "
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
    <span class="error-response" v-if="data.errorMessage">{{
      data.errorMessage
    }}</span>
    <q-btn
      @click="handleLogin"
      class="login-btn"
      color="secondary"
      label="Entrar"
    />
    <span class="forgot-pass">Esqueceu a senha?</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

const data: {
  password: string;
  email: string;
  errorMessage: string;
  darkMode: boolean;
  isPwd: boolean;
} = reactive({
  password: '',
  email: '',
  errorMessage: '',
  darkMode: false,
  isPwd: true,
});

const $q = useQuasar();

const handleLogin = async () => {
  const user = {
    email: data.email,
    password: data.password,
  };

  try {
    const response = await axios.post(
      'http://localhost:3001/users/login/auth',
      user
    );

    localStorage.setItem('userData', JSON.stringify(response.data));

    window.location.href = '/groups';
  } catch (error: any) {
    console.error('Erro no login:', error);
    if (error.response && error.response.data) {
      data.errorMessage = error.response.data.message;
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
.background {
  height: 33vh;
  width: 100vw;
  border-radius: 0 0 50% 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.in-pass {
  width: 20vw;
  background-color: #e9edf1;
  margin-bottom: 20px;
}

.in-email {
  width: 20vw;
  margin: 40px auto 20px auto;
  background-color: #e9edf1;
}

.form-login {
  height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-btn {
  padding: 10px 35px;
  border-radius: 10px;
}

.forgot-pass {
  color: #aaaaaa;
  text-decoration: underline;
  margin-top: 15px;
  cursor: pointer;
}

.error-response {
  color: rgb(255, 0, 0);
  margin-bottom: 10px;
}

@media screen and (max-width: 599.99px) {
  .in-pass {
    width: 80vw;
  }

  .in-email {
    margin: 40px auto 20px auto;
    width: 80vw;
  }
}

.default-card-color-ligth {
  background-color: #182634;
}

.default-card-color-dark {
  background-color: #000000;
}

.default-input-color-ligth {
  background-color: #dbdbdb;
}

.default-input-color-dark {
  background-color: #3b3a3a;
}
</style>
