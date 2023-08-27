<template>
  <div class="footer-container">
    <p>
      2023 Associação Beneficente Espírita Caminheiros do Bem Rua Ivo Ferro, 130
      -Curitiba, PR CNPJ: 03.481.891/0001-33
    </p>
    <div class="line" :class="mode ? 'white' : 'black'"></div>
    <span>Developed by Lucas Agostinho</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  computed: {
    mode: function () {
      return this.$q.dark.isActive;
    },
  },
});
</script>

<style lang="scss">
.footer-container {
  display: flex;
  height: 12vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer-container p {
  font-size: 10px;
  text-align: center;
  width: 60%;
}

.footer-container span {
  font-size: 10px;
}

.line {
  height: 1px;
  margin-bottom: 5px;
  width: 100%;
}

.white {
  background-color: white;
}

.black {
  background-color: black;
}

</style>
