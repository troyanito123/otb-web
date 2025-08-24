import { Injectable } from '@angular/core'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export type PDFInput = { 
  title: string; 
  head: string[][]; 
  body: any[][]; 
  type: string;
  subtitle?: string;
  footer?: string;
}

export interface UserReportData {
  userName: string;
  blockNumber: string;
  addressNumber: string;
  subscriptionAt: string;
  contributions: any[];
  extraContributions: any[];
  fines: any[];
  monthlyPayments: any;
}

@Injectable({
  providedIn: 'root',
})
export class PrintTableService {
  constructor() {}

  public generatePdf({title, head, body, type, subtitle, footer}: PDFInput) {
    const doc = new jsPDF()

    // Configurar fuente y título principal
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text(title, 105, 20, { align: 'center' })

    // Agregar subtítulo si existe
    if (subtitle) {
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.text(subtitle, 105, 30, { align: 'center' })
    }

    // Generar tabla con autoTable
    autoTable(doc, {
      head,
      body,
      theme: 'grid',
      headStyles: { 
        fillColor: '#3F51B5',
        textColor: 255,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: '#f5f5f5'
      },
      margin: { top: subtitle ? 40 : 30 },
      didDrawPage: (data) => {
        // Agregar número de página
        const pageCount = doc.getNumberOfPages()
        const pageSize = doc.internal.pageSize
        
        doc.setFontSize(10)
        doc.text(
          `Página ${data.pageNumber} de ${pageCount}`,
          pageSize.getWidth() - 30,
          pageSize.getHeight() - 10,
          { align: 'right' }
        )

        // Agregar fecha de generación
        doc.text(
          `Generado: ${new Date().toLocaleDateString('es-ES')}`,
          15,
          pageSize.getHeight() - 10
        )
      }
    })

    // Agregar footer si existe
    if (footer) {
      const finalY = (doc as any).lastAutoTable.finalY || 50
      doc.setFontSize(10)
      doc.text(footer, 15, finalY + 20)
    }

    doc.save(`REPORTE_${type.toUpperCase()}_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  // Método específico para generar reporte de usuario
  public generateUserReport(userData: UserReportData) {
    const doc = new jsPDF()
    let currentY = 20

    // Título principal
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('REPORTE DETALLADO DE USUARIO', 105, currentY, { align: 'center' })
    currentY += 15

    // Información del usuario
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(`Usuario: ${userData.userName}`, 15, currentY)
    currentY += 8
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Manzano: ${userData.blockNumber} | Lote: ${userData.addressNumber}`, 15, currentY)
    currentY += 6
    doc.text(`Fecha de afiliación: ${new Date(userData.subscriptionAt).toLocaleDateString('es-ES')}`, 15, currentY)
    currentY += 15

    // Contribuciones
    if (userData.contributions.length > 0) {
      this.addSectionWithTable(doc, 'CONTRIBUCIONES', [
        ['Descripción', 'Monto', 'Pagado', 'Estado']
      ], userData.contributions.map(c => [
        c.description,
        `${c.amount} Bs.`,
        `${c.amount_paid} Bs.`,
        c.amount_paid === 0 ? 'PENDIENTE' : 'PAGADO'
      ]), currentY)
      
      currentY = (doc as any).lastAutoTable.finalY + 15
    }

    // Contribuciones extras
    if (userData.extraContributions.length > 0) {
      this.addSectionWithTable(doc, 'CONTRIBUCIONES EXTRAS', [
        ['Nombre', 'Descripción', 'Monto', 'Estado', 'Pagado']
      ], userData.extraContributions.map(c => [
        c.name,
        c.description.substring(0, 30) + '...',
        `${c.amount} Bs.`,
        c.status,
        c.amount_paid === 0 ? 'PENDIENTE' : 'PAGADO'
      ]), currentY)
      
      currentY = (doc as any).lastAutoTable.finalY + 15
    }

    // Multas por inasistencias
    if (userData.fines.length > 0) {
      const finesWithAmount = userData.fines;
      if (finesWithAmount.length > 0) {
        this.addSectionWithTable(doc, 'MULTAS', [
          ['Reunión', 'Fecha', 'Multa', 'Pagado', 'Estado']
        ], finesWithAmount.map(f => [
          f.meetingName,
          new Date(f.meetingDate).toLocaleDateString('es-ES'),
          `${f.fine} Bs.`,
          f.attendence === 'NO' ? `${f.finePaid} Bs.` : 'N/A',
          f.fine === 0  ? 'N/A' : f.attendence === 'SI' ? 'N/A' : f.finePaid !== 0 ? 'PAGADO' : 'PENDIENTE',
        ]), currentY)
        
        currentY = (doc as any).lastAutoTable.finalY + 15
      }
    }

    // Pagos mensuales
    if (userData.monthlyPayments) {
      // Crear una tabla consolidada de todos los años
      const monthlyPaymentsData: any[] = []
      
      Object.keys(userData.monthlyPayments).forEach(year => {
        const yearPayments = userData.monthlyPayments[year]
        if (yearPayments && yearPayments.length > 0) {
          yearPayments.forEach((payment: any) => {
            monthlyPaymentsData.push([
              payment.year,
              payment.month,
              `${payment.amount} Bs.`,
              payment.isMonthlyPaymentPaid ? 'PAGADO' : 'PENDIENTE',
              payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString('es-ES') : 'N/A'
            ])
          })
        }
      })

      if (monthlyPaymentsData.length > 0) {
        this.addSectionWithTable(doc, 'PAGOS MENSUALES', [
          ['Año', 'Mes', 'Monto', 'Estado', 'Fecha de Pago']
        ], monthlyPaymentsData, currentY)
        
        currentY = (doc as any).lastAutoTable.finalY + 15
      }
    }

    // Resumen de deudas
    currentY = (doc as any).lastAutoTable?.finalY + 20 || currentY + 20
    
    const contributionsTotal = userData.contributions
      .filter(c => c.amount_paid === 0)
      .reduce((acc, curr) => acc + curr.amount, 0)
    
    const extraContributionsTotal = userData.extraContributions
      .filter(c => c.amount_paid === 0)
      .reduce((acc, curr) => acc + curr.amount, 0)
    
    const finesTotal = userData.fines
      .filter(f => f.attendence === 'NO')
      .reduce((acc, curr) => acc + (curr.fine - curr.finePaid), 0)
    
    let monthlyTotal = 0
    if (userData.monthlyPayments) {
      Object.values(userData.monthlyPayments).forEach((yearPayments: any) => {
        if (yearPayments) {
          monthlyTotal += yearPayments
            .filter((p: any) => !p.isMonthlyPaymentPaid)
            .reduce((acc: number, curr: any) => acc + curr.amount, 0)
        }
      })
    }

    this.addSectionWithTable(doc, 'RESUMEN DE DEUDAS', [
      ['Concepto', 'Monto Adeudado']
    ], [
      ['Contribuciones', `${contributionsTotal} Bs.`],
      ['Contribuciones Extras', `${extraContributionsTotal} Bs.`],
      ['Multas', `${finesTotal} Bs.`],
      ['Mensualidades', `${monthlyTotal} Bs.`],
      ['TOTAL GENERAL', `${contributionsTotal + extraContributionsTotal + finesTotal + monthlyTotal} Bs.`]
    ], currentY)

    // Pie de página
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(10)
      doc.text(`Página ${i} de ${pageCount}`, 190, 285, { align: 'right' })
      doc.text(`Generado: ${new Date().toLocaleDateString('es-ES')}`, 15, 285)
    }

    doc.save(`${userData.userName}_reporte_completo.pdf`)
  }

  private addSectionWithTable(doc: jsPDF, title: string, head: string[][], body: any[][], startY: number) {
    // Título de sección
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(title, 15, startY)

    // Tabla
    autoTable(doc, {
      head,
      body,
      theme: 'grid',
      startY: startY + 5,
      headStyles: { 
        fillColor: '#3F51B5',
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8
      },
      alternateRowStyles: {
        fillColor: '#f5f5f5'
      },
      margin: { left: 15, right: 15 }
    })
  }
}