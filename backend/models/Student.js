import mongoose from 'mongoose';


// Define the schema configuration
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'], // Validation rule
            trim: true,                           // Removes extra whitespace
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,                         // Ensures unique values in the database
            lowercase: true,                      // Forces email to lowercase
        },
        age: {
            type: Number,
            min: [18, 'Must be at least 18 years old'], // Minimum value validation
            default: 18,                         // Default value if not provided
        },
        course:{
            type: String
        },
        phone:{
            type: String
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        // Automatically creates 'createdAt' and 'updatedAt' fields
        timestamps: true,
    }
);

// Compile the schema into a Model
const Student = mongoose.model('Student', userSchema);

export default Student;
