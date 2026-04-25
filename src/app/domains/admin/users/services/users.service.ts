import { Injectable, inject } from '@angular/core';
import { AdminUsersApi } from '../api/users.api';
import { AdminUsersQueryDto, CreateAdminUserRequestDto, UpdateAdminUserRequestDto } from '../api/users.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  private usersApi = inject(AdminUsersApi);

  list(query?: AdminUsersQueryDto) {
    return this.usersApi.list(query);
  }

  show(userId: number) {
    return this.usersApi.show(userId);
  }

  create(payload: CreateAdminUserRequestDto) {
    return this.usersApi.create(payload);
  }

  update(userId: number, payload: UpdateAdminUserRequestDto) {
    return this.usersApi.update(userId, payload);
  }

  delete(userId: number) {
    return this.usersApi.delete(userId);
  }
}
