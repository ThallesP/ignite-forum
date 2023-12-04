import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { PaginationParams } from "@/core/repositories/pagination-params";

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
  findById(id: UniqueEntityID): Promise<QuestionComment | null>;
  findManyByQuestionId(
    questionId: UniqueEntityID,
    params: PaginationParams
  ): Promise<QuestionComment[]>;
  delete(questionComment: QuestionComment): Promise<void>;
}
