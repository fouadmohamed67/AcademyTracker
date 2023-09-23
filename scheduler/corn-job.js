const cron = require("node-cron");    
const lessonController=require('../controllers/lessonController');


 // 10 in render 13 in real
cron.schedule("1 1 * * *",async ()=>{
    console.log(new Date().toUTCString()); 
   // await lessonController.generateDailyLessons();
  })
 


