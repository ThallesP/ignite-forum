import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { makeAnswer } from "tests/factories/make-answer";
import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let answersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(answersRepository);
  });

  it("should be able to delete a answer by slug", async () => {
    await answersRepository.create(
      makeAnswer(
        {
          authorID: new UniqueEntityID("author-1"),
        },
        new UniqueEntityID("answer-1")
      )
    );

    await sut.execute({
      answerId: "answer-1",
      authorId: "author-1",
    });

    const answerExists = await answersRepository.findById(
      new UniqueEntityID("answer-1")
    );

    expect(answerExists).toBeNull();
  });

  it("should not be able to delete a answer if the user is not the author", async () => {
    await answersRepository.create(
      makeAnswer(
        {
          authorID: new UniqueEntityID("author-1"),
        },
        new UniqueEntityID("answer-1")
      )
    );

    expect(() => {
      return sut.execute({
        answerId: "answer-1",
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
