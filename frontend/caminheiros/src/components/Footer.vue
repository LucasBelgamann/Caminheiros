<template>
  <div class="footer-container">
    <p>
      2023 Associação Beneficente Espírita Caminheiros do Bem Rua Ivo Ferro, 130
      -Curitiba, PR CNPJ: 03.481.891/0001-33
    </p>
    <div class="line"></div>
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
  font-weight: 200;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
}

.line {
  background-color: rgb(70, 70, 70);
  height: 1px;
  width: 100%;
}

.footer-container p {
  text-align: center;
  width: 20vw;
  margin-top: 30px;
}

.footer-container span {
  margin: 10px auto;
}

@media screen and (max-width: 599.99px) {
  .in-pass {
    width: 80vw;
  }

  .in-email {
    margin: 40px auto 20px auto;
    width: 80vw;
  }

  .footer-container p {
    width: 70vw;
    font-size: 12px;
  }

  .footer-container span {
    font-size: 12px;
  }
}
.white-text {
  color: white;
}

.black-text {
  color: black;
}
</style>
