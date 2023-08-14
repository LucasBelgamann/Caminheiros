<template>
  <div class="search-history-container">
    <div class="history-container-title">
      <q-icon name="history" :color="mode ? 'white-text' : 'black-text'" />
      <h4 :color="mode ? 'white-text' : 'black-text'">Histórico</h4>
    </div>
    <div class="inputs-container-history">
      <div class="name-container-search">
        <q-input
          class="date-input"
          :class="
            mode ? 'default-input-color-dark' : 'default-input-color-ligth'
          "
          v-model="date"
          filled
          type="date"
        />
        <q-btn
          @click="searchHistory"
          :color="!mode ? 'secondary' : 'primary'"
          label="Buscar"
        />
      </div>
    </div>
  </div>
  <p
    v-if="historyData.length === 0"
    style="height: 30vh"
    class="row items-center justify-center"
  >
    Não existe nehuma chamada para este dia!
  </p>
  <div
    v-else
    class="history-result-container"
    :class="mode ? 'default-card-color-dark' : 'default-card-color-light'"
  >
    <p class="header-history-result">{{ date }}</p>
    <div class="participants-result-history">
      <p
        :class="mode ? 'dark-theme' : 'ligth-theme'"
        v-for="user in historyData"
        :key="user.id"
      >
        {{ user.name }}
      </p>
    </div>
    <div class="download-btn">
      <q-btn icon="picture_as_pdf" label="Baixar PDF"></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const date = ref("");
    const historyData = ref<Array<User>>([]);

    interface User {
      id: number;
      name: string;
    }

    const searchHistory = async () => {
      console.log(date);
      const newDate = date.value;
      try {
        const response = await axios.get(
          `http://localhost:3001/meetings/history/1/date/${newDate}`
        );
        historyData.value = response.data;
        console.log("History fetched:", historyData.value);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    return {
      date,
      historyData,
      searchHistory,
    };
  },
  methods: {
    irParaOutraRota() {
      this.$router.push("/History");
    },
  },
  computed: {
    mode: function () {
      return this.$q.dark.isActive;
    },
  },
});
</script>

<style lang="scss">
.history-result-container {
  position: relative;
  color: white;
  height: 40vh;
  border-radius: 20px;
  background-color: #182634;
  width: 50vw;
  margin: 20px auto;
}

.header-history-result {
  padding: 25px;
  width: 45vw;
  margin: 10px auto;
  border-bottom: white solid 1px;
}

.participants-result-history {
  height: 24vh;
  width: 45vw;
  margin: auto;
  overflow-y: scroll;
}

.participants-result-history p {
  padding: 10px;
  border-radius: 10px;
}

.download-btn {
  position: absolute;
  right: 45px;
  bottom: 20px;
}

.download-btn button {
  background-color: red;
  color: white;
}

@media screen and (max-width: 599.99px) {
  .history-result-container {
    height: 45vh;
    width: 90vw;
  }

  .participants-result-history {
    height: 30vh;
    width: 75vw;
  }

  .header-history-result {
    padding: 15px 12px;
    width: 75vw;
  }

  .download-btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
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

.dark-theme {
  background-color: #262c30;
}

.ligth-theme {
  background-color: #314b68;
}
.search-history-container {
  width: 50vw;
  margin: auto;
}

.inputs-container-history {
  width: 50vw;
}

.name-container-search {
  display: flex;
  width: 28vw;
  justify-content: space-between;
  align-items: center;
}

.history-container-title {
  display: flex;
  align-items: center;
}

.history-container-title i {
  font-size: 50px;
  margin-right: 15px;
}

.history-container-title h4 {
  font-weight: 500;
}

.history-input {
  margin-bottom: 10px;
  margin-right: 10px;
  width: 20vw;
}

.date-input {
  width: 20vw;
}

.has-search h3 {
  font-size: 20px;
  font-weight: 100;
  text-align: center;
  width: 70vw;
  line-height: 25px;
  margin: 80px auto;
}

@media screen and (max-width: 599.99px) {
  .search-history-container {
    width: 90vw;
    margin: auto;
  }

  .history-container-title i {
    font-size: 40px;
  }

  .history-container-title h4 {
    font-size: 30px;
  }

  .inputs-container-history {
    width: 90vw;
    margin: auto;
  }

  .name-container-search {
    width: 90vw;
  }

  .history-input {
    width: 60vw;
  }

  .date-input {
    width: 60vw;
  }
  .dark-theme {
    background-color: #262c30;
  }

  .ligth-theme {
    background-color: #314b68;
  }
}
</style>
