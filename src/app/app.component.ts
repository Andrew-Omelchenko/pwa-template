import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IPhotoRecordDto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const photoRecordsUrl = 'https://jsonplaceholder.typicode.com/photos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public photoRecords$: Observable<IPhotoRecordDto[]> | undefined;

  constructor(private swUpdate: SwUpdate, private httpClient: HttpClient) {}

  ngOnInit() {
    // check if browser supports Service Workers
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load new version?')) {
          window.location.reload();
        }
      });
    }

    this.photoRecords$ = this.httpClient.get<IPhotoRecordDto[]>(photoRecordsUrl);
  }
}
