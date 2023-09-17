<template>
  <div style="width: 90vw; margin: 20px auto 0 auto;">
    <span class="text-h6" style="font-size: 15px; line-height: 0; color: #61717D;">Para fazer alterações em seus dados,
      selecione o campo
      que você deseja editar.</span>
    <q-separator :class="mode ? 'default-bg-dark' : 'default-bg-ligth'" style="width: 90vw; margin: 15px auto;" />
    <div class="" v-for="user in data.users" :key="user.id" style="position: relative; height: 20vh;">
      <div class="cursor-pointer text-caption" style="margin-bottom: 10px;">
        <q-icon name="person" style="font-size: 25px; margin-right: 10px;" />
        {{ user.name }}
        <q-popup-edit v-model="user.name" class="" v-slot="scope">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
            <template v-slot:append>
              <q-icon name="edit" />
            </template>
          </q-input>
        </q-popup-edit>
      </div>
      <div class="cursor-pointer text-caption" style="margin-bottom: 10px;">
        <q-icon name="mail" style="font-size: 25px; margin-right: 10px;" />
        {{ user.email }}
        <q-popup-edit v-model="user.name" class="" v-slot="scope">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
            <template v-slot:append>
              <q-icon name="edit" />
            </template>
          </q-input>
        </q-popup-edit>
      </div>
      <div class="cursor-pointer text-caption">
        <q-icon name="phone_iphone" style="font-size: 25px; margin-right: 10px;" />
        {{ user.phone }}
        <q-popup-edit v-model="user.name" class="" v-slot="scope">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
            <template v-slot:append>
              <q-icon name="edit" />
            </template>
          </q-input>
        </q-popup-edit>
      </div>
      <q-btn label="Confirmar" color="primary" style="position: absolute; right: 10px; bottom: 10px; font-size: 12px;" />
    </div>
  </div>
</template>


<script setup lang="ts">
import axios from 'axios';
import { reactive, ref, computed, onMounted } from 'vue';
import { User } from '../interface/IUser';
import { useQuasar } from 'quasar';

const data: {
  users: User[];
  label: string;
  darkMode: boolean;
} = reactive({
  users: [],
  label: 'Click me',
  darkMode: ref(false)
});

const $q = useQuasar();

const mode = computed(() => $q.dark.isActive);


const fetchUsers = async () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const user = JSON.parse(userData);
    try {
      const response = await axios.get(`http://localhost:3001/users/${user.id}`);

      data.users = response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
};

onMounted(() => {
  fetchUsers();
  const darkModeIsActive = localStorage.getItem("darkMode");
  if (darkModeIsActive) {
    data.darkMode = darkModeIsActive === "__q_bool|1";
    $q.dark.set(data.darkMode);
  } else {
    $q.dark.set(false);
  }
})
</script>

<style lang="scss">
.default-bg-ligth {
  background-color: #646363;
}

.default-bg-dark {
  background-color: #ffffff;
}
</style>
