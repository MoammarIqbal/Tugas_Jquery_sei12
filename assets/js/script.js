$(document).ready(function() {
    var totalHarga = 0;

    $('.button-order').click(function() {
        // Mendapatkan baris yang terdekat dari tombol yang diklik
        var baris = $(this).closest('tr');

        // Mengambil nama menu dan harganya
        var namaMenu = baris.find('td:nth-child(2)').text();
        var harga = parseInt(baris.find('td:nth-child(3)').text().replace('.', ''));

        // Mengcopy baris lalu menyisipkannya ke tbody dari table pesanan
        var barisPesanan = baris.clone();
        barisPesanan.append('<td><button class="button-cancel">Cancel</button></td>'); // Tambahkan tombol cancel
        barisPesanan.appendTo('.pesanan-container table tbody');

        // Menyembunyikan tombol order pada baris yang dicopy
        barisPesanan.find('.button-order').parent().hide();

        // Menyembunyikan baris di tabel menu
        baris.hide();

        // Update nomor urut setelah item ditambahkan
        updateNomorPesanan();

        // Menambahkan harga ke total harga
        totalHarga += harga;

        // Update total harga
        if ($('.pesanan-container table tfoot').length == 0) {
            $('.pesanan-container table').append('<tfoot><tr><td colspan="3">Total</td><td id="total-harga"></td></tr></tfoot>');
        }
        $('#total-harga').text(totalHarga.toLocaleString('id-ID'));
    });

    // Fungsi untuk tombol cancel
    $(document).on('click', '.button-cancel', function() {
        // Mendapatkan baris yang akan dihapus
        var barisPesanan = $(this).closest('tr');

        // Mengambil harga dari baris tersebut
        var harga = parseInt(barisPesanan.find('td:nth-child(3)').text().replace('.', ''));

        // Mengurangi total harga
        totalHarga -= harga;

        // Update total harga
        $('#total-harga').text(totalHarga.toLocaleString('id-ID'));

        // Mengembalikan item ke tabel menu
        var namaMenu = barisPesanan.find('td:nth-child(2)').text();
        $('.menu-container table tbody tr').filter(function() {
            return $(this).find('td:nth-child(2)').text() === namaMenu;
        }).show();

        // Menghapus baris dari tabel pesanan
        barisPesanan.remove();

        // Update nomor urut setelah item dihapus
        updateNomorPesanan();
    });

    // Fungsi untuk mengupdate nomor urut pada tabel pesanan
    function updateNomorPesanan() {
        $('.pesanan-container table tbody tr').each(function(index) {
            $(this).find('td:first').text(index + 1); // Nomor urut mulai dari 1
        });
    }
});
