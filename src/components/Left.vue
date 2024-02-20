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
        <div  style ="width:70%">
        <canvas style="margin-left:20%; width: 400px; height: 300px; border-style: solid;" id= "output"></canvas>
        </div> 

    </div>
</template>

<script>
import { defineComponent, inject, onMounted } from 'vue'

export default defineComponent({
    setup() {

        onMounted(()=>{
            client.on('message', (topic,message)=>{

                if(topic=='videoFrame'){
                    const img = new Image();
                    img.src = "data:image/jpg;base64,"+message;
                    const canvas = document.getElementById('output');
                    const context = canvas.getContext('2d');
                    img.onload = ()=>{
                        context.drawImage(
                        img,
                        0,
                        0,
                        img.width,
                        img.height,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                        );

                    }
                }
            })
        })
        
        let client = inject('mqttClient')

        function startVideoFrame(){
            client.publish("StartVideoStream")
            client.subscribe("videoFrame")
        }

        function stopVideoFrame(){
            client.publish("StopVideoStream")
        }

        return {
            startVideoFrame,
            stopVideoFrame
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