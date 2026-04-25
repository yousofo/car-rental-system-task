import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-section-placeholder',
  imports: [TranslatePipe],
  templateUrl: './section-placeholder.html',
  styleUrl: './section-placeholder.css',
})
export class SectionPlaceholder {
  private route = inject(ActivatedRoute);
  protected titleKey = this.route.snapshot.data['titleKey'] as string;
  protected descriptionKey = this.route.snapshot.data['descriptionKey'] as string;
}
