import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UiFormButton } from '@shared';

@Injectable()
export class CreateEditArticleFormConfigService {
  public getFormButtons(
    isNew: boolean,
    removeArticleFn?: () => void
  ): UiFormButton[] {
    const formButtons: UiFormButton[] = [
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
        label: isNew ? 'Create' : 'Update',
        type: 'submit',
        action: { type: 'submit' },
        classWrapper: 'col-auto',
        style: {
          color: 'accent',
          type: 'raised',
        },
      },
    ];

    const deleteButton: UiFormButton = {
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
        handler: () => removeArticleFn(),
      },
    };
    return isNew ? formButtons : [deleteButton, ...formButtons];
  }

  public getFormFields(imageUrl = ''): FormlyFieldConfig[] {
    return [
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
              required: !imageUrl,
              imageUrl,
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
    ];
  }
}
