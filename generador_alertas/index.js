const mqtt = require('mqtt');


const client = mqtt.connect("mqtt://localhost:1883");
const topic = "alerts-raw";


client.on("connect", () => {
    setInterval(() => {
        const alert = {
            deviceId: 1,
            message: "Hubo un error en el dispositivo",
            timestamp: new Date().toISOString(),
            nivel: "high"
        };

        client.publish(topic, JSON.stringify(alert), { qos: 1 }, (err) => {
            if (err) console.error("Error publicacion:", err);
            else console.log("Alerta publicada:", alert);
        });
    }, 5000);
});

client.on("error", (err) => {
    console.error("MQTT error:", err);
    client.end();
});
