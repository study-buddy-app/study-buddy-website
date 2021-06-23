DELETE FROM tbl_tutor_subject_junction 
WHERE tutor_id = $1 AND subject_id = $2;