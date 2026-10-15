import { GameContext, Rule } from '../types/game';
import {
  PERIODIC_TABLE,
  MONTHS,
  TECH_SPONSORS,
  CODE_KEYWORDS,
  AFFIRMATIVE_WORDS,
} from './rulesData';

export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export function calculateDigitsSum(password: string): { sum: number; digits: number[] } {
  const matches = password.match(/\d/g);
  if (!matches) return { sum: 0, digits: [] };
  const digits = matches.map(d => parseInt(d, 10));
  const sum = digits.reduce((acc, curr) => acc + curr, 0);
  return { sum, digits };
}

export function findLeapYearInText(password: string): number | null {
  const matches = password.match(/\b\d{4}\b/g) || password.match(/\d{4}/g);
  if (!matches) return null;
  for (const match of matches) {
    const year = parseInt(match, 10);
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return year;
    }
  }
  return null;
}

export function checkUppercaseVowels(password: string): { passed: boolean; lowercaseVowels: string[] } {
  const lowercase = password.match(/[aeiou]/g);
  if (lowercase && lowercase.length > 0) {
    return { passed: false, lowercaseVowels: Array.from(new Set(lowercase)) };
  }
  const hasVowels = /[AEIOU]/.test(password);
  return { passed: hasVowels, lowercaseVowels: [] };
}

export function checkBalancedBrackets(text: string, openChar: string, closeChar: string): boolean {
  let count = 0;
  let seen = false;
  for (const char of text) {
    if (char === openChar) {
      count++;
      seen = true;
    } else if (char === closeChar) {
      count--;
      if (count < 0) return false;
    }
  }
  return seen && count === 0;
}

export function hasPalindromeSegment(text: string, minLen: number = 4): boolean {
  const clean = text.toLowerCase();
  for (let i = 0; i <= clean.length - minLen; i++) {
    for (let len = minLen; len <= clean.length - i; len++) {
      const sub = clean.substring(i, i + len);
      if (sub === sub.split('').reverse().join('') && !/^(\w)\1+$/.test(sub)) {
        return true;
      }
    }
  }
  return false;
}

