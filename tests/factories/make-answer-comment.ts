import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  AnswerComment,
  AnswerCommentProps,
} from "@/domain/forum/enterprise/entities/answer-comment";
import { faker } from "@faker-js/faker";

export function makeAnswerComment(
  override?: Partial<AnswerCommentProps>,
  id?: UniqueEntityID
) {
  return AnswerComment.create(
    {
      authorID: new UniqueEntityID(),
      content: faker.lorem.text(),
      answerID: new UniqueEntityID(),
      ...override,
    },
    id
  );
}
