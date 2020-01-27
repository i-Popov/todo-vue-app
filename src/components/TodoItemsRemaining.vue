<template>
    <div>
        {{ remaining }} задач осталось
    </div>
</template>


<script>
    export default {
        name: 'todo-remaining',
        props: {
            remaining: {
                type: Number,
                required: true,
            }
        }
    }
</script>
