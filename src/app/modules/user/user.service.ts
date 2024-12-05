import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists!');
  //   }

  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not give, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';


  //find academic semester info
  const academicSemester = await AcademicSemester.findById(payload.admissionSemester)

  // set manually generated id
  userData.id = await generateStudentId(academicSemester);

  // create user
  const newUser = await User.create(userData);

  // create student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id; // embeded id
    payload.user = newUser._id; // reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
