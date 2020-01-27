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
        >
        </todo-item>
        <div class="extra-container">
            <todo-filter></todo-filter>
            <div>
                <transition name="fade">
                    <todo-clear-completed></todo-clear-completed>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import TodoItem from "./TodoItem";
    import TodoFilter from "./TodoFilter";
    import TodoClearCompleted from "./TodoClearCompleted";

    export default {
        name: 'todo-list',

        components: {
            TodoItem,
            TodoFilter,
            TodoClearCompleted,
        },

        data () {
            return {
                newTodo: '',
                idForTodo: 4,
            }
        },

        computed: {
            todosFiltered(){
                return this.$store.getters.todosFiltered
            }
        },

        methods: {
            addTodo() {
                if(this.newTodo.trim().length === 0 || this.newTodo.length < 4) {
                    alert('Не достаточно символов');
                    return;
                }
                this.$store.dispatch('addTodo', {
                    id: this.idForTodo,
                    title: this.newTodo,
                });
                this.newTodo = '';
                this.idForTodo++;
            },
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
