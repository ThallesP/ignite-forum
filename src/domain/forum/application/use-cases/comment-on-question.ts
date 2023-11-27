import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

export type CommentOnQuestionUseCaseInput = {
  authorID: string;
  questionID: string;
  content: string;
};

export type CommentOnQuestionUseCaseOutput = {
  questionComment: QuestionComment;
};

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionComments: QuestionCommentsRepository
  ) {}

  async execute({
    authorID,
    content,
    questionID,
  }: CommentOnQuestionUseCaseInput): Promise<CommentOnQuestionUseCaseOutput> {
    const questionExists = await this.questionsRepository.findById(
      new UniqueEntityID(questionID)
    );

    if (!questionExists) {
      throw new Error("Question does not exist");
    }

    const questionComment = QuestionComment.create({
      authorID: new UniqueEntityID(authorID),
      content,
      questionID: new UniqueEntityID(questionID),
    });

    await this.questionComments.create(questionComment);

    return { questionComment };
  }
}
