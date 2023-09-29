import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { makeQuestion } from "tests/factories/make-question";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let questionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(questionsRepository);
  });

  it("should be able to edit a question by slug", async () => {
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
      content: "new content",
      title: "new title",
      authorId: "author-1",
    });

    const questionExists = await questionsRepository.findById(
      new UniqueEntityID("question-1")
    );

    expect(questionExists).toMatchObject({
      content: "new content",
      title: "new title",
    });
  });

  it("should not be able to edit a question if the user is not the author", async () => {
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
        content: "new content",
        title: "new title",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
