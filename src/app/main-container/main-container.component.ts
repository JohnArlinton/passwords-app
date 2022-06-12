import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../shared/core/services/sharing.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent implements OnInit {
  value = '';

  constructor(private router: Router, private sharingService: SharingService) {}

  ngOnInit(): void {}

  onChangeSearch(text: string) {
    this.sharingService.searchObservableData = text.toLowerCase();
  }
}
