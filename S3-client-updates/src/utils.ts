import { Report } from "./models";
import { PasswordReport, SubmissionResult } from "./models/darknet";

const dataString = `
{"balance":292,"entries":[{"id":"some-id","email":"user@example.com","ip_address":"","username":"","password":"","hashed_password":"xxx","name":"","vin":"","address":"","phone":"","database_name":"LinkedIn"},{"id":"some-id","email":"user@example.com","ip_address":"","username":"","password":"some-password","hashed_password":"","name":"","vin":"","address":"","phone":"","database_name":"BreachCompilation"},{"id":"some-id","email":"user@example.com","ip_address":"","username":"some-username","password":"","hashed_password":"some-password-hash","name":"","vin":"","address":"","phone":"","database_name":"MySpace"},{"id":"some-id","email":"user@example.com","ip_address":"44.333.222.111","username":"","password":"","hashed_password":"","name":"SOME NAME","vin":"","address":"1000 Main St, Boston, MA, 01293","phone":"5555555555","database_name":"Acxiom (2020)"},{"id":"some-id","email":"user@example.com","ip_address":"","username":"","password":"","hashed_password":"some-password-hash","name":"","vin":"","address":"","phone":"","database_name":"Adobe"},{"id":"some-id","email":"user@example.com","ip_address":"","username":"","password":"some-password","hashed_password":"","name":"","vin":"","address":"","phone":"","database_name":"Collections"}],"success":true,"took":"55µs","total":6}
`;

export const getReport = (): Report => {
  const result = JSON.parse(dataString);
  return result;
}

export const getReportEmail = (report: Report): string | null => {
  const emails = report.entries.map(entry => entry.email);
  return emails[0] || null;
}

export const getTestDarknetResults = (): {
  passwordReport: PasswordReport,
  rawResults: Record<string, SubmissionResult | null>;
} => {
  const rawResults = {
    email: {report: getReport()},
    username: {report: getReport()},
    phone: {report: getReport()},
  }
  return {
    passwordReport: {},
    rawResults,
  }
}

