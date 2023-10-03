import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

export type ListRecentQuestionsUseCaseInput = {
  page: number;
};

export type ListRecentQuestionsUseCaseOutput = {
  questions: Question[];
};

export class ListRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseInput): Promise<ListRecentQuestionsUseCaseOutput> {
    const questions = await this.questionsRepository.findManyRecent({ page });

    return { questions };
  }
}
