INSERT INTO tbl_schedule
(description, sch_subject, event_start, event_end, buddy_choice, student_id)
VALUES
($1,$2,$3,$4,$5,$6);
SELECT sch.event_start, s.subject, sch.buddy_choice 
FROM tbl_schedule sch
JOIN tbl_subject s
ON s.subject_id::VARCHAR = sch.sch_subject
WHERE sch.student_id = $6
ORDER BY event_start DESC;