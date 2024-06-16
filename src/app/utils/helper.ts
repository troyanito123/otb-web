export const couldPay = (year: string, month: string, subscriptionAt: string): boolean => {
  const monthNumber = getMonth(month)
  const currentMontlyPayment = new Date(`${year}-${monthNumber}-01`)
  const subscriptionAtDate = new Date(subscriptionAt)
  return currentMontlyPayment >= subscriptionAtDate
}

export const getMonth = (month: string): string => {
  let res = '01'
  switch (month) {
    case 'ENERO':
      res = '01'
      break
    case 'FEBRERO':
      res = '02'
      break
    case 'MARZO':
      res = '03'
      break
    case 'ABRIL':
      res = '04'
      break
    case 'MAYO':
      res = '05'
      break
    case 'JUNIO':
      res = '06'
      break
    case 'JULIO':
      res = '07'
      break
    case 'AGOSTO':
      res = '08'
      break
    case 'SEPTIEMBRE':
      res = '09'
      break
    case 'OCTUBRE':
      res = '10'
      break
    case 'NOVIEMBRE':
      res = '11'
      break
    case 'DICIEMBRE':
      res = '12'
      break
  }
  return res
}

export const formatShortDate = (date: Date | string): string => {
  return new Date(date).toLocaleString('es', { year: 'numeric', month: '2-digit', day: '2-digit' })
}
