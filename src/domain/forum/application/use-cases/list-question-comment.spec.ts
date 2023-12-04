import { InMemoryQuestionCommentsRepository } from "tests/repositories/in-memory-question-comments-repository";
import { makeQuestionComment } from "tests/factories/make-question-comment";
import { ListQuestionCommentsUseCase } from "./list-question-comments";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let questionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: ListQuestionCommentsUseCase;

describe("List Question Comments", () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository();
    sut = new ListQuestionCommentsUseCase(questionCommentsRepository);
  });

  it("should be able to list question comments", async () => {
    const [secondQuestionComment, firstQuestionComment, thirdQuestionComment] =
      [
        makeQuestionComment({
          createdAt: new Date("2023-1-1"),
          questionID: new UniqueEntityID("1"),
        }),
        makeQuestionComment({
          createdAt: new Date("2024-1-1"),
          questionID: new UniqueEntityID("1"),
        }),
        makeQuestionComment({
          createdAt: new Date("2022-1-1"),
          questionID: new UniqueEntityID("2"),
        }),
      ];
    await questionCommentsRepository.create(secondQuestionComment);
    await questionCommentsRepository.create(firstQuestionComment);
    await questionCommentsRepository.create(thirdQuestionComment);

    const { questionComments } = await sut.execute({
      page: 1,
      questionId: "1",
    });

    expect(questionComments.length).toEqual(2);
    expect(questionComments).toEqual([
      secondQuestionComment,
      firstQuestionComment,
    ]);
  });

  it("should be able to list paginated recent question comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await questionCommentsRepository.create(
        makeQuestionComment({ questionID: new UniqueEntityID("1") })
      );
    }

    const { questionComments } = await sut.execute({
      page: 2,
      questionId: "1",
    });

    expect(questionComments).toHaveLength(2);
  });
});
