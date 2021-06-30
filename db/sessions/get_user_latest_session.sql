SELECT sch.event_start, s.subject, sch.buddy_choice 
FROM tbl_schedule sch
JOIN tbl_subject s
ON s.subject_id::VARCHAR = sch.sch_subject
WHERE sch.student_id = $1
ORDER BY sch.schedule_id ASC
LIMIT 1;