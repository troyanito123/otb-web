import { AuthEffect } from './auth.effect';
import { UsersEffect } from './users.effect';
import { UserEffect } from './user.effect';
import { RolesEffect } from './roles.effect';
import { MonthlyPaymentsEffect } from './monthly-payments.effect';

export const EffectsArray: any[] = [
  AuthEffect,
  UsersEffect,
  UserEffect,
  RolesEffect,
  MonthlyPaymentsEffect,
];
