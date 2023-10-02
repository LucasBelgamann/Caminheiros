<template>
  <div style="width: 90vw; margin-top: 40px" v-if="data.warnings.length">
    <span
      class="text-h6"
      style="font-size: 15px; line-height: 0; color: #61717d"
      >Mural de Avisos</span
    >
    <q-separator
      :class="mode ? 'default-bg-dark' : 'default-bg-ligth'"
      style="width: 90vw; margin: 10px auto"
    />
    <div>
      <q-banner
        inline-actions
        rounded
        class="bg-blue text-white"
        :key="warnig.id"
        v-for="warnig in data.warnings"
      >
        <p style="max-width: 60vw; word-wrap: break-word">
          {{ warnig.description }}
        </p>
        <template v-slot:action>
          <q-btn flat icon="notifications_active" />
        </template>
      </q-banner>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
import { Warning } from '../interfaces/IWarnings';
import { useQuasar } from 'quasar';
import axios from 'axios';

const data: {
  label: string;
  darkMode: boolean;
  warnings: Warning[];
} = reactive({
  label: 'Click me',
  darkMode: ref(false),
  warnings: [],
});

const $q = useQuasar();

const mode = computed(() => $q.dark.isActive);

const fetchWarnings = async () => {
  const userData = localStorage.getItem('userData');

  if (userData) {
    const user = JSON.parse(userData);
    try {
      const response = await axios.get(
        `http://localhost:3001/groups/warnings/${user.groupId}`
      );
      const responseData = response.data;

      if (responseData) {
        data.warnings = responseData;
      } else {
        throw new Error('Data not found');
      }
    } catch (error) {
      console.error('Error fetching warnings:', error);
    }
  } else {
    console.error('User data not found in localStorage');
  }
};

onMounted(() => {
  fetchWarnings();
  const darkModeIsActive = localStorage.getItem('darkMode');
  if (darkModeIsActive) {
    data.darkMode = darkModeIsActive === '__q_bool|1';
    $q.dark.set(data.darkMode);
  } else {
    $q.dark.set(false);
  }
});
</script>

<style lang="scss">
.default-bg-ligth {
  background-color: #646363;
}

.default-bg-dark {
  background-color: #ffffff;
}
</style>
