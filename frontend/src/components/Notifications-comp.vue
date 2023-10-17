<template>
  <div v-if="data.warnings.length" class="q-container-notifications">
    <div style="border-radius: 5px; padding: 10px;" class="row items-center" :class="mode
      ? 'q-card-color-primary-dark-card'
      : 'q-card-color-primary-light-card'
      ">
      <q-icon name="notifications" style="font-size: 40px; margin-right: 15px;" />
      <div>
        <span class="text-h6">Mural de notificações</span> <br>
        <span class="text-caption">Principais avisos do grupo</span>
      </div>
    </div>
    <q-separator inset style="margin: 5px 0 15px 0;" />
    <q-scroll-area class="q-scroll-notifications-class">
      <q-banner :class="mode
        ? 'q-card-color-secondary-dark-card'
        : 'q-card-color-secondary-light-card'
        " style="margin-bottom: 10px; border-radius: 10px; text-align: justify;" v-for="warnig in data.warnings"
        :key="warnig.id" inline-actions>
        {{ warnig.description }}
        <template v-slot:action>
          <q-btn flat style="width: 10px;" icon="notifications_active" Rounded />
        </template>
      </q-banner>
    </q-scroll-area>
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
.q-scroll-notifications-class {
  height: 15vh;
  width: 30vw;
  margin: auto;
}

.q-container-notifications {
  width: 30vw;
  margin: auto;
}

@media (max-width: $breakpoint-xs-max) {
  .q-container-notifications {
    width: 90vw;
  }

  .q-scroll-notifications-class {
    width: 90vw;
  }
}
</style>
