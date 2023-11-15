<template>
  <div class="q-container-search-history">
    <div>
      <div style="border-radius: 5px; padding: 10px" class="row items-center" :class="mode
        ? 'q-card-color-secondary-dark-card'
        : 'q-card-color-secondary-light-card'
        ">
        <q-icon name="history" style="font-size: 50px; margin-right: 20px" />
        <div>
          <span class="text-h6">Histórico</span> <br />
          <span class="text-caption">Pesquise por um dia especifico de estudos.</span>
        </div>
      </div>
      <q-separator inset style="margin: 10px 0" />
      <div class="row justify-between items-center q-search-history">
        <q-input v-model="data.date" filled type="date" />
        <q-btn push round icon="search" :class="mode
          ? 'q-card-color-secondary-dark-card'
          : 'q-card-color-secondary-light-card'
          " @click="searchHistory" />
      </div>
    </div>
    <div v-if="historyData.length === 0 && !data.submitting" class="no-search-results">
      <p style="height: 30vh; width: 80vw; margin: auto; text-align: center" class="row items-center justify-center">
        Por favor, informe a data desejada para localizarmos o seu registro.
      </p>
    </div>
    <div v-else-if="data.submitting" class="row items-center justify-center" style="height: 35vh;">
      <q-spinner-facebook size="4em" :class="mode
        ? 'q-spinner-color-secondary-dark-card'
        : 'q-spinner-color-secondary-light-card'
        " />
    </div>
    <q-card v-else-if="historyData.length > 0" flat style="border-radius: 15px; margin-top: 20px" :class="mode
      ? 'q-card-color-primary-dark-card'
      : 'q-card-color-primary-light-card'
      ">
      <q-card-section>
        <div class="text-subtitle2">{{ data.date }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-scroll-area class="q-scroll-history-participantes-class">
          <q-banner :class="mode
            ? 'q-card-color-secondary-dark-card'
            : 'q-card-color-secondary-light-card'
            " v-for="user in historyData" :key="user.id" style="margin-bottom: 10px; border-radius: 10px"
            inline-actions>
            {{ user.name }}
            <template v-slot:action>
              <q-btn flat icon="check" Rounded />
            </template>
          </q-banner>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { User } from '../interfaces/IUser';

const historyData = ref<Array<User>>([]);
const $q = useQuasar();

const mode = computed(() => $q.dark.isActive);

const data: {
  errorMessage: string;
  date: string;
  historyData: User[];
  submitting: boolean;
} = reactive({
  errorMessage: '',
  date: '',
  historyData: [],
  submitting: false,
});

const searchHistory = async () => {
  const userData = localStorage.getItem('userData');

  if (userData !== null) {
    const user = JSON.parse(userData);
    try {
      data.submitting = true;

      const response = await axios.get(
        `http://localhost:3001/meetings/history/${user.groupId}/date/${data.date}`
      );
      historyData.value = response.data;
      if (response.status === 200) {
          data.submitting = false;
      }
    } catch (error: any) {
      console.error('Error fetching history:', error);
      if (error.response && error.response.data) {
        $q.notify({
          type: 'negative',
          message: error.response.data.message,
        });
      }
    }
  } else {
    console.error('User data not found in localStorage');
  }
};
</script>

<style lang="scss">
.q-container-search-history {
  width: 30vw;
  margin: auto;
}

.q-scroll-history-participantes-class {
  height: 22vh;
  width: 25vw;
  margin: auto;
}

.q-search-history input {
  width: 23vw;
}

.error-response {
  color: rgb(255, 0, 0);
  margin-bottom: 10px;
}

.no-search-results {
  height: 49vh;
}

.error-container {
  height: 49vh;
}

@media (max-width: $breakpoint-xs-max) {
  .q-container-search-history {
    width: 90vw;
  }

  .q-search-history input {
    width: 65vw;
  }

  .q-scroll-history-participantes-class {
    width: 80vw;
  }
}
</style>
