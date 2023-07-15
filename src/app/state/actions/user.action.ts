import { createAction, props } from '@ngrx/store'
import { User } from 'src/app/models/user.model'

const loadUser = createAction('[USER] load', props<{ id: number }>())

const create = createAction(
  '[USER] create',
  props<{
    name: string
    block_number: string
    address_number: string
    forwadSupplier: (id: number) => string
    messageSupplier: (name: string) => string
  }>()
)

const update = createAction(
  '[USER] update',
  props<{
    id: number
    name: string
    block_number: string
    address_number: string
    status: string
    role: string
    forwadSupplier: (id: number) => string
    messageSupplier: (name: string) => string
    email?: string
    password?: string
  }>()
)

const remove = createAction(
  '[USER] remove user',
  props<{ id: number; forward: string; messageSupplier: (name: string) => string }>()
)

const loadSuccess = createAction('[USER] load success', props<{ user: User }>())
const modifySuccess = createAction('[USER] modify success', props<{ user: User }>())
const setError = createAction('[USER] set error', props<{ e: any }>())
const cleanUser = createAction('[USER] clean') 

export const UserActions = {
  loadUser,
  create,
  update,
  remove,
  loadSuccess,
  modifySuccess,
  setError,
  cleanUser,
}
