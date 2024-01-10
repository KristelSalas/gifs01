import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GifsService } from './gifs/services/gifs.service';
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { HomeComponent } from "./gifs/pages/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, SidebarComponent, HomeComponent]
})
export class AppComponent {

  title = 'gifs01';

  constructor(){}

}
