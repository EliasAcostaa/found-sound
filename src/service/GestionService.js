import apiClient from './APIservice'
import axios from "axios";
import { ref } from 'vue'

class GestionService{

    static canciones = ref([])
    static artist = ref({})
    static Id = ''

    static setId(id){
        this.Id = id
    }

    static getId(){
        return this.Id
    }

    static getInfoArtist(){
        return this.artist.value
    }

    static async fetchSongs(cancion){
        try{
            const response = await apiClient.get(`/recording?fmt=json&query=${cancion}`)
            this.canciones.value = response.data.recordings
        }catch(error){
            console.log(error)
        } 
    }

    static async fetchAlbum(){
        try{
            const response = await apiClient.get(`/release?artist=${this.Id}&fmt=json&type=album`)
            return response.data.releases
        }catch(error){
            console.log(error)
        } 
    }

    static async fetchInfoArtist(){
        try{
            const response = await apiClient.get(`/artist/${this.Id}?fmt=json&inc=genres`)
            this.artist.value = response.data
        }catch(error){
            console.log(error)
        } 
    }

    static async getLetra(song){
        try{
            const artista = song['artist-credit'][0].artist.name
            const cancion = song.title
            const response = await axios.get(`https://api.lyrics.ovh/v1/${artista}/${cancion}`)
            if(response.status > 300){
                return ''
            }else{
                return response.data.lyrics
            }
        }catch(error){
            console.log(error)
        }
    }

    static getSongs(){
        return this.canciones.value
    }
}

export default GestionService