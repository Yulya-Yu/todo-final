<template>
  <div id="app">
    <TaskList @change-page="changePage" @new-page="newPage" :pages="pages" :activePage="index"/>
    <Page @save-page="savePage" @delete-page="deletePage" :page="pages[index]" />
    <router-view/>
  </div>
</template>

<script>
import TaskList from './components/TaskList'
import Page from './components/Page'
export default {
  components: {
    TaskList,
    Page
  },
     data: () => ({
        pages: [],
        index: 0
      }),
      methods: {
        newPage () {
          this.pages.push({
            title: '',
            content: ''
          })
          this.index = this.pages.length - 1
        },
        changePage (index) {
          this.index = index
        },
        savePage () {
          // nothing as of yet
        },
        deletePage () {
          this.pages.splice(this.index, 1)
          this.index = Math.max(this.index - 1, 0)
        }
      }
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
 html, body, #app {
        height: 100%;
    }

    body {
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        display: flex;
        flex-direction: row;
    }
</style>
