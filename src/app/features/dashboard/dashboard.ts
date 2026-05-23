import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { AuthService } from '../../core/services/auth.service';


// Philippine pest detection points: [lat, lng, intensity 0-1]
const PEST_POINTS: [number, number, number][] = [
  // Metro Manila / NCR
  [14.5995, 120.9842, 1.0], [14.6760, 121.0437, 0.9], [14.5547, 121.0244, 0.85],
  [14.6507, 121.1029, 0.8], [14.7406, 121.0484, 0.75], [14.4793, 120.8980, 0.9],
  [14.5243, 121.0792, 0.7], [14.6091, 121.0223, 0.88],
  // Bulacan / Central Luzon
  [14.7942, 120.8797, 0.6], [14.9611, 120.9179, 0.5], [15.1300, 120.5880, 0.65],
  [15.4500, 120.5995, 0.55], [15.7500, 120.9400, 0.45], [15.0794, 120.6200, 0.6],
  [14.8527, 120.8118, 0.58],
  // Batangas / Cavite / Laguna (CALABARZON)
  [14.1153, 121.1282, 0.7], [13.7565, 121.0583, 0.6], [13.9236, 121.6170, 0.5],
  [14.2860, 121.1544, 0.65], [14.0229, 121.3253, 0.55], [14.1108, 120.9647, 0.7],
  // Bicol Region
  [13.1391, 123.7438, 0.6], [13.6218, 123.1945, 0.5], [12.3797, 123.5113, 0.45],
  [12.9734, 123.9861, 0.55],
  // Ilocos Region
  [17.5765, 120.3869, 0.5], [18.1981, 120.5937, 0.4], [16.6061, 120.3169, 0.55],
  // Cagayan Valley
  [17.6131, 121.7269, 0.45], [18.3574, 121.8863, 0.4], [16.9754, 121.8107, 0.5],
  // Cordillera / Benguet
  [16.4023, 120.5960, 0.35], [16.8710, 120.8027, 0.3],
  // Pangasinan
  [15.8949, 120.2863, 0.6], [16.0200, 120.3300, 0.55],
  // Cebu
  [10.3157, 123.8854, 0.95], [10.3500, 123.9000, 0.9], [9.9827, 123.7068, 0.7],
  [10.6400, 123.8500, 0.65], [10.2500, 123.8600, 0.8], [10.4500, 124.0000, 0.6],
  // Negros
  [10.6713, 122.9511, 0.6], [9.7000, 122.7500, 0.55], [10.0000, 122.8000, 0.5],
  // Iloilo / Panay
  [10.7202, 122.5621, 0.75], [10.9000, 122.4000, 0.65], [11.1748, 122.5764, 0.6],
  // Leyte / Samar
  [11.2440, 124.9999, 0.6], [10.8100, 124.8400, 0.55], [11.8000, 125.0000, 0.5],
  // Davao
  [7.1907, 125.4553, 0.9], [7.0000, 125.4000, 0.85], [7.3000, 125.7000, 0.7],
  [6.9214, 125.1700, 0.75], [7.5000, 125.3500, 0.6],
  // Cotabato / SOCCSKSARGEN
  [7.2000, 124.2300, 0.6], [6.8456, 124.2877, 0.55], [6.5500, 124.8200, 0.5],
  // Zamboanga
  [6.9214, 122.0790, 0.55], [7.5000, 122.3000, 0.5], [6.7000, 121.9800, 0.45],
  // Cagayan de Oro / Misamis
  [8.4542, 124.6319, 0.7], [8.2000, 124.5000, 0.65], [8.7000, 124.8000, 0.55],
  // General Santos
  [6.1164, 125.1716, 0.65], [6.2000, 125.3000, 0.55],
  // Agusan / Surigao (Caraga)
  [8.9500, 125.5300, 0.5], [9.7800, 125.4900, 0.45], [9.2000, 126.0000, 0.4],
  // Palawan
  [9.8349, 118.7384, 0.4], [11.1800, 119.3900, 0.35],
  // Mindoro
  [13.3200, 121.0700, 0.45], [12.5200, 121.0000, 0.4],
  // Bohol
  [9.6500, 124.0600, 0.6], [9.8700, 123.8500, 0.55],
];

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnDestroy {
  private auth = inject(AuthService);

  @ViewChild('mapContainer') mapRef!: ElementRef<HTMLDivElement>;
  private map: L.Map | undefined;

  readonly totalDetections = signal(PEST_POINTS.reduce((s, p) => s + Math.round(p[2] * 50), 0));
  readonly activeRegions = signal(12);
  readonly hotspot = signal('Metro Manila');

  constructor() {
    afterNextRender(() => this.initMap());
  }

  private initMap() {
    if (!this.mapRef?.nativeElement) return;

    this.map = L.map(this.mapRef.nativeElement, {
      center: [12.0, 122.5],
      zoom: 6,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);

    // leaflet.heat augments the L global at runtime; cast to access it
    (L as unknown as { heatLayer: (pts: unknown, opts: unknown) => L.Layer })
      .heatLayer(PEST_POINTS, {
        radius: 35,
        blur: 20,
        maxZoom: 12,
        minOpacity: 0.5,
        max: 1.0,
        gradient: { 0.2: '#d8f3dc', 0.45: '#74c69d', 0.7: '#40916c', 0.88: '#2d6a4f', 1.0: '#1b4332' },
      })
      .addTo(this.map);
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  logout() {
    this.auth.logout();
  }
}
