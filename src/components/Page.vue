<template>
    <div class="page">
        <div v-if="page">
                <label for="title">Название списка</label>
                <input type="text" v-model="page.title" class="title" name="title" placeholder="Enter a title" />
                <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
                    <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
                         <div class="todo-item-left">
                              <input type="checkbox" v-model="todo.completed">
                              <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-label" :class="{ completed : todo.completed }">{{ todo.title }}</div>
                              <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
                         </div>
                         <div class="remove-item" @click="removeTodo(index)">
                         <i class="far fa-trash-alt"></i>
                         </div>
                         <div class="extra-container">
                            <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> Отметить все</label></div>
                            <div>Осталось дел: {{ remaining }}</div>
                         </div>

                         <div class="extra-container">
                            <div>
                                <button :class="{ active: filter == 'all' }" @click="filter = 'all'">Все</button>
                                <button :class="{ active: filter == 'active' }" @click="filter = 'active'">В процессе</button>
                                <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Законченные</button>
                            </div>

                            <div>
                                <button v-if="showClearCompletedButton" @click="clearCompleted">Очистить законченные</button>
                            </div>
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
      export default {
        name: 'Page',
        props: ['page'],
          data () {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
      filter: 'all',
      todos: [

      ]
    }
  },
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
        return
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
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
    }
  }
      }
    </script>

    <style scoped>
        .page {
            width: 100%;
            padding: 2rem;
            box-shadow: 3rem 0 5rem 3rem #c1f5ff;
        }

        .content, .title {
            border-style: none;
            border-radius: 0.25rem;
            border: solid 1px lightgray;
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 1.25rem;
        }

        .content:focus, .title:focus {
            outline: 0;
        }

        .content {
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            resize: vertical;
            font-size: 1.5rem;
            padding: 0.5rem;
            height: 20rem;
        }

        .title {
            font-size: 2rem;
            padding: 0.5rem 1rem;
        }

        label {
            margin-bottom: 0.5rem;
            display: inline-block;
        }

        button {
            border-style: none;
            padding: 0.5rem 0.75rem;
            background-color: #44abc3;
            margin-right: 1rem;
            border-radius: 0.25rem;
            color: white;
            font-size: 1rem;
            cursor: pointer;
        }

        button:hover {
            background-color: #368ea2;
        }
    </style>