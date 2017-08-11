import {
  AfterViewInit,
  OnInit ,
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
  /* HELPER PROPERTIES (PRIVATE PROPERTIES) */
  private camera: THREE.PerspectiveCamera;

  private get canvas() : HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private cube: THREE.Mesh;

  private renderer: THREE.WebGLRenderer;

  private scene: THREE.Scene;


  private stars = [];




  /* CUBE PROPERTIES */
  @Input()
  public rotationSpeedX: number = 0.005;

  @Input()
  public rotationSpeedY: number = 0.01;

  @Input()
  public size: number = 200;

  @Input()
  public texture: string = '/assets/textures/crate.gif';



  /* STAGE PROPERTIES */
  @Input()
  public cameraZ: number = -400;

  @Input()
  public fieldOfView: number = 70;

  @Input('nearClipping')
  public nearClippingPane: number = 1;

  @Input('farClipping')
  public farClippingPane: number = 1000;



  /* DEPENDENCY INJECTION (CONSTRUCTOR) */
  constructor() { }



  /* STAGING, ANIMATION, AND RENDERING */



  /**
   * Animate the cube
   */
  private animateCube() {
/*    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;*/
    for( let i = 0; i < this.stars.length; i++){

    }
    this.camera.rotation.z += 0.001;
  }

  private createStars(){
    for (let i = 0; i < 500 ; i++) {
      let rx = Math.random() * 2000 - 1000;
      let ry = Math.random() * 1000 - 500;
      let rz = Math.random() * 10000 - 5000;
      this.stars[i] = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshNormalMaterial());

      this.stars[i].position.x = rx;
      this.stars[i].position.y = ry;
      this.stars[i].position.z = rz;
      this.scene.add(this.stars[i]);
    }
  }



  /**
   * Create the cube
   */
  private createCube() {
    this.cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshNormalMaterial() );
    this.scene.add(this.cube);
  }

  /**
   * Create the scene
   */
  private createScene() {
    /* Scene */
    this.scene = new THREE.Scene();

    /* Camera */
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.z = this.cameraZ;

  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   */
  private startRenderingLoop() {
    /* Renderer */
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    let component: BackgroundScenComponent = this;

    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());


  }



  /* EVENTS */

  /**
   * Update scene after resizing.
   */
  public onResize() {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }



  /* LIFECYCLE */

  /**
   * We need to wait until template is bound to DOM, as we need the view
   * dimensions to create the scene. We could create the cube in a Init hook,
   * but we would be unable to add it to the scene until now.
   */
  public ngAfterViewInit() {
    this.createScene();
    this.createStars();
    this.startRenderingLoop();
  }
}
