require("dotenv").config();
const { databaseQuery } = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Cookies = require("universal-cookie");

const cookie = new Cookies();

const login = async (username, password) => {
  try {
    const query = "SELECT * FROM user WHERE username = ?";
    const result = await databaseQuery(query, [username]);

    if (!result.length) {
      throw new Error("Login Error");
    } else {
      const user = result[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid Password");
      }

      const token = jwt.sign(
        { id: user.user_id, username: user.username },
        process.env.SECRET
      );
      user.token = token;

      // Set cookie here if needed
      cookie.set("token", token);
      cookie.set("level", user.level_user_id);

      return user;
    }
  } catch (error) {
    return error;
  }
};

const home = async () => {
  try {
    const query =
      "SELECT DISTINCT archive.*, archive_loc.*, archive_catalog.archive_catalog_label FROM archive INNER JOIN archive_loc ON archive.archive_id = archive_loc.archive_id INNER JOIN archive_catalog ON archive.archive_catalog_id = archive_catalog.archive_catalog_id; ";
    const result = await databaseQuery(query);

    if (!result.length) {
      throw new Error("Pemanggilan Arsip Gagal");
    } else {
      const data = result;

      return data;
    }
  } catch (error) {
    return error;
  }
};

const dashboardData = async () => {
  try {
    const query =
      "SELECT (SELECT COUNT(*) FROM archive) AS total_archives, (SELECT COUNT(*) FROM archive WHERE DATE(archive_timestamp) = DATE(NOW())) AS newest_archives_count,(SELECT COUNT(*) FROM archive_catalog) AS total_archive_catalogs; ";
    const result = await databaseQuery(query);

    if (!result.length) {
      throw new Error("Pemanggilan Data Gagal");
    } else {
      const data = result;

      return data;
    }
  } catch (error) {
    return error;
  }
};

const catalogData = async () => {
  try {
    const query =
      "SELECT ac.archive_catalog_id, ac.archive_catalog_label, COALESCE(COUNT(a.archive_catalog_id), 0) AS cpc FROM archive_catalog ac LEFT JOIN archive a ON ac.archive_catalog_id = a.archive_catalog_id GROUP BY ac.archive_catalog_id; ";
    const result = await databaseQuery(query);

    if (!result.length) {
      throw new Error("Pemanggilan Data Gagal");
    } else {
      const data = result;

      return data;
    }
  } catch (error) {
    return error;
  }
};

const terbaru = async () => {
  try {
    const query = `SELECT DISTINCT archive.*, archive_loc.*, archive_catalog.archive_catalog_label FROM archive INNER JOIN archive_loc ON archive.archive_id = archive_loc.archive_id INNER JOIN archive_catalog ON archive.archive_catalog_id = archive_catalog.archive_catalog_id WHERE DATE(archive_timestamp) = CURDATE();`;
    const result = await databaseQuery(query);

    if (!result.length) {
      throw new Error("Pemanggilan Arsip Gagal");
    } else {
      const data = result;

      return data;
    }
  } catch (error) {
    return error;
  }
};

const archive_by_category = async (archive_catalog_id) => {
  try {
    const query =
      "SELECT * FROM archive JOIN archive_loc ON archive.archive_id = archive_loc.archive_id JOIN archive_catalog ON archive.archive_catalog_id = archive_catalog.archive_catalog_id WHERE archive.archive_catalog_id = ?";
    const result = await databaseQuery(query, [archive_catalog_id]);
    if (!result.length) {
      throw new Error("Pemanggilan Arsip Gagal");
    } else {
      const data = result;

      return data;
    }
  } catch (error) {
    return error;
  }
};

const add_archive = async (
  archive_file,
  archive_code,
  archive_catalog_id,
  archive_serial_number,
  archive_file_number,
  archive_title,
  archive_release_date,
  archive_condition_id,
  archive_type_id,
  archive_class_id,
  archive_agency,
  user_id,
  archive_loc_building_id,
  archive_loc_room_id,
  archive_loc_rollopack_id,
  archive_loc_cabinet,
  archive_loc_rack,
  archive_loc_box
) => {
  try {
    const archive_timestamp = new Date();

    console.log(archive_title);

    const queryArchive =
      "INSERT INTO archive(archive_code, archive_timestamp, archive_catalog_id, archive_title, archive_serial_number, archive_release_date, archive_file_number, archive_condition_id, archive_type_id, archive_class_id, archive_agency, archive_file, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const archive_result = await databaseQuery(queryArchive, [
      archive_code,
      archive_timestamp,
      archive_catalog_id,
      archive_title,
      archive_serial_number,
      archive_release_date,
      archive_file_number,
      archive_condition_id,
      archive_type_id,
      archive_class_id,
      archive_agency,
      archive_file,
      user_id,
    ]);

    if (archive_result.affectedRows === 1) {
      const archive_id = archive_result.insertId;

      const queryArchiveLoc =
        "INSERT INTO archive_loc(archive_loc_building_id, archive_loc_room_id, archive_loc_rollopack_id, archive_loc_cabinet, archive_loc_rack, archive_loc_box, archive_id) VALUES (?,?,?,?,?,?,?)";
      const archive_loc_result = await databaseQuery(queryArchiveLoc, [
        archive_loc_building_id,
        archive_loc_room_id,
        archive_loc_rollopack_id,
        archive_loc_cabinet,
        archive_loc_rack,
        archive_loc_box,
        archive_id,
      ]);

      if (archive_loc_result.affectedRows === 1) {
        console.log("Input Data Berhasil");

        return "Data Berhasil Di Masukkan";
      } else {
        throw new Error("Terjadi Kesalahan Penginputan Data Lokasi");
      }
    } else {
      throw new Error("Terjadi Kesalahan Penginputan Data");
    }
  } catch (error) {
    throw error;
  }
};

