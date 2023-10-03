import { InMemoryAnswersRepository } from "tests/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeQuestion } from "tests/factories/make-question";
import { makeAnswer } from "tests/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let answersRepository: InMemoryAnswersRepository;
let questionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;
describe("Choose Question Best Answer", () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository();
    questionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      questionsRepository,
      answersRepository
    );
  });

  it("should be able to choose question best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionID: question.id,
    });

    await questionsRepository.create(question);
    await answersRepository.create(answer);

    await sut.execute({
      answerID: answer.id.toString(),
      authorID: question.authorID.toString(),
    });

    const bestQuestion = await questionsRepository.findById(question.id);

    expect(bestQuestion?.bestAnswerId).toEqual(answer.id);
  });

  it("should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorID: new UniqueEntityID("another-user-id"),
    });
    const answer = makeAnswer({
      questionID: question.id,
    });

    await questionsRepository.create(question);
    await answersRepository.create(answer);

    await expect(async () => {
      await sut.execute({
        answerID: answer.id.toString(),
        authorID: "user-id",
      });
    }).rejects.toThrow();
  });
});
