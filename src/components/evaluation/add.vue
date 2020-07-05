<template>
  <div>
    <div class="flex form">
      <div>
        <sui-input
          :error="!isValid"
          class="input-custom-width big-big"
          size="massive"
          placeholder="Nombre del evaluación..."
          transparent
          v-model="evaluationName"
        />
      </div>
      <div>
        <span v-if="showGifs">
          <sui-button size="big" basic color="teal" inverted  @click="showGifs = false">MOSTRAR MEMES (HABILITADO)</sui-button>
        </span>
        <span v-if="!showGifs">
          <sui-button size="big" basic color="teal" inverted  @click="showGifs = true">MOSTRAR MEMES (DESHABILITADO)</sui-button>
        </span>
      </div>
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
import { Component, Prop } from "vue-property-decorator";
import BaseRepository from "../../services/baseRepository";
import BaseVue from "../../services/BaseVue.vue";
import Evaluation from "../../models/evaluation.model";

@Component({})
export default class Add extends BaseVue {
  @Prop({ default: 0}) areaId: number
  id: Number = 0
  repository: BaseRepository = new BaseRepository("Evaluation");
  evaluationName: string = "";
  file: any = null;
  showGifs: boolean = false;
  model: Evaluation = new Evaluation();

  processFile(event: any) {
    this.file = event.target.files[0];
  }

  async send() {
    this.model.subjectId = this.areaId;
    this.model.userId = this.$store.state.user.id;
    this.model.name = this.evaluationName;
    this.model.showGifs = this.showGifs;
    this.$store.commit("setLoading", true);
    await this.repository.add(this.model)
    this.$store.commit("setLoading", false);
    this.operationSuccess();
    this.$emit("changeComponent", { component: "base-component", id: 0 });
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


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

