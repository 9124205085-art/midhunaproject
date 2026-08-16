/**
 * Phase 6 — Static skill learning content
 * Source of truth for Explore Skills / modules (no backend required).
 */

export const skills = [
  {
    id: 'abacus',
    name: 'Abacus',
    shortDescription: 'Learn numbers, calculations and mental arithmetic.',
    description:
      'Build numerical ability and improve calculation speed through simple and structured practice.',
    modules: [
      {
        id: 'abacus-1',
        title: 'Introduction to Abacus',
        description: 'Understand the basic structure of an abacus and how it is used.',
        content: `What is an Abacus?

An abacus is a simple counting tool that uses beads to represent numbers.
It can help learners understand numbers and perform basic calculations.

Example:
Imagine a small frame with rods and beads. Moving beads toward the middle bar helps form a number, such as 5 or 10.`,
        keyPoints: [
          'Understand the parts of an abacus.',
          'Learn how beads represent numbers.',
          'Practice simple counting.',
          'See why abacus practice builds number sense.',
        ],
      },
      {
        id: 'abacus-2',
        title: 'Basic Number Representation',
        description: 'Learn how numbers are represented using abacus beads.',
        content: `Representing Numbers

Each rod on an abacus can stand for place values such as ones, tens, and hundreds.
Beads are moved carefully so that the displayed value matches the number you want.

Example:
To show the number 23, use 2 beads on the tens rod and 3 beads on the ones rod.`,
        keyPoints: [
          'Ones and tens rods represent place value.',
          'Bead positions create different numbers.',
          'Practice forming numbers from 1 to 20.',
          'Check your number by counting beads slowly.',
        ],
      },
      {
        id: 'abacus-3',
        title: 'Basic Calculations',
        description: 'Practice simple addition and subtraction using an abacus.',
        content: `Simple Calculations

Addition means moving beads to increase the value.
Subtraction means moving beads away to decrease the value.

Example:
Start with 4 beads. Add 2 more beads. The new total is 6.
Then remove 1 bead. The new total is 5.`,
        keyPoints: [
          'Addition increases the bead count for a place value.',
          'Subtraction decreases the bead count.',
          'Practice small sums such as 3 + 2 and 7 − 4.',
          'Say the answer aloud after each step.',
        ],
      },
    ],
  },
  {
    id: 'coding',
    name: 'Coding',
    shortDescription: 'Learn basic programming and computational thinking.',
    description:
      'Learn the basics of programming and how simple instructions help computers solve problems.',
    modules: [
      {
        id: 'coding-1',
        title: 'Introduction to Coding',
        description: 'Understand what programming is and how programs solve problems.',
        content: `What is Coding?

Coding means giving clear instructions to a computer so it can complete a task.
Programs are made of small steps written in a language the computer understands.

Example:
A simple instruction like print("Hello") can show a message on the screen.`,
        keyPoints: [
          'Coding is writing instructions for a computer.',
          'Programs solve problems step by step.',
          'Clear instructions lead to correct results.',
          'Anyone can start with small programs.',
        ],
      },
      {
        id: 'coding-2',
        title: 'Variables and Basic Logic',
        description: 'Learn the basic idea of variables and simple logical operations.',
        content: `Variables and Logic

A variable stores a value that can be reused later, like a labelled box.
Basic logic helps a program decide what to do next, such as if a score is high enough.

Example:
age = 12 stores the number 12.
If age >= 10, the program can say "You can join the coding class."`,
        keyPoints: [
          'Variables store values with names.',
          'Values can change during a program.',
          'Conditions help programs make decisions.',
          'Practice thinking in simple if/else steps.',
        ],
      },
      {
        id: 'coding-3',
        title: 'Simple Programming Problems',
        description: 'Practice solving small problems using basic programming concepts.',
        content: `Solving Small Problems

Break a problem into known facts, steps, and the expected result.
Then write or describe the steps a program could follow.

Example:
Problem: Check if a number is even.
Step 1: Read the number.
Step 2: Divide by 2 and check the remainder.
Step 3: If remainder is 0, say "Even"; otherwise say "Odd."`,
        keyPoints: [
          'Break problems into small steps.',
          'Use variables to store inputs.',
          'Use conditions to choose an answer.',
          'Check your result with an example.',
        ],
      },
    ],
  },
  {
    id: 'communication',
    name: 'Communication Skills',
    shortDescription: 'Improve speaking, vocabulary and communication.',
    description:
      'Improve speaking, listening, vocabulary and everyday communication with simple practice.',
    modules: [
      {
        id: 'communication-1',
        title: 'Introduction to Communication',
        description: 'Understand the importance of clear communication.',
        content: `Why Communication Matters

Communication is sharing ideas clearly through speaking, listening, reading, and writing.
Good communication helps at school, at home, and in the community.

Example:
Greeting a teacher politely and introducing yourself in a full sentence is clear communication.`,
        keyPoints: [
          'Communication means sharing ideas clearly.',
          'Listening is as important as speaking.',
          'Polite words build confidence.',
          'Practice short introductions every day.',
        ],
      },
      {
        id: 'communication-2',
        title: 'Speaking and Vocabulary',
        description: 'Learn simple techniques to improve speaking and vocabulary.',
        content: `Speak Clearly and Grow Your Words

Speak at a steady pace, use simple sentences, and look at the listener.
Learning a few new words each week helps you express ideas better.

Example:
Instead of only saying "good", you can say "helpful", "kind", or "excellent" when it fits.`,
        keyPoints: [
          'Use a calm and clear voice.',
          'Learn new words with meanings.',
          'Practice speaking in full sentences.',
          'Ask questions when you do not understand.',
        ],
      },
      {
        id: 'communication-3',
        title: 'Everyday Communication',
        description: 'Practice communication skills used in everyday situations.',
        content: `Everyday Situations

You use communication when asking for help, explaining homework, or thanking someone.
A simple structure helps: greeting → message → closing.

Example:
"Good morning. I need help with this question. Thank you for your time."`,
        keyPoints: [
          'Practice greetings and thank-you phrases.',
          'Explain needs in short, clear sentences.',
          'Listen carefully before answering.',
          'Use polite words in daily conversations.',
        ],
      },
    ],
  },
  {
    id: 'logical-reasoning',
    name: 'Logical Reasoning',
    shortDescription: 'Develop problem-solving and logical thinking skills.',
    description:
      'Strengthen thinking skills with patterns, sequences and simple problem-solving practice.',
    modules: [
      {
        id: 'logical-reasoning-1',
        title: 'Introduction to Logical Thinking',
        description: 'Understand basic logical thinking and problem-solving.',
        content: `What is Logical Thinking?

Logical thinking means using clues and clear steps to find an answer.
It helps you solve puzzles and school problems without guessing only.

Example:
If all apples are fruits, and this is an apple, then it is a fruit.`,
        keyPoints: [
          'Logic uses reasons, not only memory.',
          'Break problems into known facts.',
          'Check whether each step makes sense.',
          'Practice with short puzzles.',
        ],
      },
      {
        id: 'logical-reasoning-2',
        title: 'Patterns and Sequences',
        description: 'Identify simple patterns and sequences.',
        content: `Finding Patterns

A pattern follows a rule. Once you find the rule, you can predict the next item.

Example:
2, 4, 6, 8… adds 2 each time, so the next number is 10.
1, 3, 5, 7… also adds 2, so the next number is 9.`,
        keyPoints: [
          'Look for what changes each step.',
          'Write the rule in simple words.',
          'Predict the next item using the rule.',
          'Check your prediction carefully.',
        ],
      },
      {
        id: 'logical-reasoning-3',
        title: 'Problem Solving',
        description: 'Practice solving basic logical problems.',
        content: `Solve Step by Step

Good problem solving includes understanding the question, planning steps, and checking the answer.

Example:
Known: A bag has 5 red balls and 3 blue balls.
Ask: How many balls are there in total?
Steps: 5 + 3 = 8. Check: counting again gives 8.`,
        keyPoints: [
          'Read the question carefully.',
          'List what you know and what you must find.',
          'Plan simple steps before answering.',
          'Check whether the answer is reasonable.',
        ],
      },
    ],
  },
];

/** Map Phase 5 skill display names → skill route ids */
export const skillNameToId = {
  Abacus: 'abacus',
  Coding: 'coding',
  'Communication Skills': 'communication',
  'Logical Reasoning': 'logical-reasoning',
};

export const getSkillById = (skillId) => skills.find((s) => s.id === skillId) || null;

export const getModuleById = (skill, moduleId) => {
  if (!skill?.modules) return null;
  return skill.modules.find((m) => m.id === moduleId) || null;
};

export const getModuleIndex = (skill, moduleId) => {
  if (!skill?.modules) return -1;
  return skill.modules.findIndex((m) => m.id === moduleId);
};
