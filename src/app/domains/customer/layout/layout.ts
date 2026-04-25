import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedHeader } from '@/shared/components/shared-header/shared-header';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SharedHeader],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
