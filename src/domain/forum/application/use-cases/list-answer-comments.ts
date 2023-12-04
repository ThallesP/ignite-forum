import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

export type ListAnswerCommentsUseCaseInput = {
  page: number;
  answerId: string;
};

export type ListAnswerCommentsUseCaseOutput = {
  answerComments: AnswerComment[];
};

export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: ListAnswerCommentsUseCaseInput): Promise<ListAnswerCommentsUseCaseOutput> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(
        new UniqueEntityID(answerId),
        {
          page,
        }
      );

    return { answerComments };
  }
}
