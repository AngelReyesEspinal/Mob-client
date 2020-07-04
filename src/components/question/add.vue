<template>
  <div>
    <div class="flex form">
      <div>
        <sui-input
          :error="!isValid"
          class="input-custom-width big-big"
          size="massive"
          placeholder="Título de la pregunta..."
          transparent
          v-model="questionName"
        />
      </div>
      <div>
        <sui-input
          :error="!isValid"
          class="input-custom-width big-big"
          size="massive"
          placeholder="Pista..."
          transparent
          v-model="pista"
        />
      </div>
      <br />
      <br />
      <div>
        <label for="file" id="selector">{{ file ? file.name : 'Selecciona una imagen'}}</label>
        <input type="file" id="file" @change="processFile($event)" hidden />
      </div>
      <br />
      <br />
      <br />
      <a is="sui-label" color="teal" tag>
        <span style="font-size: 30px;">Respuestas</span>
      </a>

      <br />

      <div class="flex">
        <div style="width: 50%">
          <sui-input
            :error="!isValid"
            class=" input-custom-width not-too-big-but-big"
            size="massive"
            placeholder="Respuesta..."
            transparent
            v-model="answer"
          />
        </div>
        <span v-if="showGifs">
          <sui-button size="big" basic color="teal" inverted  @click="showGifs = false">ES CORRECTA</sui-button>
        </span>
        <span v-if="!showGifs">
          <sui-button size="big" basic color="teal" inverted  @click="showGifs = true">NO ES CORRECTA</sui-button>
        </span>
      </div>

      <template v-if="answers.length > 0">
        <sui-table color="black" inverted>
          <sui-table-header>
            <sui-table-row>
              <sui-table-header-cell>Respuesta posible</sui-table-header-cell>
              <sui-table-header-cell>Es correcta</sui-table-header-cell>
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row v-for="answer in answers" :key="answer.id">
              <sui-table-cell></sui-table-cell>
              <sui-table-cell></sui-table-cell>
              <sui-table-cell>
                <div>
                  <sui-button color="red" inverted animated="vertical">
                    <sui-button-content hidden>Eliminar</sui-button-content>
                    <sui-button-content visible>
                      <sui-icon name="delete" />
                    </sui-button-content>
                  </sui-button>
                </div>
              </sui-table-cell>
            </sui-table-row>
          </sui-table-body>
        </sui-table>
      </template>
      <template v-else>
        <span style="padding: 10px; font-size: 25px;">No se ha agregado ninguna respuesta</span>
      </template>

      <div class="flex end">
        <sui-button
          size="massive"
          basic
          color="grey"
          inverted
          @click=" () => { this.$emit('changeComponent', { component: 'base-component', id: 0 }) } "
        >REGRESAR</sui-button>
        <sui-button size="massive" basic color="teal" inverted type="submit" @click="send">AGREGAR</sui-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
let data = new FormData();

import { Component, Prop } from "vue-property-decorator";
import BaseRepository from "../../services/baseRepository";
import BaseVue from "../../services/BaseVue.vue";
import Evaluation from "../../models/evaluation.model";

@Component({})
export default class Add extends BaseVue {
  @Prop({ default: 0 }) areaId: number;
  id: Number = 0;
  repository: BaseRepository = new BaseRepository("Evaluation");
  questionName: string = "";
  pista: string = "";
  answer: string = "";
  file: any = null;
  showGifs: boolean = false;
  model: Evaluation = new Evaluation();
  answers: any = [];


  processFile(event: any) {
    this.file = event.target.files[0];
  }

  async send() {
    this.model.subjectId = this.areaId;
    this.model.userId = 1;
    this.model.name = this.questionName;
    this.model.showGifs = this.showGifs;
    this.$store.commit("setLoading", true);
    await this.repository.add(this.model);
    this.$store.commit("setLoading", false);
    this.operationSuccess();
    this.$emit("changeComponent", { component: "base-component", id: 0 });
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.title {
  font-size: 40px;
}

.form-answers {
  justify-content: space-around;
  flex-direction: row;
}

.form {
  justify-content: space-around;
  flex-direction: column;
  min-height: 300px !important;
}

#selector {
  padding: 16px 48px;
  border: 2px solid #bdc3c7; //#6dffff;
  color: #bdc3c7;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
}

#selector:hover {
  border: 2px solid #6dffff !important;
  color: #6dffff;
  cursor: pointer;
  border-radius: 2px;
}

#selector.active {
  background-color: white;
}
</style>

