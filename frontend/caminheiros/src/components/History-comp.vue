<template>
  <div
    @click="irParaOutraRota()"
    class="history-container"
    :class="mode ? 'dark-theme' : 'ligth-theme'"
  >
    <div class="history-title">
      <q-icon name="history" color="white" />
      <h4>Histórico</h4>
    </div>
    <q-icon class="arrow-icon-history" name="arrow_forward_ios" color="white" />
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const $q = useQuasar();
const $router = useRouter();

const irParaOutraRota = () => {
  $router.push('/History');
};

const mode = computed(() => $q.dark.isActive);
</script>

<style lang="scss">
.history-container {
  cursor: pointer;
  height: 17vh;
  width: 50%;
  margin: 30px auto;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.4s ease-in-out;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
}

.history-title {
  display: flex;
  align-items: center;
}

.history-title h4 {
  color: white;
}

.history-title i {
  font-size: 60px;
  margin: 0 10px 0 50px;
}

.history-container:hover {
  transform: scale(1.02);
}

.arrow-icon-history {
  font-size: 50px;
  margin-right: 60px;
}

@media screen and (max-width: 599.99px) {
  .history-container {
    height: 12vh;
    width: 90%;
    margin: 15px auto;
  }

  .history-title h4 {
    color: white;
    font-size: 17px;
  }

  .history-title i {
    font-size: 40px;
    margin: 0 10px 0 15px;
  }

  .arrow-icon-history {
    font-size: 25px;
    margin-right: 30px;
  }
}

.white-text {
  color: white;
}

.black-text {
  color: black;
}

@media screen and (max-width: 599.99px) {
}
</style>
