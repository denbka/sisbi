import Vue from 'vue'
import {
    HubConnectionBuilder,
    LogLevel
} from '@microsoft/signalr'

// Vue.use(signalr)
const connection = new HubConnectionBuilder()
.withUrl("http://localhost:3000/response_hub")
.configureLogging(LogLevel.Information)
.build();

function start() {
    try {
        connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

start()

connection.onclose(async () => {
    await start()
})

const plugin = {
    install(Vue) {
        if (Vue.prototype.$connection) return
    
        Object.defineProperty(Vue.prototype, '$connection', {
            get: () => connection
        })
    }
}


Vue.use(plugin)