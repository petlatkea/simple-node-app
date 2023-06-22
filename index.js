import express from 'express';
import fs from 'fs/promises'
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(4000, () =>
    console.log("Example app listening on port 4000!"),
)

app.get("/", (req,res) => {
    res.send("Hello from Node halløhj!");
})

app.get("/users", (req,res) => {
    res.json(["Ramsus", "Petre"]);
})

app.get("/students", async (req,res) => {
    const students = JSON.parse(await fs.readFile("data.json"));
//    console.log(students);
    res.json(students);
})

app.get("/student/:id", async (req,res) => {
    const students = JSON.parse(await fs.readFile("data.json"));
    const id = req.params.id;

    const student = students.find(student => student.fullname.toLowerCase().includes(id.toLowerCase()));
    console.log("looking for: " + id);
    res.json(student);
});

app.post("/students", async (req,res) => {
    const students = JSON.parse(await fs.readFile("data.json"));
    const newStudent = req.body;
    console.log("new student: ",newStudent);

    const id = new Date().getTime();
    newStudent.id = id;
    students.push(newStudent);

    fs.writeFile("data.json", JSON.stringify(students));

    res.json(students);
})