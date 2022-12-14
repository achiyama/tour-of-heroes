import { Component } from '@angular/core';
import {
  debounceTime,
  delay,
  filter,
  interval,
  map,
  Observable,
  of,
  pluck,
  startWith,
  throttleTime,
} from 'rxjs';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
})
export class SampleComponent {
  count$!: Observable<number>;

  constructor() {}

  onClick(): void {
    this.observal1$().subscribe((num) => console.log(num));
  }

  onClick2(): void {
    const cats = of('mike', 'tame', 'mikeneko');
    cats
      .pipe(filter((cat) => cat === 'tame'))
      .subscribe((cat) => console.log(cat));
  }

  onClick3(): void {
    const apiResponse$ = of({ userId: 1, body: 'hoge huga piyo' });
    const userId$ = apiResponse$.pipe(map((v) => v.userId));
  }

  onClick4(): void {
    this.count$ = interval(1000).pipe(
      map((v) => v + 1),
      startWith(0)
    );
  }

  private observal1$(): Observable<number> {
    const nums = of(1, 2, 3, 4, 5);
    return nums.pipe(
      delay(3000),
      map((num) => num * num)
    );
  }
}
