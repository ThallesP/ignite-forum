import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

export type ListQuestionCommentsUseCaseInput = {
  page: number;
  questionId: string;
};

export type ListQuestionCommentsUseCaseOutput = {
  questionComments: QuestionComment[];
};

export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: ListQuestionCommentsUseCaseInput): Promise<ListQuestionCommentsUseCaseOutput> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(
        new UniqueEntityID(questionId),
        {
          page,
        }
      );

    return { questionComments };
  }
}
