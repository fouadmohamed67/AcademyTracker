const cron = require("node-cron");    
const lessonController=require('../controllers/lessonController');



cron.schedule("44 2 * * *",async ()=>{
    console.log(new Date().toUTCString());
    
   // await lessonController.generateDailyLessons();
  })
