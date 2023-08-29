<template>
  <Header />
  <div class="meetings-container">
    <p v-if="meetings.length === 0" style="width: 80%; text-align: center">
      Lamentamos, mas não encontramos nenhuma chamada disponível no momento. Por
      favor, tente novamente mais tarde.
    </p>
    <q-card
      v-else
      class="my-meeting-card"
      :class="mode ? 'default-card-color-dark' : 'default-card-color-ligth'"
    >
      <q-card-section class="text-white row meeting-content">
        <div class="list-title-two">
          <q-icon name="list_alt" class="" color="white" />
        </div>
        <div class="list-info" v-for="meeting in meetings" :key="meeting.id">
          <p class="text-h6">Lista de presença</p>
          <p class="text-subtitle4">{{ `Grupo: ${meeting.groupName}` }}</p>
          <p class="text-subtitle4">
            {{ `Término da chamada: ${formatMeetingTime(meeting.date)}` }}
          </p>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <div v-for="user in usersToRender" :key="user.id">
          <q-btn
            v-if="user.frequency === 0"
            style="border-radius: 10px; margin: 10px"
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
      </q-card-actions>
    </q-card>
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useQuasar } from "quasar";
import { ref } from "vue";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const darkMode = ref(false);
    const meetings = ref<Array<Meeting>>([]);
    const usersToRender = ref<Array<User>>([]);
    const userFrequency = ref<number>(0);

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
      const userData = localStorage.getItem("userData");
      if (userData !== null) {
        const user = JSON.parse(userData);
        try {
          const response = await axios.get(
            `http://localhost:3001/meetings/recent/${user.groupId}`
          );

          meetings.value = Array.from(response.data);

          usersToRender.value = meetings.value.flatMap(
            (meeting) => meeting.users
          );

          const userData = localStorage.getItem("userData");
          if (userData !== null) {
            const user = JSON.parse(userData);
            usersToRender.value = usersToRender.value.filter(
              (userToRender) => userToRender.id === user.id
            );
          }

          console.log(usersToRender.value);
        } catch (error) {
          console.error("Error fetching meeting:", error);
        }
      }
    };

    const handleFrequencyChange = async () => {
      const userData = localStorage.getItem("userData");
      if (userData !== null) {
        const user = JSON.parse(userData);
        try {
          for (const userToRender of usersToRender.value) {
            if (userToRender.id === user.id) {
              const newFrequencyValue = userToRender.frequency === 1 ? 0 : 1;

              userFrequency.value = newFrequencyValue;

              for (const meeting of meetings.value) {
                axios.put(
                  `http://localhost:3001/meetings/update-frequency/${meeting.id}/users/${user.id}`,
                  { newFrequency: newFrequencyValue }
                );
              }

              userToRender.frequency = newFrequencyValue;
            }
          }
        } catch (error) {
          console.error("Error updating frequency:", error);
        }
      }
    };

    onMounted(() => {
      fetchMeetings();
      const darkModeIsActive = localStorage.getItem("darkMode");
      if (darkModeIsActive) {
        darkMode.value = darkModeIsActive === "true";
        $q.dark.set(darkMode.value);
      } else {
        $q.dark.set(false);
      }
    });

    return { meetings, handleFrequencyChange, userFrequency, usersToRender };
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
  components: { Footer, Header },
});
</script>

<style lang="scss">
.meetings-container {
  height: 68vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.my-meeting-card {
  width: 90%;
  color: white;
  border-radius: 20px;
}

.meeting-content {
  height: 13vh;
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
</style>
