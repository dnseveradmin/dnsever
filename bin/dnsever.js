#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");
const { program } = require("commander");
const dig = require("node-dig-dns");
const fs = require("fs");
const {
  getDNSRecord,
  addDNSRecord,
  updateDNSRecord,
  deleteDNSRecord,
} = require("../http/request.js");

const {
  updateInquirerConfig,
  createInquirerConfig,
} = require("../inquirer/setting.js");
const {
  dnsTypeValidated,
  domainValidated,
  txtValidated,
  seqValidated,
} = require("../utils/validate.js");
const {
  ROOT_PATH,
  ENV_PATH,
  VERSION,
  isConfig,
  createRootDir,
  createConfigWrite,
  createCustomConfig,
  deleteCustomConfigPath,
} = require("../utils/config.js");

const { print } = require("../utils/printf.js");

/**
 * @author Kyungseo.Park
 * @description DNSEver 클라이언트에 대한 설명
 */
program
  .version(VERSION)
  .description(
    chalk.blueBright(
      figlet.textSync("DNSEver Client", { horizontalLayout: "full" })
    ) +
      chalk.cyanBright("\n\tDNSEver API를 위한 Client Node CLI 입니다.") +
      chalk.greenBright(
        `\tFor Commands Run 주소를 통해 사용 방법을 확인할 수 있습니다.\n`
      ) +
      "For Example: \n" +
      "  - dnsever reset \n" +
      "  - dnsever config -u USER_ID -p USER_KEY \n" +
      "  - dnsever config-catch -f PATH \n" +
      "  - dnsever show -d DOMAIN -t DNS_TYPE \n" +
      "  - dnsever add -h DOMAIN_HOST -v VALUE -t DNS_TYPE \n" +
      "  - dnsever update -s SEQ_ID -v VALUE -t DNS_TYPE \n" +
      "  - dnsever delete -s SEQ_ID \n" +
      "  - dnsever dig -d DOMAIN -t DNS_TYPE"
  );

/**
 * @author Kyungseo.Park
 * @description 계정 정보에 대한 설정 파일을 초기화 함.
 */
program
  .command("reset")
  .description("직접 지정한 계정 정보의 경로를 초기화\n" + "=> dnsever reset")
  .action(() => {
    deleteCustomConfigPath(ENV_PATH);
  });

/**
 * @author Kyungseo.Park
 * @description 계정 정보에 대한 초기 설정
 */
program
  .command("config")
  .option("-u, --id <string>", "DNSEver ID")
  .option("-p, --pw <string>", "DNSEver DDNS KEY")
  .description(
    "DNSEver 환경변수(API 계정) 추가\n" +
      "=> dnsever config -u 아이디 -p 암호키"
  )
  .action((env) => {
    env.fromFile = ENV_PATH;
    if (!fs.existsSync(ROOT_PATH)) {
      // dnsever 폴더 생성
      createRootDir();
    }

    if (fs.existsSync(env.fromFile)) {
      console.log("이미 등록된 설정파일이 존재합니다.");
      updateInquirerConfig(env);
    } else if ((!env.id || !env.pw) === false) {
      console.log("ID, PW의 환경변수 데이터 중 모두 존재합니다.");
      createConfigWrite(env.id, env.pw);
    } else if ((!env.id && !env.pw) === false) {
      console.log("ID, PW의 환경변수 데이터 중 1개가 존재합니다.");
      createConfigWrite(env.id, env.pw);
    } else if ((!env.id && !env.pw) === true) {
      console.log("ID, PW의 환경변수 데이터 중 0개가 존재합니다.");
      createInquirerConfig(env);
    } else {
      console.log("등록되지 않은 예외가 발생 했습니다.");
    }
  });

/**
 * @author Kyungseo.Park
 * @description 계정 정보의 설정 파일 경로를 사용자가 설정 가능하도록 함.
 * @param env.fromFile 사용자가 생성한 File 경로
 */
