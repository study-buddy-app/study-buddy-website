INSERT INTO tbl_backpack
(tutor_id, active)
VALUES($1, TRUE) RETURNING backpack_id;