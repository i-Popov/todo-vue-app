<template>
    <div>
        <input
                type="text"
                class="todo-input"
                placeholder="Что нужно сделать?..."
                v-model="newTodo"
                @keyup.enter="addTodo"
        >
        <todo-item
                v-for="todo in todosFiltered"
                :key="todo.id"
                :todo="todo"
                :checkAll="!anyRemaining"
        >
        </todo-item>

        <div class="extra-container">
            <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
            <todo-items-remaining :remaining="remaining"></todo-items-remaining>
        </div>

        <div class="extra-container">
            <todo-filter></todo-filter>
            <div>
                <transition name="fade">
                    <todo-clear-completed :showClearCompletedButton="showClearCompletedButton"></todo-clear-completed>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import {eventBus} from '../main'
    import TodoItem from "./TodoItem";
    import TodoItemsRemaining from "./TodoItemsRemaining";
    import TodoCheckAll from "./TodoCheckAll";
    import TodoFilter from "./TodoFilter";
    import TodoClearCompleted from "./TodoClearCompleted";


    export default {
        name: 'todo-list',

        components: {
            TodoItem,
            TodoItemsRemaining,
            TodoCheckAll,
            TodoFilter,
            TodoClearCompleted,
        },

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

        created() {
            eventBus.$on('deletedTodo', (id) => this.deleteTodo(id));
            eventBus.$on('finishEdit', (data) => this.finishEdit(data));
            eventBus.$on('checkAllChanged', (checked) => this.checkAll(checked));
            eventBus.$on('filterChanged', (filter) => this.$store.state.filter = filter);
            eventBus.$on('clearCompletedTodos', () => this.clearCompleted());
        },

        beforeDestroy() {
            eventBus.$off('deletedTodo');
            eventBus.$off('finishEdit');
            eventBus.$off('checkAllChanged');
            eventBus.$off('filterChanged');
            eventBus.$off('clearCompletedTodos');
        },

        computed: {
            remaining() {
                return this.$store.state.todos.filter(todo => !todo.completed).length
            },

            anyRemaining() {
                return this.remaining !== 0;
            },

            todosFiltered(){
                if (this.$store.state.filter === 'all') {
                    return this.$store.state.todos
                }
                // else if (this.$store.state.filter === 'active') {
                //     return this.$store.state.todos.filter (todo => !todo.completed)
                // } else if (this.$store.state.filter === 'completed') {
                //     return this.$store.state.todos.filter (todo => todo.completed)
                // }
                else if (this.$store.state.filter === 'reverse') {
                    return this.$store.state.todos.slice().reverse() // создается новый массив на основе первого и делается сортировка
                }
                return this.$store.state.todos
            },

            showClearCompletedButton(){
                return this.$store.state.todos.filter(todo => todo.completed).length > 0
            },

        },

        methods: {
            addTodo() {

                if(this.newTodo.trim().length === 0 || this.newTodo.length < 4) {
                    alert('Не достаточно символов');
                    return;
                }

                this.$store.state.todos.push({
                    id: this.idForTodo,
                    title: this.newTodo,
                    completed: false,
                });
                this.newTodo = '';
                this.idForTodo++;
            },

            deleteTodo(id) {
                const index = this.$store.state.todos.findIndex((item) => item.id === id);
                this.$store.state.todos.splice(index, 1)
            },

            checkAll() {
                this.$store.state.todos.forEach((todo) => todo.completed = event.target.checked)
            },

            clearCompleted() {
                this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
            },

            finishEdit(data) {
                const index = this.$store.state.todos.findIndex((item) => item.id === data.id);
                this.$store.state.todos.splice(index, 1, data)
            },
            //(data.index, 1, data.todo) заменяем один item, и данные по todo (синхр данные между родителем и чайлдом)
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
