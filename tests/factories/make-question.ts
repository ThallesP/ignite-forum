import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { faker } from "@faker-js/faker";

export function makeQuestion(
  override?: Partial<QuestionProps>,
  id?: UniqueEntityID
) {
  const title = faker.lorem.sentence();
  return Question.create(
    {
      authorID: new UniqueEntityID(),
      title,
      content: faker.lorem.text(),
      slug: Slug.create(title),
      ...override,
    },
    id
  );
}
