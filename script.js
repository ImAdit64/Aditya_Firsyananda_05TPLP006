document.getElementById("menu-toggle").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("wrapper").classList.toggle("toggled");
});

let karyawanData = [
    { kode: "K001", nama: "Budi Santoso", email: "budi.santoso@example.com", alamat: "Jl. Diponegoro No. 2", jabatan: "Manager" },
    { kode: "K002", nama: "Siti Aminah", email: "siti.aminah@example.com", alamat: "Jl. Sudirman No. 10", jabatan: "HRD" },
    { kode: "K003", nama: "Rizki Pratama", email: "rizki.pratama@example.com", alamat: "Jl. Gatot Subroto No. 5", jabatan: "Staf Keuangan" },
    { kode: "K004", nama: "Nurul Aisyah", email: "nurul.aisyah@example.com", alamat: "Jl. Merdeka No. 14", jabatan: "Sekretaris" },
    { kode: "K005", nama: "Andi Wijaya", email: "andi.wijaya@example.com", alamat: "Jl. Ahmad Yani No. 3", jabatan: "IT Support" },
    { kode: "K006", nama: "Dewi Lestari", email: "dewi.lestari@example.com", alamat: "Jl. Gajah Mada No. 11", jabatan: "Marketing" },
    { kode: "K007", nama: "Firman Setiawan", email: "firman.setiawan@example.com", alamat: "Jl. Imam Bonjol No. 7", jabatan: "Supervisor" },
    { kode: "K008", nama: "Yanti Wulandari", email: "yanti.wulandari@example.com", alamat: "Jl. Jenderal Sudirman No. 6", jabatan: "Staf Administrasi" },
    { kode: "K009", nama: "Agus Supriyadi", email: "agus.supriyadi@example.com", alamat: "Jl. Hasyim Ashari No. 9", jabatan: "Kepala Gudang" },
    { kode: "K010", nama: "Lia Anggraini", email: "lia.anggraini@example.com", alamat: "Jl. Kartini No. 15", jabatan: "Customer Service" }
];

function renderKaryawanTable() {
    let tableContent = `
        <h2 class="mb-4">Daftar Karyawan</h2>
        <button class="btn btn-success mb-3" id="btnTambahKaryawan">Tambah Karyawan</button>
        <div class="table-header">
            <input type="text" id="searchKaryawan" placeholder="Cari Karyawan..." class="search-input">
        </div>
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>No.</th>
                    <th>Kode</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Alamat</th>
                    <th>Jabatan</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;

    karyawanData.forEach((karyawan, index) => {
        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${karyawan.kode}</td>
                <td>${karyawan.nama}</td>
                <td>${karyawan.email}</td>
                <td>${karyawan.alamat}</td>
                <td>${karyawan.jabatan}</td>
                <td>
                    <button class="btn btn-primary btn-sm btn-edit" data-index="${index}">Edit</button>
                    <button class="btn btn-danger btn-sm btn-delete" data-index="${index}">Delete</button>
                </td>
            </tr>
        `;
    });

    tableContent += `
            </tbody>
        </table>
        <div class="pagination-container">
        <button class="pagination-btn" id="prevPage" onclick="changePage(-1)">Previous</button>
        <span id="pageIndicator">Page 1</span>
        <button class="pagination-btn" id="nextPage" onclick="changePage(1)">Next</button>
        </div>
    `;
    document.getElementById("main-content").innerHTML = tableContent;
    document.getElementById("btnTambahKaryawan").addEventListener("click", showTambahKaryawanForm);

    document.querySelectorAll(".btn-edit").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            console.log("Edit button clicked for index:", index);
            showEditKaryawanForm(index);
        });
    });

    document.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            console.log("Delete button clicked for index:", index); 
            deleteKaryawan(index);
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    function filterTable(inputId, tableId) {
        const filter = document.getElementById(inputId).value.toUpperCase();
        const table = document.getElementById(tableId);
        const tr = table.getElementsByTagName("tr");

        for (let i = 1; i < tr.length; i++) {  
            let td = tr[i].getElementsByTagName("td");
            let rowMatch = false;

  
            for (let j = 0; j < td.length - 1; j++) {
                if (td[j] && td[j].textContent.toUpperCase().includes(filter)) {
                    rowMatch = true;
                    break;
                }
            }
            tr[i].style.display = rowMatch ? "" : "none"; 
        }
    }

    document.getElementById("searchKaryawan").addEventListener("input", function () {
        filterTable("searchKaryawan", "tableKaryawan");
    });

    document.getElementById("searchJabatan").addEventListener("input", function () {
        filterTable("searchJabatan", "tableJabatan");
    });

    document.getElementById("searchDivisi").addEventListener("input", function () {
        filterTable("searchDivisi", "tableDivisi");
    });

    document.getElementById("searchAbsensi").addEventListener("input", function () {
        filterTable("searchAbsensi", "tableAbsensi");
    });

    document.getElementById("searchIzin").addEventListener("input", function () {
        filterTable("searchIzin", "tableIzin");
    });

    document.getElementById("searchLembur").addEventListener("input", function () {
        filterTable("searchLembur", "tableLembur");
    });
});

