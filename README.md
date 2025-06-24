# 🚗 ABC Car Rental Website

Sebuah website sewa mobil modern dan responsif yang dibangun dengan HTML, CSS, dan JavaScript murni. Website ini menampilkan antarmuka yang elegan dengan fitur slider showcase, sistem pemesanan interaktif, dan manajemen data menggunakan localStorage.

## ✨ Features

### 🎯 Core Features
- **Hero Slider Showcase** - Slider otomatis dengan 3 slide berbeda menampilkan mobil unggulan
- **Car Selection System** - Pilih multiple mobil dengan tanggal dan durasi sewa
- **Interactive Booking Form** - Form pemesanan dengan validasi real-time
- **Cost Calculator** - Kalkulasi otomatis total biaya sewa
- **Booking Management** - Simpan, lihat, dan hapus riwayat pemesanan
- **Local Storage** - Data tersimpan secara lokal di browser

### 🎨 UI/UX Features
- **Modern Design** - Design terinspirasi dari Gojek/Traveloka
- **Responsive Layout** - Optimal di desktop, tablet, dan mobile
- **Smooth Animations** - Transisi dan animasi yang halus
- **Interactive Elements** - Hover effects dan micro-interactions
- **Notification System** - Feedback visual untuk user actions
- **Loading States** - Indikator loading untuk better UX

### 📊 Additional Sections
- **Stats Counter** - Animasi counter untuk statistik perusahaan
- **Features Showcase** - Highlight keunggulan layanan
- **Professional Footer** - Informasi kontak dan navigasi

## 🛠️ Tech Stack

- **HTML5** - Semantic markup dan struktur
- **CSS3** - Modern styling dengan Flexbox/Grid
- **Vanilla JavaScript** - Interactive functionality
- **Font Awesome** - Icon library
- **Local Storage API** - Data persistence

## 📁 Project Structure

\`\`\`
car-rental-website/
│
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet
├── script.js           # Main JavaScript file
├── README.md           # Project documentation
│
└── asset/              # Image assets
    ├── avanza.jpg      # Toyota Avanza image
    ├── innova.png      # Toyota Innova image
    ├── hrv.jpg         # Honda HRV image
    └── sigra.jpg       # Daihatsu Sigra image
\`\`\`

## 🚀 Installation & Setup

### Prerequisites
- Web browser modern (Chrome, Firefox, Safari, Edge)
- Web server lokal (opsional untuk development)

### Quick Start

1. **Clone repository**
   \`\`\`bash
   git clone https://github.com/username/abc-car-rental.git
   cd abc-car-rental
   \`\`\`

2. **Add car images**
   - Tambahkan gambar mobil ke folder \`asset/\`
   - Format yang didukung: JPG, PNG
   - Nama file sesuai dengan yang ada di \`script.js\`:
     - \`avanza.jpg\`
     - \`innova.png\`
     - \`hrv.jpg\`
     - \`sigra.jpg\`

3. **Run locally**
   
   **Option A: Direct browser**
   - Buka \`index.html\` langsung di browser
   
   **Option B: Local server (recommended)**
   \`\`\`bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   \`\`\`
   
   Kemudian buka \`http://localhost:8000\`

## 📖 Usage Guide

### 1. **Browsing Cars**
- Scroll ke section "Pilih Mobil Impian Anda"
- Lihat detail mobil, harga, dan deskripsi
- Pilih mobil dengan mencentang checkbox

### 2. **Making Reservation**
- Isi nama pelanggan di form
- Pilih tanggal mulai dan durasi sewa untuk setiap mobil
- Klik "Hitung Total Biaya" untuk melihat ringkasan
- Klik "Simpan Pemesanan" untuk menyimpan

### 3. **Managing Bookings**
- Lihat riwayat pemesanan di section "Riwayat Pemesanan"
- Hapus pemesanan dengan tombol "Hapus"
- Data tersimpan di localStorage browser

## 🎨 Customization

### Mengubah Warna Theme
Edit variabel warna di \`styles.css\`:
\`\`\`css
/* Primary colors */
--primary-red: #ff4444;
--primary-orange: #ff6b35;
--primary-yellow: #ffcc02;
\`\`\`

### Menambah Mobil Baru
Edit array \`cars\` di \`script.js\`:
\`\`\`javascript
const cars = [
  {
    id: 5,
    name: "Nama Mobil Baru",
    price: 550000,
    image: "asset/mobil-baru.jpg",
    description: "Deskripsi mobil baru"
  }
  // ... existing cars
]
\`\`\`

### Mengubah Slider Content
Edit HTML di section \`.hero-showcase\` untuk mengubah konten slider.

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 🔧 Development

### File Structure Explanation

- **\`index.html\`** - Struktur HTML utama dengan semantic markup
- **\`styles.css\`** - Styling lengkap dengan responsive design
- **\`script.js\`** - Logic aplikasi dan interaktivity
- **\`asset/\`** - Folder untuk menyimpan gambar mobil

### Key JavaScript Functions

- \`initializeApp()\` - Initialize aplikasi
- \`renderCars()\` - Render daftar mobil
- \`handleCarSelection()\` - Handle pemilihan mobil
- \`calculateTotal()\` - Kalkulasi total biaya
- \`saveBooking()\` - Simpan pemesanan
- \`initializeSlider()\` - Initialize hero slider

## 🚀 Deployment

### GitHub Pages
1. Push code ke GitHub repository
2. Go to Settings > Pages
3. Select source branch (main/master)
4. Website akan tersedia di \`https://username.github.io/repository-name\`

### Netlify
1. Connect GitHub repository ke Netlify
2. Deploy otomatis setiap push ke main branch

### Vercel
1. Import project dari GitHub
2. Deploy dengan satu klik

## 🤝 Contributing

1. Fork repository
2. Create feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to branch (\`git push origin feature/AmazingFeature\`)
5. Open Pull Request

### Development Guidelines
- Gunakan semantic HTML
- Follow CSS BEM methodology
- Write clean, commented JavaScript
- Test di multiple browsers
- Ensure responsive design

## 📝 Todo / Future Enhancements

- [ ] Payment integration
- [ ] User authentication
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Car availability calendar
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] PWA capabilities
- [ ] Backend integration
- [ ] Database storage

## 🐛 Known Issues

- Images perlu ditambahkan manual ke folder asset
- Data hanya tersimpan di localStorage (hilang jika clear browser data)
- Tidak ada validasi server-side

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Design inspiration from Gojek and Traveloka
- Font Awesome for icons
- Modern CSS techniques and best practices
- Vanilla JavaScript for lightweight performance

---

⭐ **Star this repository if you found it helpful!**

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

1. Check [Issues](https://github.com/username/abc-car-rental/issues) page
2. Create new issue dengan detail lengkap
3. Contact via email untuk support langsung

---

**Happy Coding! 🚗💨**
