<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="completeEdit">
            <div v-if="!editing"
                 @dblclick="editTodo"
                 class="todo-item-label"
                 :class="{ completed : completed}"
            >
                {{ title }}
            </div>
            <input
                    v-else
                    class="todo-item-edit"
                    type="text"
                    v-model="title"
                    @blur="completeEdit"
                    @keyup.enter="completeEdit"
                    @keyup.esc="cancelEdit"
                    v-focus
            >
        </div>
        <div>
            <span class="remove-item" @click="deleteTodo(todo.id)">
                &times;
            </span>
        </div>

    </div>
</template>


<script>

    export default {
        name: 'todo-item',

        props: {
            todo: {
                type: Object,
                required: true,
            },
        },

        data() {
            return {
                'id': this.todo.id,
                'title': this.todo.title,
                'completed': this.todo.completed,
                'editing': this.todo.editing,
                'beforeEditCache': '',
            }
        },

        directives: {
            focus: {
                inserted: function(el) {
                    el.focus()
                }
            }
        },

        methods: {
            deleteTodo(id) {
                this.$store.dispatch('delTodo', id)
            },

            editTodo() {
                this.beforeEditCache = this.title;
                this.editing = true
            },

            completeEdit() {
                if(this.title.trim() === '' || this.title.length < 4) {
                    this.title = this.beforeEditCache
                }
                this.editing = false;

                this.$store.dispatch('updateTodo', {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing,
                })
            },

            cancelEdit(){
                this.title = this.beforeEditCache;
                this.editing = false
            },
        }
    }
</script>

