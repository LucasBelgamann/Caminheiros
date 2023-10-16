<template>
  <div class="q-container-notifications">
    <q-expansion-item v-model="data.expanded" expand-icon-toggle expand-separator icon="notifications" label="Mensagens"
      caption="Nova mensagem para o grupo">
      <q-card>
        <q-card-section class="row justify-between items-center">
          <q-input v-model="data.description" autogrow label="Mensagem" style="width: 250px" />
          <q-btn push round icon="notification_add" :class="mode
            ? 'q-card-color-secondary-dark-card'
            : 'q-card-color-secondary-light-card'
            " @click="createWarning" />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-separator inset style="margin: 10px 0;" />
    <q-scroll-area class="q-scroll-notifications-class">
      <q-banner :class="mode
        ? 'q-card-color-secondary-dark-card'
        : 'q-card-color-secondary-light-card'
        " style="margin-bottom: 10px; border-radius: 10px; text-align: justify;" v-for="warnig in data.warnings" :key="warnig.id"
        inline-actions>
        {{ warnig.description }}
        <template v-slot:action>
          <q-btn flat style="width: 10px;" icon="close" Rounded :disable="data.disable" @click="dateleWarnig(warnig.id)" />
        </template>
      </q-banner>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { Warning } from '../interfaces/IWarnings';
import axios from 'axios';

const data: {

  darkMode: boolean;
  textareaFillCancelled: boolean;
  expanded: boolean;
  description: string;
  warnings: Warning[];
  disable: boolean;
} = reactive({
  darkMode: ref(false),
  description: '',
  textareaFillCancelled: false,
  expanded: false,
  warnings: [],
  disable: false
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
      data.warnings = response.data;
    } catch (error) {
      console.error('Error fetching warnings:', error);
    }
  } else {
    console.error('User data not found in localStorage');
  }
};

const createWarning = async () => {
  const userData = localStorage.getItem('userData');
  if (data.description.length) {
    if (userData) {
      const user = JSON.parse(userData);
      const newWarning = {
        description: data.description,
        groupId: user.groupId,
      };
      try {
        await axios.post(
          'http://localhost:3001/groups/create-warning',
          newWarning
        );
        fetchWarnings();
        data.description = '';
        data.expanded = false;
      } catch (error) {
        console.error('Error fetching warnings:', error);
      }
    } else {
      console.error('User data not found in localStorage');
    }
  } else {
    data.disable = true;
  }
};

const dateleWarnig = async (id: number) => {
  try {
    await axios.post(`http://localhost:3001/groups/delete-warning/${id}`);
    fetchWarnings();
  } catch (error) {
    console.error('Error fetching warnings:', error);
  }
};

onMounted(() => {
  fetchWarnings();
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
.q-scroll-notifications-class {
  height: 60vh;
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

.q-card-color-primary-dark-card {
  background-color: #121925;
}

.q-card-color-primary-light-card {
  background-color: #121925;
  color: white;
}

.q-card-color-secondary-dark-card {
  background-color: $primary;
}

.q-card-color-secondary-light-card {
  background-color: #d3def1;
  color: black;
}
</style>
