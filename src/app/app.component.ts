import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  resource,
  signal
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SwapiService } from './swapi.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FormsModule]
})
export class AppComponent {
  private _swapiService = inject(SwapiService);

  // public starships = rxResource({
  //   loader: () => this._swapiService.getAllStarships()
  // });

  public starships = rxResource({
    request: () => ({ pageNum: this.starshipsPage() }),
    loader: ({ request: { pageNum } }) =>
      this._swapiService.getAllStarships(pageNum)
  });

  // public vehicles = resource({
  //   loader: () =>
  //     fetch(`${this._swapiService.baseUrl}/vehicles`).then((res) =>
  //       res.json().then((res) => res.results),
  //     ),
  // });

  public starshipsPage = signal(1);

  public selectableShips = computed(() => {
    return this.starships.value()?.results.map((ship) => ship.name);
  });

  public selectedShip = linkedSignal<string[] | undefined, string>({
    source: this.selectableShips,
    computation: (newStarshipsVal, previousState) => {
      if (
        !newStarshipsVal ||
        newStarshipsVal.includes(String(previousState?.value))
      ) {
        return String(previousState?.value);
      }

      return String(newStarshipsVal[0]);
    }
  });

  public goToNextPage() {
    this.starshipsPage.update((page) => page + 1);
  }

  public goToPreviousPage() {
    this.starshipsPage.update((page) => page - 1);
  }
}
