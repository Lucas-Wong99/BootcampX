const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const month = process.argv[2]

pool.query(
  `
  SELECT distinct teachers.name AS name, cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests
  ON teachers.id = teacher_id
  JOIN students
  ON assistance_requests.student_id = students.id
  JOIN cohorts
  ON cohort_id = cohorts.id
  WHERE cohorts.name = '${month}'
  ORDER BY name;
  `
)
.then((res) => {
  res.rows.forEach(item => {
    console.log(`${item.cohort}: ${item.name}`);
  })
}).catch(err => console.error('query error', err.stack));