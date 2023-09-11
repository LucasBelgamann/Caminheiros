<template>
  <div>
    <q-tabs v-model="tab" inline-label style="background-color: transparent; margin-bottom: 20px;">
      <q-tab name="groups" label="Grupos" @click="toggleInGroup" />
      <q-tab name="myGroups" label="Meus Grupos" @click="toggleInGroup" />
    </q-tabs>
    <div class="groups-container">
      <q-card flat class="group-card text-white" v-for="group in allGroups" :class="mode ? 'dark-theme' : 'ligth-theme'">
        <q-card-section>
          <div class="text-subtitle2 text-weight-bolder">{{ group.name }}</div>
          <div class="text-subtitle2">{{ group.modality }}</div>
        </q-card-section>
        <q-btn style="position: absolute; right: 5px; bottom: 5px;" icon="info" @click="groupInfo(group)" flat />
      </q-card>
      <q-dialog v-model="fixed">
        <q-card>
          <q-card-section>
            <div class="text-h6">Informações do Grupo</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 40vh" class="scroll">
            <div v-if="selectedGroup">
              <p class="text-subtitle1 text-weight-medium">{{ selectedGroup.name }}</p>
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
            <q-btn flat label="Entrar" color="primary" v-if="selectedGroup"
              @click="insertUserInGroup(selectedGroup?.id, selectedGroup?.name)" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted } from "vue";
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const mode = computed(() => $q.dark.isActive);
    const allGroups = ref<Array<Group>>([]);
    const selectedGroup = ref<Group | null>(null);
    const inGroup = ref(false);
    const fixed = ref(false);

    interface Group {
      created_at: string;
      description: string;
      hour: string;
      id: number;
      modality: string;
      name: string;
      updated_at: string;
      userId: number;
    }

    const fetchGroups = async () => {
      const userData = localStorage.getItem("userData");

      if (userData !== null) {
        const user = JSON.parse(userData);
        try {
          const response = await axios.get(
            `http://localhost:3001/groups/all/${user.id}`
          );
          allGroups.value = response.data;
        } catch (error) {
          console.error("Error fetching all users:", error);
        }
      } else {
        console.error("User data not found in localStorage");
      }
    };

    const insertUserInGroup = async (groupId: number | null, groupName: string | null) => {
      const userData = localStorage.getItem("userData");

      if (userData !== null) {
        const user = JSON.parse(userData);
        try {
          await axios.post(
            `http://localhost:3001/users/groups/${groupId}/users/${user.id}`
          );
          user.groupId = groupId;
          user.groupName = groupName;
          fetchGroups();
        } catch (error) {
          console.error("Error insert users:", error);
        }
      } else {
        console.error("User data not found in localStorage");
      }
    };

    const fetchGroupsToId = async () => {
      const userData = localStorage.getItem("userData");

      if (userData !== null) {
        const user = JSON.parse(userData);
        try {
          const response = await axios.get(
            `http://localhost:3001/groups/user/${user.id}`
          );
          allGroups.value = Array.from(response.data);
        } catch (error) {
          console.error("Error fetching all users:", error);
        }
      } else {
        console.error("User data not found in localStorage");
      }
    };

    const toggleInGroup = () => {
      inGroup.value = !inGroup.value;
      if (inGroup.value) {
        fetchGroupsToId();
      } else {
        fetchGroups();
      }
    };

    const groupInfo = (group: Group | null) => {
      selectedGroup.value = group;
      fixed.value = true;
    };

    onMounted(() => {
      fetchGroups();
    });

    return {
      allGroups,
      mode,
      inGroup,
      toggleInGroup,
      tab: ref('groups'),
      insertUserInGroup,
      fixed,
      groupInfo,
      selectedGroup
    };
  },
  components: {},
});
</script>

<style lang="scss">
.group-card {
  position: relative;
  width: 55vw;
  height: 12vh;
  flex: none;
  border-radius: 15px;
  margin-right: 10px;
}

.groups-container {
  width: 90vw;
  height: 13vh;
  margin-top: 10px;
  display: flex;
  overflow: scroll;
}
</style>
