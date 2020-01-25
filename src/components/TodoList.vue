<template>
    <div>
        <input
                type="text"
                class="todo-input"
                placeholder="Что нужно сделать?..."
                v-model="newTodo"
                @keyup.enter="addTodo"
        >
        <div class="extra-container">
            <div>
                <button :class="{ active: filter === 'all' }" @click="filter = 'all'">вверх</button>
                <button :class="{ active: filter === 'reverse' }" @click="filter = 'reverse'">вниз</button>
            </div>
        </div>
        <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
            <div class="todo-item-left">
                <input type="checkbox" v-model="todo.completed">
                <div v-if="!todo.editing"
                     @dblclick="editTodo(todo)"
                     class="todo-item-label"
                     :class="{ completed : todo.completed}"
                >
                    {{ todo.title }}
                </div>
                <input
                        v-else
                        class="todo-item-edit"
                        type="text"
                        v-model="todo.title"
                        @blur="completeEdit(todo)"
                        @keyup.enter="completeEdit(todo)"
                        @keyup.esc="cancelEdit(todo)"
                        v-focus
                >
            </div>
            <div class="remove-item" @click="deleteTodo(index)">
                &times;
            </div>
        </div>

        <div class="extra-container">
            <div>
                <label>
                    <input
                            type="checkbox"
                            :checked="!anyRemaining"
                            @change="checkAll"
                    >
                    Выполнены все
                </label>
            </div>
            <div>
                {{ remaining }} задач осталось
            </div>
        </div>

        <div class="extra-container">
            <div>
                <button :class="{ active: filter === 'all' }" @click="filter = 'all'">Все</button>
                <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Активные</button>
                <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">Выполненные</button>
            </div>
            <div>
                <transition name="fade">
                <button v-if="showClearCompletedButton" @click="clearCompleted">Удалить выполненные</button>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'todo-list',
        data () {
            return {
                newTodo: '',
                idForTodo: 4,
                beforeEditCache: '',
                filter: 'all', // ставим по дефолту фильтр
                todos: [
                    {
                        'id': 1,
                        'title': '1. Одна из задач по vue',
                        'completed': false,
                        'editing': false,
                    },
                    {
                        'id': 2,
                        'title': '2. Другая из задач по vue',
                        'completed': false,
                        'editing': false,
                    },
                    {
                        'id': 3,
                        'title': '3. Другая из задач по vue',
                        'completed': false,
                        'editing': false,
                    },
                ]
            }
        },



        computed: {
            remaining() {
                return this.todos.filter(todo => !todo.completed).length
            },

            anyRemaining() {
                return this.remaining !== 0;
            },

            todosFiltered(){
                if (this.filter === 'all') {
                    return this.todos
                } else if (this.filter === 'active') {
                    return this.todos.filter (todo => !todo.completed)
                } else if (this.filter === 'completed') {
                    return this.todos.filter (todo => todo.completed)
                } else if (this.filter === 'reverse') {
                    return this.todos.slice().reverse() // создается новый массив на основе первого и делается сортировка
                }
                return this.todos
            },

            showClearCompletedButton(){
                return this.todos.filter(todo => todo.completed).length > 0
            },

        },




        directives: {
            focus: {
                inserted: function(el) {
                    el.focus()
                }
            }
        },



        methods: {
            addTodo() {

                if(this.newTodo.trim().length === 0 || this.newTodo.length < 4) {
                    alert('Не достаточно символов');
                    return;
                }

                this.todos.push({
                    id: this.idForTodo,
                    title: this.newTodo,
                    completed: false,
                });
                this.newTodo = '';
                this.idForTodo++;
            },

            deleteTodo(index) {
                this.todos.splice(index, 1)
            },

            editTodo(todo) {
                this.beforeEditCache = todo.title;
                todo.editing = true
            },

            completeEdit(todo) {
                if(todo.title.trim() === '' || todo.title.length < 4) {
                    todo.title = this.beforeEditCache
                }
                todo.editing = false
            },

            cancelEdit(todo){
                todo.title = this.beforeEditCache;
                todo.editing = false
            },

            checkAll() {
                this.todos.forEach((todo) => todo.completed = event.target.checked)
            },

            clearCompleted() {
                this.todos = this.todos.filter(todo => !todo.completed)
            },

            shufflee: function () {
                return Math.floor(Math.random() * this.items.length)
            },

            // shufflee() {
            //     return this.todos._.shuffle(this.todos)
            // }
        }
    }
</script>


<style lang="scss">
    .todo-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;

        &:focus {
            outline: none;
        }
    }

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;

        &:hover {
            color: black;
        }
    }

    .todo-item-left {
        display: flex;
        align-items: center;
    }

    .todo-item-label {
        padding: 10px;
        border: 1px solid #ffffff;
        margin-left: 12px;
    }

    .todo-item-edit {
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        font-style: italic;
    }

    .completed {
        text-decoration: line-through;
        color: grey;
    }

    .extra-container {
        display: flex;
        font-size: 16px;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #d8d7d0;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    button {
        font-size: 14px;
        background-color: #ffffff;
        appearance: none;
        border: 1px solid #70809029;
        margin: 0 2px;
        transition: 0.2s ease;

        &:hover {
            background: lightgreen;
        }

        &:focus {
            outline: none;
        }
    }

    .active {
        background: lightgreen; // активный класс на кнопку фильтра
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }

</style>
