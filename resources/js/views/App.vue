<script setup>
import Notification from '@/components/Notification.vue'
import Navbar from '@/components/Layouts/Navbar.vue';

</script>

<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Notification />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
</style>
