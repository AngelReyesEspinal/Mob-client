<template>
  <div>
    <div class="flex end">
      <sui-button
        size="massive"
        basic
        color="teal"
        inverted
        @click="() => { this.$emit('changeComponent', 'add-component') }"
      >AGREGAR</sui-button>
    </div>
    <br/>

    <main>
      <article  v-for="subject in subjects" :key="subject.id" class="postcard blue">
        <img class="postcard__img" :src="subject.logo" height="215" alt="Image Title" />
        <div class="postcard__text">
          <h1 class="postcard__title blue">
            <a href="#" @click="goToEvaluation(subject.id)">{{ subject.name }}</a>
          </h1>
          <span style="font-size: 20px;">
            <b style="color: #95a5a6"> Secret key: </b> &nbsp; {{ subject.secretKey }}
          </span>
          <div class="postcard__bar"></div>

          <div>
            <sui-button @click="operationDelete(subject.id, repository, loadData)" color="red" animated="vertical">
              <sui-button-content hidden>Eliminar</sui-button-content>
              <sui-button-content visible>
                <sui-icon name="delete" />
              </sui-button-content>
            </sui-button>
          </div>

        </div>
      </article>
    </main>
    
  </div>
</template>

<script lang='ts'>
import { Component } from "vue-property-decorator";
import BaseRepository from "../../services/baseRepository";
import Subject from "../../models/subject.model";
import './css/base.scss';
import BaseVue from '@/services/BaseVue.vue';
import Swal from "sweetalert2";

@Component({})
export default class Base extends BaseVue {
  subjects: Array<Subject> = [];
  repository: BaseRepository = new BaseRepository("Subject");
  img: string = "";

  mounted() {
    this.loadData();
  }

  loadData() {
    debugger;
    this.$store.commit("setLoading", true);
    this.repository.getByUserId(1).then((respone: any) => {
      this.subjects = respone.data as Array<Subject>;
    });
    this.$store.commit("setLoading", false);
  }

  goToEvaluation(id: number) {
    alert(id);
  }

  get reloadWhen() {
    return 
  }
}
</script>
