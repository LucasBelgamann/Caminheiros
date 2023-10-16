<template>
  <div class="row items-center justify-center" style="height: 40vh">
    <q-card class="q-select-group-card-class">
      <q-card-section :class="mode
        ? 'q-card-color-primary-dark-card'
        : 'q-card-color-primary-light-card'
        ">
        <div class="text-subtitle2" style="margin-bottom: 15px">
          Escolha o grupo que deseja ingressar
        </div>
        <q-select behavior="default" filled standout v-model="groupName" :options="data.allGroups.map((user) => ({
          label: user.name,
          value: user.id.toString(),
        }))
          " :class="mode
    ? 'q-card-color-secondary-dark-card'
    : 'q-card-color-secondary-light-card'
    " label="Grupos" @update:modelValue="handleGroupSelection" />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" :class="mode
        ? 'q-card-color-secondary-dark-card'
        : 'q-card-color-secondary-light-card'
        ">
        <q-btn icon="chevron_right" :disable="disable" style="padding: 10px" dense round @click="handleGroupSelect" :class="mode
          ? 'q-card-color-primary-dark-card'
          : 'q-card-color-primary-light-card'
          " />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

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

const mode = computed(() => $q.dark.isActive);
const $router = useRouter();

const $q = useQuasar();
const groupId = ref<number | null>(null);
const groupName = ref<string | null>(null);
const disable = ref(false);

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
  console.log(value.label);
};

const handleGroupSelect = () => {
  const userData = localStorage.getItem('userData');
  if (groupName.value && groupId.value) {
    if (userData !== null) {
      const userDataObject = JSON.parse(userData);

      userDataObject.groupId = groupId.value;
      userDataObject.groupName = groupName.value;

      localStorage.setItem('userData', JSON.stringify(userDataObject));
      if (
        userDataObject.role === 'Administrador' ||
        userDataObject.role === 'Facilitador'
      ) {
        $router.push('/home');
      } else {
        $router.push('/user');
      }
    }
  } else {
    disable.value = false;
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
.q-select-group-card-class {
  width: 30vw;
}

@media (max-width: $breakpoint-xs-max) {
  .q-select-group-card-class {
    border-radius: 15px;
    width: 80vw;
  }
}

.q-card-color-primary-dark-card {
  background-color: #121925;
}

.q-card-color-primary-light-card {
  background-color: #121925;
  color: white;
}

.q-card-color-secondary-dark-card {
  background-color: $primary;
}

.q-card-color-secondary-light-card {
  background-color: #d3def1;
  color: black;
}
</style>
