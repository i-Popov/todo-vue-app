import Vue from 'vue';
import Vuex from 'vuex';
import db from '../firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loading: true,
        filter: 'all',
        todos: [],
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
        retrieveTodos(state, todos) {
            state.todos = todos
        },
    },
    actions: {
        retrieveTodos(context){
            context.state.loading = true;
            db.collection('todos').get()
                .then(querySnapshot => {
                    let tempTodos =[];
                    querySnapshot.forEach(doc => {
                        // eslint-disable-next-line no-console
                        console.log(doc.data());
                        const data = {
                            id: doc.id, // берем id для локального использования
                            title: doc.data().title,
                            completed: doc.data().completed,
                            timestamp: doc.data().timestamp,
                        };
                        tempTodos.push(data)
                    });

                    context.state.loading = false;
                    const tempTodosSorted = tempTodos.sort((a, b) => {
                        return a.timestamp.seconds - b.timestamp.seconds
                    }); //добавили вывод правильной сортировки

                    context.commit('retrieveTodos', tempTodosSorted)
                });

        },
        addTodo(context, todo) {
            db.collection('todos').add({
                title: todo.title, // не добавляем id потому что firebase авт дает
                completed: false,
                timestamp: new Date(),
            })
            .then(docRef => {
                context.commit('addTodo', {
                    id: docRef.id,
                    title: todo.title,
                    completed: false,
                })
            })
        },
        clearCompleted(context) {
            db.collection('todos').where('completed', '==', true).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete()
                            .then(() => {
                                context.commit('clearCompleted')
                            })
                    })
                })
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter)
        },
        delTodo(context, id) {
            db.collection('todos').doc(id).delete()
                .then(() => {
                    context.commit('delTodo', id)
                })
        },
        updateTodo(context, todo) {
            db.collection('todos').doc(todo.id).set({ // .set параметр сохранения
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                timestamp: new Date(),
            })
                .then(() => {
                    context.commit('updateTodo', todo)
                })
        },
    }
});
