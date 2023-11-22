import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { makeAnswer } from "tests/factories/make-answer";
import { ListQuestionAnswersUseCase } from "./list-question-answers";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let answersRepository: InMemoryAnswersRepository;
let sut: ListQuestionAnswersUseCase;

describe("List Question Answers", () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository();
    sut = new ListQuestionAnswersUseCase(answersRepository);
  });

  it("should be able to question answers", async () => {
    const [secondAnswer, firstAnswer, thirdAnswer] = [
      makeAnswer({
        createdAt: new Date("2023-1-1"),
        questionID: new UniqueEntityID("1"),
      }),
      makeAnswer({
        createdAt: new Date("2024-1-1"),
        questionID: new UniqueEntityID("1"),
      }),
      makeAnswer({
        createdAt: new Date("2022-1-1"),
        questionID: new UniqueEntityID("2"),
      }),
    ];
    await answersRepository.create(secondAnswer);
    await answersRepository.create(firstAnswer);
    await answersRepository.create(thirdAnswer);

    const { answers } = await sut.execute({ page: 1, questionId: "1" });

    expect(answers.length).toEqual(2);
    expect(answers).toEqual([secondAnswer, firstAnswer]);
  });

  it("should be able to list paginated recent answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await answersRepository.create(
        makeAnswer({ questionID: new UniqueEntityID("1") })
      );
    }

    const { answers } = await sut.execute({ page: 2, questionId: "1" });

    expect(answers).toHaveLength(2);
  });
});
