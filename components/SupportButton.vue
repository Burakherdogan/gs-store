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
        <div v-if="isConnecting" class="connection-message">
          <p>Bağlanıyor, lütfen 1 dakika bekleyin...</p> <!-- Bağlantı mesajı -->
        </div>
        <div v-else class="chat-footer p-2 bg-light">
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
  import { getAuth } from 'firebase/auth';
  import { rtdb } from '@/utils/firebase'; // Firebase Realtime Database import
  import { ref as dbRef, push, get, update } from 'firebase/database'; // Firebase Database işlemleri
  
  // Vue reaktif özellikleri
  const showChat = ref(false); // Chat penceresinin durumu
  const message = ref(''); // Girilen mesaj
  const messages = ref<{ username: string; message: string }[]>([]); // Mesajlar
  const isConnecting = ref(false); // Bağlantı mesajı durumu
  
  // Kullanıcı girişi
  const auth = getAuth();
  const user = auth.currentUser;
  
  // Kullanıcı bilgisi
  const username = ref<string>(''); // Default değer
  
  // Kullanıcı girişi kontrolü ve username ayarı
  onMounted(() => {
    if (user) {
      username.value = user.email || 'Ziyaretçi'; // Kullanıcı varsa, e-posta adresini al, yoksa 'Ziyaretçi' olarak belirle
    } else {
      username.value = 'Ziyaretçi'; // Eğer giriş yapılmamışsa, ziyaretçi olarak kabul et
    }
  });
  
  // Kullanıcıya ait sessionId
  const sessionId = ref(user ? user.uid : 'guest');
  
  // Chat açma/kapama fonksiyonu
  const toggleChat = () => {
    showChat.value = !showChat.value; // Popup'ı aç/kapat
    if (showChat.value) {
      connectUser(); // Chat açıldığında bağlantıyı başlat
    }
  };
  
  // Bağlantı süresi ve mesaj gönderme
  const connectUser = () => {
    isConnecting.value = true; // Bağlantı süresi başlasın
    setTimeout(() => {
      isConnecting.value = false; // 1 dakika sonra bağlantı tamamlanacak
    }, 100); // 1 dakika bekle
  };
  
  // Firebase'e mesaj gönderme
  const sendMessage = async () => {
    if (message.value.trim()) {
      const newMessage = {
        username: username.value, // Kullanıcı adı (Giriş yapan kullanıcı)
        message: message.value,
      };
  
      // Realtime Database'e kullanıcının sessionId'ye göre mesajı kaydediyoruz
      const messagesRef = dbRef(rtdb, `chat/sessions/${sessionId.value}/messages`);
      const newMessageRef = push(messagesRef, newMessage); // Yeni mesajı ekle
  
      // Mesajı store'a ekle
      messages.value.push(newMessage);
  
      // Mesaj kutusunu sıfırla
      message.value = ''; 
    }
  };
  
  // Firebase'den mesajları yükleme (destek@gmail.com'a özel)
  const loadMessages = async () => {
    const messagesRef = dbRef(rtdb, `chat/sessions/${sessionId.value}/messages`);
    const snapshot = await get(messagesRef);
  
    if (snapshot.exists()) {
      const allMessages = Object.values(snapshot.val()).map((message: any) => ({
        username: message.username,
        message: message.message,
        timestamp: message.timestamp,
      }));
  
      // Sadece kendi oturumuna ait mesajları alıyoruz
      messages.value = allMessages;
    } else {
      console.log('No messages available');
    }
  };
  
  // Sayfa yüklendiğinde mesajları al
  loadMessages();
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
  
  .connection-message {
    padding: 10px;
    background-color: #f8d7da;
    color: #721c24;
    border-radius: 4px;
    text-align: center;
  }
  </style>
  