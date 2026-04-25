import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedHeader } from '@/shared/components/shared-header/shared-header';
@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslatePipe, SharedHeader],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
