SELECT distinct teachers.name AS name, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests
ON teachers.id = teacher_id
JOIN students
ON assistance_requests.student_id = students.id
JOIN cohorts
ON cohort_id = cohorts.id
WHERE cohorts.name = 'JUL02'
ORDER BY name;