<template>
  <section class="first">
    <div id="app" class="container">
      <todo-list></todo-list>
    </div>
  </section>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import TodoList from './components/TodoList'

export default {
  name: 'app',
  components: {
    TodoList,
  }
}
</script>

<style>

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-image: url("../src/assets/wood-texture.jpg");
    background-position: top center;
    background-attachment: fixed;
    position: relative;
    background-size: cover;
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    font-size: 26px;
    padding: 16px;
    margin: 0;
  }

  .first {
    display: flex;
    align-items: center;
    height: 90vh;
  }

  .container {
    max-width: 440px;
    margin: 0 auto;
    position: relative;
    background-color: #e0e3e6;
    box-shadow: 0 0 6px 0 #0000007a;
    border-radius: 6px;
    padding: 10px 15px;
    width: 100%;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 25px;
}

  .logo {
    display: block;
    margin: 20px auto;
    height: 75px;
  }
</style>
