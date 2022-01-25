import fs from "fs";
import inquirer from "./index.js";
import { createRootDir, createConfig, ENV_PATH } from "../utils/config.js";

/**
 * @author Kyungseo.Park
 * @description 계정 정보가 담긴 config.json 파일을 생성
 * @param {object} env 사용자 아이디, 비밀번호
 * @returns {void}
 */
export const updateInquirerConfig = (env) => {
  const questionList = [
    {
      type: "confirm",
      name: "create",
      message: "환경변수 설정 파일을 새로 만드시겠습니까? : ",
      default: true,
    },
    {
      type: "input",
      name: "id",
      message: "DNSEver 아이디를 입력해주세요. : ",
      default: env?.id,
      validate: function (input) {
        if (!input) {
          console.log("\n아이디를 입력해주세요.\n");
          return false;
        }
        return true;
      },
    },
    {
      type: "password",
      name: "pw",
      message: "DNSEver DDNS Key를 입력해주세요. : ",
      default: env?.pw,
      validate: function (input) {
        if (!input) {
          console.log("\nDDNS Key를 입력해주세요.\n");
          return false;
        }
        return true;
      },
    },
  ];

  const answerList = [
    // 질문 1
    async (result, questions) => {
      if (result.answer) {
        createRootDir();
        questions[1]();
      } else {
        // 프로세스 종료
        process.exit(1);
      }
    },
    // 질문 2 | [결과] result.answer
    async (result, questions) => {
      const configFile = fs.readFileSync(ENV_PATH, "utf-8");
      createConfig(result.answer, configFile.CLIENT_PW);
      questions[2]();
    },
    // 질문 3 | [결과] result.answer
    async (result, questions) => {
      const configFile = JSON.parse(fs.readFileSync(ENV_PATH, "utf-8"));
      if (result.answer) {
        createConfig(configFile.CLIENT_ID, result.answer);
      } else if (!result.answer) {
        createConfig(configFile.CLIENT_ID, "");
      }
      console.log("Done.");
    },
  ];

  inquirer(questionList, answerList, env);
};

/**
 * @author Kyungseo.Park
 * @description config 파일이 존재하지 않고, QA를 통해 생성
 * @param {{
 *    config: string,
 *    id: string,
 *    pw: string,
 * }} env
 * @returns {void}
 */
export const createInquirerConfig = (env) => {
  const questionList = [
    {
      type: "input",
      name: "id",
      message: "DNSEver 아이디를 입력해주세요. : ",
      default: env?.id,
      validate: function (input) {
        const done = this.async();
        if (!input) {
          done("입력해주셔아힙니다.");
          return;
        }
        done(null, true);
      },
    },
    {
      type: "password",
      name: "pw",
      message: "DNSEver DDNS Key를 입력해주세요. : ",
      default: env?.pw,
    },
  ];

  const answerList = [
    // 질문 1 | DNSEver 아이디를 입력해주세요.
    async (result, questions) => {
      createConfig(result.answer, "");
      questions[1]();
    },
    // 질문 2 | DNSEver DDNS Key를 입력해주세요.
    async (result, questions) => {
      const configFile = JSON.parse(fs.readFileSync(ENV_PATH, "utf-8"));
      if (result.answer) {
        createConfig(configFile?.CLIENT_ID, result.answer);
      } else if (!result.answer) {
        createConfig(configFile?.CLIENT_ID, "");
      }
      console.log("Done.");
    },
  ];

  inquirer(questionList, answerList, env);
};
