import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild} from '@angular/core';

import * as THREE from 'three';
@Component({
  selector: 'app-background-scen',
  templateUrl: './background-scen.component.html',
  styleUrls: ['./background-scen.component.css']
})
export class BackgroundScenComponent implements AfterViewInit {
  private camera: THREE.PerspectiveCamera;
  private cameraTarget: THREE.Vector3;
  private scene: THREE.Scene;

  private get canvas():HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }

  @ViewChild('canvas')
  private canvasRef: ElementRef;
  private renderer: THREE.WebGLRenderer;


  constructor() { }

  private createScene() {
    this.scene = new THREE.Scene();
  }

  /**
   * Create the camera.
   */
  private createCamera() {
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.cameraTarget = new THREE.Vector3(0, 0, 0);
  }




  private startRendering() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: BackgroundScenComponent = this;

    (function render() {
      requestAnimationFrame(render);
      component.rotateCamera();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  ngAfterViewInit() {
    this.createScene();

    this.startRendering();
  }

}
