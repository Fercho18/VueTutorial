<template>
    <div class="leftStyle">
        <div>
            <button style="width:20%; margin:1%; margin-left:20%" @click="startVideoFrame" class="btn btn-success">
                Start video frame
            </button>
            <button style="width:20%; margin:1%" @click="stopVideoFrame" class="btn btn-primary">
                Stop video frame
            </button>
        </div>
        <div style="display: flex;" >
            <div style="width:70%">
                <canvas style="margin-left:20%; width: 400px; height: 300px; border-style: solid;" id="output"></canvas>
            </div>
            <div class="btn-group-vertical">

                <button style=" margin:1%; width: 150px;" @click="mode = 'gray'" variant="info" class="btn btn-success">
                    Gray </button>
                <button style="margin:1%;width:150px;" @click="mode = 'canny'" variant="success" class="btn btn-success">
                    Canny </button>
                <button style="margin:1%; width: 150px;" @click="mode = 'normal'" variant="warning" class="btn btn-success">
                    Normal </button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, inject, onMounted, ref } from 'vue'
import * as cv from 'opencv.js'

export default defineComponent({
    setup() {

        let mode = ref ('normal')

        onMounted(() => {
            client.on('message', (topic, message) => {

                if (topic == 'videoFrame') {
                    const img = new Image();
                    img.src = "data:image/jpg;base64," + message;
                    const canvas = document.getElementById('output');
                    const context = canvas.getContext('2d');
                    img.onload = () => {
                        let dst;
                        if (mode.value == 'normal')
                            dst = cv.imread (img);
                        if (mode.value == 'gray') {
                            let mat = cv.imread (img);
                            dst = new cv.Mat();
                            cv.cvtColor (mat, dst, cv.COLOR_RGB2GRAY,0);
                            mat.delete()
                        }
                        if (mode.value == 'canny') {
                            let mat = cv.imread (img);
                            dst = new cv.Mat();
                            cv.cvtColor (mat, dst, cv.COLOR_RGB2GRAY,0);
                            cv.Canny(mat, dst, 50, 100, 3, false);
                            mat.delete()
                        }
                        cv.imshow ('output',dst);
                    }
                }
            })
        })

        let client = inject('mqttClient')

        function startVideoFrame() {
            client.publish("StartVideoStream")
            client.subscribe("videoFrame")
        }

        function stopVideoFrame() {
            client.publish("StopVideoStream")
        }

        return {
            startVideoFrame,
            stopVideoFrame,
            mode
        };
    },
});
</script>

<style scoped>
.leftStyle {
    border-style: solid;
    border-color: yellow;
    width: 50%;
}
</style>