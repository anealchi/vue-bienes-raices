import { ref } from 'vue';

export default function useLocationMap() {

    const zoom = ref(15)
    const center = ref([37.3883571, -5.9840638,13.42])

    function pin(e) {
        const marker = e.target.getLatLng()
        center.value = [marker.lat, marker.lng]
    }

    return {
        zoom,
        center,
        pin
    }
}