import { InMemoryAnswerCommentsRepository } from "tests/repositories/in-memory-answer-comments-repository";
import { makeAnswerComment } from "tests/factories/make-answer-comment";
import { ListAnswerCommentsUseCase } from "./list-answer-comments";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let answerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: ListAnswerCommentsUseCase;

describe("List Answer Comments", () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new ListAnswerCommentsUseCase(answerCommentsRepository);
  });

  it("should be able to list answer comments", async () => {
    const [secondAnswerComment, firstAnswerComment, thirdAnswerComment] = [
      makeAnswerComment({
        createdAt: new Date("2023-1-1"),
        answerID: new UniqueEntityID("1"),
      }),
      makeAnswerComment({
        createdAt: new Date("2024-1-1"),
        answerID: new UniqueEntityID("1"),
      }),
      makeAnswerComment({
        createdAt: new Date("2022-1-1"),
        answerID: new UniqueEntityID("2"),
      }),
    ];
    await answerCommentsRepository.create(secondAnswerComment);
    await answerCommentsRepository.create(firstAnswerComment);
    await answerCommentsRepository.create(thirdAnswerComment);

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: "1",
    });

    expect(answerComments.length).toEqual(2);
    expect(answerComments).toEqual([secondAnswerComment, firstAnswerComment]);
  });

  it("should be able to list paginated recent answer comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await answerCommentsRepository.create(
        makeAnswerComment({ answerID: new UniqueEntityID("1") })
      );
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: "1",
    });

    expect(answerComments).toHaveLength(2);
  });
});
