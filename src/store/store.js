import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        filter: 'all',
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
    },

    getters: {
        todosFiltered(state){
            if (state.filter === 'all') {
                return state.todos
            } else if (state.filter === 'reverse') {
                return state.todos.slice().reverse()
            }
            return state.todos
        },

        showClearCompletedButton(state){
            return state.todos.filter(todo => todo.completed).length > 0
        },
    },

    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false,
            })
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed)
        },
        updateFilter(state, filter) {
            state.filter = filter;
        },
        delTodo(state, id) {
            const index = state.todos.findIndex(item => item.id === id);
            state.todos.splice(index, 1)
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id === todo.id);
            state.todos.splice(index, 1, {
                'id': todo.id,
                'title': todo.title,
                'completed': todo.completed,
                'editing': todo.editing,
            })
        },
    },
    actions: {
        addTodo(context, todo) {
            setTimeout(() => {
                context.commit('addTodo', todo)
            }, 500);
        },
        clearCompleted(context) {
            setTimeout(() => {
                context.commit('clearCompleted')
            }, 500);
        },
        updateFilter(context, filter) {
            setTimeout(() => {
                context.commit('updateFilter', filter)
            }, 500);
        },
        delTodo(context, id) {
            setTimeout(() => {
                context.commit('delTodo', id)
            }, 500);
        },
        updateTodo(context, todo) {
            setTimeout(() => {
                context.commit('updateTodo', todo)
            }, 500);
        },
    }
});
