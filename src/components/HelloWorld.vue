<template>
  <div class="hello">
    <button @click="onButtonClick" class="buttonStyle"> Connect </button>
    <h1>Message from parent: {{ msg }}</h1>
   <h1>self message: {{ selfMessage }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(){

    let selfMessage = ref ("my message")


    function onButtonClick(){
      console.log('button clicked');
      selfMessage.value="button clicked"
    }
    return {
      onButtonClick,
      selfMessage
    }
  }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buttonStyle{
  background-color: brown;
  color: white;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
