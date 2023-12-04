import { InMemoryAnswerCommentsRepository } from "tests/repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "tests/factories/make-answer-comment";

let answerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;
describe("Delete Answer Comment", () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(answerCommentsRepository);
  });

  it("should be able to delete a answer comment by id", async () => {
    const answerComment = makeAnswerComment();

    await answerCommentsRepository.create(answerComment);

    await sut.execute({
      authorID: answerComment.authorID.toString(),
      answerCommentID: answerComment.id.toString(),
    });

    expect(answerCommentsRepository.answerComments).toHaveLength(0);
  });

  it("should not be able to delete a answer comment if the user is not the author", async () => {
    const answerComment = makeAnswerComment();

    await answerCommentsRepository.create(answerComment);

    expect(() => {
      return sut.execute({
        authorID: "another-author-id",
        answerCommentID: answerComment.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
