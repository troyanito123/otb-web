import { User } from './user.interface';

export interface ExtraContribution {
  id: number;
  name: string;
  description: string;
  amount: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
  extra_contributions_paid?: ExtraContributionPaid[];
}

export interface ExtraContributionPaid {
  id: number;
  amount: number;
  date: Date;
  user: Pick<User, 'id' | 'name'>;
  createdAt: Date;
  updatedAt: Date;
  extra_contribution?: ExtraContribution;
}

export interface ExtraContributionData {
  name: string;
  description: string;
  amount: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface ExtraContributionPayMade extends ExtraContribution {
  amount_paid: number;
  date_paid: Date;
}
