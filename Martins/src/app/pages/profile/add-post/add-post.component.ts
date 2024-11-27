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
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UtilsService } from '../../../services/utils.service';
import { PostService } from '../../../services/post.service';
import { ICreateHosting } from '../../../interfaces/posts/hosting.';
import { ICreateEvent } from '../../../interfaces/posts/event.';
import { ICreateFeeding } from '../../../interfaces/posts/feeding.';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostComponent {
  @Input() postType: 'hosting' | 'event' | 'feeding' = 'hosting';

  hostForm: FormGroup;
  feedForm: FormGroup;
  eventForm: FormGroup;
  isModalOpen = false;
  isSubmitting = false;

  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly utils: UtilsService,
    private readonly postService: PostService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.hostForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.utils.noWhitespaceValidator,
        ],
      ],
      location: [
        '',
        [
          Validators.required,
          Validators.maxLength(150),
          this.utils.noWhitespaceValidator,
        ],
      ],
      whatsApp: ['', [Validators.maxLength(11), Validators.minLength(11)]],
      instagram: ['', [Validators.maxLength(150)]],
      description: ['', [Validators.maxLength(250)]],
      bedrooms: ['', Validators.pattern('^[0-9]*$')],
      bathroom: ['', Validators.pattern('^[0-9]*$')],
      vacancy: ['', Validators.pattern('^[0-9]*$')],
      serviceArea: [false],
      kitchen: [false],
      garden: [false],
    });

    this.feedForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.utils.noWhitespaceValidator,
        ],
      ],
      location: [
        '',
        [
          Validators.required,
          Validators.maxLength(150),
          this.utils.noWhitespaceValidator,
        ],
      ],
      whatsApp: ['', [Validators.maxLength(11), Validators.minLength(11)]],
      instagram: ['', [Validators.maxLength(150)]],
      description: ['', [Validators.maxLength(250)]],
      type: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.utils.noWhitespaceValidator,
        ],
      ],
      wifi: [false],
      delivery: [false],
      parking: [false],
    });

    this.eventForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.utils.noWhitespaceValidator,
        ],
      ],
      location: [
        '',
        [
          Validators.required,
          Validators.maxLength(150),
          this.utils.noWhitespaceValidator,
        ],
      ],
      whatsApp: ['', [Validators.maxLength(11), Validators.minLength(11)]],
      instagram: ['', [Validators.maxLength(150)]],
      description: ['', [Validators.maxLength(250)]],
      eventDate: ['', [Validators.required]],
      eventLocation: [
        '',
        [
          Validators.required,
          Validators.maxLength(150),
          this.utils.noWhitespaceValidator,
        ],
      ],
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.cdr.detectChanges();
  }

  onModalClick(event: MouseEvent | KeyboardEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }

  onSubmit() {
    this.createError(this.postType[0].toUpperCase() as 'E' | 'F' | 'H', false);

    let title;
    let location;
    let type;
    let whatsApp;

    if (this.postType === 'hosting') {
      title = this.hostForm.get('title')!;
      location = this.hostForm.get('location')!;
      whatsApp = this.hostForm.get('whatsApp');
    } else if (this.postType === 'event') {
      title = this.eventForm.get('title')!;
      location = this.eventForm.get('location')!;
      whatsApp = this.eventForm.get('whatsApp');
    } else {
      title = this.feedForm.get('title')!;
      location = this.feedForm.get('location')!;
      whatsApp = this.feedForm.get('whatsApp');
      type = this.feedForm.get('type')!;
    }

    this.validateFields(title, location, type, whatsApp);

    if (
      title.invalid ||
      location.invalid ||
      (whatsApp?.value &&
        whatsApp?.value.toString().trim().length > 0 &&
        whatsApp?.value.toString().trim().length != 11) ||
      (this.postType === 'feeding' && type?.invalid)
    ) {
      console.error('Formulário contém erros de validação.');
      this.isSubmitting = false;
      this.submitButton.nativeElement.style.cursor = 'pointer';
      return;
    }

    const post = this.createPostObject();

    console.log('post object', post);

    this.isSubmitting = true;
    this.submitButton.nativeElement.style.cursor = 'wait';

    this.postService.addPost(post, this.postType).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitButton.nativeElement.style.cursor = 'pointer';
        this.closeModal();
      },
      error: (error) => {
        if (error.conflict)
          console.error({ status: error.status }, error.message);
        else console.error('Post registration failed');

        this.createError(
          this.postType[0].toUpperCase() as 'E' | 'F' | 'H',
          true
        );

        this.isSubmitting = false;
        this.submitButton.nativeElement.style.cursor = 'pointer';
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private validateFields(title: any, location: any, type: any, whatsApp?: any) {
    if (
      title.value === null ||
      title.invalid ||
      title.value.trim().length === 0
    )
      this.invalidField('title', true);
    else this.invalidField('title', false);

    if (
      location.value === null ||
      location.invalid ||
      location.value.trim().length === 0
    )
      this.invalidField('location', true);
    else this.invalidField('location', false);

    if (
      whatsApp.value &&
      ((whatsApp.value.toString().trim().length > 0 &&
        whatsApp.value.toString().trim().length != 11) ||
        whatsApp.value === null ||
        whatsApp.invalid)
    )
      this.invalidField('whatsApp', true);
    else this.invalidField('whatsApp', false);

    if (this.postType === 'feeding' && type) {
      if (type.value === null || type.invalid || type.value.trim().length === 0)
        this.invalidField('type', true);
      else this.invalidField('type', false);
    }
  }

  private createPostObject(): ICreateHosting | ICreateEvent | ICreateFeeding {
    switch (this.postType) {
      case 'hosting':
        return {
          title: this.hostForm.get('title')!.value,
          location: this.hostForm.get('location')!.value,
          phone: this.hostForm.get('whatsApp')!.value.toString(),
          instagram: this.hostForm.get('instagram')!.value,
          description: this.hostForm.get('description')!.value,
          bedrooms: this.hostForm.get('bedrooms')!.value || 0,
          bathroom: this.hostForm.get('bathroom')!.value || 0,
          vacancy: this.hostForm.get('vacancy')!.value || 0,
          serviceArea: this.hostForm.get('serviceArea')!.value,
          kitchen: this.hostForm.get('kitchen')!.value,
          garden: this.hostForm.get('garden')!.value,
        };
      case 'event':
        return {
          title: this.eventForm.get('title')!.value,
          location: this.eventForm.get('location')!.value,
          phone: this.eventForm.get('whatsApp')!.value.toString(),
          instagram: this.eventForm.get('instagram')!.value,
          description: this.eventForm.get('description')!.value,
          eventDate: this.eventForm.get('eventDate')!.value,
          eventLocation: this.eventForm.get('eventLocation')!.value,
        };
      case 'feeding':
        return {
          title: this.feedForm.get('title')!.value,
          location: this.feedForm.get('location')!.value,
          phone: this.feedForm.get('whatsApp')!.value.toString(),
          instagram: this.feedForm.get('instagram')!.value,
          description: this.feedForm.get('description')!.value,
          type: this.feedForm.get('type')!.value,
          wifi: this.feedForm.get('wifi')!.value,
          delivery: this.feedForm.get('delivery')!.value,
          parking: this.feedForm.get('parking')!.value,
        };
    }
  }

  private invalidField(field: string, bool: boolean) {
    const invalidSpan = document.getElementById(
      `invalid${this.postType}${field.toLowerCase()}`
    )!;

    invalidSpan.style.display = bool ? 'block' : 'none';
  }

  private createError(type: 'E' | 'F' | 'H', bool: boolean) {
    const error = document.getElementById(`createError${type}`)!;

    error.style.display = bool ? 'block' : 'none';
  }
}
