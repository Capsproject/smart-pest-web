import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang, LanguageService } from '../../core/services/language.service';
import { LANDING_COPY } from './landing.copy';

export interface AppReleaseInfo {
  version: string;
  versionCode: number;
  sizeBytes: number;
  releasedAt: string;
  releaseUrl: string;
}

const DOWNLOAD_PATH = '/downloads/smartpest.apk';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  private readonly languageService = inject(LanguageService);
  private readonly http = inject(HttpClient);

  readonly lang = this.languageService.lang;
  readonly t = computed(() => LANDING_COPY[this.lang()]);

  readonly currentYear = new Date().getFullYear();

  readonly downloadPath = DOWNLOAD_PATH;
  /** null until latest.json loads — no release has been published yet, or it 404s. */
  readonly release = signal<AppReleaseInfo | null>(null);

  constructor() {
    // Degrades silently: before the first CI release publishes latest.json,
    // this 404s and the download button just renders without a version/size
    // caption (see release-apk.yml in smart-pest-app for what publishes it).
    this.http.get<AppReleaseInfo>('/downloads/latest.json').subscribe({
      next: (info) => this.release.set(info),
      error: () => this.release.set(null),
    });
  }

  setLang(lang: Lang): void {
    this.languageService.set(lang);
  }

  formatSize(bytes: number): string {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
