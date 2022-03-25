<template>
  <div class="about">
    <h1>Add new user</h1>

    <div class="add-user">
      <form data-cy="add" ref="add" @submit.prevent="addUser()">
        <input type="text" name="name" v-model="user.name" placeholder="Add name..." />
        <input type="text" name="job" v-model="user.job" placeholder="Add job..." />
        <button type="submit" :disabled="!isFormValid">
          Create user
          <Spinner v-if="loading" />
        </button>
      </form>

      <div class="alert success" v-if="getResponseMsg">
        User <strong>{{ getResponseMsg.name }}</strong> was created successfully &#128077;
      </div>
      <div class="alert error" v-if="errorMsg">
        Sorry! An error has occurred &#129335;
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Spinner from '../components/Spinner.vue';

export default {
  components: { Spinner },
  name: 'Add',
  data() {
    return {
      user: {
        name: '',
        job: ''
      },
      loading: false,
      errorMsg: false
    }
  },
  created() {
    this.$store.commit('resetResponseMsg')
  },
  computed: {
    ...mapGetters(['getResponseMsg']),
    isFormValid() {
      return this.user.name !== '' && this.user.job !== ''
    },
  },
  methods: {
    resetForm() {
      this.user.name = ''
      this.user.job = ''
    },
    addUser() {
      if (this.isFormValid) {
        this.loading = !this.loading
        this.$store.dispatch('createUser', this.user)
          .then(() => {
            this.resetForm()
            this.loading = !this.loading
          })
          .catch(()=>{
            this.resetForm()
            this.errorMsg = !this.errorMsg
            this.loading = !this.loading
          })
      }
    }
  }
}
</script>

<style scoped>
.add-user {
  max-width: 380px;
  margin: 0 auto;
}
.add-user > form {
  display: flex;
  flex-flow: column;
}
.add-user > form input {
  width: 100%;
  height: 50px;
  border: 2px solid #42b983;
  padding: 5px 15px;
  font-size: 16px;
  font-family: inherit;
  border-radius: 8px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.add-user > form input:focus,
.add-user > form input:active {
  outline: none;
  border: 2px solid #42b983;
}

.add-user > form button {
  height: 50px;
  width: 100%;
  border: none;
  margin-top: 15px;
  background-color: #42b983;
  border-left: 0px;
  color: white;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-user > form button:hover {
  background-color: #39ac78 !important;
}
.add-user > form button:disabled {
  opacity: 0.5;
  pointer-events: none;
}
.alert {
  color: white;
  margin-top: 40px;
  padding: 11px 25px;
}
.success {
  background-color: rgb(137 165 72);
}
.error {
  background-color: rgb(172, 70, 70);
}
</style>