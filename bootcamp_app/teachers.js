const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const query = `
SELECT distinct teachers.name AS name, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests
ON teachers.id = teacher_id
JOIN students
ON assistance_requests.student_id = students.id
JOIN cohorts
ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY name;
`;

const cohort = process.argv[2];

pool.query(query, [`${cohort}`])
.then((res) => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.name}`);
  })
}).catch(err => console.error('query error', err.stack));