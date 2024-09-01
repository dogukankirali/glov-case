# Glov Case

This project is a chat application inspired to some extent by WhatsApp. Users can send messages, delete messages, and perform various other functions.

Bu proje, temel olarak WhatsApp'tan esinlenmiş bir sohbet uygulamasıdır. Kullanıcılar, mesaj gönderebilir, mesajları silebilir ve çeşitli diğer işlevleri gerçekleştirebilirler.

## Features / Özellikler

- **Authentication:** Local authentication with username `user1` and password `password`.
- **Message Storage:** Messages are stored using localStorage.
- **Scroll to Top Button:** A button appears to scroll back to the top when messages overflow.
- **Mobile View:** A hamburger menu is used for mobile view.
- **Message Deletion:** Messages can be deleted by clicking on them.

- **Kimlik Doğrulama:** Kullanıcı adı `user1` ve şifre `password` ile lokal kimlik doğrulama.
- **Mesaj Saklama:** Mesajlar localStorage kullanılarak saklanır.
- **Yukarı Kaydır Butonu:** Mesajlar ekrana sığmadığında yukarı dönmek için bir buton görünür.
- **Mobil Görünüm:** Mobil görünümde hamburger menü kullanılır.
- **Mesaj Silme:** Mesajlar üstüne tıklanarak silinebilir.

## Libraries Used / Kullanılan Kütüphaneler

- **Material UI:** Used for general design, components, and icons.
- **Animate.css:** Used for animations on screen components.
- **Axios:** Used to fetch images from a random image service.
- **Moment:** Used for timestamp operations.
- **React-Custom-Scrollbars-2:** Provides a more aesthetically pleasing scroll view compared to the default overlap appearance.
- **React-Toastify:** Used for notifications on errors and other messages.
- **Zustand:** Used for state management.

- **Material UI:** Genel tasarım, bileşenler ve ikonlar için kullanıldı.
- **Animate.css:** Ekrandaki bileşenlerin animasyonları için kullanıldı.
- **Axios:** Rastgele resim servisinden resim almak için kullanıldı.
- **Moment:** Timestamp işlemleri için kullanıldı.
- **React-Custom-Scrollbars-2:** Normal overlap görünümünden daha güzel bir scroll görünümü için kullanıldı.
- **React-Toastify:** Hata vb. mesajlarda bildirim atmak için kullanıldı.
- **Zustand:** State management için kullanıldı.

## Installation / Kurulum

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:

   ```bash
   npm start
   ```

5. Depoyu klonlayın:
   ```bash
   git clone <repository-url>
   ```
6. Proje dizinine gidin:
   ```bash
   cd <project-directory>
   ```
7. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
8. Uygulamayı başlatın:
   ```bash
   npm start
   ```

## Usage / Kullanım

After starting the application, you can log in with the following credentials:

- **Username:** `user1`
- **Password:** `password`

Feel free to explore the application and its features.

Uygulamayı başlattıktan sonra aşağıdaki kimlik bilgileri ile giriş yapabilirsiniz:

- **Kullanıcı Adı:** `user1`
- **Şifre:** `password`

## Future Plans / Gelecek Planları

- **Enhance Suggestion Mechanism:** Improve the suggestion feature to offer more accurate and relevant suggestions.
- **Message Editing and Starring:** Allow users to edit and star their messages, with these features being available on a per-user basis.
- **Bulk Message Deletion:** Implement a feature to delete all messages at once.
- **User Profile Customization:** Enable users to change their avatar and background using their profile information.
- **Backend Integration:** Connect the application to a real backend for improved functionality and data management.

- **Öneri Mekaniğini Geliştirmek:** Öneri özelliğini daha doğru ve ilgili öneriler sunacak şekilde geliştirmek.
- **Mesaj Düzenleme ve Yıldızlama:** Kullanıcıların mesajlarını düzenleyebilmesi ve yıldızlayabilmesi özelliklerini eklemek, bu özelliklerin kullanıcı bazlı olmasını sağlamak.
- **Toplu Mesaj Silme:** Tüm mesajları bir kerede silme özelliği eklemek.
- **Kullanıcı Profilini Özelleştirme:** Kullanıcıların avatar ve arka planlarını profil bilgileriyle değiştirmelerine olanak tanımak.
- **Gerçek Bir Backend ile Bağlantı:** Uygulamayı gerçek bir backend ile bağlayarak daha iyi işlevsellik ve veri yönetimi sağlamak.
