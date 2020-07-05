<template>
  <div id="app">
    <sui-dimmer :active="isLoading">
      <sui-loader size="massive"> Espere un momento </sui-loader>
    </sui-dimmer>
    <router-view class="full-width"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  }
})
export default class App extends Vue {

  get isLoading () {
    return this.$store.state.loading;
  }
}
</script>

<style lang="scss">
  .flex {
    display: flex;
  }

  .end {
    justify-content: flex-end;
  }

  #app {
    display: flex;
    padding: 4%;
    color: white;
    background-color: #131417 !important;
    min-height: 100vh;
  }

  .full-width {
    width: 100%;
  }

  // inputs

  .input-custom-width {
    width: 100%;
  }

  input {
    color: white!important;
  }

  .big-big input {
    height: 100px;
    font-size: 60px;
  }

  
  .not-too-big-but-big {
    height: 80px;
    font-size: 40px;
  }


.ui.modal {
  background-color: black!important;
}

</style>
