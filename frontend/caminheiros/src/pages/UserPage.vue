<template>
  <div class="meetings-container">
    <p
      v-if="data.meetings.length === 0"
      style="margin: 30px 0; width: 80%; text-align: center; font-weight: 100"
    >
      Lamentamos, mas não encontramos nenhuma chamada disponível no momento. Por
      favor, tente novamente mais tarde.
    </p>
    <q-card
      class="my-card"
      v-else
      :class="mode ? 'default-card-color-dark' : 'default-card-color-ligth'"
      flat
    >
      <div class="icon-list row">
        <q-icon
          name="list_alt"
          style="margin-right: 10px"
          class=""
          color="white"
        />
        <div class="column" v-for="meeting in data.meetings" :key="meeting.id">
          <p class="text-h6" style="margin-bottom: 8px">Lista de Presença</p>
          <span class="text-caption">{{ `Grupo: ${meeting.groupName}` }}</span>
          <span class="text-caption">
            {{ `Término da chamada: ${formatMeetingTime(meeting.date)}` }}
          </span>
        </div>
      </div>
      <div v-for="user in data.usersToRender" :key="user.id">
        <q-btn
          v-if="user.frequency === 0"
          style="border-radius: 10px; margin: 10px; width: 10vw"
          icon="done"
          @click="handleFrequencyChange"
          :class="mode ? 'dark-theme' : 'ligth-theme'"
        ></q-btn>
        <q-icon
          v-else
          name="check_circle"
          style="color: green; font-size: 40px; margin: 10px"
        />
      </div>
    </q-card>
    <GroupUser />
    <Notifications />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';
import GroupUser from '../components/UserGroup.vue';
import Notifications from '../components/Notifications-comp.vue';
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
    data.darkMode = darkModeIsActive === 'true';
    $q.dark.set(data.darkMode);
  } else {
    $q.dark.set(false);
  }
});

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
</script>

<style lang="scss">
.meetings-container {
  height: 68vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.my-card {
  color: white;
  border-radius: 20px;
  margin: 20px auto;
  height: 15vh;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.icon-list i {
  font-size: 75px;
}

.presence-buttons button {
  width: 10vw;
  border-radius: 10px;
  height: 4vh;
}

.default-card-color-ligth {
  background-color: #182634;
}

.default-card-color-dark {
  background-color: #000000;
}
</style>
