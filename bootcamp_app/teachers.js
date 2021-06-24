const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT(teachers.name) as teacher, cohorts.name as cohort
FROM cohorts
JOIN students ON students.cohort_id = cohorts.id
JOIN assistance_requests ON students.id = assistance_requests.student_id
JOIN teachers ON teachers.id = assistance_requests.teacher_id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teachers.name;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.teacher}`);
  })
});