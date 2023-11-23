import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, CommentProps } from "./comment";

export type QuestionCommentProps = {
  questionID: UniqueEntityID;
} & CommentProps;

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionID(): UniqueEntityID {
    return this.props.questionID;
  }

  static create(
    props: Optional<QuestionCommentProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    return new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }
}
