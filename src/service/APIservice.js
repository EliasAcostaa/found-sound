import axios from "axios";

const apiClient = axios.create({
	baseURL: 'https://musicbrainz.org/ws/2'
}); 

export default apiClient;