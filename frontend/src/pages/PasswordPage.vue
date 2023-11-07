<template>
  <div class="q-form-pass-container">
    <div>
      <q-input ref="passwordRef" filled type="password" v-model="data.password" label="Nova senha *" lazy-rules
        :rules="passwordRules" />
      <q-input ref="confirmPasswordRef" filled type="password" v-model="data.confirmPassword" label="Confirmar senha *"
        lazy-rules :rules="confirmPasswordRules" />
    </div>
    <div>
      <q-btn label="Enviar" type="submit" color="primary" />
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
  darkMode: boolean;
  confirmPassword: string;
} = reactive({
  password: '',
  darkMode: false,
  confirmPassword: ''
});

const mode = computed(() => $q.dark.isActive);

const passwordRules = computed(() => [
  (v: string) => v === data.confirmPassword || 'Passwords do not match'
]);

const confirmPasswordRules = computed(() => [
  (v: string) => v === data.password || 'Passwords do not match'
]);

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
