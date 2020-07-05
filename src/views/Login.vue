<template>
  <div class="home animate__animated animate__fadeInDown">
    <center>
      <h1 style="font-size: 80px;">MOB</h1>
    </center>

    <center :style="style">
      <transition name="fade">
        <span v-if="display == menu.menu">
          <div is="sui-button-group">
            <sui-button @click="showSecretKey" inverted size="massive" attached="left">
              <span style="font-size: 50px;">TENGO EL SECRET KEY</span>
            </sui-button>
            <sui-button @click="showLogin" inverted size="massive" attached="right">
              <span style="font-size: 50px;">SOY ADMINISTRADOR</span>
            </sui-button>
          </div>
        </span>
      </transition>
      <transition name="fade">
        <span v-if="display == menu.login">
          <div class="flex form" style="width: 40%;">
            <div>
              <sui-input
                :error="!isValidUserName"
                class="input-custom-width big-big"
                size="massive"
                placeholder="Usuario..."
                transparent
                autocomplete="off"
                v-model="username"
              />
            </div>
            <div>
              <sui-input
                type="password"
                :error="!isValidPassword"
                class="input-custom-width big-big"
                size="massive"
                placeholder="Contraseña..."
                transparent
                autocomplete="off"
                v-model="password"
              />
            </div>
          </div>

          <div class="flex end" style="width: 40%;">
            <sui-button size="massive" basic color="grey" inverted @click="showMenu">MENU</sui-button>
            <sui-button size="massive" basic color="teal" inverted @click="send">ACCEDER</sui-button>
          </div>
        </span>
      </transition>
      <transition name="fade">
        <span v-if="display == menu.secrect_key">
          <div class="flex form-secret-key" style="width: 40%;">
            <div>
              <sui-input
                :error="!isValidSecretKey"
                class="input-custom-width big-big"
                size="massive"
                placeholder="Secret key..."
                transparent
                autocomplete="off"
                v-model="secretkey"
              />
            </div>
          </div>

          <div class="flex end" style="width: 40%;">
            <sui-button size="massive" basic color="grey" inverted @click="showMenu">MENU</sui-button>
            <sui-button size="massive" basic color="teal" inverted @click="goToTest">ACCEDER</sui-button>
          </div>
        </span>
      </transition>
    </center>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Swal from "sweetalert2";
import BaseRepository from "../services/baseRepository";
import User from "../models/user.model";
@Component({
  components: {}
})
export default class Login extends Vue {
  menu: any = {
    menu: 1,
    login: 2,
    secrect_key: 3
  };
  display: any = null;
  style: string = "margin-top: 300px;";
  isValidUserName: boolean = true;
  isValidPassword: boolean = true;
  isValidSecretKey: boolean = true;
  password: string = "";
  username: string = "";
  secretkey: string = "";
  repository: BaseRepository = new BaseRepository("User");

  mounted() {
    this.display = this.menu.menu;
  }

  showLogin() {
    this.display = this.menu.login;
    this.style = "margin-top: 50px;";
  }

  showSecretKey() {
    this.display = this.menu.secrect_key;
    this.style = "margin-top: 50px;";
  }

  showMenu() {
    this.display = this.menu.menu;
    this.style = "margin-top: 300px;";
  }

  async send() {
    if (this.username && this.password) {
      let user = new User();
      user.userName = this.username;
      user.password = this.password;
      let exist = await this.repository.valdiateUser(user);

      if (exist.data) {
        this.$store.state.user = exist.data;
        this.$router.push('/')
      } else {
        Swal.fire({
          title: "Este usuario no existe!",
          text: "¿Deseas crearlo?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí"
        }).then(result => {
          if (result.value) {
            this.onConfirm(user);
          }
        });
      }
    } else {
      this.isValidUserName = false;
      this.isValidPassword = false;
    }
  }

  async onConfirm(user) {
    let createdUser = await this.repository.createIfNotExist(user);
    this.$store.state.user = createdUser.data;
    Swal.fire(
      'Muy bien',
      `Se ha agregado su usuario`,
      'success'
    )
    this.$router.push('/')
  }

  async goToTest() {
    if (this.secretkey) {
      let exist = await this.repository.validateKey(this.secretkey);
      if (exist.data) {
        this.$store.state.secretKey = this.secretkey;
        this.$router.push('/User')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha encontrado ningún área con ese código!',
        })
      }
      this.isValidSecretKey = true;
    } else {
      this.isValidSecretKey = false;
    }
  }
}
</script>

<style lang="scss" scoped>
// transitions

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

// end transitions

// breadcums

.m-arrow {
  margin-left: 10px;
  margin-right: 10px;
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

.form {
  justify-content: space-around;
  flex-direction: column;
  min-height: 300px !important;
}

.form-secret-key {
  justify-content: space-around;
  flex-direction: column;
  min-height: 100px !important;
}
</style>

