INSERT INTO tbl_subject_backpack_junction
(backpack_id, subject_id)
VALUES
($1,$2);
SELECT * FROM tbl_subject_backpack_junction sb 
JOIN tbl_subject s ON sb.subject_id = s.subject_id
WHERE sb.backpack_id = $1
ORDER BY sb.subject_id;