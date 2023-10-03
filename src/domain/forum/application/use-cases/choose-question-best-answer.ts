import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";

export type ChooseQuestionBestAnswerUseCaseInput = {
  answerID: string;
  authorID: string;
};
export type ChooseQuestionBestAnswerUseCaseOutput = {
  question: Question;
};

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    answerID,
    authorID,
  }: ChooseQuestionBestAnswerUseCaseInput): Promise<ChooseQuestionBestAnswerUseCaseOutput> {
    const answer = await this.answersRepository.findById(
      new UniqueEntityID(answerID)
    );

    if (!answer) throw new Error("Answer not found");

    const question = await this.questionsRepository.findById(answer.questionID);

    if (!question) throw new Error("Question not found");

    if (!question.authorID.equals(new UniqueEntityID(authorID)))
      throw new Error("Only the author can choose the best answer");

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return { question };
  }
}
