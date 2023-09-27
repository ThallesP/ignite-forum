import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionsRepository } from "../repositories/questions-repository";

export type DeleteQuestionUseCaseInput = {
  authorId: string;
  questionId: string;
};

export type DeleteQuestionUseCaseOutput = {};

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseInput): Promise<DeleteQuestionUseCaseOutput> {
    const question = await this.questionsRepository.findById(
      new UniqueEntityID(questionId)
    );

    if (!question) {
      throw new Error("Question not found");
    }

    if (!question.authorID.equals(new UniqueEntityID(authorId))) {
      throw new Error("You are not the author of this question");
    }

    await this.questionsRepository.delete(question);

    return {};
  }
}
