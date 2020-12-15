import { User } from '@selise-start/user';

export class Memo {
  description: string;
  assignedTo: User;
  constructor() {
    this.description = undefined;
    this.assignedTo = new User();
  }
}
