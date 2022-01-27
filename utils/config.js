const fs = require("fs");
const path = require("path");
const os = require("os");
const { version } = require("../package.json");

/** @description DNSEver 설정 파일이 저장되는 디렉토리 */
const ROOT_PATH = path.resolve(os.homedir(), ".dnsever");

/** @description 기본 설정 파일 */
const ENV_PATH = path.resolve(ROOT_PATH, "config.json");

/** @description package.json 파일 내용 */
const VERSION = version;

/**
 * @author Kyungseo.Park
 * @description 사용자가 임의로 등록한 파일의 PATH를 삭제함.
 * @returns {void}
 */
const deleteCustomConfigPath = () => {
  const config = JSON.parse(fs.readFileSync(ENV_PATH, "utf-8"));
  config.CLIENT_ID = "";
  config.CLIENT_PW = "";
  fs.writeFileSync(ENV_PATH, JSON.stringify(config));
  console.log("It's reset.");
};

/**
 * @author Kyungseo.Park
 * @description DNSEVer Clinet 디렉토리 생성
 * @param {string} root_path
 * @param {string} client_id
 * @param {string} client_pw
 * @returns {void}
 */
const createRootDir = () => {
  if (!fs.existsSync(ROOT_PATH)) {
    fs.mkdirSync(ROOT_PATH);
  }
  return 1;
};

/**
 * @author Kyungseo.Park
 * @description config.json 생성
 * @param {string?} client_id
 * @param {string?} client_pw
 * @returns {void}
 */
const createConfig = (client_id = "", client_pw = "") => {
  const config_json = JSON.stringify({
    CLIENT_ID: `${client_id}`,
    CLIENT_PW: `${client_pw}`,
  });
  fs.writeFileSync(ENV_PATH, config_json);

  return config_json;
};

/**
 * @author Kyungseo.Park
 * @description DNSEVer Config 설정파일 존재 여부 확인 및 계정 정보확인
 * @param {object} env
 * @returns {boolean}
 */
const isConfig = (env) => {
  // config 파일의 존재 여부 확인
  if (!fs.existsSync(env.fromFile)) {
    notFoundConfigFile(null, null, env);
  }

  // 계정이 잘 등록 되어있는지 확인
  const newConfig = JSON.parse(fs.readFileSync(env.fromFile, "utf-8"));
  if (!newConfig?.CLIENT_ID && !newConfig?.CLIENT_PW) {
    notFoundConfigFile(newConfig?.CLIENT_ID, newConfig?.CLIENT_PW);
  }

  return newConfig;
};

/**
 * @author Kyungseo-Park
 * @description 프로세스 종료함
 * @returns {void}
 */
const notFoundConfigFile = (CLIENT_ID = null, CLIENT_PW = null) => {
  console.log(
    "\n\tdnsever config 또는 config-catch 명령 으로 환경변수를 추가 하시거나 직접 추가해 주세요."
  );
  console.log("\n\t1. dnsever config -u DNSEver_ID -p DNSEver_DDNS_KEY");
  console.log("\t2. dnsever config-catch -f ./kspark.link.json\n");

  if (!CLIENT_ID) {
    console.log("CLIENT ID가 없습니다.");
  }

  if (!CLIENT_PW) {
    console.log("CLIENT PW가 없습니다.");
  }

  process.exit(1);
};

/**
 * @author Kyungseo.Park
 * @description config 파일이 존재하지 않고, id, pw를 옵션으로 받았을 경우, config 파일을 생성함
 * @param {string} id
 * @param {string} pw
 * @returns {void}
 */
const createConfigWrite = (id, pw) => {
  createConfig(id, pw);
};

/**
 * @author Kyungseo.Park
 * @description 사용자가 임의로 계정 정보를 저장하게 함
 * @param {string} path 사용자가 임의로 지정한 파일 경로
 * @param {string} env 사용자가 입력한 환경 변수 정보(아이디, Key)
 * @returns {void}
 */
const createCustomConfig = (env) => {
  createRootDir();
  createConfig(env.CLIENT_ID, env.CLIENT_PW);
  console.log("SUCCESS.");
};

exports.ROOT_PATH = ROOT_PATH;
exports.ENV_PATH = ENV_PATH;
exports.VERSION = VERSION;
exports.deleteCustomConfigPath = deleteCustomConfigPath;
exports.createRootDir = createRootDir;
exports.createConfig = createConfig;
exports.isConfig = isConfig;
exports.notFoundConfigFile = notFoundConfigFile;
exports.createConfigWrite = createConfigWrite;
exports.createCustomConfig = createCustomConfig;
