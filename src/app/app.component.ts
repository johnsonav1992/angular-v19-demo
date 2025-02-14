import { Component, effect, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { SwapiService } from './swapi.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private _swapiService = inject(SwapiService);

  public starships = rxResource({
    loader: () => this._swapiService.getAllStarships(),
  });

  // public starships = rxResource({
  //   request: () => ({ pageNum: this.starshipsPage() }),
  //   loader: ({ request: { pageNum } }) =>
  //     this._swapiService.getAllStarships(pageNum),
  // });

  // public vehicles = resource({
  //   loader: () =>
  //     fetch(`${this._swapiService.baseUrl}/vehicles`).then((res) =>
  //       res.json().then((res) => res.results),
  //     ),
  // });

  public starshipsPage = signal(1);

  public goToNextPage() {
    this.starshipsPage.update((page) => page + 1);
  }

  public goToPreviousPage() {
    this.starshipsPage.update((page) => page - 1);
  }
}
