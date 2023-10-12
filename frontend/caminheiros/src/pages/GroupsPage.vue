<template>
  <div
    class="background"
    :class="
      data.darkMode ? 'default-card-color-dark' : 'default-card-color-ligth'
    "
  >
    <img
      src="https://static.wixstatic.com/media/4f4b22_a6ecbef17b754f1b9397c72e87c8aa3a~mv2.png/v1/fill/w_152,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/caminheiros-do-bem-png-branco.png"
    />
  </div>
  <div
    class="q-pa-md row items-center justify-center q-gutter-md"
    style="height: 40vh"
  >
    <q-card
      flat
      class="my-group-card"
      :class="
        data.darkMode ? 'default-card-color-dark' : 'default-card-color-ligth'
      "
    >
      <q-card-section
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 20vh;
        "
      >
        <q-card-title>Selecione o grupo que deseja ingressar!</q-card-title>
        <q-select
          filled
          v-model="groupName"
          label="Grupos"
          :options="
            data.allGroups.map((user) => ({
              label: user.name,
              value: user.id.toString(),
            }))
          "
          :class="
            data.darkMode
              ? 'default-input-color-dark'
              : 'default-input-color-ligth'
          "
          style="width: 250px"
          behavior="dialog"
          @update:modelValue="handleGroupSelection"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import axios from 'axios';

interface Group {
  id: number;
  name: string;
}

const data: {
  allGroups: Group[];
  darkMode: boolean;
} = reactive({
  allGroups: [],
  darkMode: false,
});

const $q = useQuasar();
const groupId = ref<number | null>(null);
const groupName = ref<string | null>(null);

const fetchGroups = async () => {
  const userData = localStorage.getItem('userData');

  if (userData !== null) {
    const user = JSON.parse(userData);
    try {
      if (user.role === 'Administrador' || user.role === 'Facilitador') {
        const response = await axios.get(
          `http://localhost:3001/groups/owner/${user.id}`
        );
        data.allGroups = Array.from(response.data);
      } else {
        const response = await axios.get(
          `http://localhost:3001/groups/user/${user.id}`
        );
        data.allGroups = Array.from(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  } else {
    console.error('User data not found in localStorage');
  }
};

const handleGroupSelection = (value: { label: string; value: number }) => {
  groupId.value = value.value;
  groupName.value = value.label;
  const userData = localStorage.getItem('userData');

  if (userData !== null) {
    const userDataObject = JSON.parse(userData);

    userDataObject.groupId = value.value;
    userDataObject.groupName = value.label;

    localStorage.setItem('userData', JSON.stringify(userDataObject));
    if (userDataObject.role === 'Administrador' || userDataObject.role === 'Facilitador') {
      window.location.href = '/home';
    } else {
      window.location.href = '/User';
    }
  }
};

onMounted(() => {
  const darkModeIsActive = localStorage.getItem('darkMode');
  if (darkModeIsActive) {
    data.darkMode = darkModeIsActive === 'true';
    $q.dark.set(data.darkMode);
  } else {
    $q.dark.set(false);
  }
  fetchGroups();
});
</script>

<style lang="scss">
.background {
  height: 35vh;
  width: 100vw;
  border-radius: 0 0 50% 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-group-card {
  height: 20vh;
  width: 90%;
  border-radius: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-group-card q-card-title {
  font-weight: 700;
}

.default-card-color-ligth {
  background-color: #182634;
}

.default-card-color-dark {
  background-color: #000000;
}

.default-input-color-ligth {
  background-color: #dbdbdb;
}

.default-input-color-dark {
  background-color: #3b3a3a;
}
</style>
