export type ReportEntry = {
  address: string
  database_name: string
  email: string
  hashed_password: string
  id: string
  ip_address: string
  name: string
  password: string
  phone: string
  username: string
  vin: string
}

export type Report = {
  balance: number
  entries: ReportEntry[]
  success: boolean
  took: string
  total: number
}
