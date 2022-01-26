# DNSEver API Client <img src="https://img.shields.io/github/package-json/v/dnsever/dnsever-client" alt="Latest Stable Version">

## Doto List

- DNSEver github 계정 받기
- npmjs 계정 받기
  - package.json 업데이트 필요

## 로컬 설치 방법

```
$ git clone git@git.opengen.com:kyungseo.park/dnsever-api-client.git
$ cd dnsever-api-client.git
$ npm i
$ sudo npm link
$ dnsever
```

2. npm 설치

```bash
$ npm install -g dnsever
$ dnsever
```

## 현재 사용 가능한 DNS 레코드 타입

```
A, AAAA, CNAME, MX, TXT
```

## 사용자 지정 파일(etc)

본 README 에는 kspark.link.json 으로 등록 되어있습니다.

```json
{
  "CLIENT_ID": "UserID",
  "CLIENT_PW": "USerPW"
}
```

## API-ENDPOINT 설정

API_ENDPOINT = `./http/request.js`  
DNSEver 소속인 경우에만(개발 DB접근 가능) API_ENDPOINT 변경 가치가 있음.  
Public Repo인 만큼 config.js 파일을 별도로 만들 필요가 없어 보임.

## 실행

```bash
Usage: dnsever [options] [command]

  ____    _   _   ____    _____                            ____   _   _                  _
 |  _ \  | \ | | / ___|  | ____| __   __   ___   _ __     / ___| | | (_)   ___   _ __   | |_
 | | | | |  \| | \___ \  |  _|   \ \ / /  / _ \ | '__|   | |     | | | |  / _ \ | '_ \  | __|
 | |_| | | |\  |  ___) | | |___   \ V /  |  __/ | |      | |___  | | | | |  __/ | | | | | |_
 |____/  |_| \_| |____/  |_____|   \_/    \___| |_|       \____| |_| |_|  \___| |_| |_|  \__|

	DNSEver API를 위한 Client Node CLI 입니다.	For Commands Run 주소를 통해 사용 방법을 확인할 수 있습니다.
For Example:
  - dnsever config-catch -f PATH
  - dnsever reset
  - dnsever config -u USER_ID -p USER_KEY
  - dnsever show -d DOMAIN -t DNS_TYPE
  - dnsever add -h DOMAIN_HOST -v VALUE -t DNS_TYPE
  - dnsever update -s SEQ_ID -v VALUE -t DNS_TYPE
  - dnsever delete -s SEQ_ID
  - dnsever dig -d DOMAIN -t DNS_TYPE

Options:
  -V, --version           output the version number
  -h, --help              display help for command

Commands:
  reset                   직접 지정한 계정 정보의 경로를 초기화
                          => dnsever reset
  config [options]        DNSEver 환경변수(API 계정) 추가
                          => dnsever config -u qkrrudtj19 -p 5bd0nsfl1r
  config-catch [options]  계정 정보가 담긴  파일을 JSON형식으로 업로드 함
                          => dnsever config-catch -f ./kspark.link.json
  show [options]          DNSEver DNS Record 조회
                          => dnsever show -d australia.wo.tc -t TXT
  add [options]           DNSEver DNS Record 추가
                          => dnsever add -h subdomian.australia.wo.tc -v 'v=spf1 include:_spf.dnsever.com ~all'
  update [options]        DNSEver DNS Record 업데이트
                          => dnsever update -s 46800275 -v 'v=spf1 include:_spf.dnsever.com ~all'
  delete [options]        DNSEver DNS Record 삭제
                          => dnsever delete -s 46800275
  dig [options]           DNS 레코드 전파 확인
                          => dnsever dig -d sydney.wo.tc -t a
  help [command]          display help for command

```

# 사용 방법

## 계정 등록 (사용자 파일 지정 옵션)

DNSEver Clinet 로그인을 위한 설정 파일을 추가 Command 옵션[config-catch]] 이다.

- dnsever config-catch -f ./kspark.link.json

## 계정 삭제

DNSEver Clinet에 사용자가 설정한 설정 파일를 초기화하는 Command 옵션[reset] 이다.

- dnsever reset

## 계정 등록

DNSEver Clinet의 계정을 등록하는 Command 옵션[config] 이다.

- dnsever config -u USER_ID -p DDNS_KEY
- dnsever config -u USER_ID
- dnsever config -p DDNS_KEY
- dnsever config

## 레코드 조회(Show)

DNSEver에 등록된 DNS 레코드를 조회하는 Command 옵션[show] 이다.

- dnsever show -d DOMAIN -t DNS_TYPE
- dnsever show -d DOMAIN (기본값 TXT)
- dnsever show -t DNS_TYPE
- dnsever show

