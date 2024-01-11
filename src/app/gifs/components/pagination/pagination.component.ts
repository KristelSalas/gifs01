import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Pagination } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @ViewChild('pageSizeInput')
  public pageSizeInput!: ElementRef<HTMLInputElement>

  @Input()
  public pagination: Pagination = { total_count: 0, count: 0, offset: 0 };

  constructor(private gifsService: GifsService){}

  getPage(direction: number) {
    this.gifsService.changePage(direction);
  }

  updatePageSize() {
    const value = this.pageSizeInput.nativeElement.value;
    const castedValue = parseInt(value);
    if (castedValue > 0 && castedValue <= 50) {
      this.gifsService.saveCountLocalStorage(castedValue)
    }
  }

}
