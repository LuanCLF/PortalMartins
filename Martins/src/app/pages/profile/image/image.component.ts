import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ICreateImage } from '../../../interfaces/posts/post.';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <button
      type="button"
      class="open-modal-btn customBtn btnAct"
      (click)="openModal()"
    >
      Add img
    </button>

    <div
      class="modal"
      [class.show]="isModalOpen"
      (click)="onModalClick($event)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              Escolha uma imagem para adicionar ao post
            </h3>
            <button type="button" class="close-btn" (click)="closeModal()">
              ×
            </button>
          </div>
          <div class="modal-body">
            <form [formGroup]="imageForm" (ngSubmit)="onSubmit()">
              <div>
                <label for="imageInputAdd">Escolha um arquivo .jpg/.png</label>
                <input
                  type="file"
                  id="imageInputAdd"
                  (change)="onFileChange($event)"
                />
              </div>
              <span class="messageErrorOff" [id]="getErrorId()"
                >O upload falhou, tente novamente</span
              >
              <div class="modal-footer">
                <button
                  class="customBtn btnAct"
                  type="submit"
                  #submitImageBtn
                  [disabled]="isSubmitImage"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './image.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  @Input() id: string = '';
  @Input() category: string = '';
  isModalOpen = false;
  imageForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitImage = false;

  @ViewChild('submitImageBtn') submitImageBtn!: ElementRef<HTMLButtonElement>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly postService: PostService
  ) {
    this.imageForm = this.fb.group({
      image: ['', Validators.required],
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    this.addImage();
  }

  addImage() {
    this.isSubmitImage = true;
    this.submitImageBtn.nativeElement.style.cursor = 'wait';

    const uploadImage: ICreateImage = {
      file: this.selectedFile!,
      id: this.id,
    };

    this.imageError(false);

    if (this.selectedFile) {
      this.postService.addImagePost(uploadImage).subscribe({
        next: (response) => {
          this.isSubmitImage = false;
          this.submitImageBtn.nativeElement.style.cursor = 'pointer';
          this.closeModal();
        },
        error: (error) => {
          this.imageError(true);

          this.isSubmitImage = false;
          this.submitImageBtn.nativeElement.style.cursor = 'pointer';
        },
      });
    } else {
      this.isSubmitImage = false;
      this.submitImageBtn.nativeElement.style.cursor = 'pointer';
      this.closeModal();
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.cdr.detectChanges();
  }

  onModalClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }

  getErrorId(): string {
    return `error${this.category}Image`;
  }

  private imageError(bool: boolean) {
    const invalidSpan = document.getElementById(`error${this.category}Image`)!;
    bool
      ? invalidSpan.classList.add('messageErrorOn')
      : invalidSpan.classList.remove('messageErrorOn');
  }
}
