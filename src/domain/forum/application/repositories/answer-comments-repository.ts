import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>;
  findById(id: UniqueEntityID): Promise<AnswerComment | null>;
  delete(answerComment: AnswerComment): Promise<void>;
}
