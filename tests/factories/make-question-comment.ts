import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  QuestionComment,
  QuestionCommentProps,
} from "@/domain/forum/enterprise/entities/question-comment";
import { faker } from "@faker-js/faker";

export function makeQuestionComment(
  override?: Partial<QuestionCommentProps>,
  id?: UniqueEntityID
) {
  return QuestionComment.create(
    {
      authorID: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionID: new UniqueEntityID(),
      ...override,
    },
    id
  );
}
