import { z } from "zod";

const userValidationSchema = z.object({
    id : z.string().nonempty('Id is required'),
    password : z.string().max(20,{message :"Password can not be more then 20 characters"}),
    needsPasswordChange : z.boolean().optional().default(true),
    role : z.enum(['admin', 'faculty', 'student']),
    status : z.enum(['in-progress', 'blocked']).default('in-progress'),
    isDeleted : z.boolean().optional().default(false)
    
})
export default userValidationSchema;