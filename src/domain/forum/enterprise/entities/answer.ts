import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export type AnswerProps = {
  authorID: UniqueEntityID;
  questionID: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class Answer extends Entity<AnswerProps> {
  get authorID(): UniqueEntityID {
    return this.props.authorID;
  }

  get questionID(): UniqueEntityID {
    return this.props.questionID;
  }

  get content(): string {
    return this.props.content;
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

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<AnswerProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    return new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }
}
