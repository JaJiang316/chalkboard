const express = require("express");
var path = require("path");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
var ejs = require("ejs");
const PORT = process.env.PORT || 3000;

const { MongoClient } = require("mongodb");
let db;
const uri = process.env.URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  if (!err) {
    db = client.db("chalkboard");
    console.log("MongoDB Connection Succeeded.");
  } else {
    console.log("Error in DB connection : " + err);
  }
  // perform actions on the collection object
});
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "totally a secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    store: MongoStore.create({ mongoUrl: uri }),
  })
);
var sess;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/src"));
app.set("views", path.join(__dirname, "src/views"));

app.get("/", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "student") {
      res.redirect("student_homepage");
    } else if (sess.user == "professor") {
      res.redirect("professor_homepage");
    } else {
      res.redirect("admin_homepage");
    }
  } else {
    res.render("index", { valid: "" });
  }
});

app.get("/student_homepage", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "student") {
      User.findOne({ unique_id: req.session.userId }, function (err, user) {
          getEnrolledCourses(user, 'student_homepage', res);
          // return res.redirect("student_homepage");
        });
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/login_professor", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "student") {
      res.redirect("student_homepage");
    } else if (sess.user == "professor") {
      res.redirect("professor_homepage");
    } else {
      res.redirect("admin_homepage");
    }
  } else {
    res.render("professor_login", { valid: "" });
  }
});

app.get("/login_admin", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "student") {
      res.redirect("student_homepage");
    } else if (sess.user == "professor") {
      res.redirect("professor_homepage");
    } else {
      res.redirect("admin_homepage");
    }
  } else {
    res.render("admin_login", { valid: "" });
  }
});

app.get("/sign_up", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "student") {
      res.redirect("student_homepage");
    } else if (sess.user == "professor") {
      res.redirect("professor_homepage");
    } else {
      res.redirect("admin_homepage");
    }
  } else {
    res.render("signup", { valid: "" });
  }
});

app.get('/student_course', (req, res) => {
    sess=req.session;
    if(sess.userId){
      if(sess.user == "student"){
        res.render('student_course');
      }
      else{
        res.redirect('error');
      }
    }else{
      res.redirect('/');
    }
});

app.get("/student_add_course", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "student") {
      res.render("student_add_course", { valid: ""});
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/student_assignment", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "student") {
      res.render("student_assignment");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/student_video", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "student") {
      res.render("student_video");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/student_work", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "student") {
      res.render("student_work");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/student_textbook", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "student") {
      res.render("student_textbook");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/student_lecture", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "student") {
      res.render("student_lecture");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});

app.get('/professor_homepage', (req, res) => {
    sess=req.session;
    if(sess.userId){
      if(sess.user == "professor"){
        User.findOne({ unique_id: req.session.userId }, function (err, user) {
          getEnrolledCourses(user, 'professor_homepage', res);
          // return res.redirect("professor_homepage");
        });
      }
      else{
        res.redirect('error');
      }
    }else{
      res.redirect('/');
    }
})

app.get('/professor_addClass', (req, res) => {
    sess=req.session;
    if(sess.userId){
      if(sess.user == "professor"){
        res.render('professor_addClass', { valid: "" });
      }
      else{
        res.redirect('error');
      }
    }else{
      res.redirect('/');
    }
})

app.get('/professor_coursePage', (req, res) => {
    sess=req.session;
    if(sess.userId){
      if(sess.user == "professor"){
        res.render('professor_coursePage');
      }
      else{
        res.redirect('error');
      }
    }else{
      res.redirect('/');
    }
})

app.get('/professor_assignment', (req, res) => {
    sess=req.session;
    if(sess.userId){
      if(sess.user == "professor"){
        res.render('professor_assignment');
      }
      else{
        res.redirect('error');
      }
    }else{
      res.redirect('/');
    }
})

app.get('/professor_assigned', (req, res) => {
    sess=req.session;
    if(sess.userId){
      if(sess.user == "professor"){
        res.render('professor_assigned');
      }
      else{
        res.redirect('error');
      }
    }else{
      res.redirect('/');
    }
})

app.get('/professor_textbook', (req, res) => {
    sess=req.session;
    if(sess.userId){
      if(sess.user == "professor"){
        res.render('professor_textbook');
      }
      else{
        res.redirect('error');
      }
    }else{
      res.redirect('/');
    }
})

app.get('/professor_video', (req, res) => {
    sess=req.session;
    if(sess.userId){
      if(sess.user == "professor"){
        res.render('professor_video');
      }
      else{
        res.redirect('error');
      }
    }else{
      res.redirect('/');
    }
})

