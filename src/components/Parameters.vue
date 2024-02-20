<template>
    <div class="popup">
        <div class="popup-inner">
            Parameters
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">Name</span>
                <input type="text" v-model="name" class="form-control" aria-label="Username"
                    aria-describedby="addon-wrapping">
            </div>
            <label for="customRange1" class="form-label">Example range</label>
            <input type="range" v-model="speed" class="form-range" id="customRange1" min="0" max="100">
            <h3>Speed: {{ speed }}</h3>
            <div style="display: flex">
               
            </div><button style="width: 30%; margin-left: 20%;" @click="writeParameters" class="btn btn-success btn-lg">Send
                Parameters</button>
            <button style="width: 20%; margin-left: 10%;" @click="close" class="btn btn-danger btn-lg">Close</button>
        </div>
    </div>
</template>

<script>

import { defineComponent, inject, ref } from 'vue'

export default defineComponent({
    setup(props, context) {
        let client = inject('mqttClient')
        let speed = ref(undefined);
        let name = ref(undefined);
        let radioButtonSelected = ref(undefined)
        let checkBoxOptions = ref([
            { text: 'Orange', value: 'orange' },
            { text: 'Apple', value: 'apple' },
            { text: 'Pineapple', value: 'pineapple' },
            { text: 'Grape', value: 'grape' },
            { text: 'Otro', value: 'otro' }
        ]);
        let selected = ref(undefined)

        function close() {
            context.emit('close')
        }

        function writeParameters() {
            console.log('name: ', name.value);
            console.log('speed: ', speed.value);
            console.log('radioButtonSelected: ', radioButtonSelected.value);

            radioButtonSelected.value = undefined

            const parameters = {
                name: name.value,
                speed: speed.value
            }
            let message = JSON.stringify(parameters)
            client.publish('writeParameters',message);
            name.value = undefined;
            speed.value = undefined;
        }

        return {
            close,
            name,
            speed,
            writeParameters,
            radioButtonSelected,
            selected,
            client,
            checkBoxOptions
        };
    },
});
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
    background: #fff;
    padding: 32px;
    width: 800px;
    height: 600px;
}
</style>
