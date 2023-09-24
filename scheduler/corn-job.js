const cron = require("node-cron");    
const lessonController=require('../controllers/lessonController');

 
cron.schedule("16 11 * * *",async ()=>{
   
  await lessonController.generateDailyLessons();

  })
