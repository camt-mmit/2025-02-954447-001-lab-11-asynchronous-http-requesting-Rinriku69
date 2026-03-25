import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ContactInsertModel } from '../../helpers';

@Component({
  selector: 'app-people-field-tree',
  imports: [FormField],
  templateUrl: './people-field-tree.html',
  styleUrl: './people-field-tree.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleFieldTree {
  readonly fieldTree = input.required<FieldTree<ContactInsertModel>>();

  // --- Logic สำหรับจัดการ Array ของ Emails ---
  addEmail() {
    // เข้าถึง WritableSignal ของฟิลด์ emails โดยตรง
    const emailsSignal = this.fieldTree().emails().value;
    // นำค่าเดิมมาต่อด้วย Object ใหม่
    emailsSignal.set([...emailsSignal(), { type: '', value: '' }]);
  }

  removeEmail(index: number) {
    const emailsSignal = this.fieldTree().emails().value;
    // กรองเอาตัวที่ index ตรงกับที่กดลบออก
    emailsSignal.set(emailsSignal().filter((_, i) => i !== index));
  }

  // --- Logic สำหรับจัดการ Array ของ Phones ---
  addPhone() {
    const phonesSignal = this.fieldTree().phones().value;
    phonesSignal.set([...phonesSignal(), { type: '', value: '' }]);
  }

  removePhone(index: number) {
    const phonesSignal = this.fieldTree().phones().value;
    phonesSignal.set(phonesSignal().filter((_, i) => i !== index));
  }
}