const archiveDetail = async (archive_id) => {
  try {
    const query =
      "select archive.*, archive_loc.*, archive_catalog.archive_catalog_label, archive_condition.archive_condition_label, archive_type.archive_type_label, archive_class.archive_class_label, loc_building.loc_building_label, loc_room.loc_room_label, loc_rollopack.loc_rollopack_label, loc_cabinet.loc_cabinet_label from archive inner join archive_loc on archive.archive_id = archive_loc.archive_id inner join archive_catalog on archive.archive_catalog_id = archive_catalog.archive_catalog_id inner join archive_condition on archive.archive_condition_id = archive_condition.archive_condition_id inner join archive_type on archive.archive_type_id = archive_type.archive_type_id inner join archive_class on archive.archive_class_id = archive_class.archive_class_id inner join loc_building on archive_loc.archive_loc_building_id = loc_building.loc_building_id inner join loc_room on archive_loc.archive_loc_room_id = loc_room.loc_room_id inner join loc_rollopack on archive_loc.archive_loc_rollopack_id = loc_rollopack.loc_rollopack_id inner join loc_cabinet on archive_loc.archive_loc_cabinet = loc_cabinet.loc_cabinet_id where archive.archive_id = ?";
    const result = await databaseQuery(query, [archive_id]);
    console.log(result);
    if (!result.length) {
      throw new Error("Pemanggilan Arsip Gagal");
    } else {
      const data = result;

      return data;
    }
  } catch (error) {
    return error;
  }
};

const update_archive = async (user_id, updateData) => {
  try {
    let updateQuery = "UPDATE archive SET ";
    const updateValues = [];

    // Helper function to add a field and its value to the update query and values
    const addFieldToUpdate = (fieldName, value) => {
      updateQuery += `${fieldName} = ?, `;
      updateValues.push(value);
      console.log(`${fieldName} updated`);
    };

    // Check each field in updateData and add it to the update query if it exists
    if (updateData.archive_code !== undefined) {
      addFieldToUpdate("archive_code", updateData.archive_code);
    }

    if (updateData.archive_catalog_id !== undefined) {
      addFieldToUpdate("archive_catalog_id", updateData.archive_catalog_id);
    }

    if (updateData.archive_serial_number !== undefined) {
      addFieldToUpdate(
        "archive_serial_number",
        updateData.archive_serial_number
      );
    }

    if (updateData.archive_file_number !== undefined) {
      addFieldToUpdate("archive_file_number", updateData.archive_file_number);
    }

    if (updateData.archive_title !== undefined) {
      addFieldToUpdate("archive_title", updateData.archive_title);
    }

    if (updateData.archive_release_date !== undefined) {
      addFieldToUpdate("archive_release_date", updateData.archive_release_date);
    }

    if (updateData.archive_condition_id !== undefined) {
      addFieldToUpdate("archive_condition_id", updateData.archive_condition_id);
    }

    if (updateData.archive_type_id !== undefined) {
      addFieldToUpdate("archive_type_id", updateData.archive_type_id);
    }

    if (updateData.archive_class_id !== undefined) {
      addFieldToUpdate("archive_class_id", updateData.archive_class_id);
    }

    if (updateData.archive_agency !== undefined) {
      addFieldToUpdate("archive_agency", updateData.archive_agency);
    }

    if (updateData.archive_file !== undefined) {
      addFieldToUpdate("archive_file", updateData.archive_file);
    }

    updateValues.push(user_id);
    updateValues.push(updateData.archive_id);

    updateQuery = updateQuery.slice(0, -2);
    updateQuery += " WHERE archive_id = ?";

    const archive_result = await databaseQuery(updateQuery, updateValues);

    if (archive_result.affectedRows === 1) {
      console.log("Archive data updated successfully");

      let updateArchiveLocQuery = "UPDATE archive_loc SET ";
      const updateArchiveLocValues = [];

      console.log("DATA : ", updateData);

      const addFieldToUpdate = (fieldName, value) => {
        updateArchiveLocQuery += `${fieldName} = ?, `;
        updateArchiveLocValues.push(value);
        console.log(`${fieldName} updated`);
      };

      if (updateData.archive_loc_building_id !== undefined) {
        addFieldToUpdate(
          "archive_loc_building_id",
          updateData.archive_loc_building_id
        );
      }

      if (updateData.archive_loc_room_id != undefined) {
        addFieldToUpdate("archive_loc_room_id", updateData.archive_loc_room_id);
      }

      if (updateData.archive_loc_rollopack_id != undefined) {
        addFieldToUpdate(
          "archive_loc_rollopack_id",
          updateData.archive_loc_rollopack_id
        );
      }

      if (updateData.archive_loc_cabinet != undefined) {
        addFieldToUpdate("archive_loc_cabinet", updateData.archive_loc_cabinet);
      }

      if (updateData.archive_loc_rack != undefined) {
        addFieldToUpdate("archive_loc_rack", updateData.archive_loc_rack);
      }

      if (updateData.archive_loc_box != undefined) {
        addFieldToUpdate("archive_loc_box", updateData.archive_loc_box);
      }

      updateArchiveLocValues.push(updateData.archive_id);

      updateArchiveLocQuery = updateArchiveLocQuery.slice(0, -2);
      updateArchiveLocQuery += " WHERE archive_id = ?;";

      const archiveLocResult = await databaseQuery(
        updateArchiveLocQuery,
        updateArchiveLocValues
      );

      if (archiveLocResult.affectedRows === 1) {
        console.log("Archive_loc data updated successfully");
      } else {
        throw new Error("Failed to update archive_loc data");
      }
    }

    return "Archive data updated successfully";
  } catch (error) {
    throw error;
  }
};

