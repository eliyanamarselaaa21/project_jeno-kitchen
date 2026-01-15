// 1. Inisialisasi AOS (Animasi)
AOS.init({
  duration: 1000,
  once: true,
});

// 2. Logika Navbar Mobile
const menuToggle = document.getElementById("menu-toggle");
const navbarCollapse = document.getElementById("navbarNav");

menuToggle.addEventListener("click", () => {
  navbarCollapse.classList.toggle("active");
  const icon = menuToggle.querySelector("span");
  if (navbarCollapse.classList.contains("active")) {
    icon.classList.replace("fa-bars", "fa-times");
  } else {
    icon.classList.replace("fa-times", "fa-bars");
  }
});

// 3. Smooth Scroll
document.querySelectorAll(".nav-link, .btn-pesan").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      navbarCollapse.classList.remove("active");
      const span = menuToggle.querySelector("span");
      if (span.classList.contains("fa-times")) {
        span.classList.replace("fa-times", "fa-bars");
      }
      const targetElement = document.querySelector(href);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    }
  });
});

// 4. Logika Keranjang Belanja
let keranjang = [];

function tambahKeKeranjang(nama, harga) {
  keranjang.push({ nama: nama, harga: harga });
  alert(nama + " berhasil masuk keranjang!");
  document.getElementById("cart-count").innerText = keranjang.length;
}

function bukaModal() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong, pilih menu dulu ya!");
    return;
  }

  let list = document.getElementById("list-pesanan");
  let totalText = document.getElementById("total-harga");
  let total = 0;

  list.innerHTML = "";
  keranjang.forEach((item) => {
    list.innerHTML += `<p style="display:flex; justify-content:space-between;"><span>• ${
      item.nama
    }</span> <span>Rp ${item.harga.toLocaleString()}</span></p>`;
    total += item.harga;
  });

  totalText.innerText = "Total: Rp " + total.toLocaleString();
  document.getElementById("modalKeranjang").style.display = "block";
}

function tutupModal() {
  document.getElementById("modalKeranjang").style.display = "none";
}

function prosesCheckoutAkhir() {
  const nama = document.getElementById("nama-pembeli").value;
  const alamat = document.getElementById("alamat-pembeli").value;
  const metode = document.getElementById("metodeBayar").value;

  if (!nama || !alamat) {
    alert("Kak, Nama dan Alamat pengiriman harus diisi ya! 🙏");
    return;
  }

  let nomor = "6285211948563"; // Nomor WA Admin kamu
  let pesan = `*PESANAN BARU - JENO KITCHEN* 🛒\n`;
  pesan += `----------------------------------\n`;
  pesan += `👤 *Nama:* ${nama}\n`;
  pesan += `📍 *Alamat:* ${alamat}\n`;
  pesan += `💳 *Metode:* ${metode}\n`;
  pesan += `----------------------------------\n`;
  pesan += `*Daftar Camilan:*\n`;

  let total = 0;
  keranjang.forEach((item) => {
    pesan += `• ${item.nama} - Rp ${item.harga.toLocaleString()}\n`;
    total += item.harga;
  });

  pesan += `----------------------------------\n`;
  pesan += `*TOTAL AKHIR: Rp ${total.toLocaleString()}*\n`;
  pesan += `----------------------------------\n`;
  pesan += `\n_Mohon segera diproses ya Admin Jeno Kitchen!_ ✨`;

  // Efek Loading pada tombol
  const btn = document.querySelector(".btn-pesan-wa");
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menghubungkan...';
  btn.style.opacity = "0.8";

  setTimeout(() => {
    window.open(
      `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`,
      "_blank"
    );
    btn.innerHTML = originalText;
    btn.style.opacity = "1";

    // Opsional: Kosongkan keranjang setelah pesan dikirim
    // keranjang = [];
    // document.getElementById("cart-count").innerText = 0;
    // tutupModal();
  }, 1000);
}

// 5. Fungsi Slider Menu (INI YANG SEBELUMNYA KURANG)
function scrollMenu(direction) {
  const slider = document.getElementById("menuSlider");
  const scrollAmount = 320; // Sesuaikan dengan lebar kartu + gap

  if (direction === 1) {
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  } else {
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }
}

// Menutup modal jika klik di area luar kotak putih
window.onclick = function (event) {
  const modal = document.getElementById("modalKeranjang");
  if (event.target == modal) {
    tutupModal();
  }
};

function kirimTestimoni() {
  const nama = document.getElementById("testi-nama").value;
  const pesan = document.getElementById("testi-pesan").value;
  const rating = document.getElementById("testi-rating").value;

  if (nama === "" || pesan === "") {
    alert("Harap isi nama dan ulasan kamu ya!");
    return;
  }

  // Tampilkan loading/alert sukses
  alert(
    `Terima kasih ${nama}!\nUlasan kamu: "${pesan}" dengan rating ${rating} telah kami terima untuk ditinjau admin.`
  );

  // Logika untuk mengirim ke WA Admin (Opsional)
  const pesanWA = `*ULASAN BARU DARI WEBSITE*\n\nNama: ${nama}\nRating: ${rating}\nUlasan: ${pesan}`;
  console.log("Mengirim ke database/WA: ", pesanWA);

  // Reset Form
  document.getElementById("testi-nama").value = "";
  document.getElementById("testi-pesan").value = "";
}

function handleSubscribe(event) {
  event.preventDefault(); // Mencegah halaman reload

  const emailInput = document.getElementById("promo-email");
  const promoContainer = document.getElementById("promo-content");
  const emailValue = emailInput.value;

  if (emailValue) {
    // 1. Berikan efek loading pada tombol
    const btn = document.querySelector(".btn-subscribe");
    btn.innerText = "Processing...";
    btn.disabled = true;

    // 2. Simulasi pengiriman data (1.5 detik)
    setTimeout(() => {
      // 3. Ubah isi container promo menjadi pesan sukses
      promoContainer.innerHTML = `
        <div class="success-promo" style="animation: fadeIn 0.5s ease-in-out;">
          <i class="fas fa-ticket-alt" style="font-size: 3rem; color: #fff; margin-bottom: 15px;"></i>
          <h2 class="promo-title">Welcome to the Club! 🎉</h2>
          <p class="promo-subtitle">Voucher diskon 15% telah dikirim ke <strong>${emailValue}</strong>.</p>
          <p style="font-size: 1rem; margin-top: 10px; opacity: 0.9;">*Gunakan kode promo: <b>JENOPROMO15</b> saat checkout via WA.</p>
        </div>
      `;

      // 4. Simpan ke LocalStorage agar admin bisa tahu (simulasi)
      console.log("Email baru terdaftar: " + emailValue);
    }, 1500);
  }
}
