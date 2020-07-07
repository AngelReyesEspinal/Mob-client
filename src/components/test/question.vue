<template>
  <div>
    <div v-if="model" class="flex end">
      <span style="font-size: 60px;"> <span v-if="showPista" @click="() => { this.mostrarPista = true, this.showPista = false }"  class="pista"> <i class="fas fa-eye"></i> </span>  {{currentQuestion.uiIndex + 1}} / {{ model.questionQuantity }}</span>
    </div>
    <br />
    <sui-progress state="active" indicating :percent="percent" />

    <br />
    <div v-if="!showResults && currentQuestion">
      <center>
        <transition
          v-for="(question, index) in questions"
          :key="question.key"
          name="custom-classes-transition"
          enter-active-class="animate__animated animate__backInLeft"
          leave-active-class="animate__animated animate__backOutLeft"
        >
          <div v-if="currentQuestion && currentQuestion.uiIndex == index">
            <span style="font-size: 60px;">¿ {{ currentQuestion.name }} ? 
              <template v-if="mostrarPista">
                <br/>
                <br/>
                {{  currentQuestion.wildcard }}
              </template>
            </span>

            <br />
            <br />
            <br />

            <img style="width: 500px;" :src="currentQuestion.img" alt />

            <br />
            <br />
            <br />
            
            <sui-grid :columns="2">
              <sui-grid-row>
                <sui-grid-column
                  v-for="question in currentQuestion.questionAnswerOptions"
                  :key="question.id"
                >
                  <sui-button
                    style="margin-bottom: 30px;"
                    size="massive"
                    basic
                    color="teal"
                    inverted
                    @click="validateAnswer(currentQuestion.name,question, currentQuestion.questionAnswerOptions.find(x => x.isCorrect))"
                  >{{ question.title }}</sui-button>
                </sui-grid-column>
              </sui-grid-row>
            </sui-grid>
          </div>
        </transition>
      </center>
    </div>
    <h1 v-if="showResults" style="margin-top: 5px;">
      <center>
        <span style="font-size: 60px;">MIS RESULTADOS</span>
      </center>
      <br/>
      <br/>
      <span style="font-size: 40px;">RESPUESTAS <span style="color: #16a085; margin-right: 100px;"> CORRECTAS <i class="far fa-laugh-beam"></i> </span> {{ goodAnswers }} / {{ model.questionQuantity }}</span>  <br/>
      <br/>
      <span style="font-size: 40px;">RESPUESTAS <span style="color: #c0392b; margin-right: 60px;"> INCORRECTAS <i class="far fa-angry"></i> </span> {{ badAnswers }} / {{ model.questionQuantity }} </span>
   
      <br/>
      <br/>
      <div v-if="myResults.length > 0 && myResults.some(x => !x.isCorrect)">
        <span style="font-size: 40px; color: #636e72"> ¿En qué falle? <i class="fas fa-sad-tear"></i> </span> 
        <div v-for="badResult in myResults.filter(x => !x.isCorrect)" :key="badResult.id">
          <br/>
          Mi respuesta <span style="color: #c0392b;"> {{ badResult.myAsnwer }} </span> <i class="fas fa-long-arrow-alt-right"></i> respuesta correcta: <span style="color: #16a085;"> {{ badResult.correctAnswer }} <i class="fas fa-check"></i> </span>
        </div>
      </div>
      <div v-else>
        <br/>
        <br/>
        <center>
          <span style="font-size: 60px; color: #16a085;"> ¡FELICIDADES CONTESTASTE TODAS BIEN CRACK <i class="far fa-grin-tongue-wink"></i> ! </span>
        </center>
      </div>

    </h1>

    <sui-modal v-model="open">
      <template
        v-if="happyGifsList && happyGifsList.length > 0  && sadGifsList && sadGifsList.length > 0  && currentQuestion"
      >
        <center>
          <sui-image v-if="isCorrect" wrapped :src="happyGifsList[currentQuestion.uiIndex].url" />
          <sui-image v-else wrapped size="medium" :src="sadGifsList[currentQuestion.uiIndex].url" />
        </center>
      </template>
    </sui-modal>
  </div>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import BaseRepository from "../../services/baseRepository";
