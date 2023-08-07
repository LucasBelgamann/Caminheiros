<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-overline text-orange-9">Overline</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Share" />
        <q-btn flat color="secondary" label="Book" />

        <q-space />

        <q-btn
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
          <q-separator />
          <q-card-section class="text-subitle2">
            <div>
              <div v-for="user in users" :key="user.id">
                {{ user.name }} - {{ user.email }}
              </div>
            </div>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const expanded = ref(false);
    const groupId = 1;
    const users = ref<Array<User>>([]);

    interface User {
      id: number;
      name: string;
      email: string;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        // Convert the Proxy(Array) to a regular array using Array.from()
        users.value = Array.from(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      expanded,
      groupId,
      users,
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
