import type { AxiosResponse } from "axios";
import HttpService from "./baseService";

export interface ICheckExistencePayload {
  email?: string;
  mobile_number?: string;
  aadhar_number?: string;
  candidate_id: string;
}

export interface ICheckExistenceSuccessResponse {
  message: string;
}

export interface ICheckExistenceErrorResponse {
  statusCode: number;
  message: string;
}

export const checkCandidateExistence = async (
  payload: ICheckExistencePayload
): Promise<ICheckExistenceSuccessResponse> => {
  try {
    const response: AxiosResponse<ICheckExistenceSuccessResponse> =
      await HttpService.post(`/api/candidates/check-existence`, payload);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      const conflictData: ICheckExistenceErrorResponse = error.response.data;
      throw new Error(conflictData.message);
    }
    throw error;
  }
};
