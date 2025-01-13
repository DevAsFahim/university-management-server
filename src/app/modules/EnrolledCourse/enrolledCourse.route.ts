import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  EnrolledCourseController.createEnrolledCourse,
);

router.get(
  '/my-enrolled-courses',
  auth(USER_ROLE.student),
  EnrolledCourseController.getMyEnrolledCourses,
);

router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationSchema,
  ),
  EnrolledCourseController.updateEnrolledCourseMarks,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  EnrolledCourseController.getAllEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
