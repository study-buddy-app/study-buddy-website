DELETE FROM tbl_subject_backpack_junction
WHERE backpack_id = $1 AND subject_id = $2;
SELECT * FROM tbl_subject_backpack_junction sb 
JOIN tbl_subject s ON sb.subject_id = s.subject_id
WHERE sb.backpack_id = $1
ORDER BY sb.subject_id;