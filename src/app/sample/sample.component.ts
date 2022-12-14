import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  debounceTime,
  delay,
  filter,
  from,
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
  form1: FormControl = new FormControl('hello', {
    nonNullable: true,
    validators: [Validators.required],
  });

  count$!: Observable<number>;

  constructor() {}

  onValidationCheck() {
    if (this.form1.invalid) {
      console.error('エラーが発生しました');
    }
  }

  onClear() {
    this.form1.reset();
  }

  onDisable() {
    this.form1.reset();
  }

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
