// Interface principal del usuario de OTB
export interface OTBUser {
  id: number
  name: string
  blockNumber: string
  addressNumber: string
  subscriptionAt: string
  incomes: Income[]
  contributions: Contribution[]
  extraContributions: ExtraContribution[]
  certifications: Certification[]
  attendences: Attendance[]
  finnes: Fines
  monthlyPayments: MonthlyPayments
}

// Interfaces para ingresos
interface Income {
  // Array vacío en el ejemplo, estructura por definir
}

// Interfaces para contribuciones
interface Contribution {
  id: number
  description: string
  amount: number
  amount_paid: number
  date_paid: string | null
}

// Interfaces para contribuciones extra
interface ExtraContribution {
  id: number
  name: string
  description: string
  amount: number
  status: string
  createdAt: string
  updatedAt: string
  amount_paid: number
  date_paid: string | null
}

// Interfaces para certificaciones
interface Certification {
  // Array vacío en el ejemplo, estructura por definir
}

// Interfaces para asistencias
interface Attendance {
  id: number
  name: string
  description: string
  date: string
  fine_amount: number
  conclutions: string | null
  isPresent: boolean
}

// Interfaces para multas
interface Fines {
  userId: number
  userName: string
  subscriptionAt: string
  block: string
  addressNumber: string
  fines: Fine[]
}

interface Fine {
  meetingId: number
  meetingName: string
  meetingDate: string
  attendence: string
  fine: number
  finePaid: number
  fienPaidDate: string | null
}

// Interfaces para pagos mensuales
interface MonthlyPayments {
  userId: number
  userName: string
  subscriptionAt: string
  block: string
  addressNumber: string
  paymentsByUser: PaymentsByYear
}

interface PaymentsByYear {
  [year: string]: MonthlyPayment[]
}

interface MonthlyPayment {
  year: string
  month: string
  amount: number
  isMonthlyPaymentPaid: boolean
  paymentDate: string | null
}
