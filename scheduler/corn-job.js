const cron = require("node-cron");    
const lessonController=require('../controllers/lessonController');

 
cron.schedule("0 0 * * *",async ()=>{
   
  await lessonController.generateDailyLessons();

  })
