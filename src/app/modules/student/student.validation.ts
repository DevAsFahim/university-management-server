import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty('First name is required')
    .max(20, 'First name cannot be more than 20 characters')
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .nonempty('Last name is required')
    .trim()
    .refine((value) => /^[A-Za-z]+$/.test(value), { message: 'Last name must contain only alphabets' })
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required').trim(),
  fatherOccupation: z.string().nonempty('Father occupation is required').trim(),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required').trim(),
  motherOccupation: z.string().nonempty('Mother occupation is required').trim(),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty("Local Guardian's name is required"),
  occupation: z.string().nonempty("Local Guardian's occupation is required"),
  contactNo: z.string().nonempty("Local Guardian's contact number is required"),
  address: z.string().nonempty("Local Guardian's address is required").trim(),
});

const studentValidationSchema = z.object({
  id: z.string().nonempty('ID is required'),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: "Gender can only be 'male', 'female', or 'other'" }),
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address')
    .trim(),
  contactNo: z.string().nonempty('Contact number is required'),
  emergencyContactNo: z.string().nonempty('Emergency contact number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().nonempty('Present address is required').trim(),
  permanentAddress: z.string().nonempty('Permanent address is required').trim(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;