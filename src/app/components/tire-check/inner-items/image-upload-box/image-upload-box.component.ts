import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'image-upload-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload-box.component.html',
  styleUrl: './image-upload-box.component.scss',
})
export class ImageUploadBoxComponent {
  @Input() position: string = '';
  @Input() imageState: string = '';
  @Output() imageStateChange: EventEmitter<string> = new EventEmitter<string>();

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.readFile(file);
    }
  }

  onFileSelect(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file = element.files?.[0];
    if (file) {
      this.readFile(file);
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.imageState = reader.result;
        this.imageStateChange.emit(this.imageState);
      }
    };
    reader.readAsDataURL(file);
  }

  removeImage(event: MouseEvent) {
    event.stopPropagation();
    this.imageState = '';
    this.imageStateChange.emit(this.imageState);
  }
}
