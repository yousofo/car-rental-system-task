import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AdminUserDetailsDto } from '../../api/users.dto';
import { AdminUsersService } from '../../services/users.service';

@Component({
  selector: 'app-admin-user-details',
  imports: [RouterLink, TranslatePipe, DatePipe],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class AdminUserDetails {
  private route = inject(ActivatedRoute);
  private usersService = inject(AdminUsersService);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  protected user: AdminUserDetailsDto | null = null;
  protected loading = true;
  protected failed = false;

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const userId = Number(params.get('id'));

      if (!userId) {
        this.failed = true;
        this.loading = false;
        this.user = null;
        return;
      }

      this.loadUser(userId);
    });
  }

  private loadUser(userId: number) {
    this.loading = true;
    this.failed = false;

    this.usersService.show(userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: () => {
        this.failed = true;
        this.user = null;
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user details.',
        });
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
