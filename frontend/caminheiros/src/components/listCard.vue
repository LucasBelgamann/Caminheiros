<template>
  <div
    class="list_container"
    :class="mode ? 'default-card-color-dark' : 'default-card-color-ligth'"
    @click="inception = true"
  >
    <div class="list-title">
      <q-icon name="list_alt" :color="mode ? 'white-text' : 'black-text'" />
      <h4>Lista de presença</h4>
    </div>
    <div>
      <q-btn
        class="launch-list-btn"
        :class="mode ? 'dark-theme' : 'ligth-theme'"
      >
        <q-icon name="send" color="white" />
      </q-btn>

      <q-dialog v-model="inception">
        <q-card style="border-radius: 20px">
          <q-card-section>
            <div class="text-h6">Atenção!</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Deseja lançar uma lista de presença para o dia de hoje?
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
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const handleCreateMeeting = async (groupId: number) => {
      const userData = localStorage.getItem("userData");
      if (userData !== null) {
        const user = JSON.parse(userData);
        try {
          const response = await axios.post(
            `http://localhost:3001/meetings/${user.groupId}`
          );
          console.log("Created Meeting!:", response.data);
          location.reload();
        } catch (error) {
          console.error("Error creating meeting:", error);
        }
      }
    };

    return {
      inception: ref(false),
      secondDialog: ref(false),
      handleCreateMeeting,
    };
  },
  computed: {
    mode: function () {
      return this.$q.dark.isActive;
    },
  },
});
</script>

<style lang="scss">
.list_container {
  color: white;
  cursor: pointer;
  height: 17vh;
  width: 50%;
  margin: auto;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.4s ease-in-out;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
}

.list_container:hover {
  transform: scale(1.02);
}

.list-title {
  display: flex;
  align-items: center;
}

.list-title i {
  color: white;
  font-size: 80px;
  margin: 0 10px 0 50px;
}

.launch-list-btn {
  height: 8vh;
  width: 4vw;
  border-radius: 15px;
  font-size: 20px;
  margin-right: 50px;
}

@media screen and (max-width: 599.99px) {
  .list_container {
    height: 12vh;
    width: 92%;
  }

  .list-title i {
    font-size: 45px;
    margin: 0 10px 0 15px;
  }

  .list-title h4 {
    font-size: 17px;
  }

  .launch-list-btn {
    height: 5vh;
    width: 10vw;
    border-radius: 12px;
    font-size: 10px;
    margin-right: 20px;
  }
}
</style>
