<template>
    <div class="popup">
        <div class="popup-inner">
            Parameters
            <button style="width: 20%; margin-left: 10%;" @click="close" class="btn btn-danger btn-lg" >Close</button>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    setup(props, context) {

        function close(){
            context.emit('close')
        }

        return {
            close
        }
    }
})
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