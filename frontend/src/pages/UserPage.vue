<template>
  <div>
    <div class="text-center" v-if="data.meetings.length === 0">
      <span class="text-subtitle2" style="font-weight: 200;">Não encontramos nenhuma chamada para esse grupo no
        momento.</span>
    </div>
    <q-card v-else style="border-radius: 15px;" flat class="q-user-list-card-class row justify-around items-center"
      :class="mode
        ? 'q-card-color-primary-dark-card'
        : 'q-card-color-primary-light-card'
        ">
      <q-card-section class="row items-center">
        <q-icon name="list_alt" style="margin-right: 10px; font-size: 65px;" class="" color="white" />
        <div class="column" v-for="meeting in data.meetings" :key="meeting.id">
          <p class="text-subtitle1" style="margin-bottom: 8px">Lista de Presença</p>
          <span class="text-caption">{{ `Grupo: ${meeting.groupName}` }}</span>
          <span class="text-caption">
            {{ `Término da chamada: ${formatMeetingTime(meeting.date)}` }}
          </span>
        </div>
      </q-card-section>

      <q-card-actions class="justify-around" v-for="user in data.usersToRender" :key="user.id">
        <q-btn v-if="user.frequency === 0" round
          :class="mode ? 'q-card-color-secondary-dark-card' : 'q-card-color-secondary-light-card'" icon="done"
          @click="handleFrequencyChange" />
        <q-icon v-else name="done" color="white" style="font-size: 45px;" />
      </q-card-actions>
    </q-card>
  </div>
  <GroupsUser />
  <NotificationsComp />
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';
import GroupsUser from 'src/components/GroupsUser.vue';
import NotificationsComp from 'src/components/Notifications-comp.vue';
import axios from 'axios';
import { UserFrequency } from '../interfaces/IUser';
import { Meeting } from '../interfaces/IMeeting';

const data: {
  darkMode: boolean;
  meetings: Meeting[];
  usersToRender: UserFrequency[];
  userFrequency: number;
} = reactive({
  darkMode: false,
  meetings: [],
  usersToRender: [],
  userFrequency: 0,
});

const $q = useQuasar();

const mode = computed(() => $q.dark.isActive);

const fetchMeetings = async () => {
  const userData = localStorage.getItem('userData');
  if (userData !== null) {
    const user = JSON.parse(userData);
    try {
      const response = await axios.get(
        `http://localhost:3001/meetings/recent/${user.groupId}`
      );

      data.meetings = Array.from(response.data);

      data.usersToRender = data.meetings.flatMap((meeting) => meeting.users);

      const userData = localStorage.getItem('userData');
      if (userData !== null) {
        const user = JSON.parse(userData);
        data.usersToRender = data.usersToRender.filter(
          (userToRender) => userToRender.id === user.id
        );
      }
    } catch (error) {
      console.error('Error fetching meeting:', error);
    }
  }
};

const handleFrequencyChange = async () => {
  const userData = localStorage.getItem('userData');
  if (userData !== null) {
    const user = JSON.parse(userData);
    try {
      for (const userToRender of data.usersToRender) {
        if (userToRender.id === user.id) {
          const newFrequencyValue = userToRender.frequency === 1 ? 0 : 1;

          data.userFrequency = newFrequencyValue;

          for (const meeting of data.meetings) {
            axios.put(
              `http://localhost:3001/meetings/update-frequency/${meeting.id}/users/${user.id}`,
              { newFrequency: newFrequencyValue }
            );
          }

          userToRender.frequency = newFrequencyValue;
        }
      }
    } catch (error) {
      console.error('Error updating frequency:', error);
    }
  }
};

onMounted(() => {
  fetchMeetings();
  const darkModeIsActive = localStorage.getItem('darkMode');
  if (darkModeIsActive) {
    data.darkMode = darkModeIsActive === '__q_bool|1';
    $q.dark.set(data.darkMode);
  } else {
    $q.dark.set(false);
  }
});

const formatMeetingTime = (dateString: string) => {
  const dateObject = new Date(dateString);
  dateObject.setHours(dateObject.getHours() + 2);

  const hora = dateObject.getHours().toString().padStart(2, '0');
  const minutos = dateObject.getMinutes().toString().padStart(2, '0');

  return `${hora}:${minutos}`;
};
</script>

<style lang="scss">
.q-user-list-card-class {
  width: 30vw;
  margin: auto;
  height: 15vh;
}

@media (max-width: $breakpoint-xs-max) {
  .q-user-list-card-class {
    width: 90vw;
    height: 15.5vh;
  }
}
</style>
