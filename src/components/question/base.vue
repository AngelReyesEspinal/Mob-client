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

      <template v-if="questions && questions.length > 0">
     <sui-table color="black" inverted>
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell>Nombre</sui-table-header-cell>
          <sui-table-header-cell>Comodín</sui-table-header-cell>
          <sui-table-header-cell>Respuesta correcta</sui-table-header-cell>
          <sui-table-header-cell>Acciones</sui-table-header-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <sui-table-row v-for="evaluation in questions" :key="evaluation.id" >
          <sui-table-cell>{{ evaluation.name }}</sui-table-cell>
          <sui-table-cell>{{ evaluation.wildcard }}</sui-table-cell>
          <sui-table-cell>
            <div v-for="answer in evaluation.questionAnswerOptions" :key="answer.id">
             <template v-if="answer.isCorrect">
                <i class="fas fa-thumbs-up" ></i> <span style="margin-left: 10px;"> </span> {{ answer.title }}
             </template>
            </div>
          </sui-table-cell>
          <sui-table-cell>
            <div>
              
              <sui-button @click="ver(evaluation)" color="orange" inverted animated="vertical">
                <sui-button-content hidden>Imagen</sui-button-content>
                <sui-button-content visible>
                  <sui-icon name="eye" />
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
    </template>
    <template v-else>
      <span style="padding: 10px; font-size: 35px;">No se ha agregado preguntas</span>
    </template>
    

     <sui-modal style="background-color: black;" v-model="open">
       <center>
        <sui-image
          :src="currentImg"
        />
       </center>
    </sui-modal>

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
import Question from "../../models/question.model";

@Component({})
export default class Base extends BaseVue {
  @Prop({ default: 0}) evaluationId: number
  questions: Array<Question> = [];
  repository: BaseRepository = new BaseRepository("Question");
  open: boolean = false;
  currentImg: string = '';

  mounted() {
    this.loadData();
  }

  ver(data: any) {
    this.currentImg = data.img;
    this.open = true;
  }
  
  manage_questions(id: number) {
    this.$emit('changeParentComponent', {component: 'question-module', id: id})
  }

  loadData() {
    this.repository.getQuestionByEvaluationId(this.evaluationId).then((respone: any) => {
      this.questions = respone.data as Array<Question>;
    });
  }

  edit(id: number) {
    this.$emit('changeComponent', {component: 'edit-component', id: id})
  }
}
</script>
