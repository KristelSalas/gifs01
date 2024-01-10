import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory:string[] = [];
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
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string):void{
    if (tag.length === 0) return;
    this.organizedHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe(resp =>{
      this.gifList = resp.data;
    });
  }
}
