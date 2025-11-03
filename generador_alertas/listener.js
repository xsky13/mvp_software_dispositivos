const mqtt = require("mqtt");

// connect to the broker on port 1884
const client = mqtt.connect("mqtt://localhost:1884");

// topic where your Spring app is publishing
const topic = "alerts-processed";

client.on("connect", () => {
    console.log("Conectado al broker MQTT en puerto 1884");
    
    // Subscribe to the topic
    client.subscribe(topic, { qos: 1 }, (err) => {
        if (err) console.error("Error al suscribirse:", err);
        else console.log(`Suscrito al tema: ${topic}`);
    });
});

// When a message arrives
client.on("message", (topic, message) => {
    try {
        const alert = JSON.parse(message.toString());
        console.log("📩 Alerta recibida:", alert);
    } catch (err) {
        console.error("Error parseando mensaje:", err);
    }
});

client.on("error", (err) => {
    console.error("MQTT error:", err);
    client.end();
});
