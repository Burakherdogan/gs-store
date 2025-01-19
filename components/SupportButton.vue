<template>
    <div>
      <!-- Destek Butonu -->
      <button
        class="btn btn-danger position-fixed"
        style="bottom: 20px; right: 20px; border-radius: 50px; padding: 10px 20px; z-index: 1000;"
        @click="toggleChat"
      >
        <i class="bi bi-chat-dots"></i> DESTEK
      </button>
  
      <!-- Chat Penceresi -->
      <div
        v-if="showChat"
        class="chat-window position-fixed bg-light shadow"
        style="width: 300px; height: 400px; bottom: 70px; right: 20px; border-radius: 10px; z-index: 999;"
      >
        <div class="chat-header bg-warning text-white p-2 d-flex justify-content-between align-items-center">
          <span>Galatasaray - Müşteri Hizmetleri</span>
          <button class="btn btn-sm btn-close bg-light" @click="toggleChat"></button>
        </div>
        <div class="chat-body p-3 overflow-auto" style="height: 300px;">
          <div v-for="(message, index) in messages" :key="index">
            <p><strong>{{ message.username }}:</strong> {{ message.message }}</p>
          </div>
        </div>
        <div class="chat-footer p-2 bg-light">
          <input
            type="text"
            class="form-control"
            placeholder="Mesajınızı yazın"
            v-model="message"
            @keyup.enter="sendMessage"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useSupportStore } from '@/stores/supportStore';

    const supportStore = useSupportStore();

    // Chat penceresinin durumu
    const showChat = ref(supportStore.showChat);
    const message = ref(supportStore.message);
    const messages = ref(supportStore.messages);

    // Mesajları yükle
    onMounted(() => {
    supportStore.loadMessages();
    });

    // Chat açma/kapama
    const toggleChat = () => {
    supportStore.toggleChat();
    };

    // Mesaj gönderme
    const sendMessage = () => {
    supportStore.sendMessage();
    message.value = ''; // Mesaj kutusunu sıfırlıyoruz
    };

  
  // Sayfa yüklendiğinde mesajları dinlemek için
  onMounted(() => {
    supportStore.loadMessages(); // Firebase'den gelen mesajları dinle
  });
  </script>
  
  
  <style scoped>
  .chat-window {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .chat-header {
    background-color: #d81b26;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  
  .chat-body {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }
  
  .chat-footer {
    padding: 10px;
    border-top: 1px solid #ddd;
  }
  
  .chat-footer input {
    width: 100%;
    padding: 5px;
  }
  </style>
  