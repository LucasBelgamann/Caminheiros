<template>
  <div class="q-form-pass-container">
    <div>
      <q-input ref="passwordRef" filled type="password" v-model="data.password" label="Nova senha *"
        style="margin-bottom: 15px;" />
      <q-input ref="confirmPasswordRef" filled type="password" v-model="data.confirmPassword" label="Confirmar senha *"
        style="margin-bottom: 15px;" />
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
} = reactive({
  password: '',
  darkMode: false,
  confirmPassword: '',
  submitting: false,
});

const mode = computed(() => $q.dark.isActive);

const submitForm = async () => {
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
