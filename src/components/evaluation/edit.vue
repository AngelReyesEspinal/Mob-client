<template>
  <div>
    <div class="flex form">
      <div>
        <template v-if="this.model">
          <sui-input
            :error="!isValid"
            class="input-custom-width big-big"
            size="massive"
            placeholder="Nombre del área..."
            transparent
            name="name"
            v-model="model.name"
          />
        </template>
      </div>
      <div v-if="this.model">
        <span v-if="model.showGifs">
          <sui-button
            size="big"
            basic
            color="teal"
            inverted
            @click="model.showGifs = false"
          >MOSTRAR MEMES (HABILITADO)</sui-button>
        </span>
        <span v-if="!model.showGifs">
          <sui-button
            size="big"
            basic
            color="teal"
            inverted
            @click="model.showGifs = true"
          >MOSTRAR MEMES (DESHABILITADO)</sui-button>
        </span>
      </div>
      <div class="flex end">
        <sui-button
          size="massive"
          basic
          color="grey"
          inverted
          @click=" () => { this.$emit('changeComponent', {component: 'base-component', id: 0}) } "
        >REGRESAR</sui-button>
        <sui-button size="massive" basic color="teal" inverted @click="send">EDITAR</sui-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
let data = new FormData();

import { Component, Prop } from "vue-property-decorator";
import BaseRepository from "../../services/baseRepository";
import BaseVue from "../../services/BaseVue.vue";
import Subject from "../../models/subject.model";
import Evaluation from "../../models/evaluation.model";

@Component({})
export default class Edit extends BaseVue {
  @Prop({ default: 0 }) id: number;
  repository: BaseRepository = new BaseRepository("Evaluation");
  subjectName: string = "";
  file: any = null;
  model: Evaluation = null;
  open: boolean = false;

  toggle() {
    this.open = !this.open;
  }

  async mounted() {
    this.repository.getById(this.id).then((response: any) => {
      if (response) {
        this.model = response.data as Evaluation;
        this.subjectName = this.model.name;
      }
    });
  }

  processFile(event: any) {
    this.file = event.target.files[0];
  }

  async send() {
    if (this.model.name) {
      let myEvent: any = event as any;
      myEvent.preventDefault();
      this.$store.commit("setLoading", true);
      await this.repository.edit(this.model);
      this.$store.commit("setLoading", false);
      this.operationSuccess();
      this.$emit("changeComponent", { component: "base-component", id: 0 });
      data = new FormData();
    } else {
      this.operationNotAllowed();
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 40px;
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

