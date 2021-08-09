import { TestBed } from '@angular/core/testing';
import { CreateEditArticleFormConfigService } from './create-edit-article-form-config.service';

describe('CreateEditArticleFormConfigService', () => {
  let service: CreateEditArticleFormConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateEditArticleFormConfigService],
    });
    service = TestBed.inject(CreateEditArticleFormConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return fields for create/edit article form', () => {
    expect(JSON.stringify(service.getFormFields(''))).toEqual(
      JSON.stringify([
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'title col-12',
              key: 'title',
              type: 'input',
              templateOptions: {
                type: 'text',
                label: 'Title',
                required: true,
                minLength: 10,
                maxLength: 100,
              },
            },
            {
              className: 'body col-12',
              key: 'body',
              type: 'textarea',
              templateOptions: {
                rows: 10,
                label: 'Body',
                required: true,
                minLength: 10,
              },
            },
            {
              className: 'col-12',
              key: 'image',
              type: 'file',
              templateOptions: {
                label: 'Image',
                required: true,
                imageUrl: '',
              },
              validation: {
                show: true,
                messages: {
                  required: () => `Please select image`,
                },
              },
            },
          ],
        },
      ])
    );
  });
  it('should return fields for create article form', () => {
    expect(JSON.stringify(service.getFormButtons(true))).toEqual(
      JSON.stringify([
        {
          label: 'Cancel',
          type: 'button',
          classWrapper: 'col row no-gutters justify-content-end ',
          classNames: 'create-edit-article__cancel',
          action: { type: 'cancel' },
          style: {
            color: 'primary',
          },
        },
        {
          label: 'Create',
          type: 'submit',
          action: { type: 'submit' },
          classWrapper: 'col-auto',
          style: {
            color: 'accent',
            type: 'raised',
          },
        },
      ])
    );
  });
  it('should return fields for edit article form', () => {
    expect(JSON.stringify(service.getFormButtons(false, () => 'test'))).toEqual(
      JSON.stringify([
        {
          label: 'Remove',
          type: 'button',
          classWrapper: 'col row',
          classNames: 'create-edit-article__remove',
          style: {
            color: 'warn',
            type: 'stroked',
          },
          icon: {
            name: 'delete',
          },
          action: {
            handler: () => () => 'test',
          },
        },
        {
          label: 'Cancel',
          type: 'button',
          classWrapper: 'col row no-gutters justify-content-end ',
          classNames: 'create-edit-article__cancel',
          action: { type: 'cancel' },
          style: {
            color: 'primary',
          },
        },
        {
          label: 'Update',
          type: 'submit',
          action: { type: 'submit' },
          classWrapper: 'col-auto',
          style: {
            color: 'accent',
            type: 'raised',
          },
        },
      ])
    );
  });
});
