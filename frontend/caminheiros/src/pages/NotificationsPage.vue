<template>
  <div class="row justify-center">
    <q-card style="background-color: transparent; width: 90vw" flat>
      <q-card-actions>
        <span class="text-h6" :class="mode ? 'white-text' : 'black-text'">Novo aviso</span>
        <q-space />
        <q-btn color="grey" round flat dense :icon="data.expanded ? 'keyboard_arrow_up' : 'add'"
          @click="data.expanded = !data.expanded" />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="data.expanded">
          <q-separator />
          <q-card-section class="q-gutter-md">
            <q-input v-model="data.description" filled clearable autogrow label="Descreva o seu aviso" />
            <div style="display: flex; justify-content: flex-end">
              <q-btn label="Adicionar" color="secondary" @click="createWarning" />
            </div>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
    <div class="noti-line" :class="mode ? 'bg-white' : 'bg-black'"></div>
    <div class="notifications-container">
      <q-banner style="width: 90vw" inline-actions rounded class="bg-blue text-white" v-for="warnig in data.warnings">
        <p style="max-width: 60vw; word-wrap: break-word">
          {{ warnig.description }}
        </p>
        <template v-slot:action>
          <q-btn flat icon="close" @click="dateleWarnig(warnig.id)" />
        </template>
      </q-banner>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, inject } from "vue";
import { User } from "../interface/IUser";
import { useQuasar } from "quasar";
import { Warning } from "../interface/IWarnings";
import axios from "axios";

const data: {
  users: User[];
  label: string;
  darkMode: boolean;
  textareaFillCancelled: boolean;
  expanded: boolean;
  description: string;
  warnings: Warning[],
} = reactive({
  users: [],
  label: "Click me",
  darkMode: ref(false),
  description: '',
  textareaFillCancelled: false,
  expanded: false,
  warnings: [],
});

const $q = useQuasar();
const mode = computed(() => $q.dark.isActive);

const fetchWarnings = async () => {
  const userData = localStorage.getItem("userData");

  if (userData) {
    const user = JSON.parse(userData);
    try {
      const response = await axios.get(
        `http://localhost:3001/groups/warnings/${user.groupId}`
      );
      data.warnings = response.data;
    } catch (error) {
      console.error("Error fetching warnings:", error);
    }
  } else {
    console.error("User data not found in localStorage");
  }
}

const createWarning = async () => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const user = JSON.parse(userData);
    const newWarning = {
      description: data.description,
      groupId: user.groupId,
    };
    try {
      await axios.post(`http://localhost:3001/groups/create-warning`, newWarning);
      fetchWarnings();
      data.description = "";
      data.expanded = false;
    } catch (error) {
      console.error("Error fetching warnings:", error);
    }
  } else {
    console.error("User data not found in localStorage");
  }
}

const dateleWarnig = async (id: number) => {
  try {
    await axios.post(`http://localhost:3001/groups/delete-warning/${id}`);
    fetchWarnings();
  } catch (error) {
    console.error("Error fetching warnings:", error);
  }
}


onMounted(() => {
  fetchWarnings();
  const darkModeIsActive = localStorage.getItem("darkMode");
  if (darkModeIsActive) {
    data.darkMode = darkModeIsActive === "__q_bool|1";
    $q.dark.set(data.darkMode);
  } else {
    $q.dark.set(false);
  }
});
</script>

<style lang="scss">
.noti-line {
  height: 1px;
  width: 90%;
  margin-bottom: 10px;
}

.notifications-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.default-bg-ligth {
  background-color: #646363;
}

.default-bg-dark {
  background-color: #ffffff;
}
</style>
