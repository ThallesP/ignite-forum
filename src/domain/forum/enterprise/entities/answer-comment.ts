import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export type AnswerCommentProps = {
  authorID: UniqueEntityID;
  answerID: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class AnswerComment extends Entity<AnswerCommentProps> {
  get authorID(): UniqueEntityID {
    return this.props.authorID;
  }

  get content(): string {
    return this.props.content;
  }

  get answerID(): UniqueEntityID {
    return this.props.answerID;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
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