export const COMPETITION_RULES: Rule[] = [
  // Phase 1: Core Fundamentals (1 - 8)
  {
    id: 1,
    number: 1,
    title: 'Minimum Length',
    description: 'Your password must be at least 6 characters long.',
    hint: 'Count all typed characters including symbols and digits.',
    category: 'core',
    validator: (pwd) => ({
      passed: pwd.length >= 6,
      detail: `${pwd.length}/6`,
    }),
  },
  {
    id: 2,
    number: 2,
    title: 'Numeric Digit',
    description: 'Your password must include at least one numeric digit.',
    hint: 'Add any digit from 0 through 9.',
    category: 'core',
    validator: (pwd) => ({
      passed: /\d/.test(pwd),
    }),
  },
  {
    id: 3,
    number: 3,
    title: 'Uppercase Letter',
    description: 'Your password must include at least one uppercase letter.',
    hint: 'Add any capital letter from A through Z.',
    category: 'core',
    validator: (pwd) => ({
      passed: /[A-Z]/.test(pwd),
    }),
  },
  {
    id: 4,
    number: 4,
    title: 'Special Symbol',
    description: 'Your password must include a special symbol.',
    hint: 'Use a standard symbol such as !, @, #, $, %, etc.',
    category: 'core',
    validator: (pwd) => ({
      passed: /[^A-Za-z0-9\s]/.test(pwd),
    }),
  },
  {
    id: 5,
    number: 5,
    title: 'Digit Sum 25',
    description: 'The digits in your password must add up to 25.',
    hint: 'Sum all numeric digits to 25 (e.g. 9 + 9 + 7). Check telemetry above.',
    category: 'math',
    validator: (pwd) => {
      const { sum } = calculateDigitsSum(pwd);
      return {
        passed: sum === 25,
        detail: `Sum: ${sum}/25`,
      };
    },
    renderHelper: true,
  },
  {
    id: 6,
    number: 6,
    title: 'Month of the Year',
    description: 'Your password must include a month of the year.',
    hint: 'Spell out a full month name (e.g. May, June, or October).',
    category: 'core',
    validator: (pwd) => {
      const lower = pwd.toLowerCase();
      const matched = MONTHS.find(m => lower.includes(m));
      return {
        passed: !!matched,
        detail: matched ? 'Verified' : 'Missing',
      };
    },
  },
  {
    id: 7,
    number: 7,
    title: 'Programming Keyword',
    description: 'Your password must include a valid programming keyword (function, lambda, async, or return).',
    hint: 'Type one of: function, lambda, async, or return.',
    category: 'cyber',
    validator: (pwd) => {
      const lower = pwd.toLowerCase();
      const matched = CODE_KEYWORDS.find(k => lower.includes(k));
      return {
        passed: !!matched,
        detail: matched ? 'Verified' : 'Missing',
      };
    },
  },
  {
    id: 8,
    number: 8,
    title: 'Association Partner',
    description: 'Your password must include one of our official partners (NVIDIA, INTEL, or GITHUB).',
    hint: 'Type one of: NVIDIA, INTEL, or GITHUB.',
    category: 'core',
    validator: (pwd) => {
      const lower = pwd.toLowerCase();
      const matched = TECH_SPONSORS.find(s => lower.includes(s.name.toLowerCase()));
      return {
        passed: !!matched,
        detail: matched ? 'Verified' : 'Missing',
      };
    },
    renderHelper: true,
  },

  // Phase 2: Logic & Protocols (9 - 15)
  {
    id: 9,
    number: 9,
    title: 'Leap Year',
    description: 'Your password must include a 4-digit leap year.',
    hint: 'Use a divisible leap year number like 2024, 2020, or 2000.',
    category: 'math',
    validator: (pwd) => {
      const year = findLeapYearInText(pwd);
      return {
        passed: year !== null,
        detail: year ? 'Verified' : 'Missing',
      };
    },
  },
  {
    id: 10,
    number: 10,
    title: 'Security CAPTCHA',
    description: 'Your password must include the security CAPTCHA code displayed below.',
    hint: 'Type the exact characters seen in the security box.',
    category: 'cyber',
    validator: (pwd, ctx) => ({
      passed: pwd.includes(ctx.captchaCode),
      detail: pwd.includes(ctx.captchaCode) ? 'Verified' : 'Unverified',
    }),
    renderHelper: true,
  },
  {
    id: 11,
    number: 11,
    title: 'Two-Letter Chemical Element',
    description: 'Your password must include a two-letter chemical symbol from the periodic table.',
    hint: 'Symbols like He (Helium), Na (Sodium), Fe (Iron), or Pt (Platinum).',
    category: 'science',
    validator: (pwd) => {
      const lower = pwd.toLowerCase();
      const match = PERIODIC_TABLE.find(el => el.symbol.length === 2 && lower.includes(el.symbol.toLowerCase()));
      return {
        passed: !!match,
        detail: match ? 'Verified' : 'Missing',
      };
    },
    renderHelper: true,
  },
  {
    id: 12,
    number: 12,
    title: 'Host Country',
    description: 'Your password must include the name of the host country from the intelligence dossier.',
    hint: 'Examine the capital city and clue in the card above (e.g. Tokyo -> Japan).',
    category: 'core',
    validator: (pwd, ctx) => ({
      passed: pwd.toLowerCase().includes(ctx.countryName.toLowerCase()),
      detail: pwd.toLowerCase().includes(ctx.countryName.toLowerCase()) ? 'Verified' : 'Missing',
    }),
    renderHelper: true,
  },
  {
    id: 13,
    number: 13,
    title: 'Winning Chess Tactic',
    description: 'Your password must include the winning algebraic chess move for White in the tactical board below.',
    hint: 'Standard chess notation: piece capture with check (Bxf7+).',
    category: 'advanced',
    validator: (pwd, ctx) => ({
      passed: pwd.includes(ctx.chessBestMove),
      detail: pwd.includes(ctx.chessBestMove) ? 'Verified' : 'Missing',
    }),
    renderHelper: true,
  },
  {
    id: 14,
    number: 14,
    title: 'Network Address Prefix',
    description: 'Your password must include a private network prefix (192.168) or loopback address (127.0.0.1).',
    hint: 'Type 192.168 or 127.0.0.1.',
    category: 'cyber',
    validator: (pwd) => ({
      passed: pwd.includes('192.168') || pwd.includes('127.0.0.1'),
      detail: pwd.includes('192.168') || pwd.includes('127.0.0.1') ? 'Verified' : 'Missing',
    }),
  },
  {
    id: 15,
    number: 15,
    title: 'Affirmative Consensus',
    description: 'Your password must contain an affirmative statement (yes, definitely, affirmative, or verified).',
    hint: 'Type yes, definitely, affirmative, or verified.',
    category: 'cyber',
    validator: (pwd) => {
      const lower = pwd.toLowerCase();
      const matched = AFFIRMATIVE_WORDS.find(w => lower.includes(w));
      return {
        passed: !!matched,
        detail: matched ? 'Affirmed' : 'Missing',
      };
    },
  },

  // Phase 3: Syntax & Case Disciplinary Constraints (16 - 23)
  {
    id: 16,
    number: 16,
    title: 'Uppercase Vowels Only',
    description: 'All vowels in your password must be UPPERCASE (A, E, I, O, U). No lowercase vowels are allowed.',
    hint: 'Make sure every a, e, i, o, u is typed in capital: A, E, I, O, U.',
    category: 'advanced',
    validator: (pwd) => {
      const { passed, lowercaseVowels } = checkUppercaseVowels(pwd);
      return {
        passed,
        detail: passed
          ? 'Compliant'
          : lowercaseVowels.length > 0
          ? `${lowercaseVowels.length} lowercase`
          : 'None found',
      };
    },
  },
  {
    id: 17,
    number: 17,
    title: 'Event Theme Hex Code',
    description: 'Your password must include the official theme hex code (#00E5FF or #FF007F).',
    hint: 'Type the cyan #00E5FF or magenta #FF007F.',
    category: 'cyber',
    validator: (pwd, ctx) => {
      const passed = pwd.toUpperCase().includes(ctx.hexColor.toUpperCase()) || pwd.toUpperCase().includes('#00E5FF') || pwd.toUpperCase().includes('#FF007F');
      return {
        passed,
        detail: passed ? 'Verified' : 'Missing',
      };
    },
    renderHelper: true,
  },
  {
    id: 18,
    number: 18,
    title: 'Prime Character Length',
    description: 'The total character length of your password must be a prime number.',
    hint: 'Target lengths: 37, 41, 43, 47, 53, 59, 61, 67, 71.',
    category: 'math',
    validator: (pwd) => {
      const len = pwd.length;
      const passed = isPrime(len);
      return {
        passed,
        detail: `Length: ${len} (${passed ? 'PRIME' : 'NOT PRIME'})`,
      };
    },
  },
  {
    id: 19,
    number: 19,
    title: 'Self-Referential Length Stamp',
    description: 'Your password must contain its current total character length as numeric digits.',
    hint: 'Check the character count displayed above and write that number into your text.',
    category: 'math',
    validator: (pwd) => {
      const lenStr = pwd.length.toString();
      return {
        passed: pwd.includes(lenStr),
        detail: pwd.includes(lenStr) ? 'Present' : 'Missing',
      };
    },
  },
  {
    id: 20,
    number: 20,
    title: 'Hex Memory Pointer',
    description: 'Your password must include a 64-bit hexadecimal memory pointer (0x7F or 0xFF).',
    hint: 'Type 0x7F or 0xFF.',
    category: 'cyber',
    validator: (pwd) => ({
      passed: pwd.includes('0x7F') || pwd.includes('0xFF') || /0x[0-9A-Fa-f]{2}/.test(pwd),
      detail: pwd.includes('0x7F') || pwd.includes('0xFF') || /0x[0-9A-Fa-f]{2}/.test(pwd) ? 'Verified' : 'Missing',
    }),
  },
  {
    id: 21,
    number: 21,
    title: 'Balanced Parentheses',
    description: 'Your password must include at least one pair of balanced parentheses ( and ).',
    hint: 'Ensure every open ( has a closing ) in your text.',
    category: 'cyber',
    validator: (pwd) => ({
      passed: checkBalancedBrackets(pwd, '(', ')'),
      detail: checkBalancedBrackets(pwd, '(', ')') ? 'Balanced' : 'Unbalanced',
    }),
  },
  {
    id: 22,
    number: 22,
    title: 'Balanced Curly Braces',
    description: 'Your password must include at least one pair of balanced curly braces { and }.',
    hint: 'Ensure every open { has a closing } in your text.',
    category: 'cyber',
    validator: (pwd) => ({
      passed: checkBalancedBrackets(pwd, '{', '}'),
      detail: checkBalancedBrackets(pwd, '{', '}') ? 'Balanced' : 'Unbalanced',
    }),
  },
  {
    id: 23,
    number: 23,
    title: 'Balanced Square Brackets',
    description: 'Your password must include at least one pair of balanced square brackets [ and ].',
    hint: 'Ensure every open [ has a closing ] in your text.',
    category: 'cyber',
    validator: (pwd) => ({
      passed: checkBalancedBrackets(pwd, '[', ']'),
      detail: checkBalancedBrackets(pwd, '[', ']') ? 'Balanced' : 'Unbalanced',
    }),
  },

  // Phase 4: Computer Systems & Architecture (24 - 31)
  {
    id: 24,
    number: 24,
    title: 'HTTP Status Code',
    description: 'Your password must include a standard HTTP response status code (200, 404, or 500).',
    hint: 'Include web status codes: 200, 404, or 500.',
    category: 'cyber',
    validator: (pwd) => {
      const passed = /\b(200|404|500)\b/.test(pwd) || pwd.includes('200') || pwd.includes('404') || pwd.includes('500');
      return {
        passed,
        detail: passed ? 'Verified' : 'Missing',
      };
    },
  },
  {
    id: 25,
    number: 25,
    title: 'Unix Command Shell',
    description: 'Your password must include a common Unix shell command (sudo, chmod, grep, or curl).',
    hint: 'Type sudo, chmod, grep, or curl.',
    category: 'cyber',
    validator: (pwd) => {
      const lower = pwd.toLowerCase();
      const passed = ['sudo', 'chmod', 'grep', 'curl'].some(cmd => lower.includes(cmd));
      return {
        passed,
        detail: passed ? 'Verified' : 'Missing',
      };
    },
  },
  {
    id: 26,
    number: 26,
    title: 'Internet Domain Extension',
    description: 'Your password must include a valid top-level domain extension (.com, .org, .net, or .io).',
    hint: 'Type .com, .org, .net, or .io.',
    category: 'cyber',
    validator: (pwd) => {
      const lower = pwd.toLowerCase();
      const passed = ['.com', '.org', '.net', '.io'].some(tld => lower.includes(tld));
      return {
        passed,
        detail: passed ? 'Verified' : 'Missing',
      };
    },
  },
  {
    id: 27,
    number: 27,
    title: 'Source Code File Extension',
    description: 'Your password must include a recognized programming file extension (.ts, .py, .cpp, or .json).',
    hint: 'Type .ts, .py, .cpp, or .json.',
    category: 'cyber',
    validator: (pwd) => {
      const lower = pwd.toLowerCase();
      const passed = ['.ts', '.py', '.cpp', '.json'].some(ext => lower.includes(ext));
      return {
        passed,
        detail: passed ? 'Verified' : 'Missing',
      };
    },
  },
  {
    id: 28,
    number: 28,
    title: 'QWERTY Keyboard Sequence',
    description: 'Your password must contain at least 3 consecutive letters from the top QWERTY row (e.g. qwe, rty, uio, etc.).',
    hint: 'Look at the top letter row on your keyboard: qwe, wer, ert, rty, tyu, yui, uio, iop.',
    category: 'cyber',
    validator: (pwd) => {
      const row = 'qwertyuiop';
      const revRow = 'poiuytrewq';
      const lower = pwd.toLowerCase();
      let passed = false;
      for (let i = 0; i <= row.length - 3; i++) {
        if (lower.includes(row.substring(i, i + 3)) || lower.includes(revRow.substring(i, i + 3))) {
          passed = true;
          break;
        }
      }
      return {
        passed,
        detail: passed ? 'Sequence aligned' : 'Missing sequence',
      };
    },
  },
  {
    id: 29,
    number: 29,
    title: 'Alternating Letter Case',
    description: 'Your password must contain a 4-letter sequence strictly alternating between uppercase and lowercase.',
    hint: 'Alternate 4 letters: upper-lower-upper-lower (e.g. AbAb) or lower-upper-lower-upper (e.g. aBaB).',
    category: 'cyber',
    validator: (pwd) => {
      const passed = /([a-z][A-Z][a-z][A-Z]|[A-Z][a-z][A-Z][a-z])/.test(pwd);
      return {
        passed,
        detail: passed ? 'Pattern satisfied' : 'Pattern missing',
      };
    },
  },
  {
    id: 30,
    number: 30,
    title: 'Boolean Logic Operator',
    description: 'Your password must contain an uppercase boolean logic operator (AND, OR, NOT, or XOR).',
    hint: 'Type capital AND, OR, NOT, or XOR.',
    category: 'cyber',
    validator: (pwd) => {
      const passed = ['AND', 'OR', 'NOT', 'XOR'].some(op => pwd.includes(op));
      return {
        passed,
        detail: passed ? 'Verified' : 'Missing',
      };
    },
  },
  {
    id: 31,
    number: 31,
    title: 'Palindrome Substring',
    description: 'Your password must contain a symmetrical palindrome substring of at least 4 characters.',
    hint: 'A 4-char text reads the same forwards and backwards (e.g. abba, 1221, or racecar).',
    category: 'math',
    validator: (pwd) => {
      const passed = hasPalindromeSegment(pwd, 4);
      return {
        passed,
        detail: passed ? 'Palindrome verified' : 'No 4-char palindrome',
      };
    },
  },

  // Phase 5: Database, Git & Protocols (32 - 39)
  {
    id: 32,
    number: 32,
    title: 'SQL Database Clause',
    description: 'Your password must include an uppercase SQL statement clause (SELECT, WHERE, JOIN, or DROP).',
    hint: 'Include capital SQL words: SELECT, WHERE, JOIN, or DROP.',
    category: 'cyber',
    validator: (pwd) => {
      const passed = ['SELECT', 'WHERE', 'JOIN', 'DROP'].some(clause => pwd.includes(clause));
      return {
        passed,
        detail: passed ? 'Verified' : 'Missing',
      };
    },
  },
  {
    id: 33,
    number: 33,
    title: 'Git Version Control Command',
    description: 'Your password must include a common Git command (commit, push, merge, or rebase).',
    hint: 'Type commit, push, merge, or rebase.',
    category: 'cyber',
    validator: (pwd) => {
      const lower = pwd.toLowerCase();
      const passed = ['commit', 'push', 'merge', 'rebase'].some(cmd => lower.includes(cmd));
      return {
        passed,
        detail: passed ? 'Verified' : 'Missing',
      };
    },
  },
  {
    id: 34,
    number: 34,
    title: 'Network Port Number',
    description: 'Your password must include a common network service port (80, 443, 8080, or 3000).',
    hint: 'Type 80, 443, 8080, or 3000.',
    category: 'cyber',
    validator: (pwd) => {
      const passed = pwd.includes('8080') || pwd.includes('3000') || pwd.includes('443') || pwd.includes('80');
      return {
        passed,
        detail: passed ? 'Port verified' : 'Port missing',
      };
    },
  },
  {
    id: 35,
    number: 35,
    title: 'Base64 Padding Indicator',
    description: 'Your password must include the standard base64 byte alignment padding symbol ==.',
    hint: 'Type two equals signs consecutively: ==',
    category: 'cyber',
    validator: (pwd) => ({
      passed: pwd.includes('=='),
      detail: pwd.includes('==') ? 'Padding present' : 'Missing ==',
    }),
  },
  {
    id: 36,
    number: 36,
    title: 'Multiple Arithmetic Operators',
    description: 'Your password must include at least three different arithmetic operators (+, -, *, /, %, ^).',
    hint: 'Use three distinct math signs (e.g. + - *).',
    category: 'math',
    validator: (pwd) => {
      const ops = ['+', '-', '*', '/', '%', '^'];
      const found = ops.filter(op => pwd.includes(op));
      return {
        passed: found.length >= 3,
        detail: `${found.length}/3 operators`,
      };
    },
  },
  {
    id: 37,
    number: 37,
    title: '8-Bit Binary Byte',
    description: 'Your password must include an 8-bit binary byte sequence (exactly eight consecutive 0s and 1s).',
    hint: 'Type an 8-character string using only 0 and 1 (e.g. 10101010).',
    category: 'cyber',
    validator: (pwd) => {
      const passed = /[01]{8}/.test(pwd);
      return {
        passed,
        detail: passed ? '8-bit byte found' : 'Missing 8-bit byte',
      };
    },
  },
  {
    id: 38,
    number: 38,
    title: 'Environment Configuration Prefix',
    description: 'Your password must include an environment variable declaration (ENV_ or process.env or export).',
    hint: 'Type ENV_, process.env, or export.',
    category: 'cyber',
    validator: (pwd) => {
      const passed = pwd.includes('ENV_') || pwd.includes('process.env') || pwd.includes('export');
      return {
        passed,
        detail: passed ? 'Declaration verified' : 'Missing declaration',
      };
    },
  },
  {
    id: 39,
    number: 39,
    title: 'Alpha-to-Numeric Ratio',
    description: 'The number of alphabetic letters in your password must be at least twice the number of numeric digits.',
    hint: 'Add more alphabetic letters so letters >= 2 * digits.',
    category: 'math',
    validator: (pwd) => {
      const letters = (pwd.match(/[A-Za-z]/g) || []).length;
      const digits = (pwd.match(/\d/g) || []).length;
      const passed = digits > 0 && letters >= digits * 2;
      return {
        passed,
        detail: `${letters} letters / ${digits} digits`,
      };
    },
  },

  // Phase 6: The Championship Gauntlet (40 - 44)
  {
    id: 40,
    number: 40,
    title: 'Consonant and Vowel Threshold',
    description: 'Your password must contain at least 5 consonants and at least 3 uppercase vowels.',
    hint: 'Count letters: need at least 5 consonants and 3 capital vowels (A, E, I, O, U).',
    category: 'advanced',
    validator: (pwd) => {
      const consonants = (pwd.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;
      const vowels = (pwd.match(/[AEIOU]/g) || []).length;
      const passed = consonants >= 5 && vowels >= 3;
      return {
        passed,
        detail: `${consonants}/5 cons, ${vowels}/3 vowels`,
      };
    },
  },
  {
    id: 41,
    number: 41,
    title: 'No Triple Repeated Characters',
    description: 'Your password must not contain any character repeated three or more times in a row.',
    hint: 'Do not type the same character 3 times consecutively (e.g. no aaa or 111).',
    category: 'advanced',
    validator: (pwd) => {
      const hasTriple = /(.)\1\1/.test(pwd);
      return {
        passed: pwd.length > 0 && !hasTriple,
        detail: hasTriple ? 'Triple repeat detected' : 'Clean sequence',
      };
    },
  },
  {
    id: 42,
    number: 42,
    title: 'Semicolon Statement Terminators',
    description: 'Your password must include at least two semicolon characters (;).',
    hint: 'Type two semicolons: ; ;',
    category: 'cyber',
    validator: (pwd) => {
      const count = (pwd.match(/;/g) || []).length;
      return {
        passed: count >= 2,
        detail: `${count}/2 semicolons`,
      };
    },
  },
  {
    id: 43,
    number: 43,
    title: 'High ASCII Boundary',
    description: 'Your password must contain at least one standard keyboard ASCII character with decimal value >= 120 (x, y, z, {, |, }, ~).',
    hint: 'Type one of the high-range ASCII keys: x, y, z, {, |, }, or ~.',
    category: 'advanced',
    validator: (pwd) => {
      let passed = false;
      for (let i = 0; i < pwd.length; i++) {
        if (pwd.charCodeAt(i) >= 120 && pwd.charCodeAt(i) <= 126) {
          passed = true;
          break;
        }
      }
      return {
        passed,
        detail: passed ? 'High ASCII verified' : 'Missing high ASCII',
      };
    },
  },
  {
    id: 44,
    number: 44,
    title: 'The Final Team Pledge',
    description: 'Your password must conclude with the official victory pledge: "READY TO WIN".',
    hint: 'Make sure your password ends with the exact text: READY TO WIN',
    category: 'advanced',
    validator: (pwd) => {
      const target = 'READY TO WIN';
      const passed = pwd.endsWith(target);
      return {
        passed,
        detail: passed ? 'Pledge verified' : 'Pledge missing at end',
      };
    },
  },
];