function showTambahKaryawanForm() {
    document.getElementById("main-content").innerHTML = `
        <h2 class="mb-4">Tambah Karyawan</h2>
        <form id="formTambahKaryawan">
            <div class="form-group">
                <label>Nama Lengkap</label>
                <input type="text" class="form-control" id="namaLengkap" required>
            </div>
            <div class="form-group">
                <label>Jenis Kelamin</label>
                <select class="form-control" id="jenisKelamin" required>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" id="email" required>
            </div>
            <div class="form-group">
                <label>No. HP</label>
                <input type="text" class="form-control" id="noHP" required>
            </div>
            <div class="form-group">
                <label>Alamat</label>
                <textarea class="form-control" id="alamat" required></textarea>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" id="password" required>
            </div>
            <div class="form-group">
                <label>Jabatan</label>
                <input type="text" class="form-control" id="jabatan" required>
            </div>
            <div class="form-group">
                <label>Divisi</label>
                <input type="text" class="form-control" id="divisi" required>
            </div>
            <button type="submit" class="btn btn-primary">Simpan</button>
            <button type="button" class="btn btn-secondary" id="btnCancel">Batal</button>
        </form>
    `;

    document.getElementById("formTambahKaryawan").addEventListener("submit", addKaryawan);
    document.getElementById("btnCancel").addEventListener("click", renderKaryawanTable);
}

function showEditKaryawanForm(index) {
    const karyawan = karyawanData[parseInt(index)];

    document.getElementById("main-content").innerHTML = `
        <h2 class="mb-4">Edit Karyawan</h2>
        <form id="formEditKaryawan">
            <div class="form-group">
                <label>Nama Lengkap</label>
                <input type="text" class="form-control" id="namaLengkap" value="${karyawan.nama}" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" id="email" value="${karyawan.email}" required>
            </div>
            <div class="form-group">
                <label>Alamat</label>
                <textarea class="form-control" id="alamat" required>${karyawan.alamat}</textarea>
            </div>
            <div class="form-group">
                <label>Jabatan</label>
                <input type="text" class="form-control" id="jabatan" value="${karyawan.jabatan}" required>
            </div>
            <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
            <button type="button" class="btn btn-secondary" id="btnCancel">Batal</button>
        </form>
    `;

    document.getElementById("formEditKaryawan").addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Form submitted"); 
        saveKaryawanChanges(index);
    });

    document.getElementById("btnCancel").addEventListener("click", renderKaryawanTable);
}

function addKaryawan(event) {
    event.preventDefault();

    const kode = `K${String(karyawanData.length + 1).padStart(3, '0')}`;
    const nama = document.getElementById("namaLengkap").value;
    const email = document.getElementById("email").value;
    const alamat = document.getElementById("alamat").value;
    const jabatan = document.getElementById("jabatan").value;
    karyawanData.push({ kode, nama, email, alamat, jabatan });
    renderKaryawanTable();
}

function saveKaryawanChanges(index) {
    karyawanData[index].nama = document.getElementById("namaLengkap").value;
    karyawanData[index].email = document.getElementById("email").value;
    karyawanData[index].alamat = document.getElementById("alamat").value;
    karyawanData[index].jabatan = document.getElementById("jabatan").value;

    console.log("Data updated:", karyawanData[index]);  
    renderKaryawanTable();
}

