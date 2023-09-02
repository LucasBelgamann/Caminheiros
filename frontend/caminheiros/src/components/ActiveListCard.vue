<template>
  <div class="row items-center justify-center">
    <component
      v-if="!users.data.meetings.length"
      :is="ListCard"
      :fetchMeetings="users.fetchMeetings"
    />
    <q-card
      v-else
      class="my-card"
      flat
      style="border-radius: 20px"
      :class="mode ? 'default-card-color-dark' : 'default-card-color-ligth'"
    >
      <q-card-section class="row items-center meeting-content">
        <div class="list-title-two">
          <q-icon name="list_alt" class="" color="white" />
        </div>
        <div
          class="list-info"
          v-for="meeting in users.data.meetings"
          :key="meeting.id"
        >
          <h4>Lista de presença</h4>
          <p>{{ `Grupo: ${meeting.groupName}` }}</p>
          <p>{{ `Término da chamada: ${formatMeetingTime(meeting.date)}` }}</p>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-space />
        <q-btn
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
            <div style="height: 28vh; overflow-y: scroll">
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

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from "vue";
import axios from "axios";
import ListCard from "./listCard.vue";
import Participants from "./Participants.vue";
import Users from "../services/users";

export default defineComponent({
  setup() {
    const users = inject("users") as Users;

    const handleFrequencyChange = async (
      userId: number,
      newFrequency: number
    ) => {
      try {
        for (const meeting of users.data.meetings) {
          axios.put(
            `http://localhost:3001/meetings/update-frequency/${meeting.id}/users/${userId}`,
            { newFrequency }
          );
        }
      } catch (error) {
        console.error("Error updating frequency:", error);
      }
    };

    onMounted(() => {
      users.fetchMeetings();
    });

    return {
      val: ref(true),
      handleFrequencyChange,
      ListCard,
      Participants,
      users,
    };
  },
  computed: {
    mode: function () {
      return this.$q.dark.isActive;
    },
  },
  methods: {
    formatMeetingTime(dateString: string) {
      const dateObject = new Date(dateString);
      const localDate = new Date(
        dateObject.getTime() + dateObject.getTimezoneOffset() * 60000
      );
      localDate.setHours(localDate.getHours() + 2);
      const hora = localDate.getHours();
      const minutos = localDate.getMinutes();
      return `${hora}:${minutos}`;
    },
  },
  components: { ListCard, Participants },
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

.list-title-two {
  margin-right: 25px;
}

.list-title-two i {
  font-size: 80px;
}

.list-info h4 {
  font-weight: 900;
  font-size: 17px;
  margin: 0;
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
