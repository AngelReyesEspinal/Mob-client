<template>
  <div>

    <main v-if="subject">
      <article  class="postcard blue">
        <img class="postcard__img" :src="subject.logo" height="215" alt="Image Title" />
        <div class="postcard__text">
          <h1 class="postcard__title blue">
            <a href="#">{{ subject.name }}</a>
          </h1>
          <span style="font-size: 20px;">
            <b style="color: #95a5a6"> Secret key: </b> &nbsp; {{ subject.secretKey }}
          </span>
          <div class="postcard__bar"></div>
        </div>
      </article>
    </main>

    <h1 style="font-size: 40px;">
      Evaluaciones
    </h1>
    <br/>

     <sui-table v-if="evaluations && evaluations.length > 0" color="black" inverted>
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

              <sui-button @click="makeEvaluation(evaluation.id)" color="blue" inverted animated="vertical">
                <sui-button-content hidden>Realizar</sui-button-content>
                <sui-button-content visible>
                  <sui-icon name="eye" />
                </sui-button-content>
              </sui-button>

            </div>
          </sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>
    <div v-else>
       <h1>
        <span style="font-size: 40px;"> 
          No se ha agregado evaluaciones
        </span>
      </h1>
    </div>
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
  evaluations: Array<Evaluation> = [];
  repository: BaseRepository = new BaseRepository("Evaluation");
  repositorySubject: BaseRepository = new BaseRepository("Subject");
  subject: Subject = null;
  mounted() {
    this.loadData();
  }
  
  manage_questions(id: number) {
    this.$emit('changeParentComponent', {component: 'question-module', id: id})
  }

  loadData() {
    this.repository.getEvaluationBySubjectSecretKey(this.$store.state.secretKey).then((respone: any) => {
      this.evaluations = respone.data as Array<Evaluation>;
    });

    this.repositorySubject.getEvaluationBySubjectSecretKey(this.$store.state.secretKey).then((respone: any) => {
      this.subject = respone.data as Subject;
    });
  }

  makeEvaluation(id: number) {
    this.$emit('changeComponent', {component: 'question-component', id: id})
  }
}
</script>
