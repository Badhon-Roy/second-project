import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import {TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async(password : string,studentData : TStudent) =>{
    const userData : Partial<TUser> = {};
    userData.password = password || (config.default_pass as string);
    userData.role = 'student';
    //  set manually user id
    userData.id = '2030100001'
    // create a user
    const newUser = await User.create(userData);

    //create a student 
    if(Object.keys(newUser).length){
        // set id: id ,user: _id
        studentData.id = newUser.id;
        studentData.user = newUser._id;
        const newStudent = await Student.create(studentData);
        return newStudent
    }
}
export const UserService = {
    createStudentIntoDB
}