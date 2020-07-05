<template>
  <div>
    <div class="flex form">
      <div v-if="model">
        <sui-input
          :error="!isValid"
          class="input-custom-width big-big"
          size="massive"
          placeholder="Título de la pregunta..."
          transparent
          v-model="model.name"
        />
      </div>
      <div v-if="model">
        <sui-input
          :error="!isValid"
          class="input-custom-width big-big"
          size="massive"
          placeholder="Pista..."
          transparent
          v-model="model.wildcard"
        />
      </div>
      <br />
      <br />
      <div v-if="model">
        <label for="file" id="selector">{{ file ? file.name : model.fileName }}</label>
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
            :error="!isValidAnswer"
            class=" input-custom-width not-too-big-but-big"
            size="massive"
            placeholder="Respuesta..."
            transparent
            v-model="answer"
          />
        </div>
        <div style="width: 30%">
          <span v-if="isCorrect">
            <sui-button size="big" basic color="teal" inverted  @click="isCorrect = false" > ES CORRECTA <span style="margin-left: 10px!important;"> <i class="fas fa-thumbs-up"></i> </span> </sui-button>
          </span>
          <span v-if="!isCorrect">
            <sui-button size="big" basic color="teal" inverted  @click="isCorrect = true" > NO ES CORRECTA  <span style="margin-left: 10px!important;"><i class="fas fa-thumbs-down"></i></span></sui-button>
          </span>
        </div>
        <div style="width: 30%">
          <sui-button size="big" basic color="teal" inverted icon="add" @click="addAnswer"> AGREGAR RESPUESTA </sui-button>
        </div>
      </div>

      <template v-if="model && model.questionAnswerOptions.length > 0 && model.questionAnswerOptions.some(x => !x.deleted)">
        <sui-table color="black" inverted>
          <sui-table-header>
            <sui-table-row>
              <sui-table-header-cell>Respuesta posible</sui-table-header-cell>
              <sui-table-header-cell>Es correcta</sui-table-header-cell>
              <sui-table-header-cell>Acciones</sui-table-header-cell>
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row v-for="(answer, index) in model.questionAnswerOptions" :key="index">
              <template v-if="!answer.deleted">
                <sui-table-cell> {{ answer.title }} </sui-table-cell>
                <sui-table-cell> {{ answer.isCorrect ? 'Sí' : 'No' }} </sui-table-cell>
                <sui-table-cell>
                  <div>
                    <sui-button @click="deleteAnswer(answer.id, index)" color="red" inverted animated="vertical">
                      <sui-button-content hidden>Eliminar</sui-button-content>
                      <sui-button-content visible>
                        <sui-icon name="delete" />
                      </sui-button-content>
                    </sui-button>
                  </div>
                </sui-table-cell>
              </template>
            </sui-table-row>
          </sui-table-body>
        </sui-table>
        <br/>
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
import QuestionAnswerOption from "../../models/questionAnswerOption.model";
import Question from "../../models/question.model";

@Component({})
export default class Add extends BaseVue {
  @Prop({ default: 0 }) id: number;

  repository: BaseRepository = new BaseRepository("Question");
  questionName: string = "";
  pista: string = "";
  answer: string = "";
  file: any = null;
  isCorrect: boolean = false;
  answers: Array<QuestionAnswerOption> = [];
  isValidAnswer: boolean = true;
  model: Question = null;


  processFile(event: any) {
    this.file = event.target.files[0];
  }

  async mounted() {
    this.repository.getByIdCustom(this.id).then((response: any) => {
        if (response) {
          this.model = response.data as Question
          
        }
    });
  }


  async send() {
    let data = this.getFormData()
    this.$store.commit("setLoading", true);
    await this.repository.editSubject(data);
    await this.repository.addAnswers(this.model);
    this.$store.commit("setLoading", false);
    this.operationSuccess();
    this.$emit("changeComponent", { component: "base-component", id: 0 });
    data  = new FormData()
  }

  addAnswer() {
    if (this.answer) {
      let answer = new QuestionAnswerOption()
      answer.isCorrect = this.isCorrect
      answer.title = this.answer
      this.model.questionAnswerOptions.push(answer)
      this.cleanAnswer()
    } else 
      this.isValidAnswer = false 
  }

  cleanAnswer() {
    this.isCorrect = false
    this.answer = ''
    this.isValidAnswer = true
  }

  deleteAnswer(id: number, index: number) {
    if (id > 0) {
      let answer = this.model.questionAnswerOptions.find(x => x.id == id)
      answer.deleted = true
    } else {
      this.model.questionAnswerOptions.splice(index, 1)
    }
  }

  getFormData(): FormData {
    data = new FormData()
    data.append('id', String(this.model.id))
    data.append('name', this.model.name)
    data.append('pista', this.model.wildcard)
    data.append('file', this.file)
    return data
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

