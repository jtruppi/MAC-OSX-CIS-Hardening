export type Entry = {
  id: string,
  email: string,
  ip_address: string,
  username: string,
  password: string,
  hashed_password: string,
  name: string,
  vin: string,
  phone: string,
  database_name: string,
}

export type Report = {
  balance: number
  success: boolean
  took: string
  total: number
  entries: Entry[]
}

export type PasswordResult = {
  value: string
  entries: Entry[]
}

export type PasswordReport = Record<string, PasswordResult>;

export type Results = {
  passwordReport: PasswordReport
}

export type SubmissionResult = {
  report: Report
}

export type SubmissionResults = {
  passwordReport: PasswordReport
  rawResults: Record<string, SubmissionResult | null>;
}

export type FormValues = {
  email: string,
  username: string,
  phone: string,
  ip_address: string,
  name: string,
  address: string,
  vin: string,
  domain: string,
}
