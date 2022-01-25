import inquirer from "inquirer";
import Rx from "rxjs/Rx.js";

/**
 * @description 요청을 처리함.
 * @param {Array} question
 * @param {Array} answers
 */
export default (question, answers, env) => {
  const prompts = new Rx.Subject();
  if (question.length !== answers.length) {
    console.error("Process Not Match");
  }

  const questionList = question.map((item, index) => {
    return () => {
      prompts.next(
        Object.assign({}, item, {
          name: String(index),
        })
      );
    };
  });

  inquirer.prompt(prompts).ui.process.subscribe(
    async (res) => {
      const index = Number(res.name);
      answers[index](res, questionList, prompts);

      if (index === answers.length - 1) {
        prompts.complete();
      }
    },
    async (error) => {
      console.error(error);
    }
  );

  questionList[0]();
};
