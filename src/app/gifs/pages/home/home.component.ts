import { Component } from '@angular/core';
import { SearchBoxComponent } from "../../components/search-box/search-box.component";
import { CardListComponent } from "../../components/card-list/card-list.component";
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { GifsService } from '../../services/gifs.service';
import { Gif, Pagination } from '../../interfaces/gifs.interfaces';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [SearchBoxComponent, CardListComponent, PaginationComponent]
})
export class HomeComponent {

  constructor(private gisfsService: GifsService){}

  get gifs(): Gif[]{
    return this.gisfsService.gifList;
  }

  get pagination(): Pagination {
    return this.gisfsService.pagination;
  }
}
