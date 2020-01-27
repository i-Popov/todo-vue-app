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
            <button @click="pluralize">Plural</button>
            <span class="remove-item" @click="deleteTodo(todo.id)">
                &times;
            </span>
        </div>

    </div>
</template>


<script>
    import {eventBus} from '../main'

    export default {
        name: 'todo-item',

        props: {
            todo: {
                type: Object,
                required: true,
            },
            checkAll: {
                type: Boolean,
                required: true,
            }
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

        created() {
            eventBus.$on('pluralize', this.handlePluralize)
        },

        beforeDestroy() { // - beforeDestroy в Vue - устранение утечек памяти, очистка компонента от лишнего
            eventBus.$off('pluralize', this.handlePluralize) // убедить, что мы убираем событие
        },

        watch: {
            checkAll() {
                // if (this.checkAll){
                //     this.completed = true
                // } else {
                //     this.completed = this.todo.completed
                // }
                this.completed = this.checkAll ? true : this.todo.completed
            }
        },
        // watch смотреть за изменением пропсов (нужно отследить и передать что все todos выаолнены)

        directives: {
            focus: {
                inserted: function(el) {
                    el.focus()
                }
            }
        },

        methods: {
            deleteTodo(id) {
                eventBus.$emit('deletedTodo', id)
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
                eventBus.$emit('finishEdit', {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing,
                })
                // this.$emit нужно уведомить родителя, что произошли изменения
                // eventBus.$emit - eventBus позволяет нам передавать данные между любыми компонентами напрямую
            },

            cancelEdit(){
                this.title = this.beforeEditCache;
                this.editing = false
            },

            pluralize() {
               eventBus.$emit('pluralize')
            },

            handlePluralize() {
                this.title = this.title + '1';
                eventBus.$emit('finishEdit', {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing,
                })
            },
        }
    }
    // his.$emit - отправляем Event на удаление в родитель TodoList,
    // editTodo(todo) -> editTodo() - todo больше не нужно так как это все локально, заменяем на this.
</script>

