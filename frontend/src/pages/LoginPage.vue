<template>
  <div class="q-form-login-container">
    <div class="q-gutter-md">
      <q-input standout clearable filled v-model="data.email" label="E-mail" />

      <q-input v-model="data.password" label="Senha" clearable filled :type="data.isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon :name="data.isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
            @click="data.isPwd = !data.isPwd" />
        </template>
      </q-input>

      <div style="margin: 20px auto; text-align: center">
        <span @click="handlePassword">Esqueceu sua senha?</span>
      </div>

      <div class="row justify-center">
        <q-btn type="submit" :loading="data.submitting" flat label="Entrar" :class="mode
          ? 'q-card-color-secondary-dark-card'
          : 'q-card-color-secondary-light-card'
          " @click="handleLogin">
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="data.forgotPass">
      <q-card flat>
        <q-card-section>
          <div class="text-h6">Esqueceu sua senha?</div>
          <div class="text-caption">Informe seu endereço de e-mail abaixo para receber um link de recuperação.</div>
        </q-card-section>

        <form @submit.prevent="submitForm">
          <q-card-section class="q-pt-none">
            <q-input filled v-model="data.email" type="email">
              <template v-slot:before>
                <q-icon name="mail" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="teal" v-close-popup />
            <q-btn type="submit" :loading="data.submitting" flat label="Enviar" :class="mode
              ? 'q-card-color-secondary-dark-card'
              : 'q-card-color-secondary-light-card'
              ">
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="data.choice" persistent>
      <q-card flat class="q-select-group-card-class">
        <q-card-section :class="mode
          ? 'q-card-color-primary-dark-card'
          : 'q-card-color-primary-light-card'
          ">
          <div class="text-subtitle2" style="margin-bottom: 15px">
            Escolha a forma pela qual deseja entrar.
          </div>
          <q-select behavior="dialog" filled standout v-model="data.modelChoice" :options="data.options" :class="mode
            ? 'q-card-color-secondary-dark-card'
            : 'q-card-color-secondary-light-card'
            " label="Opções" @update:modelValue="handleGroupSelection" />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" :class="mode
          ? 'q-card-color-secondary-dark-card'
          : 'q-card-color-secondary-light-card'
          ">
          <q-btn icon="chevron_right" :disable="data.disable" style="padding: 10px" dense round @click="handleGroupSelect"
            :class="mode
              ? 'q-card-color-primary-dark-card'
              : 'q-card-color-primary-light-card'
              " />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
  darkMode: boolean;
  isPwd: boolean;
  forgotPass: boolean;
  submitting: boolean,
  choice: boolean;
  options: string[],
  modelChoice: string,
  disable: boolean
} = reactive({
  password: '',
  email: '',
  darkMode: false,
  isPwd: true,
  forgotPass: false,
  submitting: false,
  choice: false,
  options: ['Facilitador', 'Participante'],
  modelChoice: '',
  disable: false
});

const mode = computed(() => $q.dark.isActive);

const handleLogin = async () => {
  const user = {
    email: data.email,
    password: data.password,
  };

  try {
    data.submitting = true;
    const response = await axios.post(
      'http://localhost:3001/users/login/auth',
      user
    );
    if (response.status === 200) {
      data.submitting = false;
      localStorage.setItem('userData', JSON.stringify(response.data));
      if (response.data.role === 'Administrador' || response.data.role === 'Facilitador') {
        data.choice = true;
      } else {
        $router.push('/groups');
      }
    };

  } catch (error: any) {
    console.error('Erro no login:', error);
    if (error.response && error.response.data) {
      $q.notify({
        type: 'negative',
        message: error.response.data.message,
      });
    }
  }
};

const handleGroupSelection = (value: string) => {
  const userData = localStorage.getItem('userData');
    if (userData !== null) {
      const user = JSON.parse(userData);
      if (user.role === 'Administrador' && value === 'Facilitador') {
        data.modelChoice = 'Administrador'
      }
    } else {
      data.modelChoice = value;
    }
};

const handlePassword = () => {
  data.forgotPass = true;
}

const handleGroupSelect = () => {
  const userData = localStorage.getItem('userData');
  if (data.modelChoice) {
    if (userData !== null) {
      const userDataObject = JSON.parse(userData);

      userDataObject.role = data.modelChoice;
      localStorage.setItem('userData', JSON.stringify(userDataObject));
      $router.push('/groups');
    }
  } else {
    data.disable = false;
  }
};

const submitForm = async () => {
  try {
    data.submitting = true
    const response = await axios.post('http://localhost:3001/users/reset-password-request', {
      email: data.email,
    });
    if (response.status === 200) {
      data.forgotPass = false;
      data.submitting = false;
      data.email = '';
      $q.notify({
        type: 'positive',
        message: 'Sua solicitação foi enviada com sucesso!',
      });
    }
  } catch (error: any) {
    console.error('Erro ao enviar a solicitação de redefinição de senha:', error);
    if (error.response && error.response.data) {
      data.submitting = false;
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
