import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
const app = createApp(App)

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/serviceWorker.js")
        .then(() => console.log("Сервис-воркер зарегистрирован"))
        .catch(err => console.log("Ошибка регистрации сервис-воркера", err));
    });
  }

app.use(router)

app.mount('#app')