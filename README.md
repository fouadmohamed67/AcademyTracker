# AcademyTracker
project for small academy help teachers to track their student, lectures, lessons and courses
# for backend
project with nodejs(express)  with mysql  
# features  
1. every teacher able to  register and signup with validation for each api, token is generated after login using jsonwebtoken
2. teacher can add level. every level has info like level name and code
3. every level has his own courses, the relation is one to many in this case
4. teacher can add pdf lectures of the course and able to view or download it later and every lecture can be viewed form its own teacher only
5. teacher can add student with some info like firstName and  levelName. one teacher can have multiple student and the opposite is true
6. the teacher can register the student in specific course (exist in the level of the student) and chose the day of every week and time
7. every day the lessons is generated by corn job and the teacher at the end of the day confirm this lessons if they done or not
8. teacher get notification on gmail every day with the list of student of today
9. teacher  can control and access every thing accross the dashbord, edit or add (student, appointment, level, lesson and lecture).in the dashbord can filter students by level then course to get studnts in easy way
   
 
