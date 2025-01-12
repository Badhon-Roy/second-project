import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    sendResponse(res,{
      statusCode: 200,
      success : true,
      message : "Student get successfully",
      data: result
  })
  } catch (error) {
    next(error);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res,{
      statusCode: 200,
      success : true,
      message : "Student get successfully",
      data: result
  })
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
};
