import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import Student from "./models/Student.js";
import cors from "cors";

dotenv.config();
const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;


async function connectDB() {

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB Atlas via Mongoose!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

connectDB();

const students = [
    {
        id: 1,
        name: "Rahul"
    },
    {
        id: 2,
        name: "Mohan"
    }
]

app.get("/", (req, res) => {
    res.send('Student Management API');
})

//Get all studets
app.get("/api/students", async (req, res) => {
    try {
        const student = await Student.find();

        res.json(student);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch students"
        })
    }
})

//Get one student
app.get("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
})

//Add students
app.post("/api/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

//Put student
app.put("/api/students/:id", async (req, res) => {

    try {
        const student = await Student.findByIdAndUpdate(

            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        res.json(student);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
})

//Delete students
app.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        res.json({
            message: "Student deleted successfully",
            student: student,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});


app.listen(PORT, 'localhost', () => {
    console.log(`Server running on port ${PORT}`);
})