function deleteKaryawan(index) {
    console.log("Delete function called for index:", index); 
    const confirmed = confirm("Apakah Anda yakin ingin menghapus karyawan ini?");
    
    if (confirmed) {
        karyawanData.splice(index, 1);
        renderKaryawanTable();
    }
}

const rowsPerPage = 10;
let currentPage = 1;

function renderTableKaryawan() {
    const tableBody = document.getElementById("tableBodyKaryawan");
    tableBody.innerHTML = ""; 

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = karyawanData.slice(start, end);

    paginatedData.forEach((data, index) => {
        const row = `<tr>
            <td>${start + index + 1}</td>
            <td>${data.kode}</td>
            <td>${data.nama}</td>
            <td>${data.jabatan}</td>
            <td>
                <!-- Aksi buttons here -->
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById("pageIndicator").innerText = `Page ${currentPage}`;
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = end >= karyawanData.length;
}

function changePage(offset) {
    currentPage += offset;
    renderTableKaryawan();
}

document.addEventListener("DOMContentLoaded", () => {
    renderTableKaryawan();
});

let jabatanData = [
    { kode: "J001", jabatan: "Manager" },
    { kode: "J002", jabatan: "HRD" },
    { kode: "J003", jabatan: "Staf Keuangan" },
    { kode: "J004", jabatan: "Sekretaris" }
];

function renderJabatanTable() {
    let tableContent = `
        <h2 class="mb-4">Daftar Jabatan</h2>
        <button class="btn btn-success mb-3" id="btnTambahJabatan">Tambah Jabatan</button>
        <div class="table-header">
            <input type="text" id="searchJabatan" placeholder="Cari Jabatan..." class="search-input">
        </div>
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>No.</th>
                    <th>Kode Jabatan</th>
                    <th>Jabatan</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;

    jabatanData.forEach((jabatan, index) => {
        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${jabatan.kode}</td>
                <td>${jabatan.jabatan}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editJabatan(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteJabatan(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    tableContent += `
            </tbody>
        </table>
        <div class="pagination-container">
        <button class="pagination-btn" id="prevPage" onclick="changePage(-1)">Previous</button>
        <span id="pageIndicator">Page 1</span>
        <button class="pagination-btn" id="nextPage" onclick="changePage(1)">Next</button>
        </div>
    `;

    document.getElementById("main-content").innerHTML = tableContent;
    document.getElementById("btnTambahJabatan").addEventListener("click", showTambahJabatanForm);
}

function showTambahJabatanForm() {
    document.getElementById("main-content").innerHTML = `
        <h2 class="mb-4">Tambah Jabatan</h2>
        <form id="formTambahJabatan">
            <div class="form-group">
                <label>Kode Jabatan</label>
                <input type="text" class="form-control" id="kodeJabatan" required>
            </div>
            <div class="form-group">
                <label>Jabatan</label>
                <input type="text" class="form-control" id="namaJabatan" required>
            </div>
            <button type="submit" class="btn btn-primary">Simpan</button>
            <button type="button" class="btn btn-secondary" id="btnCancelJabatan">Batal</button>
        </form>
    `;

    document.getElementById("formTambahJabatan").addEventListener("submit", addJabatan);
    document.getElementById("btnCancelJabatan").addEventListener("click", renderJabatanTable);
}

function addJabatan(event) {
    event.preventDefault();

    const kode = document.getElementById("kodeJabatan").value;
    const jabatan = document.getElementById("namaJabatan").value;
    jabatanData.push({ kode, jabatan });

    renderJabatanTable();
}


function editJabatan(index) {
    const jabatan = jabatanData[index];
    document.getElementById("main-content").innerHTML = `
        <h2 class="mb-4">Edit Jabatan</h2>
        <form id="formEditJabatan">
            <div class="form-group">
                <label>Kode Jabatan</label>
                <input type="text" class="form-control" id="kodeJabatanEdit" value="${jabatan.kode}" required>
            </div>
            <div class="form-group">
                <label>Jabatan</label>
                <input type="text" class="form-control" id="namaJabatanEdit" value="${jabatan.jabatan}" required>
            </div>
            <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
            <button type="button" class="btn btn-secondary" id="btnCancelEditJabatan">Batal</button>
        </form>
    `;

    document.getElementById("formEditJabatan").addEventListener("submit", function(event) {
        event.preventDefault();
        jabatanData[index].kode = document.getElementById("kodeJabatanEdit").value;
        jabatanData[index].jabatan = document.getElementById("namaJabatanEdit").value;
        renderJabatanTable();
    });

    document.getElementById("btnCancelEditJabatan").addEventListener("click", renderJabatanTable);
}

function deleteJabatan(index) {
    jabatanData.splice(index, 1);
    renderJabatanTable();
}

document.querySelectorAll('.list-group-item').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        
        const submenu = event.target.getAttribute('href').substring(1);

        if (submenu === 'jabatan') {
            renderJabatanTable();
        } else if (submenu === 'karyawan') {
            renderKaryawanTable();
        } else {
            document.getElementById('main-content').innerHTML = '<p>Content not found</p>';
        }
    });
});

let divisiData = [
    { kode: "D001", divisi: "Pemasaran" },
    { kode: "D002", divisi: "Keuangan" },
    { kode: "D003", divisi: "Sumber Daya Manusia" },
    { kode: "D004", divisi: "Produksi" }
];

function renderDivisiTable() {
    let tableContent = `
        <h2 class="mb-4">Daftar Divisi</h2>
        <button class="btn btn-success mb-3" id="btnTambahDivisi">Tambah Divisi</button>
        <div class="table-header">
            <input type="text" id="searchDivisi" placeholder="Cari Divisi..." class="search-input">
        </div>
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>No.</th>
                    <th>Kode Divisi</th>
                    <th>Divisi</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;

    divisiData.forEach((divisi, index) => {
        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${divisi.kode}</td>
                <td>${divisi.divisi}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editDivisi(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteDivisi(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    tableContent += `
            </tbody>
        </table>
        <div class="pagination-container">
        <button class="pagination-btn" id="prevPage" onclick="changePage(-1)">Previous</button>
        <span id="pageIndicator">Page 1</span>
        <button class="pagination-btn" id="nextPage" onclick="changePage(1)">Next</button>
        </div>
    `;

    document.getElementById("main-content").innerHTML = tableContent;
    document.getElementById("btnTambahDivisi").addEventListener("click", showTambahDivisiForm);
}

function showTambahDivisiForm() {
    document.getElementById("main-content").innerHTML = `
        <h2 class="mb-4">Tambah Divisi</h2>
        <form id="formTambahDivisi">
            <div class="form-group">
                <label>Kode Divisi</label>
                <input type="text" class="form-control" id="kodeDivisi" required>
            </div>
            <div class="form-group">
                <label>Divisi</label>
                <input type="text" class="form-control" id="namaDivisi" required>
            </div>
            <button type="submit" class="btn btn-primary">Simpan</button>
            <button type="button" class="btn btn-secondary" id="btnCancelDivisi">Batal</button>
        </form>
    `;

    document.getElementById("formTambahDivisi").addEventListener("submit", addDivisi);
    document.getElementById("btnCancelDivisi").addEventListener("click", renderDivisiTable);
}

function addDivisi(event) {
    event.preventDefault();

    const kode = document.getElementById("kodeDivisi").value;
    const divisi = document.getElementById("namaDivisi").value;
    divisiData.push({ kode, divisi });

    renderDivisiTable();
}

function editDivisi(index) {
    const divisi = divisiData[index];
    document.getElementById("main-content").innerHTML = `
        <h2 class="mb-4">Edit Divisi</h2>
        <form id="formEditDivisi">
            <div class="form-group">
                <label>Kode Divisi</label>
                <input type="text" class="form-control" id="kodeDivisiEdit" value="${divisi.kode}" required>
            </div>
            <div class="form-group">
                <label>Divisi</label>
                <input type="text" class="form-control" id="namaDivisiEdit" value="${divisi.divisi}" required>
            </div>
            <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
            <button type="button" class="btn btn-secondary" id="btnCancelEditDivisi">Batal</button>
        </form>
    `;

    document.getElementById("formEditDivisi").addEventListener("submit", function(event) {
        event.preventDefault();
        divisiData[index].kode = document.getElementById("kodeDivisiEdit").value;
        divisiData[index].divisi = document.getElementById("namaDivisiEdit").value;
        renderDivisiTable();
    });

    document.getElementById("btnCancelEditDivisi").addEventListener("click", renderDivisiTable);
}


function deleteDivisi(index) {
    divisiData.splice(index, 1);
    renderDivisiTable();
}

let absensiData = [
    { no: 1, nama: "Lia Anggraini", tanggal: "2024-10-01", lokasi: "Kantor Pusat", jamMasuk: "08:00:00", jamKeluar: "17:00:00" },
    { no: 2, nama: "Lia Anggraini", tanggal: "2024-10-01", lokasi: "Kantor Cabang A", jamMasuk: "08:30:00", jamKeluar: "17:30:00" },
    { no: 3, nama: "Lia Anggraini", tanggal: "2024-10-02", lokasi: "Kantor Pusat", jamMasuk: "08:00:00", jamKeluar: "17:00:00" },
    { no: 4, nama: "Andi Wijaya", tanggal: "2024-10-02", lokasi: "Kantor Cabang B", jamMasuk: "09:00:00", jamKeluar: "18:00:00" },
    { no: 5, nama: "Andi Wijaya", tanggal: "2024-10-03", lokasi: "Kantor Pusat", jamMasuk: "08:00:00", jamKeluar: "17:00:00" },
    { no: 6, nama: "Siti Aminah", tanggal: "2024-10-03", lokasi: "Kantor Cabang A", jamMasuk: "08:30:00", jamKeluar: "17:30:00" },
    { no: 7, nama: "Siti Aminah", tanggal: "2024-10-04", lokasi: "Kantor Pusat", jamMasuk: "08:00:00", jamKeluar: "17:00:00" },
    { no: 8, nama: "Siti Aminah", tanggal: "2024-10-04", lokasi: "Kantor Cabang B", jamMasuk: "09:00:00", jamKeluar: "18:00:00" },
    { no: 9, nama: "Nurul Aisyah", tanggal: "2024-10-05", lokasi: "Kantor Pusat", jamMasuk: "08:00:00", jamKeluar: "17:00:00" },
    { no: 10, nama: "Nurul Aisyah", tanggal: "2024-10-05", lokasi: "Kantor Cabang A", jamMasuk: "08:30:00", jamKeluar: "17:30:00" },
];

function renderAbsensiTable() {
    let tableContent = `
        <h2 class="mb-4">Daftar Absensi</h2>
        <div class="table-header">
            <input type="text" id="searchAbsensi" placeholder="Cari..." class="search-input">
        </div>
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>No.</th>
                    <th>Nama Karyawan</th>
                    <th>Tanggal</th>
                    <th>Lokasi Absen</th>
                    <th>Jam Masuk</th>
                    <th>Jam Keluar</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;

    absensiData.forEach((absensi) => {
        tableContent += `
            <tr>
                <td>${absensi.no}</td>
                <td>${absensi.nama}</td>
                <td>${absensi.tanggal}</td>
                <td>${absensi.lokasi}</td>
                <td>${absensi.jamMasuk}</td>
                <td>${absensi.jamKeluar}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="showDetail(${absensi.no})">Detail</button>
                </td>
            </tr>
        `;
    });

    tableContent += `
            </tbody>
        </table>
        <div class="pagination-container">
        <button class="pagination-btn" id="prevPage" onclick="changePage(-1)">Previous</button>
        <span id="pageIndicator">Page 1</span>
        <button class="pagination-btn" id="nextPage" onclick="changePage(1)">Next</button>
        </div>
    `;

    document.getElementById("main-content").innerHTML = tableContent;
}

function showDetail(no) {
    const absensi = absensiData.find(a => a.no === no);

    if (absensi) {
        const detailContent = `
            <h2 class="mb-4">Detail Absensi</h2>
            <ul>
                <li><strong>No:</strong> ${absensi.no}</li>
                <li><strong>Nama Karyawan:</strong> ${absensi.nama}</li>
                <li><strong>Tanggal:</strong> ${absensi.tanggal}</li>
                <li><strong>Lokasi Absen:</strong> ${absensi.lokasi}</li>
                <li><strong>Jam Masuk:</strong> ${absensi.jamMasuk}</li>
                <li><strong>Jam Keluar:</strong> ${absensi.jamKeluar}</li>
            </ul>
            <button class="btn btn-secondary" onclick="renderAbsensiTable()">Kembali</button>
        `;

        document.getElementById("main-content").innerHTML = detailContent;
    }
}

let izinData = [
    { no: 1, nama: "Agus Supriyadi", izin: "Pulang Lebih Awal", tanggal: "2024-10-01", jam: "15:00:00", keterangan: "Ada urusan keluarga", status: "Disetujui" },
    { no: 2, nama: "Rizki Pratama", izin: "Datang Terlambat", tanggal: "2024-10-01", jam: "09:00:00", keterangan: "Kendala transportasi", status: "Menunggu Konfirmasi" },
    { no: 3, nama: "Budi Santoso", izin: "Pulang Lebih Awal", tanggal: "2024-10-02", jam: "16:00:00", keterangan: "Sakit", status: "Menunggu Konfirmasi" },
    { no: 4, nama: "Andi Wijaya", izin: "Datang Terlambat", tanggal: "2024-10-02", jam: "09:30:00", keterangan: "Ada janji temu", status: "Disetujui" },
    { no: 5, nama: "Agus Supriyadi", izin: "Pulang Lebih Awal", tanggal: "2024-10-03", jam: "14:30:00", keterangan: "Acara keluarga", status: "Menunggu Konfirmasi" },
    { no: 6, nama: "Firman Setiawan", izin: "Datang Terlambat", tanggal: "2024-10-03", jam: "10:00:00", keterangan: "Keterlambatan di jalan", status: "Menunggu Konfirmasi" },
    { no: 7, nama: "Budi Santoso", izin: "Pulang Lebih Awal", tanggal: "2024-10-04", jam: "16:30:00", keterangan: "Ada acara mendadak", status: "Disetujui" }
];

function renderIzinTable() {
    let tableContent = `
        <h2 class="mb-4">Daftar Izin</h2>
        <button class="btn btn-success mb-3" id="btnUbahStatus">Ubah Status</button>
        <div class="table-header">
            <input type="text" id="searchIzin" placeholder="Cari..." class="search-input">
        </div>
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Izin</th>
                    <th>Tanggal</th>
                    <th>Jam</th>
                    <th>Keterangan</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    izinData.forEach((izin, index) => {
        tableContent += `
            <tr>
                <td>${izin.no}</td>
                <td>${izin.nama}</td>
                <td>${izin.izin}</td>
                <td>${izin.tanggal}</td>
                <td>${izin.jam}</td>
                <td>${izin.keterangan}</td>
                <td>${izin.status}</td>
            </tr>
        `;
    });

    tableContent += `
            </tbody>
        </table>
        <div class="pagination-container">
        <button class="pagination-btn" id="prevPage" onclick="changePage(-1)">Previous</button>
        <span id="pageIndicator">Page 1</span>
        <button class="pagination-btn" id="nextPage" onclick="changePage(1)">Next</button>
        </div>
    `;

    document.getElementById("main-content").innerHTML = tableContent;
    document.getElementById("btnUbahStatus").addEventListener("click", showUbahStatusForm);
}

function showUbahStatusForm() {
    let formContent = `
        <h2 class="mb-4">Ubah Status Izin</h2>
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th><input type="checkbox" id="selectAll"></th>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Izin</th>
                    <th>Tanggal</th>
                    <th>Jam</th>
                    <th>Keterangan</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    izinData.forEach((izin, index) => {
        formContent += `
            <tr>
                <td><input type="checkbox" class="checkbox-izin" data-index="${index}"></td>
                <td>${izin.no}</td>
                <td>${izin.nama}</td>
                <td>${izin.izin}</td>
                <td>${izin.tanggal}</td>
                <td>${izin.jam}</td>
                <td>${izin.keterangan}</td>
                <td>${izin.status}</td>
            </tr>
        `;
    });

    formContent += `
            </tbody>
        </table>
        <button class="btn btn-primary" id="btnSetujui">Setujui</button>
        <button class="btn btn-secondary" id="btnBatal">Batal</button>
    `;

    document.getElementById("main-content").innerHTML = formContent;
    document.getElementById("btnBatal").addEventListener("click", renderIzinTable);
    document.getElementById("btnSetujui").addEventListener("click", function() {
        const selectedCheckboxes = document.querySelectorAll('.checkbox-izin:checked');
        if (selectedCheckboxes.length === 0) {
            alert("Silakan pilih izin yang ingin disetujui.");
            return;
        }

        selectedCheckboxes.forEach(checkbox => {
            const index = checkbox.getAttribute('data-index');
            izinData[index].status = "Disetujui";
        });

        renderIzinTable();
    });
}

function updateIzinStatus(selectedIzin) {
    selectedIzin.forEach(checkbox => {
        const rowIndex = checkbox.closest('tr').rowIndex - 1;
        izinData[rowIndex].status = "Disetujui";
    });

    renderIzinTable();
}


function setujuiIzin() {
    const selectedCheckboxes = document.querySelectorAll('.checkbox-izin-ubah:checked');
    console.log("Checkbox yang dipilih: ", selectedCheckboxes);

    selectedCheckboxes.forEach(checkbox => {
        const no = checkbox.getAttribute('data-no');
        const izin = izinData.find(i => i.no === no);
        console.log("Data izin sebelum diubah: ", izin);
        if (izin && izin.status === "Menunggu Konfirmasi") {
            izin.status = "Disetujui";
        }
    });

    console.log("Data izin setelah diubah: ", izinData);
    renderIzinTable();
}

let lemburData = [
    { no: "1", nama: "Nurul Aisyah", tanggal: "2024-11-01", jam: "17:00 - 20:00", keperluan: "Pekerjaan Proyek", status: "Menunggu Konfirmasi" },
    { no: "2", nama: "Dewi Lestari", tanggal: "2024-11-02", jam: "18:00 - 21:00", keperluan: "Meeting Klien", status: "Menunggu Konfirmasi" },
    { no: "3", nama: "Nurul Aisyah", tanggal: "2024-11-03", jam: "16:00 - 19:00", keperluan: "Penyelesaian Tugas", status: "Menunggu Konfirmasi" },
    { no: "4", nama: "Budi Santoso", tanggal: "2024-11-04", jam: "19:00 - 22:00", keperluan: "Rapat Internal", status: "Menunggu Konfirmasi" },
    { no: "5", nama: "Agus Supriyadi", tanggal: "2024-11-05", jam: "17:30 - 20:30", keperluan: "Presentasi Proyek", status: "Menunggu Konfirmasi" },
    { no: "6", nama: "Andi Wijaya", tanggal: "2024-11-06", jam: "18:00 - 21:00", keperluan: "Penyerahan Laporan", status: "Menunggu Konfirmasi" },
    { no: "7", nama: "Nurul Aisyah", tanggal: "2024-11-07", jam: "15:00 - 18:00", keperluan: "Diskusi Tim", status: "Menunggu Konfirmasi" },
    { no: "8", nama: "Yanti Wulandari", tanggal: "2024-11-08", jam: "20:00 - 23:00", keperluan: "Bantuan Proyek", status: "Menunggu Konfirmasi" },
    { no: "9", nama: "Lia Anggraini", tanggal: "2024-11-09", jam: "19:00 - 22:00", keperluan: "Revisi Dokumen", status: "Menunggu Konfirmasi" },
    { no: "10", nama: "Lia Anggraini", tanggal: "2024-11-10", jam: "16:30 - 19:30", keperluan: "Pekerjaan Mendadak", status: "Menunggu Konfirmasi" },
];

function renderLemburTable() {
    let tableContent = `
        <h2 class="mb-4">Daftar Lembur</h2>
        <button class="btn btn-success mb-3" id="btnUbahStatus">Ubah Status</button>
        <div class="table-header">
            <input type="text" id="searchLembur" placeholder="Cari..." class="search-input">
        </div>
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Tanggal</th>
                    <th>Jam Lembur Mulai - Berakhir</th>
                    <th>Keperluan Lembur</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    lemburData.forEach((lembur) => {
        tableContent += `
            <tr>
                <td>${lembur.no}</td>
                <td>${lembur.nama}</td>
                <td>${lembur.tanggal}</td>
                <td>${lembur.jam}</td>
                <td>${lembur.keperluan}</td>
                <td>${lembur.status}</td>
            </tr>
        `;
    });

    tableContent += `
            </tbody>
        </table>
        <div class="pagination-container">
        <button class="pagination-btn" id="prevPage" onclick="changePage(-1)">Previous</button>
        <span id="pageIndicator">Page 1</span>
        <button class="pagination-btn" id="nextPage" onclick="changePage(1)">Next</button>
        </div>
    `;

    document.getElementById("main-content").innerHTML = tableContent;
    document.getElementById("btnUbahStatus").addEventListener("click", showUbahStatusLemburForm);
}

function showUbahStatusLemburForm() {
    let tableContent = `
        <h2 class="mb-4">Ubah Status Lembur</h2>
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th><input type="checkbox" id="select-all"></th>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Tanggal</th>
                    <th>Jam Lembur Mulai - Berakhir</th>
                    <th>Keperluan Lembur</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    lemburData.forEach((lembur, index) => {
        tableContent += `
            <tr>
                <td><input type="checkbox" class="lembur-checkbox" data-index="${index}"></td>
                <td>${lembur.no}</td>
                <td>${lembur.nama}</td>
                <td>${lembur.tanggal}</td>
                <td>${lembur.jam}</td>
                <td>${lembur.keperluan}</td>
                <td>${lembur.status}</td>
            </tr>
        `;
    });

    tableContent += `
            </tbody>
        </table>
        <button class="btn btn-primary" id="btnSetujui">Setujui</button>
        <button class="btn btn-secondary" id="btnBatal">Batal</button>
    `;

    document.getElementById("main-content").innerHTML = tableContent;
    document.getElementById("btnSetujui").addEventListener("click", updateStatusLembur);
    document.getElementById("btnBatal").addEventListener("click", renderLemburTable);

    document.getElementById("select-all").addEventListener("change", function () {
        const checkboxes = document.querySelectorAll('.lembur-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
}

function updateStatusLembur() {
    const checkboxes = document.querySelectorAll('.lembur-checkbox:checked');
    
    checkboxes.forEach(checkbox => {
        const index = checkbox.getAttribute('data-index');
        lemburData[index].status = "Disetujui";
    });
    renderLemburTable();
}

document.querySelectorAll('.list-group-item').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();

        document.querySelectorAll('.list-group-item').forEach(link => {
            link.classList.remove('active');
        });

        const submenu = event.target.getAttribute('href').substring(1);

        if (submenu === 'karyawan') {
            renderKaryawanTable();
            event.target.classList.add('active'); 
        } else if (submenu === 'jabatan') {
            renderJabatanTable();
            event.target.classList.add('active'); 
        } else if (submenu === 'divisi') {
            renderDivisiTable();
            event.target.classList.add('active'); 
        } else if (submenu === 'absensi') {
            renderAbsensiTable();
            event.target.classList.add('active'); 
        } else if (submenu === 'izin') {
            renderIzinTable();
            event.target.classList.add('active'); 
        } else if (submenu === 'lembur') {
            renderLemburTable();
            event.target.classList.add('active'); 
        } else {
            renderDashboard();
        }
    });
});

function renderDashboard() {
    document.getElementById("main-content").innerHTML = `
        <h2 class="dashboard-title">Sistem Informasi Manajemen Karyawan</h2>
        <h4 class="dashboard-subtitle">Admin Dashboard</h4>
        <div class="row mt-4">
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="card info-box bg-blue">
                    <div class="card-body">
                        <div class="info-box-icon"><i class="fas fa-users"></i></div>
                        <div class="info-box-content">
                            <span class="info-box-text">Data Pegawai</span>
                            <span class="info-box-number">13</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="card info-box bg-green">
                    <div class="card-body">
                        <div class="info-box-icon"><i class="fas fa-calendar-check"></i></div>
                        <div class="info-box-content">
                            <span class="info-box-text">Absensi Hari Ini</span>
                            <span class="info-box-number">0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="card info-box bg-light-blue">
                    <div class="card-body">
                        <div class="info-box-icon"><i class="fas fa-clock"></i></div>
                        <div class="info-box-content">
                            <span class="info-box-text">Izin Menunggu Konfirmasi</span>
                            <span class="info-box-number">2</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="card info-box bg-purple">
                    <div class="card-body">
                        <div class="info-box-icon"><i class="fas fa-business-time"></i></div>
                        <div class="info-box-content">
                            <span class="info-box-text">Lembur Menunggu Konfirmasi</span>
                            <span class="info-box-number">1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}