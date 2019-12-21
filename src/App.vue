<template>
  <div id="app">
        <div id="nav">
<Navbar :key="$route.fullPath"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
//import TaskList from './components/TaskList'
//import Page from './components/Page'
import Navbar from './components/Navbar';
export default {
  components: {
    Navbar
  }
    //  data: () => ({
    //     pages: [],
    //     index: 0
    //   }),
    //   methods: {
    //     newPage () {
    //       this.pages.push({
    //         title: '',
    //         content: ''
    //       })
    //       this.index = this.pages.length - 1
    //     },
    //     changePage (index) {
    //       this.index = index
    //     },
    //     savePage () {
    //       // nothing as of yet
    //     },
    //     deletePage () {
    //       this.pages.splice(this.index, 1)
    //       this.index = Math.max(this.index - 1, 0)
    //     }
    //   }
    }

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}
 html, body {
        height: 100%;
    }

    body {
        margin: 0;
        color: #37474f;
    }

   .main-components {
        display: flex;
        flex-direction: row;
        height: 90vh;
    }
</style>
