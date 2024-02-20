<template>
  <div class="topStyle">
    <div style="margin-left: 20%">
      <button @click="primaryClicked" style="margin: 1%; width: 15%" type="button" class="btn btn-primary">
        Alert
      </button>
      <button @click="showParameterPopUp = true" style="margin: 1%; width: 15%" type="button" class="btn btn-secondary">
        Parameters
      </button>
      <parameters v-if="showParameterPopUp" @close="closeParameters"></parameters>
      <button @click="getValue" style="margin: 1%; width: 15%" type="button" class="btn btn-success">
        Get Value
      </button>
      <button style="margin: 1%; width: 15%" type="button" class="btn btn-danger">
        Danger
      </button>
      <input style="margin-left: 25%; width: 10%;" type="text" class="form-control" v-model="value" disabled="true"
        aria-label="Recipient's username" aria-describedby="button-addon2" />
    </div>
    <div class="input-group mb-3">
      <input style="margin-left: 25%" type="text" class="form-control" v-model="username" placeholder="username"
        aria-label="Recipient's username" aria-describedby="button-addon2" />
      <input type="text" class="form-control" v-model="age" placeholder="age" aria-label="Recipient's username"
        aria-describedby="button-addon2" />
      <button @click="InputUsername" style="margin-right: 25%" class="btn btn-outline-secondary" type="button"
        id="button-addon2">
        Button
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject, onMounted } from "vue";
import Parameters from "./Parameters.vue";


export default defineComponent({
  components: { Parameters },
  setup() {
    const emitter = inject('emitter');
    let username = ref(undefined);
    let age = ref(undefined);
    let showParameterPopUp= ref(false)
    let value = ref(undefined)
    let client = inject("mqttClient")
    onMounted( ()=>{
      client.on('message',(topic,message)=>{
        if(topic=='Value'){
          value.value=message
        }
      })
    })

    

    function getValue(){
      client.publish('getValue','')
      client.subscribe('Value')
    }

    function InputUsername() {
      //console.log("name: " + username.value + " age: " + age.value);
      emitter.emit('newUser', { 'name': username.value, 'age': age.value });
      username.value = undefined;
      age.value = undefined;
    }
    function primaryClicked() {
      alert("primaryClicked");
    }
    function closeParameters(){
      showParameterPopUp.value=false;
    }
    return {
      primaryClicked,
      username,
      age,
      InputUsername,
      showParameterPopUp,
      closeParameters,
      getValue,
      value,
      client
    };
  },
});
</script>

<style scoped>
.topStyle {
  border-style: solid;
  border-color: red;
  height: 20%;
}
</style>