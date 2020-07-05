<template>
  <div class="home">
    <div class="animate__animated animate__fadeInLeftBig">
      <transition 
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__backInLeft"
        leave-active-class="animate__animated animate__backOutLeft"
      >
        <component 
          v-bind:is="component" 
          @changeComponent="manage_component"
          ></component>
      </transition>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import UserModule from '../modules/User.vue'

@Component({
  components: {
    'user-module' : UserModule,
  }
})
export default class User extends Vue {
  currentStep: number = 1
  component: string = 'user-module'

  mounted() {
    if (!this.$store.state.secretKey)
      this.$router.push('/Login'); 
  }

  manage_component(data: any) {
    this.component = data.component
    
  }

  showEvaluations() {
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

