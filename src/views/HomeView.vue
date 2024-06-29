<template>
  <div class="container">
    <div class="search-bar">
      <input class="input-search" type="text" v-model="inputSearch" placeholder="Buscar..." />
      <button class="btn-search" @click="Buscar">Buscar</button>
    </div>
    <div v-if="songs.length > 0">
      <div>
        <label for="artista"><strong>Filtrar por artista </strong></label>
        <input type="text" v-model="artistaF">
      </div>
      <div v-if="!cargando" class="music-list">
        <div class="song-item" v-for="(song, index) in filtroArt" :key="index">
          <p class="letra" @click="Letra(song)">Título: {{ song.title }}</p>
          <p class="seleccionar" @click="Mostrar(song['artist-credit'][0].artist.id)">
            Artista: {{ song['artist-credit'][0].artist.name }}
          </p>
          <p>Duración en minutos: {{ ((song.length / 1000) / 60).toFixed(2) }}</p>
        </div>
        <InfoModal v-if="showModal" :visible="showModal" :letra="letraAct" @update:visible="showModal = $event" />
      </div>
      <div v-else> 
        <img src="@/assets/Loading_icon.gif" alt="Cargando...">
      </div>
    </div>
    <div v-else>
      <div v-if="ingreso">
        <p>No se encontraron resultados...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GestionService from '@/service/GestionService';
import { useRouter } from 'vue-router';
import InfoModal from '../components/InfoModal.vue'

const inputSearch = ref('')

const songs = ref([])
const router = useRouter()
const letraAct = ref('')
const artistaF = ref('')
const ingreso = ref(false)

const cargando = ref(false)
let showModal = ref(false)

const filtroArt = computed(() => {
  return songs.value.filter(song => song['artist-credit'][0].artist.name.toLowerCase().includes(artistaF.value.toLowerCase()))
})

const cargarCanciones = async () => {
  cargando.value = true
  try {
    await GestionService.fetchSongs(inputSearch.value)
    songs.value = GestionService.getSongs()
  } catch (error) {
    console.log(error)
  } finally {
    cargando.value = false
  }
}

const Mostrar = (artistaId) => {
  GestionService.setId(artistaId)
  router.push({name: 'ArtistView', params: {id: artistaId}})
}

const Letra = async (song) => {
  letraAct.value = await GestionService.getLetra(song)
  if(!letraAct.value){
    letraAct.value = "No se encontro una letra para esta cancion"
  }
  showModal.value = true
}



const Buscar = () => {
  ingreso.value = true
  if(inputSearch.value != ''){
    cargarCanciones()
  }else{
    ingreso.value = false
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.input-search {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.btn-search {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-search:hover {
  background-color: rgb(22, 110, 70);
}

.music-list {
  margin-top: 20px;
}

.song-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.song-item p {
  margin: 5px 0;
  cursor: pointer;
}

.seleccionar:hover {
  color: #42b983;
  text-decoration: underline;
}

.letra:hover {
  color: #42b983;
  text-decoration: underline;
}
</style>