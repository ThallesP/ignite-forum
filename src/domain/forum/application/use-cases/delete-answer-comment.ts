import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type DeleteAnswerCommentUseCaseInput = {
  authorID: string;
  answerCommentID: string;
};

export type DeleteAnswerCommentUseCaseOutput = void;

export class DeleteAnswerCommentUseCase {
  constructor(private answerComments: AnswerCommentsRepository) {}

  async execute({
    authorID,
    answerCommentID,
  }: DeleteAnswerCommentUseCaseInput): Promise<DeleteAnswerCommentUseCaseOutput> {
    const answerComment = await this.answerComments.findById(
      new UniqueEntityID(answerCommentID)
    );

    if (!answerComment) {
      throw new Error("Answer comment does not exist");
    }

    if (answerComment.authorID.toString() !== authorID) {
      throw new Error("You can only delete your own answer comments");
    }

    await this.answerComments.delete(answerComment);
  }
}
