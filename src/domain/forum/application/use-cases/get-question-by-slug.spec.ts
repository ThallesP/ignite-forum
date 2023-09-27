import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { makeQuestion } from "tests/factories/make-question";

let questionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(questionsRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("slug"),
    });

    await questionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "slug",
    });

    expect(question.id).toEqual(newQuestion.id);
  });
});
