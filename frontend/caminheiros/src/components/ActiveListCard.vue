<template>
  <div class="row items-center justify-center">
    <component v-if="meetings.length === 0" :is="ListCard" />
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
        <div class="list-info" v-for="meeting in meetings" :key="meeting.id">
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
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator class="line" />
          <q-card-section class="text-subitle2">
            <p>Participantes</p>
            <div v-for="user in usersToRender" :key="user.id">
              <q-checkbox
                v-model="user.frequency"
                :label="user.name"
                :true-value="1"
                :false-value="0"
                @click="() => handleFrequencyChange(user.id, user.frequency)"
              />
            </div>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import axios from "axios";
import ListCard from "./listCard.vue";

export default defineComponent({
  setup() {
    const expanded = ref(false);
    const meetings = ref<Array<Meeting>>([]);
    const usersToRender = ref<Array<User>>([]);

    interface User {
      id: number;
      name: string;
      frequency: number;
    }

    interface Meeting {
      id: number;
      date: string;
      groupId: number;
      created_at: string;
      updated_at: string;
      groupName: string;
      users: User[];
    }

    const fetchMeetings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/meetings/recent/${1}`
        );
        meetings.value = Array.from(response.data);

        usersToRender.value = meetings.value.flatMap(
          (meeting) => meeting.users
        );
      } catch (error) {
        console.error("Error fetching meeting:", error);
      }
    };

    const handleFrequencyChange = async (
      userId: number,
      newFrequency: number
    ) => {
      console.log(newFrequency);
      try {
        for (const meeting of meetings.value) {
          const response = await axios.put(
            `http://localhost:3001/meetings/update-frequency/${meeting.id}/users/${userId}`,
            { newFrequency }
          );
          console.log("Frequency updated:", response.data);
        }
      } catch (error) {
        console.error("Error updating frequency:", error);
      }
    };

    onMounted(() => {
      fetchMeetings();
      const interval = setInterval(fetchMeetings, 1 * 60 * 1000);

      return () => clearInterval(interval);
    });

    return {
      expanded,
      meetings,
      usersToRender,
      val: ref(true),
      handleFrequencyChange,
      ListCard,
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
  components: { ListCard },
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
