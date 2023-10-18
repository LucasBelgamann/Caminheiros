<template>
  <div class="q-form-login-container">
    <div class="q-gutter-md">
      <q-input standout clearable filled v-model="data.email" label="E-mail" />

      <q-input
        v-model="data.password"
        label="Senha"
        clearable
        filled
        :type="data.isPwd ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="data.isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="data.isPwd = !data.isPwd"
          />
        </template>
      </q-input>


        <q-dialog v-model="data.alert">
          <q-card flat>
            <q-card-section>
              <div class="text-h6" style="color: #C10015;">Erro</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              {{ data.errorMessage }}
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      <div style="margin: 20px auto; text-align: center">
        <span>Esqueceu sua senha?</span>
      </div>

      <div class="row justify-center">
        <q-btn
          label="Entrar"
          :class="
            mode
              ? 'q-card-color-secondary-dark-card'
              : 'q-card-color-secondary-light-card'
          "
          @click="handleLogin"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import axios from 'axios';
import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const $router = useRouter();

const data: {
  password: string;
  email: string;
  errorMessage: string;
  darkMode: boolean;
  isPwd: boolean;
  alert: boolean;
} = reactive({
  password: '',
  email: '',
  errorMessage: '',
  darkMode: false,
  isPwd: true,
  alert: false
});

const mode = computed(() => $q.dark.isActive);

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

    $router.push('/groups');
  } catch (error: any) {
    console.error('Erro no login:', error);
    if (error.response && error.response.data) {
      data.errorMessage = error.response.data.message;
      data.alert = true;
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
