<template>
    <div v-if="GestionService.getId()">
        <h1>{{ artista.name }}</h1>

        <div>
            <h3>Generos</h3>
            <div v-if="!cargando" class="genersList">
                <p v-for="(genero, index) in artista.genres" :key="index">| {{ genero.name }} |</p>
            </div>
            <div v-else>
                <img src="@/assets/Loading_icon.gif" alt="Cargando...">
            </div>
        </div>

        <div>
            <h3>Almbums</h3>
            <div v-if="!cargando" class="album-table">
                <table>
                    <thead>
                        <tr class="titles-table">
                            <th>Nombre Album</th>
                            <th>Fecha lanzamiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(album, index) in albums" :key="index">
                            <td>{{ album.title }}</td>
                            <td>{{ album.date }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <img src="@/assets/Loading_icon.gif" alt="Cargando...">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GestionService from '@/service/GestionService';
import { useRouter } from 'vue-router';

const artista = ref({})
const albums = ref([])
const cargando = ref(false)
const router = useRouter()

const actArtista = async () => {
    try {
        cargando.value = true
        await GestionService.fetchInfoArtist()
        artista.value = GestionService.getInfoArtist()
    } catch (error) {
        console.log(error)
    } finally {
        cargando.value = false
    }

}

const actAlmbums = async () => {
    try {
        cargando.value = true
        albums.value = await GestionService.fetchAlbum()
    } catch (error) {
        console.log(error)
    } finally {
        cargando.value = false
    }

}

onMounted(() => {
    if (GestionService.getId() === '') {
        router.push({ name: 'home' })
    } else {
        actArtista()
        actAlmbums()
    }
})
</script>

<style scoped>


.genersList {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-left: 100px;
    margin-right: 100px;
}

table {
        width: 100%;
        border-collapse: collapse; 
        font-family: Arial, sans-serif; 
    }

    th, td {
        text-align: center; 
        padding: 10px 15px; 
        border-top: 1px solid #dddddd; 
        width: 50%;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9; 
    }

    tr.titles-table th {
        background-color: #42b983; 
        border-bottom: 2px solid #dddddd; 
    }
</style>