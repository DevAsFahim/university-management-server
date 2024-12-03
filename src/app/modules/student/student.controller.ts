import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {

    const studentData = req.body.student

    // data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData)

    // data validation with zod
    const zodParsedData = studentValidationSchema.parse(studentData);


    const result = await StudentServices.createStudentIntoDB(zodParsedData)

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Joi validation error',
    //     error: error,
    //   })
    // }

    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getAStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getAStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'A student is retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getAStudent,
}
