<template>
    <header class="app-header">
        <router-link :to="{ name: 'home' }">
            <img src="@/assets/logo.png" alt="Logo" class="logo" />
        </router-link>
        <h1 class="title">Mi Aplicación de Música</h1>
    </header>
</template>

<script setup>
</script>

<style scoped>
.app-header {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    cursor: pointer;
}

.title {
    font-size: 20px;
    
    margin: 0;
    color: #333;
}
</style>