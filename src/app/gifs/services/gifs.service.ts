import { Injectable } from '@angular/core';
import { Gif, Pagination, SearchResponse } from '../interfaces/gifs.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];
  public pagination: Pagination = { total_count: 0, count: 10, offset: 0 };
  private _tagsHistory:string[] = [];
  private _tag: string = "";
  private apiKey:string = 'onkSx6SHmOFrEAG55TPVAP3KEl9MLWpp';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(){
    return [...this._tagsHistory]
  }

  private organizedHistory(tag:string){
    tag = tag.toLocaleLowerCase();
    //caso: si ya esta el tag
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.savelocalStorage();
  }

  private savelocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    console.log(JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage():void{
    this.pagination.count = parseInt(localStorage.getItem('count') || '10')
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  saveCountLocalStorage(count: number): void {
    localStorage.setItem('count', count.toString());
  }

  searchTag(tag: string):void{
    if (tag.length === 0) return;
    this.organizedHistory(tag);

    this._tag = tag;

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', this.pagination.count)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe(resp =>{
      this.gifList = resp.data;
      this.pagination = resp.pagination;
    });
  }

  changePage(direction: number) {
    if (this._tag.length === 0) return;

    const newOffset = Math.max(this.pagination.offset + this.pagination.count * direction, 0); 

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', this._tag)
      .set('limit', this.pagination.count)
      .set('offset', newOffset);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe(resp =>{
      this.gifList = resp.data;
      this.pagination = resp.pagination;
    });
  }
}
