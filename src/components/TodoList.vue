<template>
    <div>
        <h1>Задачи</h1>
        <div class="input-wrapper">
            <input
                    type="text"
                    class="todo-input"
                    placeholder="Что нужно сделать?..."
                    v-model="newTodo"
                    @keyup.enter="addTodo"
            >
            <div v-if="$store.state.loading" class="lds-default">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
        <div class="todo-list">
            <todo-item
                    v-for="todo in todosFiltered"
                    :key="todo.id"
                    :todo="todo"
            >
            </todo-item>
        </div>
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

        created() {
            this.$store.dispatch('retrieveTodos')
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
    .input-wrapper {
        position: relative;
        margin: 0 0 15px;
    }

    .todo-input {
        padding: 16px;
        border: none;
        background: #ffffff;
        width: 100%;
        box-sizing: border-box;
        font-size: 26px;
        border-radius: 6px;
        box-shadow: 0 2px 2px 0 #99999959;
        outline: none;

        &::placeholder {
            color: #909090;
            font-size: 22px;
        }

        &:focus {
            outline: none;
        }
    }

    .todo-list {
        margin: 0;
        padding: 0;
    }

    .todo-item {
        font-size: 22px;
        min-height: 60px;
        list-style: none;
        padding: 0 16px 0 16px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        background-color: #ffff;
        margin: 0 0 12px;
        border-radius: 6px;
        box-shadow: 0 2px 2px 0 #99999959;

        &:hover {
            background-color: #f5f6f7;
            transition: 0.2s;
        }
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
        margin-left: 12px;
    }

    .todo-item-edit {
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        font-style: italic;
        outline: none;
        border: none;
        background-color: #f5f6f7;
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
        margin: 3px;
        padding: 3px 7px;
        border: 1px solid transparent;
        border-radius: 3px;
        background-color: transparent;
        cursor: pointer;
        outline: none;

        &:hover {
            border-color: rgba(136, 135, 128, 0.2);
        }

        &:focus {
            outline: none;
        }
    }

    .active {
        border-color: rgba(136, 135, 128, 0.2);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }

    //StyleLoader
    .lds-default {
        display: block;
        position: relative;
        width: 80px;
        height: 80px;
        margin: 16px auto;
    }
    .lds-default div {
        position: absolute;
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 50%;
        animation: lds-default 1.2s linear infinite;
    }
    .lds-default div:nth-child(1) {
        animation-delay: 0s;
        top: 37px;
        left: 66px;
    }
    .lds-default div:nth-child(2) {
        animation-delay: -0.1s;
        top: 22px;
        left: 62px;
    }
    .lds-default div:nth-child(3) {
        animation-delay: -0.2s;
        top: 11px;
        left: 52px;
    }
    .lds-default div:nth-child(4) {
        animation-delay: -0.3s;
        top: 7px;
        left: 37px;
    }
    .lds-default div:nth-child(5) {
        animation-delay: -0.4s;
        top: 11px;
        left: 22px;
    }
    .lds-default div:nth-child(6) {
        animation-delay: -0.5s;
        top: 22px;
        left: 11px;
    }
    .lds-default div:nth-child(7) {
        animation-delay: -0.6s;
        top: 37px;
        left: 7px;
    }
    .lds-default div:nth-child(8) {
        animation-delay: -0.7s;
        top: 52px;
        left: 11px;
    }
    .lds-default div:nth-child(9) {
        animation-delay: -0.8s;
        top: 62px;
        left: 22px;
    }
    .lds-default div:nth-child(10) {
        animation-delay: -0.9s;
        top: 66px;
        left: 37px;
    }
    .lds-default div:nth-child(11) {
        animation-delay: -1s;
        top: 62px;
        left: 52px;
    }
    .lds-default div:nth-child(12) {
        animation-delay: -1.1s;
        top: 52px;
        left: 62px;
    }
    @keyframes lds-default {
        0%, 20%, 80%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.5);
        }
    }

</style>
