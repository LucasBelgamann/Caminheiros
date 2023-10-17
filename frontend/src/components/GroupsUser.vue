<template>
  <div class="q-container-group-cards">
    <q-tabs v-model="data.tab" horizontal class="text-teal">
      <q-tab name="Grupos" icon="groups" label="Grupos" />
      <q-tab name="MeusGrupos" icon="local_library" label="Meus Grupos" />
    </q-tabs>
    <q-tab-panels v-model="data.tab" animated swipeable horizontal transition-prev="jump-up" transition-next="jump-up"
      style="background-color: transparent">
      <q-tab-panel name="Grupos" style="height: 120px">
        <q-card style="margin-bottom: 15px; border-radius: 15px; padding: 10px" flat v-for="group in data.allGroups"
          :key="group.id" :class="mode ? 'q-card-color-secondary-dark-card' : 'q-card-color-secondary-light-card'">
          <q-card-section>
            <div class="text-subtitle2 text-weight-bolder">
              {{ group.name }}
            </div>
            <div class="text-subtitle2">{{ group.modality }}</div>
          </q-card-section>
          <q-btn style="position: absolute; right: 5px; bottom: 5px" icon="info" @click="groupInfo(group)" flat />
        </q-card>
      </q-tab-panel>
      <q-tab-panel name="MeusGrupos" style="height: 120px">
        <q-card style="margin-bottom: 15px; border-radius: 15px; padding: 10px" flat v-for="group in data.myGroups"
          :key="group.id" :class="mode ? 'q-card-color-secondary-dark-card' : 'q-card-color-secondary-light-card'">
          <q-card-section>
            <div class="text-subtitle2 text-weight-bolder">
              {{ group.name }}
            </div>
            <div class="text-subtitle2">{{ group.modality }}</div>
          </q-card-section>
          <q-btn style="position: absolute; right: 5px; bottom: 5px" icon="info" @click="groupInfo(group)" flat />
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </div>
  <q-dialog v-model="data.fixed">
    <q-card>
      <q-card-section>
        <div class="text-h6">Informações do Grupo</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 40vh" class="scroll">
        <div v-if="selectedGroup">
          <p class="text-subtitle1 text-weight-medium">
            {{ selectedGroup.name }}
          </p>
          <p class="text-justify">{{ selectedGroup.description }}</p>
          <div style="margin-right: 10px">
            <q-icon name="schedule" style="margin-right: 10px" />
            <span class="text-overline">{{ selectedGroup.hour }}</span>
          </div>
          <div>
            <q-icon style="margin-right: 10px" v-if="selectedGroup.modality === 'Online'" name="phone_iphone" />
            <q-icon style="margin-right: 10px" v-else name="home" />
            <span class="text-overline">{{ selectedGroup.modality }}</span>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Entrar" color="primary" v-if="selectedGroup && data.tab === 'Grupos'"
          @click="insertUserInGroup(selectedGroup?.id, selectedGroup?.name)" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import axios from 'axios';
import { Group } from '../interfaces/IGroup';

const $q = useQuasar();
const mode = computed(() => $q.dark.isActive);

const data: {
  allGroups: Group[];
  myGroups: Group[];
  inGroup: boolean;
  fixed: boolean;
  tab: string;
} = reactive({
  allGroups: [],
  myGroups: [],
  inGroup: false,
  fixed: false,
  tab: 'Grupos',
});

const selectedGroup = ref<Group | null>(null);

const fetchGroups = async () => {
  const userData = localStorage.getItem('userData');

  if (userData !== null) {
    const user = JSON.parse(userData);
    try {
      const response = await axios.get(
        `http://localhost:3001/groups/all/${user.id}`
      );
      data.allGroups = response.data;
    } catch (error) {
      console.error('Error fetching all groups:', error);
    }
  } else {
    console.error('User data not found in localStorage');
  }
};

const insertUserInGroup = async (
  groupId: number | null,
  groupName: string | null
) => {
  const userData = localStorage.getItem('userData');

  if (userData !== null) {
    const user = JSON.parse(userData);
    try {
      await axios.post(
        `http://localhost:3001/users/groups/${groupId}/users/${user.id}`
      );
      user.groupId = groupId;
      user.groupName = groupName;
      fetchGroups();
      fetchGroupsToId();
    } catch (error) {
      console.error('Error insert users:', error);
    }
  } else {
    console.error('User data not found in localStorage');
  }
};

const fetchGroupsToId = async () => {
  const userData = localStorage.getItem('userData');

  if (userData !== null) {
    const user = JSON.parse(userData);
    try {
      const response = await axios.get(
        `http://localhost:3001/groups/user/${user.id}`
      );
      data.myGroups = Array.from(response.data);
    } catch (error) {
      console.error('Error fetching my groups:', error);
    }
  } else {
    console.error('User data not found in localStorage');
  }
};

const toggleInGroup = () => {
  data.inGroup = !data.inGroup;
  if (data.inGroup) {
    fetchGroupsToId();
  } else {
    fetchGroups();
  }
};

const groupInfo = (group: Group | null) => {
  selectedGroup.value = group;
  data.fixed = true;
};

onMounted(() => {
  fetchGroups();
  fetchGroupsToId();
});
</script>

<style lang="scss">
.q-container-group-cards {
  width: 30vw;
  margin: 25px auto;
}

@media (max-width: $breakpoint-xs-max) {
  .q-container-group-cards {
    width: 90vw;
  }
}
</style>
