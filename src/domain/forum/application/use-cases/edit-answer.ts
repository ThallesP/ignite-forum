import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

export type EditAnswerUseCaseInput = {
  authorId: string;
  content: string;
  answerId: string;
};

export type EditAnswerUseCaseOutput = {
  answer: Answer;
};

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseInput): Promise<EditAnswerUseCaseOutput> {
    const answer = await this.answersRepository.findById(
      new UniqueEntityID(answerId)
    );

    if (!answer) {
      throw new Error("Answer not found");
    }

    if (!answer.authorID.equals(new UniqueEntityID(authorId))) {
      throw new Error("You are not the author of this answer");
    }

    answer.content = content;

    await this.answersRepository.save(answer);

    return {
      answer,
    };
  }
}
