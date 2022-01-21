<<<<<<< HEAD
import { ScrumboardAttachment } from './scrumboard-attachment.interface';
import { DateTime } from 'luxon';
import { ScrumboardComment } from './scrumboard-comment.interface';
import { ScrumboardUser } from './scrumboard-user.interface';
import { ScrumboardLabel } from './scrumboard-label.interface';

export interface ScrumboardCard {
  id: number;
  title: string;
  description?: string;
  dueDate?: {
    date: DateTime;
    done: boolean;
  };
  comments?: ScrumboardComment[];
  attachments?: ScrumboardAttachment[];
  users?: ScrumboardUser[];
  labels?: ScrumboardLabel[];
  cover?: ScrumboardAttachment;
}
=======
import { ScrumboardAttachment } from './scrumboard-attachment.interface';
import { DateTime } from 'luxon';
import { ScrumboardComment } from './scrumboard-comment.interface';
import { ScrumboardUser } from './scrumboard-user.interface';
import { ScrumboardLabel } from './scrumboard-label.interface';

export interface ScrumboardCard {
  id: number;
  title: string;
  description?: string;
  dueDate?: {
    date: DateTime;
    done: boolean;
  };
  comments?: ScrumboardComment[];
  attachments?: ScrumboardAttachment[];
  users?: ScrumboardUser[];
  labels?: ScrumboardLabel[];
  cover?: ScrumboardAttachment;
}
>>>>>>> 98d0c17... feat: push base  code to repository
