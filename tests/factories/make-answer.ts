import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import { faker } from "@faker-js/faker";

export function makeAnswer(
  override?: Partial<AnswerProps>,
  id?: UniqueEntityID
) {
  return Answer.create(
    {
      questionID: new UniqueEntityID(),
      content: faker.lorem.text(),
      authorID: new UniqueEntityID(),
      ...override,
    },
    id
  );
}
