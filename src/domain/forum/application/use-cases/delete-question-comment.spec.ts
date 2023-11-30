import { InMemoryQuestionCommentsRepository } from "tests/repositories/in-memory-question-comments-repository";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { makeQuestionComment } from "tests/factories/make-question-comment";

let questionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;
describe("Delete Question Comment", () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(questionCommentsRepository);
  });

  it("should be able to delete a question comment by id", async () => {
    const questionComment = makeQuestionComment();

    await questionCommentsRepository.create(questionComment);

    await sut.execute({
      authorID: questionComment.authorID.toString(),
      questionCommentID: questionComment.id.toString(),
    });

    expect(questionCommentsRepository.questionComments).toHaveLength(0);
  });

  it("should not be able to delete a question comment if the user is not the author", async () => {
    const questionComment = makeQuestionComment();

    await questionCommentsRepository.create(questionComment);

    expect(() => {
      return sut.execute({
        authorID: "another-author-id",
        questionCommentID: questionComment.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
