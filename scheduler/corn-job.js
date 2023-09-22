const cron = require("node-cron");    
const lessonController=require('../controllers/lessonController');



cron.schedule("1 0 * * *",async ()=>{
    console.log(new Date().toUTCString());
    
    await lessonController.generateDailyLessons();
  })
