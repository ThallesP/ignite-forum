import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, CommentProps } from "./comment";

export type AnswerCommentProps = {
  answerID: UniqueEntityID;
} & CommentProps;

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerID(): UniqueEntityID {
    return this.props.answerID;
  }

  static create(
    props: Optional<AnswerCommentProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    return new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }
}