## 레코드 추가(Add)

DNSEver에 DNS 레코드를 추가하는 Command 옵션[add] 이다.

- dnsever add -h DOMAIN_HOST -v VALUE -t DNS_TYPE
- dnsever add -h DOMAIN_HOST -v VALUE (기본값 TXT)

## 레코드 수정(Update)

DNSEver에 등록된 DNS 레코드를 수정하는 Command 옵션[update] 이다.

- dnsever update -s SEQ_ID -v VALUE -t DNS_TYPE
- dnsever update -s SEQ_ID -v VALUE (기본값 TXT)

## 레코드 삭제(Delete)

DNSEver에 등록된 DNS 레코드를 수정하는 Command 옵션[Delete] 이다.

- dnsever delete -s SEQ_ID

## 레코드 전파 확인

레코드 전파를 확인하는 Command 옵션[dig] 이다.

- dnsever dig -d DOMAIN -t DNS_TYPE
- dnsever dig -d DOMAIN

# Example

```bash
$ dnsever
Usage: dnsever [options] [command]

  ____    _   _   ____    _____                            ____   _   _                  _
 |  _ \  | \ | | / ___|  | ____| __   __   ___   _ __     / ___| | | (_)   ___   _ __   | |_
 | | | | |  \| | \___ \  |  _|   \ \ / /  / _ \ | '__|   | |     | | | |  / _ \ | '_ \  | __|
 | |_| | | |\  |  ___) | | |___   \ V /  |  __/ | |      | |___  | | | | |  __/ | | | | | |_
 |____/  |_| \_| |____/  |_____|   \_/    \___| |_|       \____| |_| |_|  \___| |_| |_|  \__|

	DNSEver API를 위한 Client Node CLI 입니다.	For Commands Run 주소를 통해 사용 방법을 확인할 수 있습니다.
For Example:
  - dnsever reset
  - dnsever config -u USER_ID -p USER_KEY
  - dnsever config-catch -f PATH
  - dnsever show -d DOMAIN -t DNS_TYPE
  - dnsever add -h DOMAIN_HOST -v VALUE -t DNS_TYPE
  - dnsever update -s SEQ_ID -v VALUE -t DNS_TYPE
  - dnsever delete -s SEQ_ID
  - dnsever dig -d DOMAIN -t DNS_TYPE

Options:
  -V, --version           output the version number
  -h, --help              display help for command

Commands:
  reset                   직접 지정한 계정 정보의 경로를 초기화
                          => dnsever reset
  config [options]        DNSEver 환경변수(API 계정) 추가
                          => dnsever config -u qkrrudtj19 -p 5bd0nsfl1r
  config-catch [options]  계정 정보가 담긴  파일을 JSON형식으로 업로드 함
                          => dnsever config-catch -f ./kspark.link.json
  show [options]          DNSEver DNS Record 조회
                          => dnsever show -d australia.wo.tc -t TXT
  add [options]           DNSEver DNS Record 추가
                          => dnsever add -h subdomian.australia.wo.tc -v 'v=spf1 include:_spf.dnsever.com ~all'
  update [options]        DNSEver DNS Record 업데이트
                          => dnsever update -s 46800275 -v 'v=spf1 include:_spf.dnsever.com ~all'
  delete [options]        DNSEver DNS Record 삭제
                          => dnsever delete -s 46800275
  dig [options]           DNS 레코드 전파 확인
                          => dnsever dig -d sydney.wo.tc -t a
  help [command]          display help for command

```

```bash
$ dnsever config-catch -f ./kspark.link.json
Done.
```

```bash
$ dnsever reset
It's reset.
```

```bash
$ dnsever config -u qkrrudtj19 -p 5bd0nsfl1r
이미 등록된 설정파일이 존재합니다.
? 환경변수 설정 파일을 새로 만드시겠습니까? :  Yes
? DNSEver 아이디를 입력해주세요. :  qkrrudtj19
? DNSEver DDNS Key를 입력해주세요. :  [hidden]
Done.
```

