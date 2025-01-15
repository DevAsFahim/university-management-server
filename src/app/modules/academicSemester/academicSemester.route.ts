import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const route = express.Router();

route.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

route.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    // USER_ROLE.student,
    // USER_ROLE.faculty,
  ),
  AcademicSemesterControllers.getAllAcademicSemesters,
);
route.get('/:courseId', AcademicSemesterControllers.getSingleAcademicSemesters);
route.patch(
  '/:courseId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateSingleAcademicSemesters,
);

export const AcademicSemesterRoutes = route;
