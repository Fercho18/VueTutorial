<template>
    <div class="popup">
            <div class="popup-inner">
                <div style = "display: flex">
                    <div  id="map"></div>
                    <button style="width:100px;margin-left:1%; height: 80px;" @click="close"  class="btn btn-danger">Close</button>
                </div> 
            </div>
        </div>
</template>

<script>
import { onMounted } from 'vue'
import leaflet from 'leaflet'
export default {
    setup(props, context) {
        let map;
        onMounted(() => {
            map = leaflet.map('map').setView([41.276486, 1.9886], 13);
            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 21,
                attribution: '© OpenStreetMap'
            }).addTo(map);

        })
        function close() {
            context.emit('close')
        }

        return {
            close
        }
    }
}
</script>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-inner {
    background: #FFF;
    width: 1900px;
    height: 900px;
}

#map {
    width: 80%;
    height: 600px;
    border-style: solid;
}
</style>