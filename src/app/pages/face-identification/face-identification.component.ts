import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import * as Clarifai from 'clarifai'
import { appName, clarifaiApiKey } from 'configs/configs';
import { LoadingService } from 'src/app/services/loading/loading.service';

const clarifaiApp = new Clarifai.App({
  apiKey: clarifaiApiKey,
});

@Component({
  selector: 'app-face-identification',
  templateUrl: './face-identification.component.html',
  styleUrls: ['./face-identification.component.scss']
})
export class FaceIdentificationComponent implements OnInit {

  identificationForm: FormGroup;

  appName: string = appName;

  imgSrc:string = 'https://via.placeholder.com/300';

  showFaceBox: boolean;

  currentUser: any;

  constructor(private formBuilder: FormBuilder, private authServ: AuthenticationService,
    private loadServ: LoadingService, private zone: NgZone) {

    this.identificationForm = this.formBuilder.group({
      url: [null, Validators.required]
    });

    this.currentUser = this.authServ.getUser();
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.isUrlValid(this.identificationForm.controls.url.value) === false) {
      alert('Veuillez entrer une url valide');
      return;
    }
    this.loadServ.presentLoading();
    this.showFaceBox = false;
    this.imgSrc = this.identificationForm.controls.url.value;
    clarifaiApp.models.predict({ id: 'a403429f2ddf4b49b307e318f00e528b', version: '34ce21a40cc24b6b96ffee54aabff139' }, this.imgSrc)
      .then(data => {
        this.zone.run(() => {

          if (!data.outputs || !data.outputs[0].data || !data.outputs[0].data.regions) {

            console.log('no face on pic');
            this.loadServ.hideLoading();
            return;
          }
          // this code only show first detected face
          this.showFaceBox = true;
          const points = this.calculateFaceLocation(data);
          const fbox = document.getElementById('face-box');
          fbox.style.top = `${points.topRow}px`;
          fbox.style.bottom = `${points.bottomRow}px`;
          fbox.style.left = `${points.leftCol}px`;
          fbox.style.right = `${points.rightCol}px`;
          this.showFaceBox = true;
          console.log('face detected');
          this.loadServ.hideLoading();
        });



      }).catch(error => console.log('error', error));
  }

  calculateFaceLocation(data){
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = <HTMLImageElement>document.getElementById('myImg');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  logout() {
    if (confirm('Voulez vous vraiment vous déconnecter ?') === true) {
      this.authServ.logout();
    }

  }

  isUrlValid(url): boolean{
    return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
  }

}
