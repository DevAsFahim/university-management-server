import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists!');
  //   }

  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not give, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // set manually generated id
  userData.id = '20301000011';

  // create user
  const newUser = await User.create(userData);

  // create student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id; // embeded id
    studentData.user = newUser._id; // reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
