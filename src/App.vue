<template>
  <button v-if="!connected" class="myButtonConnect" @click="toggle">Connect</button>
  <button v-if="connected" class="myButtonDisconnect" @click="toggle">Disconnect</button>
  <div v-if="connected" class="main">
    <Top></Top>
    <div style="display: flex; height: 50%;">
      <Left></Left>
      <Right></Right>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Top from "./components/Top.vue";
import Bottom from "./components/Bottom.vue";
import Left from "./components/Left.vue";
import Right from "./components/Right.vue";



export default defineComponent({
  name: "App",
  components: {
    Top,
    Left,
    Right,
    Bottom,
  },
  setup(){

    let connected = ref(false);

    function toggle(){
      connected.value=!connected.value;
    }
    return{
      connected,
      toggle
    }

  }
});
</script>

<style>
.main{
  height: 900px;
}
.myButtonConnect{
  background-color: green;
  width: 80%;
  color:white;
  margin-left: 10%;
  margin-bottom: 1%;
}
.myButtonDisconnect{
  background-color: brown;
  width: 80%;
  color:white;
  margin-left: 10%;
  margin-bottom: 1%;
}
</style>