program
  .command("config-catch")
  .requiredOption("-f, --from-file <path>", "설정 파일 등록")
  .description(
    "계정 정보가 담긴  파일을 JSON형식으로 업로드\n" +
      "=> dnsever config-catch -f ./kspark.link.json"
  )
  .action((env) => {
    // 파일이 존재하지 않음.
    if (!fs.existsSync(env.fromFile)) {
      console.log("File is not foind");
      process.exit(1);
    }

    // 파일 안의 내용 읽음.
    const readFile = JSON.parse(fs.readFileSync(env.fromFile, "utf-8"));
    if (!(readFile?.CLIENT_ID && readFile?.CLIENT_PW)) {
      console.log("The file cannot be read.");
      process.exit(1);
    }

    if (readFile?.CLIENT_ID && readFile?.CLIENT_PW && env.fromFile) {
      createCustomConfig(readFile);
    }
  });
/**
 * @author Kyungseo.Park
 * @description DNSEver DNS Record 조회 [기본 레코드 타입: TXT]
 */
program
  .command("show")
  .option("-f, --from-file <path>", "set config path", ENV_PATH)
  .option("-d, --domain <domain>", "show domain list", "")
  .option("-t, --type <type>", "select record type", "TXT", "TXT")
  .description(
    "DNSEver DNS Record 조회\n" + "=> dnsever show -d australia.wo.tc -t TXT"
  )
  .action(async (env) => {
    const getDomain = env.domain.trim();
    const getType = env.type.trim().toUpperCase();

    // 설정파일이 존재하지 않을 경우 Process 종료
    const getConfig = isConfig(env);
    if (!getConfig) {
      process.exit(1);
    }

    // 도메인 정규식 확인
    if (!domainValidated(getDomain)) {
      process.exit(1);
    }

    // DNS Record Type 검사
    if (!dnsTypeValidated(getType)) {
      process.exit(1);
    }

    // DNS 레코드 조회
    const dnsRecord = await getDNSRecord(
      getConfig.CLIENT_ID,
      getConfig.CLIENT_PW,
      getDomain,
      getType
    );

    // 결과 출력
    print(dnsRecord);
  });

/**
 * @author Kyungseo.Park
 * @description DNSEver DNS Record 추가 [기본 레코드 타입: TXT]
 */
program
  .command("add")
  .option("-f, --from-file <path>", "set config path", ENV_PATH)
  .option(
    "-t, --type <path>",
    'add DNS Record Type : "A", "AAAA", "CNAME", "MX", "TXT" (Default: TXT)',
    "TXT"
  )
  .requiredOption(
    "-h, --host <host>",
    "추가할 서브 도메인까지 모두 입력해주세요."
  )
  .requiredOption(
    "-v, --value <value>",
    "등록할 값을 입력해주세요. 공백이 있을 경우 싱글 쿼테이션(따옴표)으로 문자열을 감싸주셔야 합니다."
  )
  .description(
    "DNSEver DNS Record 추가\n" +
      "=> dnsever add -h subdomian.australia.wo.tc -v 'v=spf1 include:_spf.dnsever.com ~all'"
  )
  .action(async (env) => {
    const getHost = env.host.trim();
    const getValue = env.value.trim();
    const getType = env.type?.trim().toUpperCase();

    // 설정파일이 존재하지 않을 경우 Process 종료
    const getConfig = isConfig(env);
    if (!getConfig) {
      process.exit(1);
    }

    // 도메인 정규식 확인
    if (!domainValidated(getHost)) {
      process.exit(1);
    }

    // DNS Record Type 검사
    if (!dnsTypeValidated(getType)) {
      process.exit(1);
    }

    // TXT 레코드 Value 값 정규식 검사
    // TODO: DNS TYPE 에 따라 A, AAAA, CNAME, TXT 등 레코드별 타입을 나눠야 함.
    if (!txtValidated(getValue, getType)) {
      process.exit(1);
    }

    // DNS 레코드 데이터 추가(Add) 요청
    const dnsRecord = await addDNSRecord(
      getConfig.CLIENT_ID,
      getConfig.CLIENT_PW,
      getHost,
      getValue,
      getType
    );

    print(dnsRecord);
  });

