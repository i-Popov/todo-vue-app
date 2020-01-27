<template>
    <div>
        <button :class="{ active: filter === 'all' }" @click="changeFilter('all')">вверх</button>
        <button :class="{ active: filter === 'reverse' }" @click="changeFilter('reverse')">вниз</button>
    </div>
</template>

<script>
    export default {
        name: 'todo-filter',
        computed: {
            filter() {
                return this.$store.state.filter
            }
        },
        methods: {
            changeFilter(filter) {
                this.$store.dispatch('updateFilter', filter)
            }
        }
    }
</script>
