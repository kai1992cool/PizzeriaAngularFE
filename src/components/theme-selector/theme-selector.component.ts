import {Component, inject} from '@angular/core';
import {ThemeService} from '../../services/themes/theme.service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.css'
})
export class ThemeSelectorComponent {
  protected themeService = inject(ThemeService);

}
