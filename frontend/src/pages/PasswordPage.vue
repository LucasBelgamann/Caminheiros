<template>
  <div class="q-form-pass-container">
    <div>
      <q-input v-model="data.password" label="Nova senha *" clearable filled style="margin-bottom: 15px;"
        :type="data.isPwd ? 'password' : 'text'" @blur="validatePasswords">
        <template v-slot:append>
          <q-icon :name="data.isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
            @click="data.isPwd = !data.isPwd" />
        </template>
      </q-input>
      <q-input v-model="data.confirmPassword" label="Confirmar senha *" clearable filled style="margin-bottom: 15px;"
        :type="data.isPwd ? 'password' : 'text'" @blur="validatePasswords">
        <template v-slot:append>
          <q-icon :name="data.isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
            @click="data.isPwd = !data.isPwd" />
        </template>
      </q-input>
    </div>
    <div>
      <q-btn type="submit" :loading="data.submitting" flat label="Enviar" :class="mode
        ? 'q-card-color-secondary-dark-card'
        : 'q-card-color-secondary-light-card'
        " @click="submitForm">
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import axios from 'axios';
import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const $q = useQuasar();
const route = useRoute()


const data: {
  password: string;
  darkMode: boolean;
  confirmPassword: string;
  submitting: boolean;
  isPwd: boolean,
} = reactive({
  password: '',
  darkMode: false,
  confirmPassword: '',
  submitting: false,
  isPwd: true,
});

const mode = computed(() => $q.dark.isActive);
const passwordsMatch = computed(() => data.password === data.confirmPassword);

const validatePasswords = () => {
  if (!passwordsMatch.value) {
    $q.notify({
      type: 'warning',
      message: 'As senhas não coincidem.',
    });
  }
};

const submitForm = async () => {
  if (!passwordsMatch.value) {
    $q.notify({
      type: 'negative',
      message: 'As senhas não coincidem. Corrija antes de enviar o formulário.',
    });
    return;
  }
  const token = route.query.token;

  try {
    data.submitting = true;

    const response = await axios.post(
      'http://localhost:3001/users/update-user-password',
      { password: data.password, token }
    );

    if (response.status === 200) {
      data.submitting = false;
      data.password = '';
      data.confirmPassword = '';
      $q.notify({
        type: 'positive',
        message: 'Sua senha foi atualizada com sucesso! Você pode agora fechar esta aba.',
      });
    }
  } catch (error: any) {
    console.error('Erro ao atualizar a senha:', error);
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
.q-form-pass-container {
  margin: 70px auto;
  max-width: 20vw;
}

@media (max-width: $breakpoint-xs-max) {
  .q-form-pass-container {
    max-width: 80vw;
  }
}
</style>
