import { Injectable, effect, signal } from '@angular/core';

export type Lang = 'en' | 'tl';

const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly stored = (localStorage.getItem(STORAGE_KEY) as Lang | null);
  readonly lang = signal<Lang>(this.stored === 'tl' ? 'tl' : 'en');

  constructor() {
    effect(() => {
      const current = this.lang();
      localStorage.setItem(STORAGE_KEY, current);
      document.documentElement.lang = current === 'tl' ? 'fil' : 'en';
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }

  toggle(): void {
    this.lang.update(l => (l === 'en' ? 'tl' : 'en'));
  }
}
