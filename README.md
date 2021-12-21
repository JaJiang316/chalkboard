# Chalkboard

# Chalkboard Live Website

[Chalkboard Website](https://chalk-board-app.herokuapp.com/)

# Features

- Responsive Design for mobile, tablet, and desktop
- Clear Navigation
- Save Draft of Assignments
- Course Homepage

# Purpose of the Website

The website allows professors to create courses for students where they can create multiple courses each with their own individual assignments, lessons, videos, etc. For students they are able to request to join professor created courses and complete assignments with the ability to save assignments as drafts to work on later. Overall the website is designed to allow for a classroom based setting for professors and students to interact.

# Visuals

### Desktop

![Desktop](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/desktop_signin.PNG)
![Desktop](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/desktop_signup.PNG)
![Desktop](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/desktop_homepage.PNG)
![Desktop](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/desktop_course.PNG)

### Tablet

![Tablet](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/tablet_signin.PNG)
![Tablet](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/tablet_signup.PNG)
![Tablet](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/tablet_homepage.PNG)
![Tablet](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/tablet_course.PNG)

### Mobile

![Mobile](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/mobile_signin.PNG)
![Mobile](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/mobile_signup.PNG)
![Mobile](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/mobile_homepage.PNG)
![Mobile](https://github.com/DavidGuzman1999/chalkboard/blob/main/screenshots/mobile_course.PNG)

# D0 WireFrame and SiteMap:

## WireFrame

![WireFrame](https://github.com/DavidGuzman1999/chalkboard/blob/main/images/IMG-0692.jpg)

# SiteMap

![SiteMapProfessor](https://github.com/DavidGuzman1999/chalkboard/blob/main/images/siteMapProfessor.png)
![SiteMapStudent](https://github.com/DavidGuzman1999/chalkboard/blob/main/images/siteMapStudent.png)

Jason

- This assignment taught me about how much goes into the design of a website and each functionality before the implementation step.
  It made me realize how important it is to make a wireframe and site map of a project as it help visualize what you need to develop and also
  allows the developer to realize what they can and cannot do. Both David and I worked on each part of the assignment together from discussing and developing the wire frame
  and site map online and then putting it down on paper.

David Guzman

- While completing this assignment, it has taught me about web site organization with the use of wireframe and site map. By first creating these diagrams
  we were able to brainstorm different ideas to see what better fit the site idea. Both wireframe and site map were important to us organizating our site ideas.
  Over the course of us completing the assignemnt, Jason and I, went back and forth, brainstorming ideas that could fit the design of our website.
  Talking to a second person, in this my partner was great because we were able to see what ideas could work and what ideas can be let go.

# D1 HTML:

[Chalkboard Website](https://davidguzman1999.github.io/chalkboard/index.html)

David Guzman

- During this assignment I completed the HTML for the professor side of the website. During this stage of the website, I tried to make the website have a flow without having any deadends in the site. Making each link link to another page was something that I tried to achive during this D1. I have also completed the admin side of the website. In the admin side I added pages to see the currently enrolled, courses available, and data history for the students, courses and history of users searches and results.

Jason Jiang

- During this assignment I complete the HTML for the login, signup, professor and student side of the website. I tried to make the html structure as correct as possible. I had to take the submit button out of the forms tag as I needed to wrap the buttons with a anchor to link to other parts of the website.

# D2 CSS:

David Guzman

- Completed the CSS for the website. Keeping the orginal format of the the HTML we constructed, CSS was added to make the website more appealing to the user. As we progressed through the creation of the website, we added more pages to meet the design idea we had for the website.

Jason Jiang

- I completed the css the login, signup, student, and the majority of the professor side of the css. I tried to make the website as responsive as possible, with my design inspiration coming from the design of google classroom. As I added more css to the pages I noticed I needed to redo some of the html side of the application. I checked to see if the application was responsive using the inspect element and i noticed that i didnt really need to change the reponsiveness of the website and it is reponsive already I just needed to change the student and professor homepage so the classes will fill the whole row on smaller screens.

# D3 User Management

[Chalkboard Website](https://chalk-board-app.herokuapp.com/)

Jason Jiang

- Created the user schema's, turned student and login html into ejs, setup express backend, created mongo database, hosted application on heroku, initialized user sign up and signin. When the user signs up we hash and salt their password and then store it in the db. I also created sessions for the application when you sign in so you cant copy and paste the url to get into the application from another browser, keeps you logged in even when you close the tab for 24 hours. Currently working on creating a schema for classes and assginments for when professors create classes that hold videos, assignments,lectures and much more. Feedback was also taken from deliverable 2 and I increased the css ratio for smaller screens under screen size of 1000px. Added Features, Purpose of the Website and Images to the ReadMe.
