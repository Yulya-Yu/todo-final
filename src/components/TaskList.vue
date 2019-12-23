<template>
        <div class="tasklist">
            <ul>
                <li v-for="(page, index) of pages" :key="index" class="page" v-bind:class="{ 'active': index === activePage }" @click="changePage(index)">
                    <div>{{page.title}}</div>
                </li>
                <li class="new-page" @click="newPage()">Новый список +</li>
            </ul>
        </div>
    </template>

    <script>
      export default {
        name: 'TaskList',
        props: ['pages', 'activePage'],
        methods: {
          changePage (index) {
            this.$emit('change-page', index)
          },
          newPage () {
            this.$emit('new-page')
          }
        }
      }
    </script>

    <style scoped>
        .tasklist {
            max-width: 20rem;
            width: 30rem;
            
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            height: 100%;
            position: relative;
        }

        li {
            padding: 1rem;
            font-size: 1.25rem;
            min-height: 1.5rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        li:hover {
            cursor: pointer;
            background-color: #c5edf5;
        }

        .active {
            background-color: #6fcffc;
            color: #fff;
            font-size: 16px;
        }

        .active:hover {
            background-color: #0f92cf;
        }

        .new-page {
            background-color: #0098df;
            color: #fff;
            position: absolute;
            bottom: 0;
            width: 100%;
            box-sizing: border-box;
            font-weight: 700;
        }

        .new-page:hover {
            background-color: #182c48;
        }
    </style>