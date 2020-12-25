import { User } from '@selise-start/user';

export class Memo {
  id: string
  description: string;
  assignedTo: User[];
  constructor() {
    this.id = undefined;
    this.description = undefined;
    this.assignedTo = [];
  }
}
