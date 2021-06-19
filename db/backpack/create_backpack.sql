  
INSERT INTO tbl_backpack
(student_id, active)
VALUES($1, TRUE) RETURNING backpack_id;