<template>
  <div>
    <transition 
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__backInLeft"
      leave-active-class="animate__animated animate__backOutLeft"
    >
      <component 
        v-bind:is="component" 
        @changeComponent="manage_component"
        @changeParentComponent="manage_module"
        :id="id"></component>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Base from '../components/test/base.vue'
import Question from '../components/test/question.vue'
@Component({
  components: {
    'base-module': Base,
    'question-component': Question,
  }
})
export default class User extends Vue {
  id: number = 0
  component: string = 'base-module'

  manage_component(data: any) {
    this.component = data.component
    this.id = (data.id > 0) ? data.id : this.id
  }

  manage_module(data: any) {
    this.$emit('changeComponent', data)
  }
}
</script>

<style lang="scss" scoped>
</style>

