const cron = require("node-cron");    
const lessonController=require('../controllers/lessonController');


 // 10 in render 13 in real
cron.schedule("16 11 * * *",async ()=>{
    await lessonController.generateDailyLessons();
  })
 


