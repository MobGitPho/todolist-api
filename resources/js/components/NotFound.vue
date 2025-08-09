<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page non trouvée</h2>
    <p>Désolé, la page que vous recherchez n'existe pas.</p>
    <router-link to="/" class="home-link">Retour à l'accueil</router-link>
  </div>
</template>

<script setup>
//
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f9fafb;
}

h1 {
  font-size: 5rem;
  color: #4f46e5;
}

h2 {
  font-size: 2rem;
  margin: 1rem 0;
}

p {
  font-size: 1.2rem;
  color: #6b7280;
}

.home-link {
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #4338ca;
}
</style>
