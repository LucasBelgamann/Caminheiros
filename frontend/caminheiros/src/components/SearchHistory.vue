<template>
  <div class="search-history-container">
    <div class="history-container-title">
      <q-icon name="history" :color="mode ? 'white-text' : 'black-text'" />
      <h4 :color="mode ? 'white-text' : 'black-text'">Histórico</h4>
    </div>
    <div class="inputs-container-history">
      <div class="name-container-search">
        <q-input
          class="history-input"
          :class="
            mode ? 'default-input-color-dark' : 'default-input-color-ligth'
          "
          clearable
          filled
          color="primary"
          v-model="name"
          label="Nome"
        />
        <q-btn
          :color="!mode ? 'secondary' : 'primary'"
          label="Buscar"
        />
      </div>
      <q-input
        class="date-input"
        :class="mode ? 'default-input-color-dark' : 'default-input-color-ligth'"
        v-model="date"
        filled
        type="date"
      />
    </div>
  </div>
  <HistoryResult />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HistoryResult from "src/components/HistoryResult.vue";

export default defineComponent({
  setup() {
    return {
      name: ref(""),
      date: ref(""),
    };
  },
  components: { HistoryResult },
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
}
</style>
