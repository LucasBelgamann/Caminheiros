<template>
  <div
    class="history-result-container"
    :class="mode ? 'default-card-color-dark' : 'default-card-color-light'"
  >
    <p class="header-history-result">20/03/2023</p>
    <div class="participants-result-history">
      <p :class="mode ? 'dark-theme' : 'light-theme'" v-for="user in users" :key="user.name">
        {{ user.name }}
      </p>
    </div>
    <div class="download-btn">
      <q-btn icon="picture_as_pdf" @click="gerarPDF" label="Baixar PDF"></q-btn>
    </div>
    <div style="display: none" ref="componenteInvisivel">
        <Pdf />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Pdf from "./Pdf.vue";
import html2pdf from "html2pdf.js";

export default defineComponent({
  components: { Pdf },
  data() {
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
    mode() {
      return this.$q.dark.isActive;
    },
  },
  methods: {
    gerarPDF() {
      const contentHTML: string = (this.$refs.componenteInvisivel as HTMLElement).innerHTML;
      const html2pdfInstance = html2pdf();
      html2pdfInstance.from(contentHTML).save("nome_do_arquivo.pdf");
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
</style>
