import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type DeleteQuestionCommentUseCaseInput = {
  authorID: string;
  questionCommentID: string;
};

export type DeleteQuestionCommentUseCaseOutput = void;

export class DeleteQuestionCommentUseCase {
  constructor(private questionComments: QuestionCommentsRepository) {}

  async execute({
    authorID,
    questionCommentID,
  }: DeleteQuestionCommentUseCaseInput): Promise<DeleteQuestionCommentUseCaseOutput> {
    const questionComment = await this.questionComments.findById(
      new UniqueEntityID(questionCommentID)
    );

    if (!questionComment) {
      throw new Error("Question comment does not exist");
    }

    if (questionComment.authorID.toString() !== authorID) {
      throw new Error("You can only delete your own question comments");
    }

    await this.questionComments.delete(questionComment);
  }
}
