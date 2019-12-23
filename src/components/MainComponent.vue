<template>
  <div class="main-components">
    <TaskList @change-page="changePage" @new-page="newPage" :pages="pages" :activePage="index"/>
    <Page @save-page="savePage" @delete-page="deletePage" :page="pages[index]" />
    <router-view/>
  </div>
</template>

<script>
import TaskList from './TaskList'
import Page from './Page'
import { db } from 'firebase'
//import { database } from 'firebase'
//import firebase from '../main'

export default {
  name: 'MainComponent',
  components: {
    TaskList,
    Page
  },
     data: () => ({
        pages: [],
        index: 0
      }),  


      //   mounted() {
      //   database.once('value', (pages) => {
      //     pages.forEach((page) => {
      //       this.pages.push({
      //         ref: page.ref,
      //         title: page.child('title').val(),
      //         content: page.child('content').val()
      //       })
      //     })
      //   })
      // },
      
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

        savePage: function() {
      var page = this.pages[this.index]
      if (page.ref) {
        this.updateExistingPage(page)
      } else {
        this.insertNewPage(page)
      }
  },

      updateExistingPage (page) {
      page.ref.update({
        title: page.title,
        content: page.content
      })
    },

    insertNewPage (page) {
      page.ref = db.push(page)
    },
    
        deletePage () {
          var ref = this.pages[this.index].ref
          ref && ref.remove()
          this.pages.splice(this.index, 1)
          this.index = Math.max(this.index - 1, 0)
        }
      },
}

</script>
<style scoped>
   .main-components {
        display: flex;
        flex-direction: row;
        height: 90vh;
    }
</style>