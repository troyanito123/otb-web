import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { User } from 'src/app/models/user.model'
import { Role } from 'src/app/models/role.model'
import { BLOCKS } from 'src/app/utils/gobal-data'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form!: FormGroup

  @Input() user: User | null = null
  @Input() roles!: Role[]
  @Output() onSubmit = new EventEmitter<any>()
  public blocks = BLOCKS

  get isEditing() {
    return !!this.user
  }

  status = ['ACTIVE', 'INACTIVE', 'DELETE']

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm()
  }

  public save() {
    if (this.form.invalid) return
    this.onSubmit.emit({ ...this.form.value, id: this.user?.id })
  }

  private createForm() {
    this.form = this.fb.group({
      name: [this.user ? this.user.name : '', [Validators.required, Validators.minLength(3)]],

      email: [this.user ? this.user.email : ''],
      password: [],
      block_number: [this.user ? this.user.block_number : this.blocks[0], [Validators.required]],
      address_number: [this.user ? this.user.address_number : '', [Validators.required]],
      role: [
        this.user ? this.roles?.find((r) => r.code === this.user?.role)?.id : this.roles[0]?.id,
        [Validators.required],
      ],
      status: [this.user ? this.user.status : this.status[0], [Validators.required]],
    })
  }
}
