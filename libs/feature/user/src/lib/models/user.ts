export class User {
  id: number;
  firstName: string;
  profileName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  leadOnTeams: string[];
  memberOnTeams: string[];
  admin: boolean;
  approved: boolean;
}

export interface UserStoreState {
  usersState: User[];
  userState: User;
}

export const ROLES = [
  'front-end',
  'back-end',
  'quality-assurance',
  'UI',
  'UX'
]
