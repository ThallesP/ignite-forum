import { InMemoryQuestionCommentsRepository } from "tests/repositories/in-memory-question-comments-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { makeQuestion } from "tests/factories/make-question";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CommentOnQuestionUseCase;
describe("Comment on Question", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository
    );
  });

  it("should be able to comment on question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);
    await sut.execute({
      authorID: question.authorID.toString(),
      content: "any_content",
      questionID: question.id.toString(),
    });

    expect(
      inMemoryQuestionCommentsRepository.questionComments[0].content
    ).toEqual("any_content");
  });

  it("should not be able to comment on question if question does not exist", async () => {
    const question = makeQuestion();

    await expect(
      sut.execute({
        authorID: question.authorID.toString(),
        content: "any_content",
        questionID: question.id.toString(),
      })
    ).rejects.toThrow("Question does not exist");
  });
});
