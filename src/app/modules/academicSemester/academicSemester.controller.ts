import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Semester Retrieved Successfully',
    data: result,
  });
});

const getSingleAcademicSemesters = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result =
    await AcademicSemesterServices.getSingleAcademicSemestersFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Retrieved Successfully',
    data: result,
  });
});
const updateSingleAcademicSemesters = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const updateData = req.body;

  const result =
    await AcademicSemesterServices.updateSingleAcademicSemestersIntoDB(semesterId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Updated Successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemesters,
  updateSingleAcademicSemesters
};
