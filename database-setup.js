const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function openDb() {
  return sqlite.open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
}

async function setup() {
    const db = await openDb();
    await db.exec(`
    CREATE TABLE Category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
    );

    CREATE TABLE Lesson (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        markdown TEXT,
        categoryId INTEGER REFERENCES Category(id)
    );

    INSERT INTO Category(name , description) VALUES ('Limba Romana' , 'Aceasta este limba si literatura romana');
    
    INSERT INTO Lesson(title , description , markdown , categoryId) values ('MyFirstLesson' , 'MyFirstLessonDescription' , 'Hello world' , 1);


    `)


    // await db.exec("CREATE TABLE Person(id INTEGER, brand TEXT);")
//   const people = await db.all('SELECT * FROM Person');
//   console.log('all person', JSON.stringify(people, null, 2));

//   const vehicle = await db.all(`SELECT a.*, b.* FROM Person as a
//   LEFT JOIN Vehicle as b
//   ON a.id = b.ownerId
//   `);
//   console.log('all vehicles', JSON.stringify(vehicle, null, 2));
}

setup();