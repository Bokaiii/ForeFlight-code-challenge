import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CacheService } from 'src/app/services/cache-service/cache-service.service';

@Component({
  selector: 'app-search-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-history.component.html',
  styleUrl: './search-history.component.scss'
})
export class SearchHistoryComponent implements OnInit {

  public cachedSearches: string[] = [];
  @Output() public cachedIcao = new EventEmitter<string>();

  constructor(
    private cacheService: CacheService
  ) { }

  ngOnInit(): void {
    this.getSearches();
  }

  public getSearches(): void {
    this.cachedSearches = this.cacheService.getSearches();
  }

  public emitEvent(icao: string): void {
    this.cachedIcao.emit(icao);
  }
}
