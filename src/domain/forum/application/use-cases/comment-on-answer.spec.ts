import { InMemoryAnswerCommentsRepository } from "tests/repositories/in-memory-answer-comments-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { makeAnswer } from "tests/factories/make-answer";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: CommentOnAnswerUseCase;
describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);
    await sut.execute({
      authorID: answer.authorID.toString(),
      content: "any_content",
      answerID: answer.id.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.answerComments[0].content).toEqual(
      "any_content"
    );
  });

  it("should not be able to comment on answer if answer does not exist", async () => {
    const answer = makeAnswer();

    await expect(
      sut.execute({
        authorID: answer.authorID.toString(),
        content: "any_content",
        answerID: answer.id.toString(),
      })
    ).rejects.toThrow("Answer does not exist");
  });
});
