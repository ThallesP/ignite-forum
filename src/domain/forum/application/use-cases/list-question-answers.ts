import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

export type ListQuestionAnswersUseCaseInput = {
  page: number;
  questionId: string;
};

export type ListQuestionAnswersUseCaseOutput = {
  answers: Answer[];
};

export class ListQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: ListQuestionAnswersUseCaseInput): Promise<ListQuestionAnswersUseCaseOutput> {
    const answers = await this.answersRepository.findManyByQuestionId(
      new UniqueEntityID(questionId),
      {
        page,
      }
    );

    return { answers };
  }
}
