import { AnswersRepository } from "../repositories/answers-repository";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

export type CommentOnAnswerUseCaseInput = {
  authorID: string;
  answerID: string;
  content: string;
};

export type CommentOnAnswerUseCaseOutput = {
  answerComment: AnswerComment;
};

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerComments: AnswerCommentsRepository
  ) {}

  async execute({
    authorID,
    content,
    answerID,
  }: CommentOnAnswerUseCaseInput): Promise<CommentOnAnswerUseCaseOutput> {
    const answerExists = await this.answersRepository.findById(
      new UniqueEntityID(answerID)
    );

    if (!answerExists) {
      throw new Error("Answer does not exist");
    }

    const answerComment = AnswerComment.create({
      authorID: new UniqueEntityID(authorID),
      content,
      answerID: new UniqueEntityID(answerID),
    });

    await this.answerComments.create(answerComment);

    return { answerComment };
  }
}
