import { defineStore } from 'pinia';
import { ref } from 'vue';
import { rtdb } from '@/utils/firebase';  // Firebase config dosyasından Realtime Database import
import { ref as dbRef, push } from 'firebase/database';  // Realtime Database işlemleri

interface Message {
  username: string;
  message: string;
  timestamp: number;
}

export const useSupportStore = defineStore('support', {
  state: () => ({
    showChat: false,
    message: '',
    messages: [] as Message[],
  }),
  actions: {
    // Chat penceresini açma ve kapama
    toggleChat() {
      this.showChat = !this.showChat;
    },

    // Mesaj gönderme
    async sendMessage() {
      if (this.message.trim()) {
        const newMessage: Message = {
          username: 'Müşteri', // Kullanıcı adını buradan alabiliriz
          message: this.message,
          timestamp: Date.now(),
        };

        // Yeni yol `messages`'i kullanıyoruz
        const messagesRef = dbRef(rtdb, 'messages');
        await push(messagesRef, newMessage);  // Mesajı Realtime Database'e gönder

        this.messages.push(newMessage); // Mesajı store'a ekle
        this.message = ''; // Mesajı sıfırla
      }
    },

    // Mesajları yükleme
    async loadMessages() {
      const messagesRef = dbRef(rtdb, 'messages');  // `messages` yolunu kullanıyoruz
      try {
        const snapshot = await get(messagesRef);  // Mesajları almak için Realtime Database'ten get yapıyoruz
        if (snapshot.exists()) {
          this.messages = Object.values(snapshot.val()).map((message: any) => ({
            username: message.username,
            message: message.message,
            timestamp: message.timestamp,
          }));
        } else {
          console.log('Mesajlar mevcut değil');
        }
      } catch (error) {
        console.error('Mesajlar yüklenemedi:', error);
      }
    },
  },
});
