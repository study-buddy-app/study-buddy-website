SELECT DISTINCT s.subject_id, (s.subject)
FROM tbl_subject s
JOIN tbl_backpack bp
ON s.subject_id = bp.subject
WHERE bp.student_id = $1
ORDER BY s.subject;