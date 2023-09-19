require("dotenv").config();
const { databaseQuery } = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cookies = require ('universal-cookie')

const cookie = new Cookies();

const login = async (username, password) => {
    try {
        const query = 'SELECT * FROM user WHERE username = ?';
        const result = await databaseQuery(query, [username]);

        if (!result.length) {
            throw new Error('Login Error');
        } else {
            const user = result[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Invalid Password');
            }

            const token = jwt.sign({ id: user.user_id, username: user.username }, process.env.SECRET);
            user.token = token;

            // Set cookie here if needed
            cookie.set('token', token);

            return user;
        }
    } catch (error) {
        return error;
    }
}

const home = async () => {

    try {

        const query = 'SELECT DISTINCT archive.*, archive_loc.* FROM archive INNER JOIN archive_loc ON archive.archive_id = archive_loc.archive_id';
        const result = await databaseQuery(query) ;

        if (!result.length) {
            throw new Error('Pemanggilan Arsip Gagal');
        } else {
            const data = result;

            return data;
        }
    } catch (error) {
        return error;
    }
    

}

const terbaru = async () => {
    try {
        const query = `SELECT * FROM ARCHIVE GROUP BY archive_timestamp DESC`;
        const result = await databaseQuery(query);

        if(!result.length){
            throw new Error('Pemanggilan Arsip Gagal');
        } else {
            const data = result;

            return data;
        }
    } catch (error){
        return error
    }
}

const add_archive = async (archive_code, archive_catalog_id, archive_title, archive_serial_number, archive_release_date, archive_file_number, archive_condition_id, archive_type_id, archive_class_id, archive_agency, user_id, archive_loc_building_id, archive_loc_room_id, archive_loc_rollopack_id, archive_loc_cabinet, archive_loc_rack, archive_loc_box, archive_loc_cover) => {

    try {

        const archive_timestamp = new Date();

        const queryArchive = 'INSERT INTO archive(archive_code, archive_timestamp, archive_catalog_id, archive_title, archive_serial_number, archive_release_date, archive_file_number, archive_condition_id, archive_type_id, archive_class_id, archive_agency, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        const archive_result = await databaseQuery(queryArchive, [archive_code, archive_timestamp, archive_catalog_id, archive_title, archive_serial_number, archive_release_date, archive_file_number, archive_condition_id, archive_type_id, archive_class_id, archive_agency, user_id]);

       if (archive_result.affectedRows === 1){

        const archive_id = archive_result.insertId;

        const queryArchiveLoc = 'INSERT INTO archive_loc(archive_loc_building_id, archive_loc_room_id, archive_loc_rollopack_id, archive_loc_cabinet, archive_loc_rack, archive_loc_box, archive_loc_cover, archive_id) VALUES (?,?,?,?,?,?,?,?)';
        const archive_loc_result = await databaseQuery(queryArchiveLoc, [archive_loc_building_id, archive_loc_room_id, archive_loc_rollopack_id, archive_loc_cabinet, archive_loc_rack, archive_loc_box, archive_loc_cover, archive_id]);

        if (archive_loc_result.affectedRows === 1) {
            console.log('Input Data Berhasil');

            return ('Data Berhasil Di Masukkan')
        } else {
            throw new Error('Terjadi Kesalahan Penginputan Data Lokasi');
        }
      }  else {
        throw new Error ('Terjadi Kesalahan Penginputan Data');
      }
    } catch (error) {
        throw error;
    }
}

const create_user = async (username, password, satker, level_user_id) => {
    try {
        
        const query = 'INSERT user(username, password, satker, level_user_id) VALUES (?,?,?,?)';
        const hash = await bcrypt.hash(password,10);
        const result = await databaseQuery(query, [username, hash, satker, level_user_id]);


        if (result.affectedRows === 1) {
            return ('Pembuatan User Baru Berhasil');
        } else {
            throw new Error('Pembuatan User Baru Gagal')
        }
    } catch (error) {
        return error;
    }

}

const read_user = async () => {
    try {

        const query = 'SELECT * FROM USER';
        const result = await databaseQuery(query);

        if (!result.length) {
            throw new Error('Pemanggilan Arsip Gagal');
        } else {
            const data = result;

            return data;
        }
    } catch (error) {
        return error;
    }

}

const update_user = async (username, options) => {
    try {
        const { newPassword, satker, level_user_id } = options;

        // Construct the UPDATE query
        let updateQuery = 'UPDATE user SET ';
        const updateValues = [];

        if (newPassword) {
            updateQuery += 'password = ?, ';
            updateValues.push(newPassword);
        }

        if (satker) {
            updateQuery += 'satker = ?, ';
            updateValues.push(satker);
        }

        if (level_user_id) {
            updateQuery += 'level_user_id = ?, ';
            updateValues.push(level_user_id);
        }

        // Remove the trailing comma and add WHERE clause
        updateQuery = updateQuery.slice(0, -2); // Remove the last comma and space
        updateQuery += ' WHERE username = ?';
        updateValues.push(username);

        // Execute the query
        const result = await databaseQuery(updateQuery, updateValues);

        if (result.affectedRows === 1) {
            return 'Data pengguna berhasil diperbarui';
        } else {
            throw new Error('Gagal memperbarui data pengguna');
        }
    } catch (error) {
        return error;
    }
}

const delete_user = async (username, user_id, password) => {
    try {
        const queryDelete = 'DELETE FROM user WHERE username= ?';
        const resultDelete = await databaseQuery(queryDelete, [username]);

        if (resultDelete.affectedRows === 1) {
            return ('User berhasil dihapus');
        } else {
            throw new Error('Gagal Menghapus User')
        }
    } catch (error) {
        return error;
    }
}

const verify = async (verified) => {
    try {
        const query = `SELECT * FROM user WHERE user_id = ?`;
        const result = await databaseQuery(query, [verified])
        return result[0]
    } catch (error) {
        return error
    }
}

module.exports = {
    login,
    home,
    terbaru,
    add_archive,
    read_user,
    update_user,
    create_user,
    delete_user,
    verify
}
