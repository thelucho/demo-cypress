<template>
  <div>
    <h1>Search users</h1>

    <div class="container">
      <div class="actions">
        <button type="submit" @click="getData">
          Load users
          <Spinner v-if="loading" />
        </button>
        <div class="search-box">
          <input id="search" type="text" v-model="searchTerm" placeholder="Search for anything..." />
        </div>
      </div>
    </div>

    <div class="container">
      <div data-cy="users" class="grid" v-if="getUsers">
        <div class="card" v-for="(user, idx) in filteredUsers" :key="idx">
          <!-- Header -->
          <div class="card-header">
            <div class="card-header__avatar">
              <img :src="user.avatar" />
            </div>
            <a class="card-header__follow">Follow</a>
          </div>
          <!-- Content-->
          <div class="card-content">
            <div class="card-content__username">
              {{ user.first_name }} {{ user.last_name }}
            </div>
            <div class="card-content__bio">{{ user.email }}</div>
          </div>
          <!-- Footer-->
          <div class="card-footer">
            <div class="card-footer__pens">
              <span>{{ getRandomNum(1, 200) }}</span>
              <div class="label">Pens</div>
            </div>
            <div class="card-footer__followers">
              <span>{{ getRandomNum(20, 60) }}</span>
              <div class="label">Followers</div>
            </div>
            <div class="card-footer__following">
              <span>{{ getRandomNum(40, 100) }}</span>
              <div class="label">Following</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Spinner from '../components/Spinner.vue'

export default {
  components: { Spinner },
  name: 'Search',
  data() {
    return {
      searchTerm: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['getUsers']),
    filteredUsers() {
      return this.getUsers
        .filter((user) => {
          return user.first_name.toLowerCase().match(this.searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().match(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().match(this.searchTerm.toLowerCase())
        })
    }
  },
  methods: {
    getData() {
      this.loading = !this.loading
      this.$store.dispatch('getUsers')
        .then(()=>{
          this.loading = !this.loading
        })
    },
    getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }
  }
}
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  background-color: #f3f3f3;
  border-radius: 10px;
}
.actions > button {
  height: 49px;
  width: 138px;
  border: none;
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
.actions > button:hover {
  background-color: #39ac78 !important;
}
.search-box > input {
  width: 250px;
  height: 35px;
  border: 2px solid #42b983;
  padding: 5px 15px;
  font-size: 16px;
  font-family: inherit;
  border-radius: 8px;
}
.search-box > input:focus,
.search-box > input:active {
  outline: none;
  border: 2px solid #42b983;
}
.container {
  max-width: 1200px;
  margin: 40px auto 0;
}
.grid {
  display: flex;
  flex-wrap: wrap;
}
.card {
  background: #ffffff;
  width: 210px;
  border-radius: 4px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  margin: 0 auto 25px;
  overflow: hidden;
}
.card-header {
  position: relative;
  background: #303841;
  height: 200px;
  text-align: center;
  overflow: hidden;
}
.card-header__avatar {
  background: #303841;
  background-position: center 30%;
  background-size: 100%;
  height: 100%;
  width: 100%;
}
.card-header__avatar img {
  width: 100%;
}
.card-header__follow {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 6px 10px;
  color: #333333;
  font-size: 10px;
  font-weight: 600;
  line-height: normal;
  text-decoration: none;
  text-transform: uppercase;
}
.card-content {
  text-align: center;
  padding: 30px 20px;
}
.card-content__username {
  margin: 0 0 10px;
  color: #333333;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}
.card-content__username .badge {
  display: inline-block;
  background: #fcd000;
  border-radius: 2px;
  margin: 0 10px 0;
  padding: 4px;
  color: #333333;
  font-size: 10px;
  font-weight: 600;
  vertical-align: middle;
}
.card-content__bio {
  color: #666666;
  font-size: 12px;
}
.card-footer {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: #f3f3f3;
  padding: 15px 40px;
  color: #333333;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}
.card-footer .label {
  display: block;
  margin: 4px 0 0;
  color: #666666;
  font-size: 10px;
  font-weight: 400;
}

.code {
  background: rgba(0, 0, 0, 0.1);
  max-width: 600px;
  border-radius: 2px;
  margin: 40px auto 100px;
  font-family: monospace;
  overflow: hidden;
  overflow-x: auto;
}
.code:before {
  content: "HTML Code";
  display: block;
  padding: 20px 20px 0;
  color: #333333;
  font-weight: 600;
}
</style>