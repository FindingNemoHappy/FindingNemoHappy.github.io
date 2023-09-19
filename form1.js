document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const formContainer = document.querySelector(".container");

    btn1.addEventListener("click", function () {
        // Sembunyikan overlay
        overlay.style.display = "none";
        // Tampilkan form container
        formContainer.style.display = "block";
    });

    btn2.addEventListener("click", function () {
        alert("Fitur ini belum tersedia");
        overlay.style.display = "none";
        // Anda dapat menambahkan logika lain di sini jika diperlukan
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("orderForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const product = document.getElementById("product").value;

        const whatsappNumber = "+62895327659898"; // Ganti dengan nomor WhatsApp yang valid
        const message = `Saya ingin memesan produk "${product}" oleh ${name}.`;

        const whatsappLink = `https://api.whatsapp.com/send?phone=${encodeURIComponent(whatsappNumber)}&text=${encodeURIComponent(message)}`;

        // Arahkan pengguna ke URL WhatsApp
        window.location.href = whatsappLink;
    });
});

/* js untuk total harga (Paket) */
document.addEventListener("DOMContentLoaded", function () {
    const premiumBtn = document.getElementById("premiumBtn");
    const simpleBtn = document.getElementById("simpleBtn");
    const jumlahHalamanInput = document.getElementById("jumlahHalaman");
    const materiSudahAdaBtn = document.getElementById("materiSudahAda");
    const materiBelumAdaBtn = document.getElementById("materiBelumAda");
    const deadlineInput = document.getElementById("deadline");
    const totalHargaElement = document.getElementById("totalHarga");

    let selectedBtn = null; // Tombol yang dipilih
    let selectedMateriBtn = null; // Materi yang dipilih

    // Fungsi untuk mengupdate total harga berdasarkan paket, jumlah halaman, materi, dan deadline
    function updateTotalHarga() {
        const hargaPaket = selectedBtn ? parseInt(selectedBtn.getAttribute("data-harga")) : 0;
        let jumlahHalaman = parseInt(jumlahHalamanInput.value) || 0;

        // Jika jumlah halaman adalah 0, ubah nilainya menjadi 1
        if (jumlahHalaman === 0) {
            jumlahHalaman = 1;
        }

        const hargaMateri = selectedMateriBtn ? parseInt(selectedMateriBtn.getAttribute("data-harga")) : 0;
        const deadline = new Date(deadlineInput.value);
        const now = new Date();

        let hargaDeadline = 0;

        // Cek apakah deadline kurang dari atau sama dengan 24 jam dari sekarang
        if (deadline - now <= 24 * 60 * 60 * 1000) {
            hargaDeadline = 10000;
        } else {
            hargaDeadline = 0;
        }

        const totalHarga = (hargaPaket * jumlahHalaman) + hargaMateri + hargaDeadline; // Perhitungan total harga
        totalHargaElement.textContent = totalHarga;
    }

    // Event listener untuk mengupdate total harga saat pemilihan paket atau perubahan jumlah halaman
    premiumBtn.addEventListener("click", function () {
        if (selectedBtn !== premiumBtn) {
            // Jika "Premium" belum dipilih, pilih "Premium" dan batalkan pemilihan "Simple"
            selectedBtn = premiumBtn;
            premiumBtn.style.backgroundColor = "green";
            simpleBtn.style.backgroundColor = "";
            updateTotalHarga();
        }
    });

    simpleBtn.addEventListener("click", function () {
        if (selectedBtn !== simpleBtn) {
            // Jika "Simple" belum dipilih, pilih "Simple" dan batalkan pemilihan "Premium"
            selectedBtn = simpleBtn;
            simpleBtn.style.backgroundColor = "green";
            premiumBtn.style.backgroundColor = "";
            updateTotalHarga();
        }
    });

    // Event listener untuk mengupdate total harga saat pemilihan materi
    materiSudahAdaBtn.addEventListener("click", function () {
        if (selectedMateriBtn !== materiSudahAdaBtn) {
            // Jika "Sudah ada" belum dipilih, pilih "Sudah ada" dan batalkan pemilihan "Belum ada"
            selectedMateriBtn = materiSudahAdaBtn;
            materiSudahAdaBtn.style.backgroundColor = "green";
            materiBelumAdaBtn.style.backgroundColor = "";
            updateTotalHarga();
        }
    });

    materiBelumAdaBtn.addEventListener("click", function () {
        if (selectedMateriBtn !== materiBelumAdaBtn) {
            // Jika "Belum ada" belum dipilih, pilih "Belum ada" dan batalkan pemilihan "Sudah ada"
            selectedMateriBtn = materiBelumAdaBtn;
            materiBelumAdaBtn.style.backgroundColor = "red";
            materiSudahAdaBtn.style.backgroundColor = "";
            updateTotalHarga();
        }
    });

    jumlahHalamanInput.addEventListener("input", function () {
        updateTotalHarga();
    });

    deadlineInput.addEventListener("input", function () {
        updateTotalHarga();
    });

    // Memanggil updateTotalHarga saat halaman dimuat untuk menampilkan harga awal
    updateTotalHarga();
    
    // Fungsi untuk mengumpulkan data dan mengirim pesan ke WhatsApp
    function kirimPesanKeWhatsApp() {
        const name = document.getElementById("name").value;
        const university = document.getElementById("university").value;
        const nim = document.getElementById("nim").value;
        const selectedPackage = selectedBtn ? selectedBtn.textContent : "";
        const jumlahHalaman = parseInt(jumlahHalamanInput.value) || 0;
        const selectedMateri = selectedMateriBtn ? selectedMateriBtn.textContent : "";
        const deadline = document.getElementById("deadline").value;
        const totalHarga = document.getElementById("totalHarga").textContent;

        const whatsappNumber = "62895327659898"; // Ganti dengan nomor WhatsApp yang valid
        const message =`Haloo kak Jasamimin, perkenalkan saya *${name}* ingin membuat pesanan dengan format sebagai berikut:\n\nUniversitas: ${university}\nNIM: ${nim}\nPaket: ${selectedPackage}\nJumlah Halaman: ${jumlahHalaman}\nMateri: ${selectedMateri}\nDeadline: ${deadline}\nTotal Harga: Rp *${totalHarga}*\n\n*note*: Silahkan mengirim materi jika belum ada`;

        const whatsappLink = `https://api.whatsapp.com/send?phone=${encodeURIComponent(whatsappNumber)}&text=${encodeURIComponent(message)}`;

        // Arahkan pengguna ke URL WhatsApp
        window.location.href = whatsappLink;
    }

    // Gantikan event listener pada tombol "Kirim Pesan" dengan fungsi baru
    const kirimPesanBtn = document.getElementById("kirimPesanBtn");
    kirimPesanBtn.addEventListener("click", function () {
        kirimPesanKeWhatsApp();
    });

    // ...
});
