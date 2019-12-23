<template>
    <div class="page">
        <div v-if="page">
                <input type="text" v-model="page.title" class="title" name="title" placeholder="Название списка" />
                <input type="text" class="todo-input" placeholder="Что нужно сделать" v-model="newTodo" @keyup.enter="addTodo">
                    <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
                           
                         <div class="todo-item-left">
                             <p-check class="p-default p-round p-fill urgent" color="danger" v-model="todo.urgent">срочно</p-check>
                              <p-check class="p-default p-round p-fill" color="success" v-model="todo.completed"></p-check>
                              <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-label" :class="{ completed : todo.completed }">{{ todo.title }}</div>
                              <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
                         
                         <div class="remove-item" >
                         <p>{{ moment(todo).format('lll') }}</p>
                         <i class="far fa-trash-alt" @click="showModal(todo.id)"></i>
                         </div>
                         </div>
                         <div class="modal-overlay" id="modal-overlay" v-show="selectedId == todo.id">
                              <div class="modal" >
                                     <p>Удалить дело " {{todo.title}} " ?</p>
                                     <div class="confirm-btns">
                                       
                                        <button @click="(removeTodo(index)), (closeModal)" class="delete-btn-modal">Да</button>
                                        <button @click="closeModal" class="cancel-btn">Нет</button>
                                     </div>
                              </div>
                              </div>
                    </div>
                         <div class="extra-container remaining-todos">
                            <div><label><p-check class="p-default p-round p-fill remaining" color="success" :checked="!anyRemaining" @change="checkAllTodos"> Отметить все</p-check></label></div>
                            <div>Осталось дел: {{ remaining }}</div>
                         </div>

                         <div class="extra-container sort-btns">
                            <div>
                                <button :class="{ active: filter == 'all' }" @click="filter = 'all'">Все</button>
                                <button :class="{ active: filter == 'active' }" @click="filter = 'active'">В процессе</button>
                                <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Законченные</button>
                            </div>
                            <div>
                                <button v-if="showClearCompletedButton" @click="clearCompleted">Очистить законченные</button>
                            </div>
                         </div>

            <div>
                <button @click="deletePage()">Удалить список</button>
                <button @click="savePage()">Сохранить список</button>
            </div>
            
        </div>    
    </div>
    </template>

    <script>
    //import db from '../main'
    var moment = require('moment');

      export default {
        name: 'Page',
        props: ['page'],
          data () {
    return {
      moment: moment,
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
      filter: 'all',
      selectedId:'',
      isModalVisible: false,
      todos: [

      ]
    }
  },
//   created() {
//    db.collection('todos').orderBy('createdAt').get().then(querySnapshot => {
//      querySnapshot.forEach(doc => {
//        const data = {
//          'id': doc.id,
//          'title': doc.data().title,
//          'completed': doc.data().completed,
//          'newTodo': doc.data().task,
//          'createdAt': doc.data().createdAt
//        }
//        this.todos.push(data)
//      })
//    })
// },
    computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining() {
      return this.remaining != 0
    },
    todosFiltered() {
      if (this.filter == 'all') {
        return this.todos
      } else if (this.filter == 'active') {
        return this.todos.filter(todo => !todo.completed)
      } else if (this.filter == 'completed') {
        return this.todos.filter(todo => todo.completed)
      }
      return this.todos
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    deletePage () {
    this.$emit('delete-page')
     },
    savePage () {
    this.$emit('save-page')
    },
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return alert('Поле не должно быть пустым')
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        urgent: false,
        editing: false,
      })
      this.newTodo = ''
      this.idForTodo++
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title
      todo.editing = true
    },
    doneEdit(todo) {
      if (todo.title.trim() == '') {
        todo.title = this.beforeEditCache
      }
      todo.editing = false
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache
      todo.editing = false
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
    checkAllTodos() {
      this.todos.forEach((todo) => todo.completed = event.target.checked)
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
        showModal(id) {
        this.selectedId = id;
      },
      closeModal() {
        this.selectedId='';
      },
  }
      }
    </script>

    <style scoped>

        .page {
            width: 100%;
            padding: 5rem;       
        }

        .content, .title {
            border-style: none;
            border-radius: 0.25rem;
            border: solid 1px lightgray;
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 1.25rem;
        }
        .title:focus {
            outline: 0;
        }
        .title {
            font-size: 2rem;
            padding: 0.5rem 1rem;
        }

        label {
            margin-bottom: 0.5rem;
            display: inline-block;
        }
.modal {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 300px;
    position: fixed;
    height: 140px;
    z-index: 10;
    background: #fff;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.modal-overlay {
  z-index: 8;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.5)
}
.modal p {
width: 80%;
font-size: 16px;
line-height: 20px;
text-align: center;
color: #03a9f4;
margin-top: 30px;
font-weight: 700;
}
.confirm-btns button {
border: none;
font-size: 16px;
line-height: 20px;
text-align: center;
color: #fff;
}
.delete-btn-modal {
width: 60px;
height: 40px;
background: #FF7373;
margin-right: 20px;
}
.cancel-btn {
width: 60px;
height: 40px;
background: #03a9f4;
}
 button {
  border: 1px solid #03a9f4;
  color:#03a9f4;
  border-radius: 25px;
  padding: 8px 11px;
  background: transparent;
  cursor: pointer;
  margin: 20px 20px 20px 0;
}
.active {
  background-color: #03a9f4;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
}
.todo-item {
 display: flex;
 flex-direction: row;
 width: 80%;
}
.todo-item-left {
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
margin-bottom: 15px;
}

.todo-input, .title {
width: 80%;
height: 35px;
margin-bottom: 25px;
border-radius: 5px;
border: 1px solid #b3e5fc;
padding: 5px;
font-size: 16px;
}
.remove-item {
margin-right: 0;
margin-left: auto;
display: flex;
flex-direction: row;
 }
 .completed {
text-decoration: line-through;
color: grey;
}

.remaining {
margin: 20px 0;
}


.sort-btns {
width: 80%;
display: flex;
flex-direction: row;
}

    </style>