```bash
$ dnsever show -d australia.wo.tc -t TXT
╔══════════════════════════════╤══════════╤══════╤══════════════
║ name                         │ id       │ type │ value                                │ zone            │ host         ║
║ aa.australia.wo.tc           │ 46800228 │ TXT  │ this-is-new-data                     │ australia.wo.tc │ aa           ║
║ aa.australia.wo.tc           │ 46800261 │ TXT  │ 22222                                │ australia.wo.tc │ aa           ║
║ aa.australia.wo.tc           │ 46800262 │ TXT  │ 33333                                │ australia.wo.tc │ aa           ║
║ aa.australia.wo.tc           │ 46800263 │ TXT  │ 44444                                │ australia.wo.tc │ aa           ║
║ australia.wo.tc              │ 46800227 │ TXT  │ CNAME.australia.wo.tc                │ australia.wo.tc │ @            ║
║ qweqweqweqwe.australia.wo.tc │ 46800265 │ TXT  │ aaaaaaaaaaaaaaaaaaaa                 │ australia.wo.tc │ qweqweqweqwe ║
║ subdomian.australia.wo.tc    │ 46800286 │ TXT  │ v=spf1 include:_spf.dnsever.com ~all │ australia.wo.tc │ subdomian    ║
║ subdomian.australia.wo.tc    │ 46800293 │ TXT  │ v=spf1 include:_spf.dnsever.com ~all │ australia.wo.tc │ subdomian    ║
║ subdomian.australia.wo.tc    │ 46800294 │ TXT  │ v=spf1 include:_spf.dnsever.com ~all │ australia.wo.tc │ subdomian    ║
║ subdomian.australia.wo.tc    │ 46800297 │ TXT  │ v=spf1 include:_spf.dnsever.com ~all │ australia.wo.tc │ subdomian    ║
║ subdomian.australia.wo.tc    │ 46800298 │ TXT  │ v=spf1 include:_spf.dnsever.com ~all │ australia.wo.tc │ subdomian    ║
║ subdomian.australia.wo.tc    │ 46800299 │ TXT  │ v=spf1 include:_spf.dnsever.com ~all │ australia.wo.tc │ subdomian    ║
║ subdomian.australia.wo.tc    │ 46800300 │ TXT  │ v=spf1 include:_spf.dnsever.com ~all │ australia.wo.tc │ subdomian    ║
║ subdomian.australia.wo.tc    │ 46800301 │ TXT  │ 127.0.0.1                            │ australia.wo.tc │ subdomian    ║
║ subdomian.australia.wo.tc    │ 46800302 │ TXT  │ 127.0.0.1                            │ australia.wo.tc │ subdomian    ║
║ subdomian.australia.wo.tc    │ 46800303 │ TXT  │ 127.0.0.1                            │ australia.wo.tc │ subdomian    ║
║ subdomian.australia.wo.tc    │ 46800304 │ TXT  │ 127.0.0.1                            │ australia.wo.tc │ subdomian    ║
║ subdomian.australia.wo.tc    │ 46800305 │ TXT  │ 127.0.0.1                            │ australia.wo.tc │ subdomian    ║
╚══════════════════════════════╧══════════╧══════╧══════════════
```

```bash
$ dnsever add -h subdomian.australia.wo.tc -v 'v=spf1 include:_spf.dnsever.com ~all'
╔═══════════════════════════╤══════════╤═════
║ name                      │ id       │ value     │ type │ zone │ host            ║
║ subdomian.australia.wo.tc │ 46800307 │ subdomian │      │ TXT  │ australia.wo.tc ║
╚═══════════════════════════╧══════════╧═════
```

```bash
% dnsever update -s 46800307 -v '12321asd'
╔═══════════════════════════╤══════════╤════════════════════════════
║ name                      │ id       │ old_value                            │ new_value │ type │ zone            │ host      ║
║ subdomian.australia.wo.tc │ 46800307 │ v=spf1 include:_spf.dnsever.com ~all │ 12321asd  │ TXT  │ australia.wo.tc │ subdomian ║
╚═══════════════════════════╧══════════╧═══════════════════════════
```

```
$ dnsever delete -s 46800307
╔═══════════════════════════╤══════════╤═══════
║ name                      │ id       │ value     │ type     │ zone │ host            ║
║ subdomian.australia.wo.tc │ 46800307 │ subdomian │ 12321asd │ TXT  │ australia.wo.tc ║
╚═══════════════════════════╧══════════╧═══════
```

```bash
$ dnsever dig -d australia.wo.tc
검색쿼리 : dig  australia.wo.tc   ALL

{
  header: [
    [ '; <<>> DiG 9.16.1-Ubuntu <<>> australia.wo.tc ALL' ],
    [ ';; global options: +cmd' ],
    [ ';; Got answer:' ],
    [ ';; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 17197' ],
    [
      ';; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1'
    ]
  ],
  question: [ [ ';australia.wo.tc.', 'IN', 'A' ], [ ';ALL.', 'IN', 'A' ] ],
  answer: [
    {
      domain: 'australia.wo.tc.',
      type: 'A',
      ttl: '600',
      class: 'IN',
      value: '121.166.69.131'
    }
  ],
  time: 0,
  server: '127.0.0.53#53(127.0.0.53)',
  datetime: '금  1월 21 15:36:39 KST 2022',
  size: 32
}

```
