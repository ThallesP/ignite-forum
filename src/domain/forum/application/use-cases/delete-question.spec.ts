import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { makeQuestion } from "tests/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let questionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(questionsRepository);
  });

  it("should be able to delete a question by slug", async () => {
    await questionsRepository.create(
      makeQuestion(
        {
          authorID: new UniqueEntityID("author-1"),
        },
        new UniqueEntityID("question-1")
      )
    );

    await sut.execute({
      questionId: "question-1",
      authorId: "author-1",
    });

    const questionExists = await questionsRepository.findById(
      new UniqueEntityID("question-1")
    );

    expect(questionExists).toBeNull();
  });

  it("should not be able to delete a question if the user is not the author", async () => {
    await questionsRepository.create(
      makeQuestion(
        {
          authorID: new UniqueEntityID("author-1"),
        },
        new UniqueEntityID("question-1")
      )
    );

    expect(() => {
      return sut.execute({
        questionId: "question-1",
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
