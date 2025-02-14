import { Component, effect, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { SwapiService } from './swapi.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    private _swapiService = inject(SwapiService);

    public starships = rxResource({
        loader: () => this._swapiService.getAllStarships().pipe(map((res) => res.results)),
    });
}
