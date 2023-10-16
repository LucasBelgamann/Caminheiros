<template>
  <q-card @click="data.inception = true" :class="mode ? 'q-card-color-primary-dark-card' : 'q-card-color-primary-light-card'" flat
    class="q-card-list-class row justify-between items-center">
    <div class="">
      <q-icon name="list_alt" class="q-icon-list-class" />
      <span>Lista de Chamada</span>
    </div>
    <div class="">
      <q-btn icon="send" class="q-btn-list-class" :class="mode
        ? 'q-card-color-secondary-dark-card'
        : 'q-card-color-secondary-light-card'
        " />
    </div>
  </q-card>
     <q-dialog v-model="data.inception">
          <q-card>
            <q-card-section>
              <div class="text-h6">Atenção!</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Você gosrtaria de iniciar lançar uma lista de presença?
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn
                flat
                color="positive"
                v-close-popup
                label="Confirmar"
                @click="handleCreateMeeting"
              />
              <q-btn flat color="primary" label="Cancelar" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import {  inject, computed, reactive } from 'vue';
import axios from 'axios';
import Users from '../services/users';

const users = inject('users') as Users;
const $q = useQuasar();
const mode = computed(() => $q.dark.isActive);

const data: {
  inception: boolean;
} = reactive({
  inception: false
})

const handleCreateMeeting = async () => {
  const userData = localStorage.getItem('userData');
  if (userData !== null) {
    const user = JSON.parse(userData);
    try {
      await axios.post(`http://localhost:3001/meetings/${user.groupId}`);
      users.fetchMeetings();
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  }
};
</script>

<style lang="scss">
.q-card-list-class {
  width: 30vw;
  height: 15vh;
  margin: auto;
  border-radius: 15px;
}

.q-btn-list-class {
  width: 3vw;
  padding: 13px;
  border-radius: 10px;
  margin-right: 15px;
}

.q-icon-list-class {
  font-size: 70px;
  margin: 0 15px;
}

@media (max-width: $breakpoint-xs-max) {
  .q-card-list-class {
    width: 90vw;
    height: 12vh;
  }

  .q-icon-list-class {
    font-size: 60px;
  }

  .q-btn-list-class {
    width: 10vw;
    padding: 9px;
  }
}
</style>