import BaseVue from "../../services/BaseVue.vue";
import Subject from "../../models/subject.model";
import Evaluation from "../../models/evaluation.model";
import Question from "../../models/question.model";
import QuestionAnswerOption from "../../models/questionAnswerOption.model";

@Component({})
export default class SingleQuestion extends BaseVue {
  @Prop({ default: 0 }) id: number;
  repository: BaseRepository = new BaseRepository("Evaluation");
  subjectName: string = "";
  file: any = null;
  model: Evaluation = null;
  open: boolean = false;
  //
  questions: Array<Question> = [];
  currentQuestion: Question = null;
  sadGifsList: Array<string> = [];
  happyGifsList: Array<string> = [];
  isCorrect: boolean = false;
  myResults = [];
  goodAnswers: number = 0;
  badAnswers: number = 0;
  showResults: boolean = false;
  percent: number = 0;
  increseQuantity: number = 0;
  showPista: boolean = true;
  mostrarPista: boolean = false;

  get label() {
    return `${this.percent}% Funded`;
  }

  increase() {
    this.percent += this.increseQuantity;
    if (this.percent >= 100) {
      this.percent = 100;
    }
  }

  async mounted() {
    this.repository.GetByIdFull(this.id).then((response: any) => {
      if (response) {
        this.model = response.data as Evaluation;
        this.subjectName = this.model.name;
        this.questions = this.model.questionsFrontEnd;
        this.currentQuestion = this.questions[0];
        this.currentQuestion.uiIndex = 0;

        this.increseQuantity = Math.ceil(100 / this.questions.length)

        let sadGifsUrl = `https://api.giphy.com/v1/gifs/search?api_key=WYBnklj9zYEZPaNetvJnJw2GcFoQkKgJ&q=Bad&limit=${this.model.questionQuantity}&offset=0&rating=g&lang=en`;
        let happyGifsUrl = `https://api.giphy.com/v1/gifs/search?api_key=WYBnklj9zYEZPaNetvJnJw2GcFoQkKgJ&q=Congratulations&limit=${this.model.questionQuantity}&offset=0&rating=g&lang=en`;

        this.repository.getGifs(sadGifsUrl).then((response: any) => {
          if (response.data) {
            this.sadGifsList = response.data.data.map(
              x => x.images.downsized_large
            );
          }
        });

        this.repository.getGifs(happyGifsUrl).then((response: any) => {
          if (response.data) {
            this.happyGifsList = response.data.data.map(
              x => x.images.downsized_large
            );
          }
        });
      }
    });
  }

  validateAnswer(
    questionTitle: string,
    answer: QuestionAnswerOption,
    correctAnswer: QuestionAnswerOption
  ) {
    this.mostrarPista = false; 
    this.open = true;
    this.isCorrect = answer.isCorrect;

    if (this.isCorrect) {
      this.goodAnswers++;
      this.myResults.push({
        questionTitle: questionTitle,
        correctAnswer: correctAnswer.title,
        myAsnwer: answer.title,
        isCorrect: true
      });
    } else {
      this.badAnswers++;
      this.myResults.push({
        questionTitle: questionTitle,
        correctAnswer: correctAnswer.title,
        myAsnwer: answer.title,
        isCorrect: false
      });
    }

    setTimeout(() => {
      this.open = false;
      setTimeout(() => {
        let newIndex = this.currentQuestion.uiIndex + 1;
        if (this.questions[newIndex]) {
          this.currentQuestion = null;
          this.currentQuestion = this.questions[newIndex];
          this.currentQuestion.uiIndex = newIndex;
        } else {
          this.showResults = true;
        }
        this.increase();
      }, 500);
    }, 3000);

    
  }
}
</script>

<style lang="scss" scoped>
.pista {
  color: #95a5a6;
}

.pista:hover {
  color: #16a085;
  cursor: pointer;
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

