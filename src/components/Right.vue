<template>
    <div class="rightStyle">
      <table class="table table-striped table-bordered" style="width: 50%; margin-left: 10%; margin-top: 10%; border-style: solid;">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userList" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
            <td>
              <button @click="deleteUser(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  

  <script>
  import { defineComponent, inject, ref } from 'vue';
  
  export default defineComponent({
    setup() {
      let userList = ref([]);
      const emitter = inject('emitter');
  
      emitter.on('newUser', (user) => {
        userList.value.push(user);
        console.log(userList.value);
      });
  
      function deleteUser(index) {
        userList.value.splice(index, 1);
      }
  
      return {
        userList,
        deleteUser,
      };
    },
  });
  </script>
  

<style scoped>
.rightStyle {
  border-style: solid;
  border-color: blue;
  width: 50%;
}
</style>