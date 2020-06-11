/*
    Nama : candra dwi cahyo
    Umur : 16 tahun
    Tanggal Lahir : 20 - mei - 2004
    Email : candradwicahyo18@gmail.com
*/

function showTable() {
    $.ajax({
        url: 'data/data.php',
        method: 'get',
        success: function(data, status) {
            let result = JSON.parse(data);
            let str = '';

            $.each(result, function(key, value) {
                let nama = value.nama;
                let email = value.email;
                let id = value.id;
                let no = (key + 1);

                str += tableValue(nama, email, no, id);
                $('#table-records').html(str);
            });
        }
    });
}

showTable();

function tableValue(nama, email, no, id) {
    return `
    <tr>
    <td> ${no++} </td>
    <td> ${nama} </td>
    <td> ${email} </td>
    <td>
    <button type="button" class="btn btn-success" id="btn-modal-ubah" data-id="${id}" data-toggle="modal" data-target="#form-ubah"><i class="fas fa-pen"></i></button> &nbsp;
    <button type="button" class="btn btn-danger" id="btn-hapus" data-id="${id}"><i class="fas fa-trash-alt"></i></button>
    </td>
    </tr>
    `;
}

$('#btn-tambah').on('click', insertData);

function insertData() {
    $.ajax({
        url: 'data/tambah.php',
        method: 'post',
        data: {
            nama: $('#nama1').val(),
            email: $('#email1').val()
        },
        success: function(data, status) {
            let result = JSON.parse(data);

            swal.fire({
                position: 'center',
                icon: result.aksi,
                title: result.aksi,
                text: result.text,
                showConfirmButton: false,
                timer: 1500
            });

            $('.form-tambah').val('');
            showTable();
        }
    });
}

$('#keyword').on('keyup', searchData);

function searchData() {
    $.ajax({
        url: 'data/cari.php',
        method: 'post',
        data: {
            keyword: $(this).val()
        },
        success: function(data, status) {
            const result = JSON.parse(data);
            let str = '';

            $.each(result, function(key, value) {
                let nama = value.nama;
                let email = value.email;
                let no = (key + 1);

                str += tableValue(nama, email, no);
                $('#table-records').html(str);
            });
        }
    });
}

$(document).on('click', '#btn-hapus', deleteData);

function deleteData() {
    swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'apakah anda yakin?',
        text: 'apakah anda sudah yakin ingin menghapus data ini?',
        showCancelButton: true,
        cancelButtonText: 'tidak',
        confirmButtonColor: 'green',
        confirmButtonText: 'yakin'
    }).then(result => {
        if (result.value) {
            $.ajax({
                url: `data/hapus.php?id=${$(this).attr('data-id')}`,
                method: 'get',
                success: function(data, status) {
                    const result = JSON.parse(data);

                    swal.fire({
                        position: 'center',
                        icon: result.aksi,
                        title: result.aksi,
                        text: result.text,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    showTable();
                }
            });
        }
    });
}

$(document).on('click', '#btn-modal-ubah', showData);

function showData() {
    $.ajax({
        url: `data/showData.php?id=${$(this).attr('data-id')}`,
        method: 'get',
        success: function(data, status) {
            const result = JSON.parse(data);
            let str = '';

            $.each(result, function(key, value) {
                let nama = value.nama;
                let email = value.email;
                let id = value.id;
                let no = (key + 1);

                str += formUpdate(nama, email, no, id);
                $('#modal-body').html(str);
                $('#btn-ubah').on('click', () => updateData(this.id));
            });
        }
    });
}

function updateData(id) {
    $.ajax({
        url: `data/ubah.php`,
        method: 'post',
        data: {
            nama: $('#nama2').val(),
            email: $('#email2').val(),
            id: id
        },
        success: function(data, status) {
            const result = JSON.parse(data);

            swal.fire({
                position: 'center',
                icon: result.aksi,
                title: result.aksi,
                text: result.text,
                showConfirmButton: false,
                timer: 1500
            });
            showTable();
        }
    });
}

function formUpdate(nama, email, no, id) {
    return `
    <div class="container">
    <div class="container">
    <div class="form-group">
    <label for="nama1"> Nama </label>
    <input type="text" class="form-control form-ubah" id="nama2" placeholder="Nama" autocomplete="off" value="${nama}">
    </div>
    <div class="form-group">
    <label for="email1"> Email </label>
    <input type="email" class="form-control form-ubah" id="email2" placeholder="Email" autocomplete="off" value="${email}">
    </div>
    </div>
    </div>
    `;
}
