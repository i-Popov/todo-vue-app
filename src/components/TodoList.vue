<template>
    <div>
        <label>
            <input
                    type="text"
                    class="todo-input"
                    placeholder="Что нужно сделать?..."
                    v-model="newTodo"
                    @keyup.enter="addTodo"
            >
        </label>
        <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
            <div>
                {{ todo.title }}
            </div>
            <div class="remove-item" @click="deleteTodo(index)">
                &times;
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
                todos: [
                    {
                        'id': 1,
                        'title': 'Одна из задач по vue',
                        'completed': false,
                    },
                    {
                        'id': 2,
                        'title': 'Другая из задач по vue',
                        'completed': false,
                    },
                    {
                        'id': 3,
                        'title': 'Другая из задач по vue',
                        'completed': false,
                    },
                ]
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
            }
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
        padding-left: 20px;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;

        &:hover {
            color: black;
        }
    }
</style>
