<template>
  <div class="pdf-container">
    <div class="caminheiros-logo">
      <img
        src="https://static.wixstatic.com/media/4f4b22_a6ecbef17b754f1b9397c72e87c8aa3a~mv2.png/v1/fill/w_152,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/caminheiros-do-bem-png-branco.png"
      />
    </div>
    <div>
      <p>20/03/2023</p>
    </div>
    <div class="participants">
      <h6>Relatório de participantes</h6>
      <p v-for="user in users">
        {{ user.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      users: [
        {
          name: "José",
        },
        {
          name: "Pedro",
        },
        {
          name: "Socrates",
        },
        {
          name: "Platão",
        },
        {
          name: "José",
        },
        {
          name: "Pedro",
        },
        {
          name: "Socrates",
        },
        {
          name: "Platão",
        },
        {
          name: "José",
        },
      ],
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
.caminheiros-logo img {
  width: 5vw;
  padding: 10px;
  border-radius: 10px;
  background-color: #182634;
}

.pdf-container {
  width: 50vw;
  margin: auto;
}

.participants h6 {
  border: 1px solid black;
  margin: 0;
  padding: 5px;
}

.participants p {
  border: 1px solid black;
  margin: 0;
  padding: 5px;
  font-size: 15px;
}

@media screen and (max-width: 599.99px) {
  .caminheiros-logo img {
    width: 20vw;
    padding: 10px;
    border-radius: 10px;
    background-color: #182634;
  }

  .pdf-container {
    width: 80vw;
    margin: auto;
  }

  .participants h6 {
    border: 1px solid black;
    margin: 0;
    padding: 5px;
  }

  .participants p {
    border: 1px solid black;
    margin: 0;
    padding: 5px;
  }
}
</style>
