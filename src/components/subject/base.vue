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

    <main v-if="subjects">
      <article  v-for="subject in subjects" :key="subject.id" class="postcard blue">
        <img class="postcard__img" :src="subject.logo" height="215" alt="Image Title" />
        <div class="postcard__text">
          <h1 class="postcard__title blue">
            <a href="#" @click="manage_evaluations(subject.id)">{{ subject.name }}</a>
          </h1>
          <span style="font-size: 20px;">
            <b style="color: #95a5a6"> Secret key: </b> &nbsp; {{ subject.secretKey }}
          </span>
          <div class="postcard__bar"></div>

          <div>
            <sui-button @click="operationDelete(subject.id, repository, loadData)" color="red" inverted animated="vertical">
              <sui-button-content hidden>Eliminar</sui-button-content>
              <sui-button-content visible>
                <sui-icon name="delete" />
              </sui-button-content>
            </sui-button>

            <sui-button @click="edit(subject.id)" color="blue" inverted animated="vertical">
              <sui-button-content hidden>Editar</sui-button-content>
              <sui-button-content visible>
                <sui-icon name="edit" />
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

  async loadData() {
    this.repository.getByUserId(1).then((respone: any) => {
      this.subjects = respone.data as Array<Subject>;
    });
  }

  manage_evaluations(id: number) {
    this.$emit('changeParentComponent', {component: 'evaluation-module', id: id})
  }

  edit(id: number) {
    this.$emit('changeComponent', {component: 'edit-component', id: id})
  }
}
</script>
