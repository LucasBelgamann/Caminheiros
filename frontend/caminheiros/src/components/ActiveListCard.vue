<template>
  <div class="row items-center justify-center">
    <component v-if="!users.data.meetings.length" :is="ListCard" />
    <q-card
      v-else
      class="my-card"
      flat
      style="border-radius: 20px"
      :class="mode ? 'default-card-color-dark' : 'default-card-color-ligth'"
    >
      <q-card-section
        class="row items-center meeting-content"
        style="padding: 0; height: 12vh"
      >
        <div class="list-title-two" style="margin: 20px">
          <q-icon name="list_alt" class="" color="white" />
        </div>
        <div
          class="column content"
          v-for="meeting in users.data.meetings"
          :key="meeting.id"
        >
          <p class="text-h6" style="margin-bottom: 8px">Lista de Presença</p>
          <span class="text-caption">{{ `Grupo: ${meeting.groupName}` }}</span>
          <span class="text-caption">
            {{ `Término da chamada: ${formatMeetingTime(meeting.date)}` }}
          </span>
        </div>
      </q-card-section>

      <q-card-actions style="padding: 5px">
        <q-btn
          flat
          icon="person"
          color="primary"
          :label="users.data.usersLength"
          style="margin-left: 15px"
        />
        <q-btn
          flat
          icon="person"
          :label="users.data.userOn ? users.data.userOn : 0"
          style="color: green"
        />
        <q-space />
        <q-btn
          style="padding: 10px"
          class="sub-class"
          color="grey"
          round
          flat
          dense
          :icon="
            users.data.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
          "
          @click="users.data.expanded = !users.data.expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="users.data.expanded">
          <q-separator :class="mode ? 'dark-theme' : 'ligth-theme'" />
          <q-card-section class="text-subitle2">
            <p>Participantes</p>
            <div style="height: 18vh; overflow-y: scroll">
              <div
                v-for="user in users.data.selectedUsers"
                :key="user.id"
                style="padding: 2px; border-radius: 10px; margin-bottom: 8px"
                :class="mode ? 'dark-theme' : 'ligth-theme'"
              >
                <q-checkbox
                  v-model="user.frequency"
                  :label="user.name"
                  :true-value="1"
                  :false-value="0"
                  @click="handleFrequencyChange(user.id, user.frequency)"
                />
              </div>
            </div>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  inject,
  computed,
} from 'vue';
import axios from 'axios';
import ListCard from './listCard.vue';
import Users from '../services/users';
import { useQuasar } from 'quasar';

const users = inject('users') as Users;
const $q = useQuasar();

const mode = computed(() => $q.dark.isActive);

const handleFrequencyChange = async (userId: number, newFrequency: number) => {
  try {
    for (const meeting of users.data.meetings) {
      axios.put(
        `http://localhost:3001/meetings/update-frequency/${meeting.id}/users/${userId}`,
        { newFrequency }
      );
    }
    users.data.userOn = users.data.selectedUsers.filter(
      (e) => e.frequency === 1
    ).length;
  } catch (error) {
    console.error('Error updating frequency:', error);
  }
};

const formatMeetingTime = (dateString: string) => {
  const dateObject = new Date(dateString);
  const localDate = new Date(
    dateObject.getTime() + dateObject.getTimezoneOffset() * 60000
  );
  localDate.setHours(localDate.getHours() + 2);
  const hora = localDate.getHours();
  const minutos = localDate.getMinutes();
  return `${hora}:${minutos}`;
};

onMounted(() => {
  users.fetchMeetings();
});
</script>

<style lang="scss">
.my-card {
  width: 90vw;
  box-shadow: none;
  color: white;
}

.meeting-content {
  height: 14vh;
}

.list-title-two i {
  font-size: 75px;
}

.content span {
  font-size: 11px;
}

@media screen and (max-width: 599.99px) {
}

.default-card-color-ligth {
  background-color: #182634;
}

.default-card-color-dark {
  background-color: #000000;
}

.white-text {
  color: white;
}

.black-text {
  color: black;
}
</style>
