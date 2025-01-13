import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicDepartmentSearchableFields } from './academicDepartment.constant';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);

  return result;
};

const getAllAcademicDepartmentsFromDb = async (
  query: Record<string, unknown>,
) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate('academicFaculty'),
    query,
  )
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicDepartmentQuery.modelQuery;
  const meta = await academicDepartmentQuery.countTotal();

  return { meta, result };
};

const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');

  return result;
};

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );

  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentsFromDb,
  getSingleAcademicDepartmentFromDb,
  updateAcademicDepartmentIntoDb,
};