/**
 * @author Kyungseo.Park
 * @description DNSEver DNS Record 업데이트 [기본 레코드 타입: TXT]
 */
program
  .command("update")
  .option("-f, --from-file <path>", "set config path", ENV_PATH)
  .option(
    "-t, --type <path>",
    'add DNS Record Type : "A", "AAAA", "CNAME", "MX", "TXT"',
    "TXT"
  )
  .requiredOption("-s, --seq <seq>", "SEQ 아이디 입력")
  .requiredOption("-v, --value <value>", "add value")
  .description(
    "DNSEver DNS Record 업데이트\n" +
      "=> dnsever update -s 46800275 -v 'v=spf1 include:_spf.dnsever.com ~all'"
  )
  .action(async (env) => {
    const getSeq = env.seq.trim();
    const getValue = env.value.trim();
    const getType = env.type?.trim().toUpperCase();

    // 설정파일이 존재하지 않을 경우 Process 종료
    const getConfig = isConfig(env);
    if (!getConfig) {
      process.exit(1);
    }

    // DNS Record Type 검사
    if (!dnsTypeValidated(getType)) {
      process.exit(1);
    }

    // TXT 레코드 Value 값 정규식 검사
    // TODO: DNS TYPE 에 따라 A, AAAA, CNAME, TXT 등 레코드별 타입을 나눠야 함.
    if (!txtValidated(getValue, getType)) {
      process.exit(1);
    }

    // DNSEver Seq값 정규식 검사
    if (!seqValidated(getSeq)) {
      process.exit(1);
    }

    // DNS 레코드 데이터 수정(Update) 요청
    const dnsRecord = await updateDNSRecord(
      getConfig.CLIENT_ID,
      getConfig.CLIENT_PW,
      getSeq,
      getValue,
      getType
    );

    // 결과 출력
    print(dnsRecord);
  });

/**
 * @author Kyungseo.Park
 * @description DNSEver DNS Record 삭제 [기본 레코드 타입: TXT]
 */
program
  .command("delete")
  .option("-f, --from-file <path>", "set config path", ENV_PATH)
  .requiredOption("-s, --seq <seq>", "SEQ 아이디 입력")
  .description("DNSEver DNS Record 삭제\n" + "=> dnsever delete -s 46800275")
  .action(async (env) => {
    const getSeq = env.seq.trim();

    // 설정파일이 존재하지 않을 경우 Process 종료
    const getConfig = isConfig(env);
    if (!getConfig) {
      process.exit(1);
    }

    // DNS 레코드 데이터 삭제(Delete) 요청
    const dnsRecord = await deleteDNSRecord(
      getConfig.CLIENT_ID,
      getConfig.CLIENT_PW,
      getSeq
    );

    // 결과 출력
    print(dnsRecord);
  });

/**
 * @author Kyungseo.Park
 * @description DNS 레코드 전파 확인
 */
program
  .command("dig")
  .requiredOption("-d, --domain <domain>", "show domain list")
  .option("-t, --type <type>", "select record type")
  .description("DNS 레코드 전파 확인\n" + "=> dnsever dig -d sydney.wo.tc -t a")
  .action(async (env) => {
    if (!env.domain) {
      console.log(
        "DNS 옵션을 확인해주세요. -d 옵션을 필수값이고, -t 옵션은 선택입니다."
      );
      console.log("dnsever -d 도메인 -t 레코드타입");
      process.exit(1);
    }

    dig([env.domain, env.type ? env.type : "ALL"])
      .then((result) => {
        console.log(
          "검색쿼리 : dig ",
          env.domain,
          " ",
          env.type ? env.type : "ALL\n"
        );
        console.log(result);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  });

program.parse(process.argv);