app.get("/professor_addClass", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "professor") {
      res.render("professor_addClass");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/professor_courseManager", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "professor") {
      res.render("professor_courseManager");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/professor_student_work", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "professor") {
      res.render("professor_student_work");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/admin_homepage", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      User.findOne({ unique_id: req.session.userId }, function (err, user) {
        getEnrolledCourses(user, 'admin_homepage', res)
        // return res.redirect("admin_homepage");
      });
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});
app.get("/admin_currentlyEnrolled", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      res.render("admin_currentlyEnrolled");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});
app.get("/admin_currentlyStudents", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      res.render("admin_currentlyStudents");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});
app.get("/admin_currentlyProfessor", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      res.render("admin_currentlyProfessor");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});
app.get("/admin_coursesAvailable", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      res.render("admin_coursesAvailable");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});
app.get("/admin_coursesOpen", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      res.render("admin_coursesOpen");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});
app.get("/admin_coursesClosed", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      res.render("admin_coursesClosed");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});
app.get("/admin_dataHistory", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      res.render("admin_dataHistory");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});
app.get("/admin_dataHistorySearches", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      res.render("admin_dataHistorySearches");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});
app.get("/admin_dataStudents", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      res.render("admin_dataStudents");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});
app.get("/admin_dataProfessors", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      res.render("admin_dataProfessors");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});
app.get("/admin_dataCourse", (req, res) => {
  sess = req.session;
  if (sess.userId) {
    if (sess.user == "admin") {
      res.render("admin_dataCourse");
    } else {
      res.redirect("error");
    }
  } else {
    res.redirect("/");
  }
});

app.get('/error', (req, res) => {
  res.render('error');
})

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});

var Schema = mongoose.Schema;

userSchema = new Schema({
  unique_id: Number,
  email: {
    type: String,
    required: true,
    format: "Email",
  },
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
  },
  courses: {
    type: [String],
  },
});

User = mongoose.model("User", userSchema);

courseSchema = new Schema({
    unique_id: Number,
    courseName: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    instructors: [
      {
        name: {
          type: String,
          required: true
        },
        id: {
          type: Number,
          required: true
        }
      }
    ],
    description: {
      type: String
    },
    students: [
      {
        name: {
          type: String,
          required: true
        },
        id: {
          type: Number,
          required: true
        }
      }
    ],
    requesting: [
      {
        name: {
          type: String,
          required: true
        },
        id: {
          type: Number,
          required: true
        },
        userType: {
          type: String,
          required: true
        }
      }
    ],
    assignments: [
      { //1 assignment
        title: {
          type: String
        },
        duedate: {
          type: Date
        },
        instruction: {
          type: String
        },
        video: {
          type: String
        },
        answer_sheet: {
          type: Buffer
        },
        assignment_questions: [
          {
            question: {
              type: String
            }
          }
        ]
      }
    ],
    turned_in_assignments: [
      {
        name: {
          type: String,
          required: true
        },
        total_grade: {
          type: Number,
        },
        graded: {
          type: Boolean,
          required: true
        },
        status: {
          type: String,
          required: true
        },
        comments: [
          {
            comment: {
              type: String
            }
          }
        ],
        assignment_question: [
          {
            question: {
              type: String
            },
            file: {
              type: Buffer
            },
            answer: {
              type: String
            },
            grade: {
              type: String
            }
          }
        ]
      }
    ]
});

Course = mongoose.model('Courses', courseSchema);

app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

app.post("/sign_up", function (req, res, next) {
  // console.log(req.body);
  var personInfo = req.body;

  if (
    !personInfo.email ||
    !personInfo.first ||
    !personInfo.last ||
    !personInfo.password ||
    !personInfo.confirmPassword
  ) {
    return res.render("signup", { valid: "Fill all the required fields!" });
  } else {
    if (personInfo.password == personInfo.confirmPassword) {
      User.findOne({ email: personInfo.email }, function (err, data) {
        if (!data) {
          var c;
          User.findOne({}, async function (err, data) {
            if (data) {
              console.log("if");
              c = data.unique_id + 1;
            } else {
              c = 1;
            }
            const salt = await bcrypt.genSalt(10);
            let hashpassword = await bcrypt.hash(personInfo.password, salt);
            // console.log(hashpassword.toString())
            var newPerson = new User({
              unique_id: c,
              email: personInfo.email,
              first: personInfo.first,
              last: personInfo.last,
              userType: personInfo.userType,
              password: hashpassword.toString(),
              confirmPassword: hashpassword.toString(),
              courses: [],
            });
            newPerson.save(function (err, Person) {
              if (err) console.log(err);
              else console.log("Success");
            });
          })
            .sort({ _id: -1 })
            .limit(1);
          return res.redirect("/");
        } else {
          return res.render("signup", { valid: "Email is already in use!" });
        }
      });
    } else {
      return res.render(__dirname + "signup", {
        valid: "Password not matched!",
      });
    }
  }
});

