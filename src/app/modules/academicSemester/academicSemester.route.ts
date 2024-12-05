import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';

const route = express.Router();

route.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

route.get(
  '/',
  AcademicSemesterControllers.getAllAcademicSemesters,
);
route.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemesters,
);
route.patch(
  '/:semesterId',
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateSingleAcademicSemesters,
);

export const AcademicSemesterRoutes = route;
