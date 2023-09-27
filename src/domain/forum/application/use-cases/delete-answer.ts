import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";

export type DeleteAnswerUseCaseInput = {
  authorId: string;
  answerId: string;
};

export type DeleteAnswerUseCaseOutput = {};

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseInput): Promise<DeleteAnswerUseCaseOutput> {
    const answer = await this.answersRepository.findById(
      new UniqueEntityID(answerId)
    );

    if (!answer) {
      throw new Error("Answer not found");
    }

    if (!answer.authorID.equals(new UniqueEntityID(authorId))) {
      throw new Error("You are not the author of this answer");
    }

    await this.answersRepository.delete(answer);

    return {};
  }
}
