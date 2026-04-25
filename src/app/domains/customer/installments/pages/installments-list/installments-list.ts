import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomerInstallmentsService } from '../../services/installments.service';
import { CustomerInstallment } from '../../services/installment.mapper';

@Component({
  selector: 'app-installments-list',
  imports: [RouterLink, TranslatePipe, DatePipe],
  templateUrl: './installments-list.html',
  styleUrl: './installments-list.css',
})
export class InstallmentsList {
  private installmentsService = inject(CustomerInstallmentsService);

  protected installments: CustomerInstallment[] = [];
  protected loading = true;
  protected payingInstallmentId: number | null = null;

  ngOnInit() {
    this.loadInstallments();
  }

  protected payInstallment(installmentId: number) {
    this.payingInstallmentId = installmentId;

    this.installmentsService.pay(installmentId).subscribe({
      next: (updatedInstallment) => {
        this.installments = this.installments.map((installment) =>
          installment.id === installmentId ? updatedInstallment : installment,
        );
      },
      error: () => {
        this.payingInstallmentId = null;
      },
      complete: () => {
        this.payingInstallmentId = null;
      },
    });
  }

  private loadInstallments() {
    this.loading = true;

    this.installmentsService.list({ per_page: 12 }).subscribe({
      next: (response) => {
        this.installments = response.data;
      },
      error: () => {
        this.installments = [];
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
