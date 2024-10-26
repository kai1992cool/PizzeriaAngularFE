import {inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document: Document = inject(DOCUMENT);

  public switchTheme(theme: string) {
    let appTheme = this.document.getElementById("app-theme") as HTMLLinkElement;

    if (appTheme) {
      appTheme.href = `${theme}.css`;
    }
  }
}
