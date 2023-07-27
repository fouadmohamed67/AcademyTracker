const express=require('express')
const bodyParser=require('body-parser') 
const app=express()
const path=require('path')
const multer=require('multer')

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{ 
        
        cb(null,'lectures')
    },filename:(req,file,cb)=>{  
        cb(null,new Date().toISOString().replace(/:/g, '-')+'_'+file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{  
    if(
        file.mimetype === 'application/pdf'||
        file.mimetype === 'application/msword'||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
     ){   
        cb(null,true)
      }
      else{ 
        cb(null,false)
      }
}  

app.use(bodyParser.json())
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('lecture'))
app.use('/lectures', express.static(path.join(__dirname,'lectures')))
 
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
}) 
 
const authRoute=require('./routes/auth')
const levelRoute=require('./routes/level')
const courseRoute=require('./routes/course')
const StudentRoute=require('./routes/student')
const lectureRoute=require('.//routes/lecture')
const lessonRouter=require('./routes/lesson')
app.use('/auth',authRoute)
app.use('/',levelRoute)
app.use('/',courseRoute)
app.use('/',StudentRoute)
app.use('/',lectureRoute)
app.use('/',lessonRouter) 

app.listen(3000, async () => {
    console.log(`listening on port 3000`);  
  });
 