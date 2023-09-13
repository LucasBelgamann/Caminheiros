<template>
  <div class="background" :class="mode ? 'default-card-color-dark' : 'default-card-color-ligth'">
    <q-btn class="arrow-btn-header" :class="mode ? 'dark-theme' : 'ligth-theme'" icon="arrow_back_ios_new" to="/Home" />
    <img
      src="https://static.wixstatic.com/media/4f4b22_a6ecbef17b754f1b9397c72e87c8aa3a~mv2.png/v1/fill/w_152,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/caminheiros-do-bem-png-branco.png" />
  </div>
  <div class="form-login">
    <q-input class="in-register" :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'" clearable filled
      color="primary" v-model="nomeGrupo" label="Nome do Grupo" />
    <q-input class="in-register" style="width: 80vw;" :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'" v-model="text"
      label="Descrição" filled type="textarea" />
    <q-input class="in-register" :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'" clearable filled
      color="primary" v-model="hour" label="E-mail" />
    <q-input :type="isPwd ? 'password' : 'text'" class="in-register"
      :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'" clearable filled color="primary"
      v-model="password" label="Senha">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>

    <q-select v-model="userName" class="in-register"
      :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'" :options="options" use-input
      input-debounce="300" label="Facilitadores" behavior="menu" @filter="filterFn"
      @update:modelValue="handleUserSelection">
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-btn to="/Home" @click="handleCadastro" class="login-btn" color="secondary" label="Cadastrar" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const users = ref<Array<User>>([]);
    const isPwd = ref(true);
    const nomeGrupo = ref("");
    const hour = ref("");
    const password = ref("");
    const text = ref("");
    const darkMode = ref(false);
    const $q = useQuasar();
    const selectedUserId = ref<number | null>(null);
    const userName = ref<string | null>(null);

    interface User {
      id: number;
      name: string;
      phone: string;
    }

    const handleCadastro = async () => {
      const newUser = {
        name: nomeGrupo.value,
        hour: hour.value,
        password: password.value,
        userId: selectedUserId.value,
      };
      try {
        if (!newUser) {
          console.log("não foi possivel");
        }
        await axios.post("http://localhost:3001/groups/create-group", newUser);
        console.log("Group created successfully!");
      } catch (error) {
        console.error("Error creating Group:", error);
      }
    };

    const handleUserSelection = (value: { label: string; value: number }) => {
      selectedUserId.value = value.value;
      userName.value = value.label;
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/`);

        const filteredUsers = response.data.filter((user: any) => {
          return user.role === "admin" || user.role === "manager";
        });

        users.value = Array.from(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const options = ref<Array<{ label: string; value: string }>>([]);
    const stringOptions = computed(() => {
      return users.value.map((user) => ({
        label: user.name,
        value: user.id.toString(),
      }));
    });

    function filterFn(val: any, update: any) {
      if (val === "") {
        update(() => {
          options.value = stringOptions.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = stringOptions.value.filter((user) =>
          user.label.toLowerCase().includes(needle)
        );
      });
    }


    onMounted(() => {
      fetchUsers();
      const darkModeIsActive = localStorage.getItem("darkMode");
      if (darkModeIsActive) {
        darkMode.value = darkModeIsActive === "__q_bool|1";
        $q.dark.set(darkMode.value);
      } else {
        $q.dark.set(false);
      }
    });

    return {
      password,
      isPwd,
      hour,
      nomeGrupo,
      handleCadastro,
      options,
      text,
      userName,
      filterFn,
      handleUserSelection
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
.background {
  height: 35vh;
  width: 100vw;
  border-radius: 0 0 50% 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.in-register {
  width: 20vw;
  margin: 5px 0;
}

.form-login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-btn {
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
}

.arrow-btn-header {
  border-radius: 50%;
  color: white;
  height: 6vh;
  position: absolute;
  top: 10px;
  right: 10px;
}

@media screen and (max-width: 599.99px) {
  .in-register {
    width: 80vw;
  }

  .form-login {
    height: 60vh;
  }
}

.default-input-color-ligth {
  background-color: #dbdbdb;
}

.default-input-color-dark {
  background-color: #3b3a3a;
}
</style>
