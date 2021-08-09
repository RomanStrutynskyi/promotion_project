import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CUSTOM_ICON_NAMES } from '../models/icons';

@Injectable()
export class IconService {
  icons: string[] = CUSTOM_ICON_NAMES;

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {}

  private addIcons(): void {
    this.icons.forEach((name) => {
      this.matIconRegistry.addSvgIcon(
        name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${name}.svg`
        )
      );
    });
  }

  public load(): void {
    this.addIcons();
  }
}
