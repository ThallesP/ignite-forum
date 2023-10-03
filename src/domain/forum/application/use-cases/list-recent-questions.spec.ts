import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { makeQuestion } from "tests/factories/make-question";
import { ListRecentQuestionsUseCase } from "./list-recent-questions";

let questionsRepository: InMemoryQuestionsRepository;
let sut: ListRecentQuestionsUseCase;

describe("List Recent Questions", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository();
    sut = new ListRecentQuestionsUseCase(questionsRepository);
  });

  it("should be able to list recent questions", async () => {
    const [secondQuestion, firstQuestion, thirdQuestion] = [
      makeQuestion({ createdAt: new Date("2023-1-1") }),
      makeQuestion({ createdAt: new Date("2024-1-1") }),
      makeQuestion({ createdAt: new Date("2022-1-1") }),
    ];
    await questionsRepository.create(secondQuestion);
    await questionsRepository.create(firstQuestion);
    await questionsRepository.create(thirdQuestion);

    const { questions } = await sut.execute({ page: 1 });

    expect(questions.length).toEqual(3);
    expect(questions).toEqual([firstQuestion, secondQuestion, thirdQuestion]);
  });

  it("should be able to list paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await questionsRepository.create(makeQuestion());
    }

    const { questions } = await sut.execute({ page: 2 });

    expect(questions).toHaveLength(2);
  });
});
