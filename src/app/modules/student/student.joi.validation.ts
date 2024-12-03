import Joi from "joi";

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .max(20)
      .trim()
      .required()
      .regex(/^[A-Z][a-z]*$/)
      .message('First name must be capitalized and contain only letters.'),
    middleName: Joi.string().trim().allow(''),
    lastName: Joi.string()
      .trim()
      .required()
      .regex(/^[a-zA-Z]+$/)
      .message('Last name must contain only alphabetic characters.'),
  });
  
  // Joi schema for Guardian
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().trim().required(),
    fatherOccupation: Joi.string().trim().required(),
    fatherContactNo: Joi.string().trim().required(),
    motherName: Joi.string().trim().required(),
    motherOccupation: Joi.string().trim().required(),
    motherContactNo: Joi.string().trim().required(),
  });
  
  // Joi schema for LocalGuardian
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    occupation: Joi.string().trim().required(),
    contactNo: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
  });
  
  // Joi schema for Student
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string()
      .valid('male', 'female', 'other')
      .required(),
    dateOfBirth: Joi.string(),
    email: Joi.string()
      .email()
      .required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .allow(null, ''),
    presentAddress: Joi.string().trim().required(),
    permanentAddress: Joi.string().trim().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().uri().allow(null, ''),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
  });

  export default studentValidationSchema;