import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { makeAnswer } from "tests/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let answersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(answersRepository);
  });

  it("should be able to edit a answer by slug", async () => {
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
      content: "new content",
      authorId: "author-1",
    });

    const answerExists = await answersRepository.findById(
      new UniqueEntityID("answer-1")
    );

    expect(answerExists).toMatchObject({
      content: "new content",
    });
  });

  it("should not be able to edit a answer if the user is not the author", async () => {
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
        content: "new content",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
