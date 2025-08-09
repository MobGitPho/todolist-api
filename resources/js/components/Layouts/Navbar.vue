<script setup>
//

</script>

<template>
  <nav>
    <h1>Todo List</h1>
    <ul >
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/login">Connexion</router-link></li>
      <li><router-link to="/register">Inscription</router-link></li>
      <li><router-link to="/form">Formulaire</router-link></li>
    </ul>
  </nav>
</template>



<style scoped>
nav {
  background-color: #42b983;
  padding: 1rem;
  color: white;
  margin-bottom: 20px;
}

nav h1 {
  margin: 0;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 15px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}
</style>
