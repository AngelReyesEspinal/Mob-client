<template>
  <div>
    <div class="flex end">
      <sui-button
        size="massive"
        basic
        color="teal"
        inverted
        @click="() => { this.$emit('changeComponent',  {component: 'add-component', id: 0}) }"
      >AGREGAR</sui-button>
    </div>
    <br/>

     <sui-table color="black" inverted>
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell>Nombre</sui-table-header-cell>
          <sui-table-header-cell>Mostrar memes</sui-table-header-cell>
          <sui-table-header-cell>Cantidad de preguntas</sui-table-header-cell>
          <sui-table-header-cell>Acciones</sui-table-header-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <sui-table-row v-for="evaluation in evaluations" :key="evaluation.id" >
          <sui-table-cell>{{ evaluation.name }}</sui-table-cell>
          <sui-table-cell>{{ evaluation.showGifs ? 'Sí' : 'No' }}</sui-table-cell>
          <sui-table-cell>{{ evaluation.questionQuantity }}</sui-table-cell>
          <sui-table-cell>
            <div>

              <sui-button @click="manage_questions(evaluation.id)" color="green" inverted animated="vertical">
                <sui-button-content hidden>Preguntas</sui-button-content>
                <sui-button-content visible>
                  <sui-icon name="add" />
                </sui-button-content>
              </sui-button>

              <sui-button @click="edit(evaluation.id)" color="blue" inverted animated="vertical">
                <sui-button-content hidden>Editar</sui-button-content>
                <sui-button-content visible>
                  <sui-icon name="edit" />
                </sui-button-content>
              </sui-button>

              <sui-button @click="operationDelete(evaluation.id, repository, loadData)" color="red" inverted animated="vertical">
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
    
  </div>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import BaseRepository from "../../services/baseRepository";
import Subject from "../../models/subject.model";
import './css/base.scss';
import BaseVue from '@/services/BaseVue.vue';
import Swal from "sweetalert2";
import Evaluation from "../../models/evaluation.model";

@Component({})
export default class Base extends BaseVue {
  @Prop({ default: 0}) areaId: number
  evaluations: Array<Evaluation> = [];
  repository: BaseRepository = new BaseRepository("Evaluation");

  mounted() {
    this.loadData();
  }
  
  manage_questions(id: number) {
    this.$emit('changeParentComponent', {component: 'question-module', id: id})
  }

  loadData() {
    this.$store.commit("setLoading", true);
    this.repository.getEvaluationBySubjectId(this.areaId).then((respone: any) => {
      this.evaluations = respone.data as Array<Evaluation>;
    });
    this.$store.commit("setLoading", false);
  }

  edit(id: number) {
    this.$emit('changeComponent', {component: 'edit-component', id: id})
  }
}
</script>
