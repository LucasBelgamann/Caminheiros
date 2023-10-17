<template>
  <component v-if="!users.data.meetings.length" :is="ListCard" />
  <q-card
    v-else
    class="q-active-card-class"
    flat
    :class="
      mode
        ? 'q-card-color-primary-dark-card'
        : 'q-card-color-primary-light-card'
    "
  >
    <q-card-section class="row items-center">
      <q-icon name="fact_check" style="font-size: 60px; margin-right: 15px" />
      <div v-for="meeting in users.data.meetings" :key="meeting.id">
        <span class="text-h6">Lista de presença</span><br />
        <span class="text-caption">{{ `Grupo: ${meeting.groupName}` }}</span
        ><br />
        <span class="text-caption">{{
          `Término da chamada: ${formatMeetingTime(meeting.date)}`
        }}</span>
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn
        flat
        icon="person"
        color="grey-5"
        :label="users.data.usersLength"
      />
      <q-btn
        flat
        icon="how_to_reg"
        color="secondary"
        :label="users.data.userOn ? users.data.userOn : 0"
      />

      <q-space />

      <q-btn
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
        <q-separator />
        <q-card-section class="text-subtitle2">
          <q-scroll-area class="q-scroll-on-participantes-class">
            <q-banner
              :class="
                mode
                  ? 'q-card-color-secondary-dark-card'
                  : 'q-card-color-secondary-light-card'
              "
              v-for="user in users.data.selectedUsers"
              :key="user.id"
              style="margin-bottom: 10px; border-radius: 10px"
              inline-actions
            >
              {{ user.name }}
              <template v-slot:action>
                <q-checkbox
                  size="sm"
                  v-model="user.frequency"
                  :true-value="1"
                  :false-value="0"
                  @click="handleFrequencyChange(user.id, user.frequency)"
                />
              </template>
            </q-banner>
          </q-scroll-area>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, inject, computed } from 'vue';
import axios from 'axios';
import Users from '../services/users';
import { useQuasar } from 'quasar';
import ListCard from './List-card.vue';

const $q = useQuasar();

const users = inject('users') as Users;
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
  dateObject.setHours(dateObject.getHours() + 2);

  const hora = dateObject.getHours().toString().padStart(2, '0');
  const minutos = dateObject.getMinutes().toString().padStart(2, '0');

  return `${hora}:${minutos}`;
};


onMounted(() => {
  users.fetchMeetings();
});
</script>

<style lang="scss">
.q-active-card-class {
  width: 30vw;
  border-radius: 15px;
  margin: auto;
}

.q-scroll-on-participantes-class {
  height: 20vh;
  width: 25vw;
  margin: auto;
}

.q-container-on-participants {
  width: 20vw;
  margin: auto;
}

@media (max-width: $breakpoint-xs-max) {
  .q-container-on-participants {
    width: 90vw;
  }

  .q-scroll-on-participantes-class {
    width: 80vw;
  }

  .q-active-card-class {
    width: 90vw;
  }
}
</style>
