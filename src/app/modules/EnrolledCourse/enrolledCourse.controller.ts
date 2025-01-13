import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course is created successfully!',
    data: result,
  });
});

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId;

  const result = await EnrolledCourseServices.getMyEnrolledCoursesFromDB(
    studentId,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses are created successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getAllEnrolledCourse = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.getAllEnrolledCourseFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses are retrieved successfully!',
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;

  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks is updated successfully!',
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourse,
  getMyEnrolledCourses,
  getAllEnrolledCourse,
  updateEnrolledCourseMarks,
};