export const getTestResult = () => {
  return {
    "1.2.3.4": {
        "value": "1.2.3.4",
        "analysis": {
            "attributes": {
                "whois": "inetnum: 1.2.3.0 - 1.2.3.255\nnetname: Debogon-prefix\ndescr: APNIC Debogon Project\ndescr: APNIC Pty Ltd\ncountry: AU\norg: ORG-RQA1-AP\nadmin-c: AR302-AP\ntech-c: AR302-AP\nabuse-c: AA1412-AP\nstatus: ASSIGNED PORTABLE\nmnt-by: APNIC-HM\nmnt-routes: MAINT-AU-APNIC-GM85-AP\nmnt-irt: IRT-APNICRANDNET-AU\nlast-modified: 2020-11-25T06:34:44Z\nsource: APNIC\nirt: IRT-APNICRANDNET-AU\naddress: PO Box 3646\naddress: South Brisbane, QLD 4101\naddress: Australia\ne-mail: helpdesk@apnic.net\nabuse-mailbox: helpdesk@apnic.net\nadmin-c: AR302-AP\ntech-c: AR302-AP\nauth: # Filtered\nremarks: helpdesk@apnic.net was validated on 2021-02-09\nmnt-by: MAINT-AU-APNIC-GM85-AP\nlast-modified: 2021-03-09T01:10:21Z\nsource: APNIC\norganisation: ORG-RQA1-AP\norg-name: Resource Quality Assurance\ncountry: AU\naddress: 6 Cordelia Street, South Brisbane\ne-mail: research@apnic.net\nmnt-ref: APNIC-HM\nmnt-by: APNIC-HM\nlast-modified: 2020-11-25T05:35:30Z\nsource: APNIC\nrole: ABUSE APNICRANDNETAU\naddress: PO Box 3646\naddress: South Brisbane, QLD 4101\naddress: Australia\ncountry: ZZ\nphone: +000000000\ne-mail: helpdesk@apnic.net\nadmin-c: AR302-AP\ntech-c: AR302-AP\nnic-hdl: AA1412-AP\nremarks: Generated from irt object IRT-APNICRANDNET-AU\nabuse-mailbox: helpdesk@apnic.net\nmnt-by: APNIC-ABUSE\nlast-modified: 2021-03-09T01:10:22Z\nsource: APNIC\nrole: APNIC RESEARCH\naddress: PO Box 3646\naddress: South Brisbane, QLD 4101\naddress: Australia\ncountry: AU\nphone: +61-7-3858-3188\nfax-no: +61-7-3858-3199\ne-mail: research@apnic.net\nnic-hdl: AR302-AP\ntech-c: AH256-AP\nadmin-c: AH256-AP\nmnt-by: MAINT-APNIC-AP\nlast-modified: 2018-04-04T04:26:04Z\nsource: APNIC\n",
                "tags": [
                    "suspicious-udp"
                ],
                "country": "AU",
                "last_analysis_stats": {
                    "harmless": 78,
                    "malicious": 2,
                    "suspicious": 0,
                    "undetected": 10,
                    "timeout": 0
                },
                "whois_date": 1641426713,
                "last_analysis_results": {
                    "CMC Threat Intelligence": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "CMC Threat Intelligence"
                    },
                    "Snort IP sample list": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Snort IP sample list"
                    },
                    "0xSI_f33d": {
                        "category": "undetected",
                        "result": "unrated",
                        "method": "blacklist",
                        "engine_name": "0xSI_f33d"
                    },
                    "Armis": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Armis"
                    },
                    "ViriBack": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "ViriBack"
                    },
                    "Comodo Valkyrie Verdict": {
                        "category": "malicious",
                        "result": "malware",
                        "method": "blacklist",
                        "engine_name": "Comodo Valkyrie Verdict"
                    },
                    "PhishLabs": {
                        "category": "undetected",
                        "result": "unrated",
                        "method": "blacklist",
                        "engine_name": "PhishLabs"
                    },
                    "K7AntiVirus": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "K7AntiVirus"
                    },
                    "CINS Army": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "CINS Army"
                    },
                    "Quttera": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Quttera"
                    },
                    "OpenPhish": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "OpenPhish"
                    },
                    "VX Vault": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "VX Vault"
                    },
                    "Web Security Guard": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Web Security Guard"
                    },
                    "Scantitan": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Scantitan"
                    },
                    "AlienVault": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "AlienVault"
                    },
                    "Sophos": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Sophos"
                    },
                    "Phishtank": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Phishtank"
                    },
                    "EonScope": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "EonScope"
                    },
                    "Cyan": {
                        "category": "undetected",
                        "result": "unrated",
                        "method": "blacklist",
                        "engine_name": "Cyan"
                    },
                    "Spam404": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Spam404"
                    },
                    "SecureBrain": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "SecureBrain"
                    },
                    "Hoplite Industries": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Hoplite Industries"
                    },
                    "CRDF": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "CRDF"
                    },
                    "Fortinet": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Fortinet"
                    },
                    "alphaMountain.ai": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "alphaMountain.ai"
                    },
                    "Lionic": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Lionic"
                    },
                    "Virusdie External Site Scan": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Virusdie External Site Scan"
                    },
                    "Google Safebrowsing": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Google Safebrowsing"
                    },
                    "SafeToOpen": {
                        "category": "undetected",
                        "result": "unrated",
                        "method": "blacklist",
                        "engine_name": "SafeToOpen"
                    },
                    "ADMINUSLabs": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "ADMINUSLabs"
                    },
                    "CyberCrime": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "CyberCrime"
                    },
                    "Heimdal Security": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Heimdal Security"
                    },
                    "AutoShun": {
                        "category": "undetected",
                        "result": "unrated",
                        "method": "blacklist",
                        "engine_name": "AutoShun"
                    },
                    "Trustwave": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Trustwave"
                    },
                    "AICC (MONITORAPP)": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "AICC (MONITORAPP)"
                    },
                    "CyRadar": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "CyRadar"
                    },
                    "Dr.Web": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Dr.Web"
                    },
                    "Emsisoft": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Emsisoft"
                    },
                    "Abusix": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Abusix"
                    },
                    "Webroot": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Webroot"
                    },
                    "Avira": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Avira"
                    },
                    "securolytics": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "securolytics"
                    },
                    "Antiy-AVL": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Antiy-AVL"
                    },
                    "Acronis": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Acronis"
                    },
                    "Quick Heal": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Quick Heal"
                    },
                    "ESTsecurity-Threat Inside": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "ESTsecurity-Threat Inside"
                    },
                    "DNS8": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "DNS8"
                    },
                    "benkow.cc": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "benkow.cc"
                    },
                    "EmergingThreats": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "EmergingThreats"
                    },
                    "Chong Lua Dao": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Chong Lua Dao"
                    },
                    "Yandex Safebrowsing": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Yandex Safebrowsing"
                    },
                    "MalwareDomainList": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "MalwareDomainList"
                    },
                    "Lumu": {
                        "category": "undetected",
                        "result": "unrated",
                        "method": "blacklist",
                        "engine_name": "Lumu"
                    },
                    "zvelo": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "zvelo"
                    },
                    "Kaspersky": {
                        "category": "undetected",
                        "result": "unrated",
                        "method": "blacklist",
                        "engine_name": "Kaspersky"
                    },
                    "Segasec": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Segasec"
                    },
                    "Sucuri SiteCheck": {
                        "category": "malicious",
                        "result": "malicious",
                        "method": "blacklist",
                        "engine_name": "Sucuri SiteCheck"
                    },
                    "desenmascara.me": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "desenmascara.me"
                    },
                    "URLhaus": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "URLhaus"
                    },
                    "PREBYTES": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "PREBYTES"
                    },
                    "StopForumSpam": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "StopForumSpam"
                    },
                    "Blueliv": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Blueliv"
                    },
                    "Netcraft": {
                        "category": "undetected",
                        "result": "unrated",
                        "method": "blacklist",
                        "engine_name": "Netcraft"
                    },
                    "ZeroCERT": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "ZeroCERT"
                    },
                    "Phishing Database": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Phishing Database"
                    },
                    "MalwarePatrol": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "MalwarePatrol"
                    },
                    "MalBeacon": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "MalBeacon"
                    },
                    "IPsum": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "IPsum"
                    },
                    "Spamhaus": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Spamhaus"
                    },
                    "Malwared": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Malwared"
                    },
                    "BitDefender": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "BitDefender"
                    },
                    "GreenSnow": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "GreenSnow"
                    },
                    "G-Data": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "G-Data"
                    },
                    "StopBadware": {
                        "category": "undetected",
                        "result": "unrated",
                        "method": "blacklist",
                        "engine_name": "StopBadware"
                    },
                    "SCUMWARE.org": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "SCUMWARE.org"
                    },
                    "malwares.com URL checker": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "malwares.com URL checker"
                    },
                    "NotMining": {
                        "category": "undetected",
                        "result": "unrated",
                        "method": "blacklist",
                        "engine_name": "NotMining"
                    },
                    "Forcepoint ThreatSeeker": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Forcepoint ThreatSeeker"
                    },
                    "Certego": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Certego"
                    },
                    "ESET": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "ESET"
                    },
                    "Threatsourcing": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Threatsourcing"
                    },
                    "MalSilo": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "MalSilo"
                    },
                    "Nucleon": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Nucleon"
                    },
                    "BADWARE.INFO": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "BADWARE.INFO"
                    },
                    "ThreatHive": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "ThreatHive"
                    },
                    "FraudScore": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "FraudScore"
                    },
                    "Tencent": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Tencent"
                    },
                    "Bfore.Ai PreCrime": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Bfore.Ai PreCrime"
                    },
                    "Baidu-International": {
                        "category": "harmless",
                        "result": "clean",
                        "method": "blacklist",
                        "engine_name": "Baidu-International"
                    }
                },
                "reputation": -11,
                "last_modification_date": 1641776037,
                "regional_internet_registry": "APNIC",
                "continent": "OC",
                "total_votes": {
                    "harmless": 0,
                    "malicious": 3
                }
            },
            "type": "ip_address",
            "id": "1.2.3.4",
        },
        "analysisId": "1.2.3.4",
        "analysisStatus": "completed"
    }
}
}