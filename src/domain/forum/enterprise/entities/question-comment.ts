import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export type QuestionCommentProps = {
  authorID: UniqueEntityID;
  questionID: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class QuestionComment extends Entity<QuestionCommentProps> {
  get authorID(): UniqueEntityID {
    return this.props.authorID;
  }

  get content(): string {
    return this.props.content;
  }

  get questionID(): UniqueEntityID {
    return this.props.questionID;
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
