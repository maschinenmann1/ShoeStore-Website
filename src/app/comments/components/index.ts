import { from } from "rxjs";
import { CommentComponent } from "./comment";
import { CommentListComponent } from "./comment-list";
import { SendCommentComponent } from "./send-comment";
import { StarsComponent } from "./stars";
import { ManageCommentComponent } from './manage-comment';

const COMMENTS = [ CommentComponent, CommentListComponent, SendCommentComponent, StarsComponent, ManageCommentComponent ];

export { COMMENTS, CommentListComponent, StarsComponent, ManageCommentComponent };