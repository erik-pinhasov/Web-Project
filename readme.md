<div align="center">
  <a href="https://taskify-5s0t.onrender.com/">
    <img src="public/images/logo.png">
  </a>
</div>

## Functional Requirements

The system should provide the following functional features:

1. **User Registration**
2. **User Login**
3. **Profile Editing**: Ability to modify Username, Email, and Password.
4. **User Logout**
5. **Mobile Device Compatibility**
6. **Task Display**:
   - Tasks for the current day.
   - Future tasks.
   - Completed tasks.
   - Incomplete tasks.
   - Tasks are sorted chronologically by date and start time.
   - Each task will show the time since its creation.
   - Task titles are visible on every page; clicking will expand the content.
7. **Add New Task**: Creating a task by specifying title, content, date, and start time.
8. **Delete Task**
9. **Edit Task**: Modifying title, content, date, and start time.
10. **Task Completion**:
   - Changes from requirements 7-10 will instantly update the page (without requiring a refresh).
   - Clicking to complete a task will move it to the completed tasks page.
   - In the completed tasks page, only deletion will be possible.
11. **Reminder Alerts**: Notifications will appear when a task's start time is reached.
   - Clicking the alert will navigate to the corresponding task and display it.
12. **Task Search**: Ability to search for tasks by title or content.
13. **Side Menu** with:
    - User's username (clicking opens the option to edit the profile).
    - Search bar.
    - Today's tasks, future tasks, completed tasks, and incomplete tasks (clicking navigates to the respective page).
    - Count of open tasks for today and future tasks (visible when the menu is open).
    - Logout button.
    - The menu expands and collapses upon clicking.

Please refer to the other sections of this README for deployment and usage instructions.

## Deploy with Docker :rocket:

To deploy the project using Docker, follow these steps:

1. Clone project:
  ```
  git clone https://github.com/erik-pinhasov/Web-Project.git
  ```

2. Create a new file named `.env` in the `Web-Project` folder with the following content:
  ```
  MYSQL_USER=root
  MYSQL_PASSWORD="your password"
  MYSQL_DATABASE=todo_app
  JWTTOKEN=$2b$10$G0jjD12VLBAr9bWmjkXNyu
  ```
Replace `"your password"` with your actual MySQL root password.

3. Open a terminal and run this docker command from root directory:

```sh
docker compose -f "Web-Project\docker-compose.yml" up -d --build
```

4. Open browser and navigate to Localhost:3000 for using the app.
   
## Deploy localy:

### clone & Install dependencies

```sh
git clone https://github.com/erik-pinhasov/Web-Project.git
cd Web-Project
npm install
```

### :warning: First run - important :warning:

1. ##### enviorment variables

   - edit credintals on **_.env.template_** (located in root folder)
   - rename .env.template to **_.env_**

1. ##### build db

```sh
npm run build-db
$ Enter password: your-DB-password
```

### Run

```sh
npm start
or to start nodemon
npm run dev
```

### Tests

```sh
npm test
```

<h2 style="text-align: center"> Build with :hammer:</h2>

[![Express][Express.js]][Express-url]
[![Scss][sass.com]][sass-url]
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
[![JQuery][JQuery.com]][JQuery-url]
[![ejs][ejs.com]][ejs-url]
[![mysql][mysql.com]][mysql-url]

<h2 style="text-align: center">Deploy with :rocket:</h2>

[![linode][linode.com]][linode-url]
[![Docker][Docker.com]][Docker-url]

<h2 style="text-align: center">Test with :mag:</h2>

[![Mocha][mocha.js]][mocha-url]
[![chai][chai.js]][chai-url]

[mocha.js]: https://img.shields.io/badge/Mocha-000000?style=for-the-badge&logo=mocha&logoColor=white&color=%238D6748
[mocha-url]: https://mochajs.org/
[chai.js]: https://img.shields.io/badge/chai-000000?style=for-the-badge&logo=chai&logoColor=white&color=%FFA500
[chai-url]: https://www.chaijs.com/
[Express.js]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=black&color=white
[Express-url]: https://expressjs.com/
[sass.com]: https://img.shields.io/badge/Scss-000000?style=for-the-badge&logo=sass&logoColor=white&color=%23CC6699
[sass-url]: https://sass-lang.com
[linode.com]: https://img.shields.io/badge/linode-000000?style=for-the-badge&logo=Linode&logoColor=white&color=%24A47F
[linode-url]: https://cloud.linode.com/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[ejs.com]: https://img.shields.io/badge/Ejs-000000?style=for-the-badge&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAQAAAATQsYqAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm%2B48GgAAANRJREFUGBkFwTFLFAAAgNHvKoNAAqeDpggnodEplFvbXINAXBxDKIdoqDiI%2FoSiNLgKRuNBujoIbRKXY0jFgYNQ1Ou9JMlNT72VgbGpPXfktjO8SXLLunMcyAhbZl7Ie5yay5wNX8FnKzLCMzPbVvx1bUmZ4p%2BPHkky8M6FD4ameC4FJu5LkiTZxbEbUsZm%2BG3HoiTJGq48kJQseO0X%2FngpydAlNj00cWI5Se565YcDSY7wycCpiUMXSZLMG0k28dM9%2BeLQvu9JkiRZdIUnklXnvnn8H%2Fnr%2BNt30SffAAAAAElFTkSuQmCC&logoColor=white&color=red
[ejs-url]: https://ejs.com
[Docker.com]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white
[Docker-url]: https://www.docker.com/
[mysql.com]: https://img.shields.io/badge/mysql-000000?style=for-the-badge&logo=mysql&logoColor=white&color=%234479A1
[mysql-url]: https://www.mysql.com/
