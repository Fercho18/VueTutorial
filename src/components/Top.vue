<template>
  <div class="topStyle">
    <div style="margin-left: 20%">
      <button @click="primaryClicked" style="margin: 1%; width: 15%" type="button" class="btn btn-primary">
        Primary
      </button>
      <button style="margin: 1%; width: 15%" type="button" class="btn btn-secondary">
        Secondary
      </button>
      <button style="margin: 1%; width: 15%" type="button" class="btn btn-success">
        Success
      </button>
      <button style="margin: 1%; width: 15%" type="button" class="btn btn-danger">
        Danger
      </button>
    </div>
    <div class="input-group mb-3">
      <input style="margin-left: 25%" type="text" class="form-control" v-model="username" placeholder="username"
        aria-label="Recipient's username" aria-describedby="button-addon2" />
      <input type="text" class="form-control" v-model="age" placeholder="age" aria-label="Recipient's username"
        aria-describedby="button-addon2" />
      <button @click="InputUsername" style="margin-right: 25%" class="btn btn-outline-secondary" type="button" id="button-addon2">
        Button
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject } from "vue";


export default defineComponent({
  setup() {
    const emitter = inject('emitter');
    let username = ref(undefined);
    let age = ref(undefined);

    function InputUsername() {
      //console.log("name: " + username.value + " age: " + age.value);
      emitter.emit('newUser',{'name':username.value,'age':age.value});
      username.value = undefined;
      age.value = undefined;
    }
    function primaryClicked() {
      alert("primaryClicked");
    }
    return {
      primaryClicked,
      username,
      age,
      InputUsername,
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