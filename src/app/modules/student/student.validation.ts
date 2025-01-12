import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First Name cannot be more than 20 characters')
    .refine(
      value => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: 'First Name is not in capitalize format' },
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine(value => /^[a-zA-Z]+$/.test(value), {
    message: 'Last Name is not valid',
  }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father Name is required'),
  fatherOccupation: z.string().nonempty('Father Occupation is required'),
  fatherContactNo: z.string().nonempty('Father Contact No is required'),
  motherName: z.string().nonempty('Mother Name is required'),
  motherOccupation: z.string().nonempty('Mother Occupation is required'),
  motherContactNo: z.string().nonempty('Mother Contact No is required'),
});

const studentValidationSchema = z.object({
  id: z.string().nonempty('Id is required'),
  name: userNameValidationSchema.refine(
    data => data.firstName && data.lastName,
    {
      message: 'Name is required',
    },
  ),
  dateOfBirth: z.string().nonempty('Date of birth is required'),
  email: z.string().email('Email is not valid'),
  gender: z.enum(['Male', 'Female'], {
    errorMap: () => ({ message: 'Gender is not valid' }),
  }),
  contactNo: z.string().nonempty('Contact No is required'),
  emergencyContactNo: z.string().nonempty('Emergency Contact No is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Blood Group is not valid' }),
    })
    .optional(),
  presentAddress: z.string().nonempty('Present Address is required'),
  permanentAddress: z.string().nonempty('Permanent Address is required'),
  guardian: guardianValidationSchema,
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;
