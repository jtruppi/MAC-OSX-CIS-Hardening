import axios from 'axios';
import { FormValues, SubmissionResults } from '../models/darknet';
import { getApiUrl } from './utils';

export const submitForm = async (values: FormValues): Promise<SubmissionResults> => {
  const url = `${getApiUrl()}/v1/query`;
  // Filter out any fields that don't have a value
  const nextValues: Partial<FormValues> = {};
  Object.keys(values).forEach(key => {
    const value = values[key as keyof FormValues];
    if (value) nextValues[key as keyof FormValues] = value;
  })
  const config = {
    url,
    method: 'post' as const,
    data: nextValues,
  }
  return axios(config)
  .then(response => {
    const {passwordReport, rawResults} = response.data;
    return {passwordReport, rawResults};
  })
  .catch(error => {
    return Promise.reject({error});
  })
}
