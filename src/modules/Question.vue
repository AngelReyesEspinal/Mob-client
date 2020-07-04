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
        :id="id"
        :evaluationId="evaluationId"></component>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import Add from '../components/question/add.vue'
import Base from '../components/question/base.vue'
import Edit from '../components/question/edit.vue'
@Component({
  components: {
    'add-component' : Add,
    'base-component': Base,
    'edit-component': Edit,
  }
})
export default class Question extends Vue {
  @Prop({ default: 0}) evaluationId: number
  id: number = 0 
  component: string = 'base-component'

  manage_component(data: any) {
    this.component = data.component
    this.id = data.id
  }

  mounted () {
    this.$store.state.evaluationId = this.evaluationId
  }

  manage_module(data: any) {
    this.$emit('changeComponent', data)
  }
}
</script>

<style lang="scss" scoped>
</style>