const detail_user = async (user_id) => {
  try {
    const query = "SELECT * FROM user WHERE user_id = ? ";
    const result = await databaseQuery(query, [user_id]);
    if (!result.length) {
      throw new Error("Pemanggilan Arsip Gagal");
    } else {
      const data = result;

      return data;
    }
  } catch (error) {
    return error;
  }
};

const create_user = async (username, password, satker, level_user_id) => {
  try {
    const query =
      "INSERT user(username, password, satker, level_user_id) VALUES (?,?,?,?)";
    const hash = await bcrypt.hash(password, 10);
    const result = await databaseQuery(query, [
      username,
      hash,
      satker,
      level_user_id,
    ]);

    if (result.affectedRows === 1) {
      return "Pembuatan User Baru Berhasil";
    } else {
      throw new Error("Pembuatan User Baru Gagal");
    }
  } catch (error) {
    return error;
  }
};

const read_user = async () => {
  try {
    const query =
      "SELECT * FROM user JOIN level_user on user.level_user_id = level_user.level_user_id";
    const result = await databaseQuery(query);

    if (!result.length) {
      throw new Error("Pemanggilan Arsip Gagal");
    } else {
      const data = result;

      return data;
    }
  } catch (error) {
    return error;
  }
};

const update_user = async (user_id, options) => {
  try {
    const { username, password, satker, level_user_id } = options;

    // Construct the UPDATE query
    let updateQuery = "UPDATE user SET ";
    const updateValues = [];

    if (username) {
      updateQuery += "username = ?, ";
      updateValues.push(username);
    }

    if (password) {
      updateQuery += "password = ?, ";
      updateValues.push(password);
    }

    if (satker) {
      updateQuery += "satker = ?, ";
      updateValues.push(satker);
    }

    if (level_user_id) {
      updateQuery += "level_user_id = ?, ";
      updateValues.push(level_user_id);
    }

    // Remove the trailing comma and add WHERE clause
    updateQuery = updateQuery.slice(0, -2); // Remove the last comma and space
    updateQuery += " WHERE user_id = ? ;";
    updateValues.push(user_id);

    // Execute the query
    const result = await databaseQuery(updateQuery, updateValues);

    if (result.affectedRows === 1) {
      return "Data pengguna berhasil diperbarui";
    } else {
      throw new Error("Gagal memperbarui data pengguna");
    }
  } catch (error) {
    return error;
  }
};

const delete_user = async (username) => {
  try {
    const queryDelete = "DELETE FROM user WHERE username= ?";
    const resultDelete = await databaseQuery(queryDelete, [username]);

    if (resultDelete.affectedRows === 1) {
      return "User berhasil dihapus";
    } else {
      throw new Error("Gagal Menghapus User");
    }
  } catch (error) {
    return error;
  }
};

const verify = async (verified) => {
  try {
    const query = `SELECT * FROM user WHERE user_id = ?`;
    const result = await databaseQuery(query, [verified]);
    return result[0];
  } catch (error) {
    return error;
  }
};

module.exports = {
  login,
  home,
  dashboardData,
  catalogData,
  terbaru,
  archive_by_category,
  add_archive,
  archiveDetail,
  update_archive,
  detail_user,
  create_user,
  read_user,
  update_user,
  delete_user,
  verify,
};
