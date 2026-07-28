import { Component } from '@angular/core';
import { PredictionService } from '../services/prediction.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent {
  selectedFile: File | null = null;
  result: string = '';
  confidence: string = '';
  fileSelected: boolean = false; // Nouvelle propriété pour suivre l'état

  constructor(private predictionService: PredictionService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.fileSelected = !!this.selectedFile; // Mettre à jour l'état
  }

  onPredict(): void {
    if (this.selectedFile) {
      this.predictionService.predict(this.selectedFile).subscribe(
        res => {
          this.result = res.result;
          this.confidence = res.confidence;
        },
        err => {
          this.result = 'Erreur lors de la prédiction';
        }
      );
    }
  }
}