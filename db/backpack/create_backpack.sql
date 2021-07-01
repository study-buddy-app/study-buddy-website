INSERT INTO tbl_backpack
(student_id, active, file_upload)
VALUES($1, TRUE, $2) RETURNING backpack_id;