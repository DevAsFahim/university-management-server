import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // check if semester name === semester code

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code!');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();

  return result;
};

const getSingleAcademicSemestersFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);

  return result;
};

const updateSingleAcademicSemestersIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemestersFromDB,
  updateSingleAcademicSemestersIntoDB,
};
