import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

export type CommentProps = {
  authorID: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
};

export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  get authorID(): UniqueEntityID {
    return this.props.authorID;
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

  private touch() {
    this.props.updatedAt = new Date();
  }
}
