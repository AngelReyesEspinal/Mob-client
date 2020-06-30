<template>
  <div>
    <transition 
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__backInLeft"
      leave-active-class="animate__animated animate__backOutLeft"
    >
      <component 
        v-bind:is="component" 
        @changeComponent="(component_name) => component = component_name"></component>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Add from '../components/subject/add.vue'
import Base from '../components/subject/base.vue'
@Component({
  components: {
    'add-component' : Add,
    'base-component': Base,
  }
})
export default class Subject extends Vue {
  component: string = 'base-component';
}
</script>

<style lang="scss" scoped>
</style>

