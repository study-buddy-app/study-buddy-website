SELECT backpack_id FROM tbl_backpack 
WHERE student_id = $1 AND active = TRUE;