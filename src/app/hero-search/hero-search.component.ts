import { Component, OnInit } from '@angular/core';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;

  private searchTerms = new Subject<string>();

  constructor(private _heroService: HeroService) {}

  // 検索語をobervableストリームにpushする
  onSearch(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 各キーストロークの後、検索前に300ms待つ
      debounceTime(300),
      tap((value) => console.log(value)),
      // 直前の検索語と同じ場合は無視する
      distinctUntilChanged(),
      // 検索語が変わる度に、新しい検索Observableにスイッチする
      switchMap((term: string) => this._heroService.searchHeroes(term))
    );
  }
}
