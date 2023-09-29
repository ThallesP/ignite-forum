import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";

export type EditQuestionUseCaseInput = {
  authorId: string;
  title: string;
  content: string;
  questionId: string;
};

export type EditQuestionUseCaseOutput = {
  question: Question;
};

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseInput): Promise<EditQuestionUseCaseOutput> {
    const question = await this.questionsRepository.findById(
      new UniqueEntityID(questionId)
    );

    if (!question) {
      throw new Error("Question not found");
    }

    if (!question.authorID.equals(new UniqueEntityID(authorId))) {
      throw new Error("You are not the author of this question");
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return {
      question,
    };
  }
}