app.post("/login_stu", function (req, res, next) {
  User.findOne({ email: req.body.email }, async function (err, user) {
    if (!user) {
      return res.render("index", { valid: "User does not exist" });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword && user.userType == "student") {
        req.session.userId = user.unique_id;
        req.session.user = user.userType;
        // return res.redirect("student_homepage");
        getEnrolledCourses(user, 'student_homepage', res);
      } else {
        return res.render("index", { valid: "Incorrect email or password" });
      }
    }
  });
});

app.post("/login_prof", function (req, res, next) {
  User.findOne({ email: req.body.email }, async function (err, user) {
    if (!user) {
      return res.render("professor_login", { valid: "User does not exist" });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword && user.userType == "professor") {
        req.session.userId = user.unique_id;
        req.session.user = user.userType;
        // return res.redirect("professor_homepage");
        getEnrolledCourses(user, 'professor_homepage', res);
      } else {
        return res.render("professor_login", {
          valid: "Incorrect email or password",
        });
      }
    }
  });
});

app.post("/login_adm", function (req, res, next) {
  User.findOne({ email: req.body.email }, async function (err, user) {
    if (!user) {
      return res.render("admin_login", { valid: "User does not exist" });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword && user.userType == "professor") {
        req.session.userId = user.unique_id;
        req.session.user = user.userType;
        // return res.redirect("admin_homepage");
        getEnrolledCourses(user, 'admin_homepage', res);
      } else {
        return res.render("admin_login", {
          valid: "Incorrect email or password",
        });
      }
    }
  });
});

app.post("/prof_adding_class", function(req, res) {
  sess = req.session;
  unique = false;
  let courseid = '';
  if (
    !req.body.title ||
    !req.body.desc 
  ) {
    return res.render("prof_adding_class", { valid: "Fill all the required fields!" });
  }else{
    let name = '';
    User.findOne({unique_id: sess.userId}, function (err, user){
      if(!user){
        console.log(err);
      }else{
        name = `${user.first} ${user.last}`;
        console.log(name);
        courseid = makeid();
        // console.log(courseid);
        Course.findOne({courseId: courseid}, function(err, course){
          if (!course) {
            Course.findOne({}, function(err, course){
              console.log(courseid);
              if (course) {
                console.log("if");
                c = course.unique_id + 1;
              } else {
                c = 1;
              }
              var newCourse = new Course({
                unique_id: c,
                courseName: req.body.title,
                courseId: courseid,
                instructors: [{
                  name: name,
                  id: sess.userId
                }],
                description: req.body.desc,
                students: [],
                requesting: [],
                assignments: [],
                turned_in_assignments: []
              });
              newCourse.save(function (err, Course) {
                if (err) console.log(err);
                else console.log("Success");
              });
              getEnrolledCourses(user, 'professor_homepage', res)
            })         
          }else{
            courseid = makeid();
            Course.findOne({}, function(err, course){
              console.log(courseid);
              if (course) {
                console.log("if");
                c = course.unique_id + 1;
              } else {
                c = 1;
              }
              var newCourse = new Course({
                unique_id: c,
                courseName: req.body.title,
                courseId: courseid,
                instructors: [{
                  name: name,
                  id: sess.userId
                }],
                description: req.body.desc,
                students: [],
                assignments: [],
                turned_in_assignments: []
              });
              newCourse.save(function (err, Course) {
                if (err) console.log(err);
                else console.log("Success");
              });
              getEnrolledCourses(user, 'professor_homepage', res)
            })         
          }
          User.findOne({unique_id: sess.userId}, function (err, user){
            if(err) {
              return console.log(err);
            }
            user.courses.push(courseid);
            user.save((err, updatedcourse) => {
              if(err) {
                return console.log(err);
              }
            })
          })
        }).sort({ _id: -1 })
          .limit(1);
      }
    }).sort({ _id: -1 })
      .limit(1);
  }
})

