import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: any;

  constructor() {
    this.loading = document.getElementById('loader-container');
  }

  presentLoading(): void{
    this.loading.classList.remove('d-none');
  }

  hideLoading(): void{
    this.loading.classList.add('d-none');
  }
}
