<template>
  <div class="home">

    <!-- BREADCUMS -->

    <h1 class="animate__animated animate__fadeInLeftBig"> 
      <span class="tab-item" :class="currentStep > 1 ? 'watched-tab': ''"  @click="() => {currentStep = 1, component='subject-module'}"> Áreas </span>
      <transition name="fade">
        <span v-if="currentStep >= 2">
          <span class="m-arrow"> <i class="fas fa-angle-right"></i> </span> 
          <span class="tab-item" :class="currentStep > 2 ? 'watched-tab': ''" @click="showEvaluations"> Evaluaciones </span>
        </span>  
      </transition>
      <transition name="fade">
        <span v-if="currentStep >= 3">
          <span class="m-arrow"> <i class="fas fa-angle-right"></i> </span> 
          <span class="tab-item" :class="currentStep > 3 ? 'watched-tab': ''"  @click="currentStep = 3"> Preguntas </span>  
        </span> 
      </transition>
      <transition name="fade">
        <span v-if="currentStep >= 4">
          <span class="m-arrow"> <i class="fas fa-angle-right"></i> </span> 
          <span class="tab-item"> Respuestas </span> 
        </span>  
      </transition>
    </h1> 

    <!-- MODULES -->
    
    <div class="animate__animated animate__fadeInLeftBig">
      <transition 
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__backInLeft"
        leave-active-class="animate__animated animate__backOutLeft"
      >
        <component 
          v-bind:is="component" 
          @changeComponent="manage_component"
          :id="id"
          :areaId="id"></component>
      </transition>
    </div>
    
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import SubjectModule from '../modules/Subject.vue'
import EvaluationModel from '../modules/Evaluation.vue'
import QuestionModule from '../modules/Question.vue'

@Component({
  components: {
    'subject-module' : SubjectModule,
    'evaluation-module' : EvaluationModel,
    'question-module': QuestionModule
  }
})
export default class Home extends Vue {
  id: number = 0
  currentStep: number = 1
  component: string = 'subject-module'

  manage_component(data: any) {
    this.component = data.component
    this.id = data.id
    switch (data.component) {
      case 'subject-module':
        this.currentStep = 1
        break;
      case 'evaluation-module':
        this.currentStep = 2
        break;
      case 'question-module':
        this.currentStep = 3
        break;
    }
    this.component = data.component
  }

  showEvaluations() {
    this.id = this.$store.state.areaId
    this.currentStep = 2
    this.component = 'evaluation-module'
  }
}

</script>

<style lang="scss" scoped>

// transitions

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

// end transitions

// breadcums 

.m-arrow {
  margin-left: 10px;  margin-right: 10px;
}

.tab-item {
  font-size: 40px;
}

.watched-tab {
  color: #7f8c8d;
  transition: all 100ms linear;
  transition-duration: 0.2s;
}

.watched-tab:hover {
  cursor: pointer;
  font-size: 41px;
  color: #95a5a6;
}

.module-wrapper-margin {
  margin-top: 50px;
}
</style>

