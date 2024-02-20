//https://www.emqx.com/en
//npm info mqtt versions
//mqtt version: npm install mqtt@4.3.4

import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt';
import mqtt, { MqttClient } from 'mqtt'

import 'bootstrap/dist/css/bootstrap.css'

let client : MqttClient;
try {
    client = mqtt.connect('mqtt://localhost:9042')
    client.on('connect', () => {
        console.log('Connection succeeded!');
        //Cuando se utiliza el publish en el primer campo colocamos el topic
        //en el segundo campo colocamos el payload, esto se envía al dummyservice
        client.publish("Connect","")
        app.provide('mqttClient', client)
    })
} catch (error) {
    console.log('mqtt.connect error', error)
}

const emitter =mitt();
const app =createApp(App);
app.provide('emitter',emitter);
app.mount('#app')
