import { Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { UserService } from '@services/user.service'
import { PrintTableService, UserReportData } from '@services/print-table.service'
import { AppState } from '@state/app.reducer'
import { userFeature } from '@state/reducers/user.reducer'
import { filter, map, switchMap } from 'rxjs/operators'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrl: './user-report.component.scss',
  standalone: false,
})
export class UserReportComponent {
  readonly userService = inject(UserService)
  readonly printService = inject(PrintTableService)
  readonly store = inject(Store<AppState>)
  readonly user$ = this.store.select(userFeature.selectUser)
  readonly userReport$ = this.user$.pipe(
    filter((user) => !!user),
    switchMap(({ id }) => this.userService.getDetail(id)),
    map((report) => {
      const contributions = report.contributions
      const contributionsTotal = contributions
        .filter((c) => c.amount_paid === 0)
        .reduce((acc, curr) => acc + curr.amount, 0)

      const extraContributions = report.extraContributions
      const extraContributionsTotal = extraContributions
        .filter((c) => c.amount_paid === 0)
        .reduce((acc, curr) => acc + curr.amount, 0)

      const fines = report.finnes.fines
      const finesTotal = fines
        .filter((f) => f.attendence === 'NO')
        .reduce((acc, curr) => acc + curr.fine, 0)

      const monthlyPayments = report.monthlyPayments.paymentsByUser

      const monthly2021 = monthlyPayments['2021'] ?? []
      const monthly2021Total = monthly2021
        .filter((m) => !m.isMonthlyPaymentPaid)
        .reduce((acc, curr) => acc + curr.amount, 0)

      const monthly2022 = monthlyPayments['2022'] ?? []
      const monthly2022Total = monthly2022
        .filter((m) => !m.isMonthlyPaymentPaid)
        .reduce((acc, curr) => acc + curr.amount, 0)

      const monthly2023 = monthlyPayments['2023'] ?? []
      const monthly2023Total = monthly2023
        .filter((m) => !m.isMonthlyPaymentPaid)
        .reduce((acc, curr) => acc + curr.amount, 0)

      const monthly2024 = monthlyPayments['2024'] ?? []
      const monthly2024Total = monthly2024
        .filter((m) => !m.isMonthlyPaymentPaid)
        .reduce((acc, curr) => acc + curr.amount, 0)
      const monthly2025 = monthlyPayments['2025'] ?? []
      const monthly2025Total = monthly2025
        .filter((m) => !m.isMonthlyPaymentPaid)
        .reduce((acc, curr) => acc + curr.amount, 0)

      return {
        // Datos originales
        userName: report.name,
        blockNumber: report.blockNumber,
        addressNumber: report.addressNumber,
        subscriptionAt: report.subscriptionAt,
        
        // Datos procesados
        contributions,
        contributionsTotal,
        extraContributions,
        extraContributionsTotal,
        fines,
        finesTotal,
        monthly2021,
        monthly2022,
        monthly2023,
        monthly2024,
        monthly2025,
        monthlyTotal:
          monthly2021Total +
          monthly2022Total +
          monthly2023Total +
          monthly2024Total +
          monthly2025Total,
      }
    })
  )

  public async print(userName: string) {
    const element = document.getElementById('userReport')
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        height: element.scrollHeight,
        width: element.scrollWidth,
        useCORS: true,
        scale: 2, // Mejor calidad
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const doc = new jsPDF('p', 'mm', 'a4')

      // Dimensiones de la página A4 en mm
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()

      // Márgenes (superior e inferior)
      const margin = 10
      const marginBottom = 15
      const imgWidth = pageWidth - margin * 2
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Área útil de cada página (sin márgenes)
      const pageContentHeight = pageHeight - margin - marginBottom

      // Calcular número total de páginas necesarias
      const totalPages = Math.ceil(imgHeight / pageContentHeight)

      // Generar cada página
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        if (pageIndex > 0) {
          doc.addPage()
        }

        // Calcular qué parte de la imagen mostrar en esta página
        const yOffset = -(pageContentHeight * pageIndex)

        // Agregar la imagen con el offset correcto
        doc.addImage(imgData, 'PNG', margin, margin + yOffset, imgWidth, imgHeight)
      }

      doc.save(`${userName}-reporte.pdf`)
    } catch (error) {
      console.error('Error generando PDF:', error)
    }
  }

  // Nuevo método usando el servicio mejorado
  public printWithService(userReport: any) {
    // Preparar datos para el servicio
    const userData: UserReportData = {
      userName: userReport.userName,
      blockNumber: userReport.blockNumber,
      addressNumber: userReport.addressNumber,
      subscriptionAt: userReport.subscriptionAt,
      contributions: userReport.contributions,
      extraContributions: userReport.extraContributions,
      fines: userReport.fines,
      monthlyPayments: {
        2021: userReport.monthly2021,
        2022: userReport.monthly2022,
        2023: userReport.monthly2023,
        2024: userReport.monthly2024,
        2025: userReport.monthly2025
      }
    }

    // Generar PDF usando el servicio
    this.printService.generateUserReport(userData)
  }

  
}
