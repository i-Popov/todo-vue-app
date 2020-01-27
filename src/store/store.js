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
    }
});