function makeid() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 5; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.post("/student_add_course", function(req, res){
  sess = req.session;
  // console.log(sess);
  let courseid = req.body.code;
  if(!courseid){
    return res.render("student_add_course", { valid: "Fill all the required fields!" });
  }else{
    Course.findOne({courseId: courseid}, function(err, data){
      if(!data){
        return res.render("student_add_course", { valid: "Invalid CourseID or course does not exist" });
      }
      data.students.forEach(student => {
        if(student.id == sess.userId){
          return res.render("student_add_course", { valid: "You are already registered for that course" });
        }
      })
      if(data){
        let name = '';
        console.log("Hello")
        User.findOne({unique_id: sess.userId}, function (err, user){
          if(!user){
            console.log(err);
          }else{
            name = `${user.first} ${user.last}`;
            let student = {
              name: name,
              id: sess.userId,
              userType: sess.user
            }
            data.requesting.push(student);
            data.save((err, updatedcourse) => {
              if(err) {
                return console.log(err);
              }
            })
            getEnrolledCourses(user, 'student_homepage', res);
          }
        }).sort({ _id: -1 })
          .limit(1);
      }
    }).sort({ _id: -1 })
          .limit(1);
  }
})

function getEnrolledCourses(user, goto, res) {
  // get user enrolled classes
  var user_classes = user.courses;
  var class_details = [];
  var returnObj;
  // create query to link userClasses with courses model to get class info
  user_classes.forEach(course => {
    class_details.push(course);
  });
  // console.log(class_details);
  // Courses user is in and courses user is not in
  db.collection('courses').find({courseId: {"$in":class_details}}).toArray(function (err, result) {
    db.collection('courses').find({courseId: {"$nin":class_details}}).toArray(function (err, nonresult) {
      returnObj = nonresult;
      // console.log(returnObj);
      // console.log(result);
      return res.render(goto, {print:result, notprint: returnObj});
    });
  });
}

app.post('/ProfSearchCourse', (req, res) => {
  let sess = req.session;
  var coursename = req.body.search;
  let returnObj = []
  let nonReturnObj = []
  let courses_list = [];
  // queries for classes that have the same name
  db.collection('courses').find({courseName: coursename}).toArray(function (err, results) {
    // console.log(results)
    results.forEach(course => {
      courses_list.push(course.courseId);
    });
    // console.log(courses_list)
    db.collection('courses').find({courseId: {"$in": courses_list}}).toArray(function (err, result) {
      // console.log(result); // course we are looking for 
      User.findOne({unique_id: sess.userId}, function (err, user){
        if(!user){
          console.log(err);
        }else{
          result.forEach(course => {
            if(user.courses.includes(course.courseId)){
              returnObj.push(course);
            }else{
              nonReturnObj.push(course);
            }
          })
          console.log(returnObj)
          console.log(nonReturnObj);
          return res.render('professor_homepage', {print:returnObj, notprint: nonReturnObj});
        }
      })
    });
  });
});

app.post('/StudSearchCourse', (req, res) => {
  let sess = req.session;
  var coursename = req.body.search;
  let returnObj = []
  let nonReturnObj = []
  let courses_list = [];
  // queries for classes that have the same name
  db.collection('courses').find({courseName: coursename}).toArray(function (err, results) {
    // console.log(results)
    results.forEach(course => {
      courses_list.push(course.courseId);
    });
    // console.log(courses_list)
    db.collection('courses').find({courseId: {"$in": courses_list}}).toArray(function (err, result) {
      // console.log(result); // course we are looking for 
      User.findOne({unique_id: sess.userId}, function (err, user){
        if(!user){
          console.log(err);
        }else{
          result.forEach(course => {
            if(user.courses.includes(course.courseId)){
              returnObj.push(course);
            }else{
              nonReturnObj.push(course);
            }
          })
          console.log(returnObj)
          console.log(nonReturnObj);
          return res.render('student_homepage', {print:returnObj, notprint: nonReturnObj});
        }
      })
    });
  });
});

//clear cookies on the browser and destroy session when use hit sign out to log out
app.post("/signOut", function (req, res) {
  sess = req.session;
  sess.destroy(function (err) {
    if (err) {
      console.log("Error Logging out!");
      return res.render(__dirname); // if failed stay on same page
    } else {
      console.log("Session Destroyed successfully");
      return res.redirect("/"); // if successful go to homepage
    }
  });
});

app.post("/back_student", function (req, res, next) {
  // User.findOne({ unique_id: req.session.userId }, function (err, user) {
  //   getEnrolledCourses(user, 'student_homepage', res)
  return res.redirect("student_homepage");
  // });
});

app.post("/back_professor", function (req, res, next) {
  // User.findOne({ unique_id: req.session.userId }, function (err, user) {
  //   getEnrolledCourses(user, 'professor_homepage', res)
  return res.redirect("professor_homepage");
  // });
});

app.post("/back_admin", function (req, res, next) {
  // User.findOne({ unique_id: req.session.userId }, function (err, user) {
  //   getEnrolledCourses(user, 'professor_homepage', res)
    return res.redirect("admin_homepage");
  // });
});

app.get('/course/:id', async function (req, res) {
  // let id = 
  return res.render("professor_addClass")
})