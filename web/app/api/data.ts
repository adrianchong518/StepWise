export const questionData = {
  Math_2023_17_a: {
    id: "Math",
    nextId: "Math_2023_17_b",
    details: {
      subject: "Mathematics",
      source: {
        kind: "HKDSE",
        year: 2023,
      },
      number: 17,
      part: "a",
      content:
        "It is given that \\( WXY \\) is a triangle, where \\( WX = 6 cm \\), \\( XY = 5 cm \\) and \\( \\angle WYX = 70^\\circ \\). Find \\( \\angle XWY \\).",
      figure: null,
    },
    variables: {
      "triangle WXY": {
        value: "Triangle",
        given: 1,
        figure1: "image/Questions/MATH_2023_17a/WXY.svg",
        figure2: null,
      },
      WX: {
        value: 6,
        given: 1,
        figure1: "image/Questions/MATH_2023_17a/WX.svg",
        figure2: null,
      },
      XY: {
        value: 5,
        given: 1,
        figure1: "image/Questions/MATH_2023_17a/XY.svg",
        figure2: null,
      },
      "\\angle WYX": {
        value: "70^\\circ",
        given: 1,
        figure1: "image/Questions/MATH_2023_17a/aWYX.svg",
        figure2: null,
      },
      "\\angle WXY": {
        value: "51.5^\\circ",
        given: 0,
        figure1: "image/Questions/MATH_2023_17a/aWXY.svg",
        figure2: "image/Questions/MATH_2023_17a/aWXY2.svg",
      },
      "\\angle XWY": {
        value: "Unknown",
        given: 0,
        figure1: "image/Questions/MATH_2023_17a/aXWY.svg",
        figure2: null,
      },
    },
    steps: {
      "0": {
        id: 0,
        prompt: "From the questions, we have obtained these known variables.",
        variables: ["triangle WXY", "WX", "XY", "\\angle WYX", "\\angle XWY"],
        response: {
          type: "option",
          options: [
            {
              value: ["OK"],
              nextStep: 1,
            },
          ],
        },
        "Sample Questions": null,
      },
      "1": {
        id: 1,
        prompt: "What method should we use to find \\( \\angle XWY \\)?",
        variables: ["triangle WXY", "\\angle XWY"],
        response: {
          type: "option",
          options: [
            {
              value: "Sine law",
              nextStep: 2,
            },
            {
              value: "Cosine law",
            },
            {
              value: "Herons Formula",
            },
          ],
        },
        "Sample Questions": 1,
      },
      "2": {
        id: 2,
        prompt:
          "Which of these variables should be used in applying sine law? (You can choose multiple options.)",
        variables: [
          "triangle WXY",
          "WX",
          "XY",
          "\\angle WYX",
          "\\angle XWY",
          "\\angle WYX",
        ],
        response: {
          type: "multioption",
          options: [
            "\\(WX\\)",
            "\\(XY\\)",
            "\\(\\angle WYX\\)",
            "\\(\\angle WXY\\)",
          ],
          correctOptions: ["\\(WX\\)", "\\(XY\\)", "\\(\\angle WYX\\)"],
          nextStep: 3,
        },
        "Sample Questions": 1,
      },
      "3": {
        id: 3,
        prompt: "Applying sine law, what is the answer? (correct to 3 sig fig)",
        variables: ["triangle WXY", "WX", "XY", "\\angle WYX", "\\angle XWY"],
        response: {
          type: "number",
          value: 51.5,
          nextStep: 4,
        },
        "Sample Questions": 1,
      },
      "4": {
        id: 4,
        prompt: "Thank you",
        variables: [],
        response: {
          type: "end",
        },
        "Sample Questions": null,
      },
    },
  },
  Math_2023_17_b: {
    id: "Math",
    nextId: "Math_2023_17_nan",
    details: {
      subject: "Mathematics",
      source: {
        kind: "HKDSE",
        year: 2023,
      },
      number: 17,
      part: "b",
      content:
        "Figure 3 shows the pyramid \\( WXYZ \\), where \\( WZ=XZ=YZ \\). The base of this pyramid is the triangle \\( WXY \\) described in (a). It is given that the angle between \\( WZ \\) and the triangle \\( WXY \\) is \\( 30^\\circ \\). Does the angle between the triangles \\( WXY \\) and \\( XYZ \\) exceed \\( 45^\\circ \\)? Explain your answer.",
      figure: "image/Questions/MATH_2023_17b/Figure3.svg",
    },
    variables: [],
    steps: {
      "0": {
        id: 0,
        prompt:
          "From the questions, we've known that we have \\(A\\), \\(B\\), \\(C\\) three variables.",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: ["OK"],
              nextStep: [1],
            },
          ],
        },
        "Sample Questions": null,
      },
      "1": {
        id: 1,
        prompt: "Please Identify what method should we use for this questions",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "Available method 1",
              nextStep: 2,
            },
            {
              value: "Available method 2",
              nextStep: 4,
            },
            {
              value: "Unavailable method 3",
            },
          ],
        },
        "Sample Questions": 5,
      },
      "2": {
        id: 2,
        prompt: "What should we locate to obtain such method 1?",
        variables: [],
        response: {
          type: "multioption",
          options: [
            "Required given Variable 1",
            "Required ungiven Variable 2",
            "Unrequired given Variable 3",
          ],
          correctOptions: [
            "Required given Variable 1",
            "Required ungiven Variable 2",
          ],
          nextStep: 3,
        },
        "Sample Questions": 3,
      },
      "3": {
        id: 3,
        prompt:
          "Notice that we don't have Variable 2, what should we do to find such variables?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "Available method 4",
              nextStep: 6,
            },
            {
              value: "Unavailable method 5",
            },
            {
              value: "Unavailable method 6",
            },
          ],
        },
        "Sample Questions": 5,
      },
      "4": {
        id: 4,
        prompt: "What should we locate to obtain such method 2?",
        variables: [],
        response: {
          type: "multioption",
          options: [
            "Required given Variable 1",
            "Required ungiven Variable 3",
            "Unrequired given Variable 4",
          ],
          correctOptions: [
            "Required given Variable 1",
            "Required ungiven Variable 3",
          ],
          nextStep: 5,
        },
        "Sample Questions": 7,
      },
      "5": {
        id: 5,
        prompt:
          "Notice that we don't have Variable 3, what should we do to find such variables?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "Available method 4",
              nextStep: 9,
            },
            {
              value: "Unavailable method 5",
            },
            {
              value: "Unavailable method 6",
            },
          ],
        },
        "Sample Questions": 7,
      },
      "6": {
        id: 6,
        prompt: "What should we locate to obtain such method 4?",
        variables: [],
        response: {
          type: "multioption",
          options: [
            "Required given Variable 1",
            "Required ungiven Variable 2",
            "Unrequired given Variable 3",
          ],
          correctOptions: [
            "Required given Variable 1",
            "Required ungiven Variable 2",
          ],
          nextStep: 7,
        },
        "Sample Questions": 9,
      },
      "7": {
        id: 7,
        prompt:
          "Great! Apply method 4, what should we get\n(hint: the answer comes from xxxx, answer is 1234)",
        variables: [],
        response: {
          type: "number",
          value: 1234,
          nextStep: 8,
        },
        "Sample Questions": 9,
      },
      "8": {
        id: 8,
        prompt:
          "Apply method 1, what is the corresponding answer?\n(hint: the answer comes from xxx, answer is 1234)",
        variables: [],
        response: {
          type: "number",
          value: 1234,
          nextStep: 12,
        },
        "Sample Questions": 3,
      },
      "9": {
        id: 9,
        prompt: "What should we locate to obtain such method 4?",
        variables: [],
        response: {
          type: "multioption",
          options: [
            "Required given Variable 1",
            "Required ungiven Variable 2",
            "Unrequired given Variable 3",
          ],
          correctOptions: [
            "Required given Variable 1",
            "Required ungiven Variable 2",
          ],
          nextStep: 10,
        },
        "Sample Questions": 9,
      },
      "10": {
        id: 10,
        prompt:
          "Great! Apply method 4, what should we get\n(hint: the answer comes from xxxx, answer is 1234)",
        variables: [],
        response: {
          type: "number",
          value: 1234,
          nextStep: 11,
        },
        "Sample Questions": 9,
      },
      "11": {
        id: 11,
        prompt:
          "Apply method 2, what is the corresponding answer?\n(hint: the answer comes from xxx, answer is 1234)",
        variables: [],
        response: {
          type: "number",
          value: 1234,
          nextStep: 12,
        },
        "Sample Questions": 7,
      },
      "12": {
        id: 12,
        prompt: "Thank you",
        variables: [],
        response: {
          type: "end",
        },
        "Sample Questions": null,
      },
    },
  },
  Math_2023_18_nan: {
    id: "Math",
    nextId: "Math_2023_18_a",
    details: {
      subject: "Mathematics",
      source: {
        kind: "HKDSE",
        year: 2023,
      },
      number: 18,
      part: null,
      content:
        "Suppose that \\( \\alpha, 7, \\beta \\) is a geometric sequence, where \\( 1 < \\alpha < \\beta \\).",
      figure: null,
    },
  },
  Math_2023_18_a: {
    id: "Math",
    nextId: "Math_2023_18_b",
    details: {
      subject: "Mathematics",
      source: {
        kind: "HKDSE",
        year: 2023,
      },
      number: 18,
      part: "a",
      content: "Express \\( log_7\\alpha \\) in terms of \\( log_7\\beta \\).",
      figure: null,
    },
    variables: {
      "\\alpha": {
        value: "Unknown",
        given: 1,
        figure1: null,
        figure2: null,
      },
    },
    steps: {
      "0": {
        id: 0,
        prompt:
          "From the questions, we've obtain the following variables \\(\\bf{\\alpha}\\), \\(\\bf{\\beta}\\).",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: ["OK"],
              nextStep: [1],
            },
          ],
        },
        "Sample Questions": null,
      },
      "1": {
        id: 1,
        prompt:
          "What method should we use to find the relationship between \\(\\alpha\\) and \\(\\beta\\)? ",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "Properties of Geometric Sequence",
              nextStep: 2,
            },
            {
              value: "Properties of Arithmetic Sequence",
            },
            {
              value: "Summation of Arithmetic Sequence",
            },
          ],
        },
        "Sample Questions": null,
      },
      "2": {
        id: 2,
        prompt: "How can we apply common ratio of geometric sequence?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "\\(\\frac{a_n}{a_{n-1}}\\)",
              nextStep: 3,
            },
            {
              value: "\\(a_n-a_{n-1}\\)",
            },
            {
              value: "\\(\\frac{a_n-a_{n-1}]{n}\\)",
            },
          ],
        },
        "Sample Questions": null,
      },
      "3": {
        id: 3,
        prompt: "Apply common ratio, what is the correct operation?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "\\(7^2=\\alpha\\beta\\)",
              nextStep: 4,
            },
            {
              value: "\\(\\beta-\\alpha=7\\)",
            },
            {
              value: "\\(\\alpha=\\beta\\)",
            },
          ],
        },
        "Sample Questions": null,
      },
      "4": {
        id: 4,
        prompt: "Which operation should we do to \\(7^2=\\alpha\\beta\\)?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "Take log to the base 7",
              nextStep: 5,
            },
            {
              value: "Take log both side",
            },
            {
              value: "Take ln both side",
            },
          ],
        },
        "Sample Questions": null,
      },
      "5": {
        id: 5,
        prompt:
          "What method should we use the decompose \n\\(\n\\text{log}_{7}7^2=log_{7}\\alpha\\beta?\n\\)",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "Quotient Rule of Logarithm",
            },
            {
              value: "Power Rule of Logarithm",
              nextStep: 6,
            },
            {
              value: "Equality Rule of Logarithm",
            },
          ],
        },
        "Sample Questions": null,
      },
      "6": {
        id: 6,
        prompt: "Apply power rule, what is the correct operation?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "\\(2\\text{log}_{7}7=\\text{log}_7\\alpah\\beta\\)",
              nextStep: 7,
            },
            {
              value: "\\(\\text{log}49-\\text{log}7=\\log_{7}\\alpha\\beta\\)",
            },
            {
              value: "\\(\\text{log}42=\\text{log}\\alpha-\\text{log}\\beta\\)",
            },
          ],
        },
        "Sample Questions": null,
      },
      "7": {
        id: 7,
        prompt:
          "What method should we use the decompose \\(\\text{log}_{7}7\\)?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "Logarithm of the same number as base",
              nextStep: 8,
            },
            {
              value: "Product Rule of Logarithm ",
            },
            {
              value: "Power Rule of Logarithm ",
            },
          ],
        },
        "Sample Questions": null,
      },
      "8": {
        id: 8,
        prompt:
          "Apply logarithm of the same number as base, what is the value of \\(\\text{log}_{7}7\\)?",
        variables: [],
        response: {
          type: "number",
          value: 1,
          nextStep: 9,
        },
        "Sample Questions": null,
      },
      "9": {
        id: 9,
        prompt:
          "What method should we use the decompose \\(\\text{log}_{7}\\alpha\\beta\\)?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "Logarithm of the same number as base",
            },
            {
              value: "Product Rule of Logarithm ",
              nextStep: 10,
            },
            {
              value: "Power Rule of Logarithm ",
            },
          ],
        },
        "Sample Questions": null,
      },
      "10": {
        id: 10,
        prompt:
          "Apply Product rule of Logarithm, what is the correct expression of \\(\\text{log}_{7}\\alpha\\beta\\)?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "\\(\\text{log}_{7}\\alpha+\\text{log}_7\\beta\\)",
              nextStep: 11,
            },
            {
              value: "\\(\\text{log}\\alpha+\\text{log}\\beta\\)",
            },
            {
              value: "\\(\\text{log}_{7}\\alpha-\\text{log}_7\\beta\\)",
            },
          ],
        },
        "Sample Questions": null,
      },
      "11": {
        id: 11,
        prompt:
          "Apply Logarithm of the same number as base and Product Rule, what is the correct expression for \\(\\text{log}_{7}7^2=\\text{log)_{7}\\alpha\\beta \\) ?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "\\(2=\\text{log}_{{7}\\alpha+\\text{log}_{{7}\\beta\\)",
              nextStep: 12,
            },
            {
              value: "\\(2=\\text{log}\\alpha+\\text{log}\\beta\\)",
            },
            {
              value: "\\(2=\\text{log}_{7}\\alpha+\\beta\\)",
            },
          ],
        },
        "Sample Questions": null,
      },
      "12": {
        id: 12,
        prompt: "Thank you",
        variables: [],
        response: null,
        "Sample Questions": null,
      },
    },
  },
  Math_2023_18_b: {
    id: "Math",
    nextId: "Math_2023_18_nan",
    details: {
      subject: "Mathematics",
      source: {
        kind: "HKDSE",
        year: 2023,
      },
      number: 18,
      part: "b",
      content:
        "If \\( log_\\beta\\alpha, log_7\\beta, log_\\alpha\\beta \\) is an arithmetic sequence, find the common difference of the arithmetic sequence.",
      figure: null,
    },
    steps: {
      "0": {
        id: 0,
        prompt:
          "From the questions, we've obtain the following variables \\(\\bf{\\alpha}\\), \\(\\bf{\\beta}\\).",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: ["OK"],
              nextStep: [1],
            },
          ],
        },
        "Sample Questions": null,
      },
      "1": {
        id: 1,
        prompt: "How can we apply common difference of arithmetic sequence?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "\\(\\frac{a_n}{a_{n-1}}\\)",
            },
            {
              value: "\\(a_n-a_{n-1}\\)",
              nextStep: 3,
            },
            {
              value: "\\(\\frac{a_n-a_{n-1}]{n}\\)",
            },
          ],
        },
        "Sample Questions": null,
      },
      "2": {
        id: 2,
        prompt: "Apply common difference, what is the correct operation?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value:
                "\\(\\tex{log}_7\\beta-\\text{log}_\\beta\\alpha=\\text{log}_\\alpha\\beta-\\text{log}_7\\beta\\)",
              nextStep: 4,
            },
            {
              value:
                "\\(\\tex{log}_\\alpha\\beta-\\text{log}_7\\alpha=\\text{log}_\\alpha\\beta-\\text{log}_7\\beta\\)",
            },
            {
              value:
                "\\(\\tex{log}_\\alpha\\beta-\\text{log}_7\\alpha=\\text{log}_7\\beta-\\text{log}_\\alpha\\beta\\)",
            },
          ],
        },
        "Sample Questions": null,
      },
      "3": {
        id: 3,
        prompt:
          "Apply logarithm of the same number as base, what is the value of \\(\\text{log}_{\\beta}\\alpha\\)?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value:
                "\\(\\frac{\\text{log}_{7}\\alpha}{\\text{log}_{7}\\beta}\\)",
              nextStep: 5,
            },
            {
              value: "\\(\\frac{\\text{log}\\alpha}{\\text{log}\\beta}\\)",
            },
            {
              value: "\\(\\text{log}\\alpha-\\text{log}\\beta\\)",
            },
          ],
        },
        "Sample Questions": null,
      },
      "4": {
        id: 4,
        prompt:
          "Apply logarithm of the same number as base, what is the value of \\(\\text{log}_{\\alpha}\\beta\\)?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value:
                "\\(\\frac{\\text{log}_{7}\\beta}{\\text{log}_{7}\\alpha}\\)",
              nextStep: 6,
            },
            {
              value: "\\(\\frac{\\text{log}\\alpha}{\\text{log}\\beta}\\)",
            },
            {
              value: "\\(\\text{log}\\alpha-\\text{log}\\beta\\)",
            },
          ],
        },
        "Sample Questions": null,
      },
      "5": {
        id: 5,
        prompt:
          "Recall what u did in part (a), rewrite \\(\\text{log}_{7}\\beta-\\frac{\\text{log}_7\\alpha}{\\text{log}_7\\beta}=\\frac{\\text{log}_{7}\\beta}{\\text{log}_{7}\\alpha}-\\text{log}_{7}\\beta\\)? Hint: let \\(u = \\text{log}_{7}\\beta\\)",
        variables: [],
        response: null,
        "Sample Questions": null,
      },
      "6": {
        id: 6,
        prompt:
          "Rearragne the equation \\(u-\\frac{2-u}{u}=\\frac{u}{2-u}-u\\), which of the followings is correct?  ",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "\\(2u^3-2u^2-4u+4=0\\)",
              nextStep: 8,
            },
            {
              value: "\\(2u^3-2u^2-2u+4=0\\)",
            },
            {
              value: "\\((2u-2)^2=0\\)",
            },
          ],
        },
        "Sample Questions": null,
      },
      "7": {
        id: 7,
        prompt: "Factorize \\(2u^3-2u^2-4u+4=0\\), what will you get?",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "\\(2(u-1)(u^2-2)\\)",
              nextStep: 9,
            },
            {
              value: "\\(2(u+1)(u^2-2)\\)",
            },
            {
              value: "\\(2(u-1)(u^2+2)\\)",
            },
          ],
        },
        "Sample Questions": null,
      },
      "8": {
        id: 8,
        prompt:
          "Solve the quations\\(2(u-1)(u^2-2)\\), what are the values of \\(u\\)? Hint: More than 1 answers.",
        variables: [],
        response: {
          type: "multioption",
          options: [
            "\\(u=\\sqrt{2}\\)",
            "\\(u=-\\sqrt{2}\\)",
            "\\(u=1\\)",
            "\\(u=-1\\)",
            "\\(u=2\\)",
            "\\(u=-2\\)",
          ],
          correctOptions: [
            "\\(u=1\\)",
            "\\(u=\\sqrt{2}\\)",
            "\\(u=-\\sqrt{2}\\)",
          ],
          nextStep: 10,
        },
        "Sample Questions": null,
      },
      "9": {
        id: 9,
        prompt:
          "Recall \\(\\beta>\\alpha>1\\), plug in the unknown \\(u=\\text{log}_7\\beta\\), which of the following is the correct expression of the inequality \\(\\beta>\\alpha>1\\)? ",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: "\\(7^u>7^{2-u}>1\\)",
              nextStep: 11,
            },
            {
              value: "\\(u^7>(u-2)^7>1\\)",
            },
            {
              value: "u>u-2>1",
            },
          ],
        },
        "Sample Questions": null,
      },
      "10": {
        id: 10,
        prompt:
          "Recall that you calculated \\(u=1\\) or \\(u=\\sqrt{2}\\) or \\(u=-\\sqrt{2}\\), which values of \\(u\\) statisfy the inequality \\(7^u>7^{2-u}>1\\)?",
        variables: [],
        response: {
          type: "multioption",
          options: ["\\(u=1\\)", "\\(u=\\sqrt{2}\\)", "\\(u=-\\sqrt{2}\\)"],
          correctOptions: ["\\(u=\\sqrt{2}\\)"],
          nextStep: 12,
        },
        "Sample Questions": null,
      },
      "11": {
        id: 11,
        prompt:
          "The ultimate goal of this question is to find the common difference \\(\\text{log}_{7}\\beta-\\frac{\\text{log}_{7}\\alpha}{\\text{log}_{7}\\beta}\\), \nalso recall we denote \\(u=\\text{log}_{7}\\beta\\) and \\(2-u=\\text{log}_{7}\\alpha\\),\nand previously we find \\(u=\\sqrt{2}\\),\nWhat is the value of the common difference? ",
        variables: [],
        response: {
          type: "option",
          options: [
            {
              value: 1,
              nextStep: 13,
            },
          ],
        },
        "Sample Questions": null,
      },
      "12": {
        id: 12,
        prompt: "Thank you",
        variables: [],
        response: {
          type: "end",
        },
        "Sample Questions": null,
      },
    },
  },
};

export const sampleData = {
  MATH: {
    sample: {
      "1": {
        id: 1,
        subject: "Mathematics",
        name: "Sine Law",
        question:
          "In \\( \\triangle ABC \\), \\( AB = 8 cm \\), \\( BC = 5 cm \\), and \\( \\angle CAB = 20^\\circ \\). Find \\( \\angle ACB \\) and \\( AC \\).",
        figure: "image/Sample/MATH_Sample1/Photo1.svg",
        Concept: 1,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{align*}\n\\text{By the sine law,}& \\\\\n\\frac{8 cm}{sin{\\angle ACB}} &= \\frac{5 cm}{sin{20^\\circ}} \\\\\n\\angle ACB &\\approx 33.177^\\circ \\text{ or } 146.823^\\circ \\\\\n&\\approx \\underline{\\underline{33.2^\\circ}} \\text { or } \\underline{\\underline{146.8^\\circ}}\n\\textit{(cor. to 1 d.p.)} \\\\\n\\end{align*}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "2": {
        id: 2,
        subject: "Mathematics",
        name: "Property of Geometric ratios",
        question:
          "Given a geometric sequence \\(T(n) = ar^n \\), if \\(T(2)=3 \\) and \\(T(4)=12\\), find \\(a\\) and \\(r\\).",
        figure: null,
        Concept: 2,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Given } T(2) = 3 \\text{ and } T(4) = 12\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 7],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Known } [T(n)]^2 = T(n-1) \\times T(n-2) \\\\\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\ [T(3)]^2 &= T(2) \\times T(4) \\\\\nT(3) &= \\sqrt{3 \\times 12} \\\\\nT(3) &= \\sqrt{36} \\\\\nT(3) &= 6 \\text{ or } T(3) = -6 \\\\\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [3, 5],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{For } T(3) &= 6 \\text{, apply common ratio,} \\\\\nr &= \\frac{T(3)}{T(2)} \\\\\nr &= \\frac{6}{3} \\\\\nr &= 2 \\\\\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\nT(2) &= a \\times r \\\\\n3 &= a \\times 2 \\\\\na &= 1.5 \\\\\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "5": {
            id: 5,
            text: "\\[\n\\begin{aligned}\n\\text{For } T(3) &= -6 \\text{, apply common ratio,} \\\\\nr &= \\frac{T(3)}{T(2)} \\\\\nr &= \\frac{-6}{3} \\\\\nr &= -2 \\\\\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [6],
          },
          "6": {
            id: 6,
            text: "\\[\n\\begin{aligned}\nT(2) &= a \\times r \\\\\n3 &= a \\times -2 \\\\\na &= -1.5 \\\\\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "7": {
            id: 7,
            text: "\\[\n\\left\\{\n\\begin{aligned}\nar &= 3 \\text{ ---1} \\\\\nar^3 &= 12 \\text{ ---2} \\\\\n\\end{aligned}\n\\right.\n\\]",
            Photo: null,
            Links: [8],
          },
          "8": {
            id: 8,
            text: "\\[\n\\begin{aligned}\n2 \\div 1 &:\\\\\nr^2 &= 4 \\\\\nr = 2 &\\text{ or } r = -2 \\\\\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [3, 5],
          },
        },
      },
      "3": {
        id: 3,
        subject: "Mathematics",
        name: "Skillset 1",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 3,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "4": {
        id: 4,
        subject: "Mathematics",
        name: "Skillset 2",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 4,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "5": {
        id: 5,
        subject: "Mathematics",
        name: "Skillset 3",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 5,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "6": {
        id: 6,
        subject: "Mathematics",
        name: "Skillset 4",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 6,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "7": {
        id: 7,
        subject: "Mathematics",
        name: "Skillset 5",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 7,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "8": {
        id: 8,
        subject: "Mathematics",
        name: "Skillset 6",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 8,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "9": {
        id: 9,
        subject: "Mathematics",
        name: "Skillset 7",
        question: "(A simple questions with 1 key concept describes a trap)",
        figure: null,
        Concept: 9,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "10": {
        id: 10,
        subject: "Mathematics",
        name: "Skillset 8",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 10,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "11": {
        id: 11,
        subject: "Mathematics",
        name: "Skillset 9",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 11,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "12": {
        id: 12,
        subject: "Mathematics",
        name: "Skillset 10",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 12,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "13": {
        id: 13,
        subject: "Mathematics",
        name: "Skillset 11",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 13,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "14": {
        id: 14,
        subject: "Mathematics",
        name: "Skillset 12",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 14,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "15": {
        id: 15,
        subject: "Mathematics",
        name: "Skillset 13",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 15,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "16": {
        id: 16,
        subject: "Mathematics",
        name: "Skillset 14",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 16,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "17": {
        id: 17,
        subject: "Mathematics",
        name: "Skillset 15",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 17,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "18": {
        id: 18,
        subject: "Mathematics",
        name: "Skillset 16",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 18,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "19": {
        id: 19,
        subject: "Mathematics",
        name: "Skillset 17",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 19,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "20": {
        id: 20,
        subject: "Mathematics",
        name: "Skillset 18",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 20,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "21": {
        id: 21,
        subject: "Mathematics",
        name: "Skillset 19",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 21,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "22": {
        id: 22,
        subject: "Mathematics",
        name: "Skillset 20",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 22,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "23": {
        id: 23,
        subject: "Mathematics",
        name: "Skillset 21",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 23,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "24": {
        id: 24,
        subject: "Mathematics",
        name: "Skillset 22",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 24,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "25": {
        id: 25,
        subject: "Mathematics",
        name: "Skillset 23",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 25,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "26": {
        id: 26,
        subject: "Mathematics",
        name: "Skillset 24",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 26,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "27": {
        id: 27,
        subject: "Mathematics",
        name: "Skillset 25",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 27,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "28": {
        id: 28,
        subject: "Mathematics",
        name: "Skillset 26",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 28,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "29": {
        id: 29,
        subject: "Mathematics",
        name: "Skillset 27",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 29,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "30": {
        id: 30,
        subject: "Mathematics",
        name: "Skillset 28",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 30,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "31": {
        id: 31,
        subject: "Mathematics",
        name: "Skillset 29",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 31,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "32": {
        id: 32,
        subject: "Mathematics",
        name: "Skillset 30",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 32,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "33": {
        id: 33,
        subject: "Mathematics",
        name: "Skillset 31",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 33,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "34": {
        id: 34,
        subject: "Mathematics",
        name: "Skillset 32",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 34,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "35": {
        id: 35,
        subject: "Mathematics",
        name: "Skillset 33",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 35,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "36": {
        id: 36,
        subject: "Mathematics",
        name: "Skillset 34",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 36,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "37": {
        id: 37,
        subject: "Mathematics",
        name: "Skillset 35",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 37,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "38": {
        id: 38,
        subject: "Mathematics",
        name: "Skillset 36",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 38,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "39": {
        id: 39,
        subject: "Mathematics",
        name: "Skillset 37",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 39,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "40": {
        id: 40,
        subject: "Mathematics",
        name: "Skillset 38",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 40,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "41": {
        id: 41,
        subject: "Mathematics",
        name: "Skillset 39",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 41,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
      "42": {
        id: 42,
        subject: "Mathematics",
        name: "Skillset 40",
        question: "(A simple questions with 1 key concept)",
        figure: null,
        Concept: 42,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{aligned}\n\\text{Step 0}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{aligned}\n\\text{Method 1 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 1}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{aligned}\n\\text{Method 2 - Step 2}\n\\end{aligned}\n\\]",
            Photo: null,
            Links: [],
          },
        },
      },
    },
  },
};

export const conceptData = {
  MATH: {
    concept: {
      "1": {
        id: 1,
        subject: "Mathematics",
        name: "Sine Formula",
        text: "\\[\n\\begin{align*}\n\\text{Sine Law:} \\\\\n\\frac{a}{sin{A}}&=\\frac{b}{sin{B}}=\\frac{c}{sin{C}} \\text{ or } \\\\\n\\frac{sin{A}}{a}&=\\frac{sin{B}}{b}=\\frac{sin{C}}{c} \\\\\n\\end{align*}\n\\]\n\nThis is commonly used when you have to find <b>specific lines/angles</b> in a triangle, when you find some\n<b>pairs</b>.",
        figure: "image/Concepts/MATH_Concept1/Photo1.svg",
      },
      "3": {
        id: 3,
        subject: "Mathematics",
        name: "Power Rule of Logarithm ",
        text: '\\[\n\\begin{align*}\n\\text{log}_bm^n=n\\text{log}_bm\n\\end{align*}\n\\]\n<p style="text-align: center;">\nThis is commonly used when you have to merge the coefficient of logarithm to the power, or simplify exponential to basic computation.\n</p>',
        figure: null,
      },
      "4": {
        id: 4,
        subject: "Mathematics",
        name: "Product Rule of Logarithm ",
        text: '\\[\n\\begin{align*}\n\\text{log}_b\\left(mn\\left)=\\text{log}_bm+\\text{log}_bn\n\\end{align*}\n\\]\n<p style="text-align: center;">\nThis is commonly used when you have to merge two logarithm together when they adds each other.\n</p>',
        figure: null,
      },
      "5": {
        id: 5,
        subject: "Mathematics",
        name: "Logarithm of the same number as base",
        text: '\\[\n\\begin{align*}\n\\text{log}_b\\left(mn\\left)=\\text{log}_bm+\\text{log}_bn\n\\end{align*}\n\\]\n<p style="text-align: center;">\nThis is commonly used when you have to merge two logarithm together when they adds each other.\n</p>',
        figure: null,
      },
      "6": {
        id: 6,
        subject: "Mathematics",
        name: "Quadratic Equations",
        text: "An equation of the form \\( ax^2 + bx + c = 0 \\). Solutions found using the quadratic formula: \\( x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\).",
        figure: null,
      },
      "7": {
        id: 7,
        subject: "Mathematics",
        name: "Functions and Graphs",
        text: "A function relates inputs to outputs. Graphs visually represent functions.",
        figure: null,
      },
      "8": {
        id: 8,
        subject: "Mathematics",
        name: "Exponential Equations",
        text: "Equations of the form \\( y = ab^x \\). These grow rapidly as \\( x \\) increases.",
        figure: null,
      },
      "9": {
        id: 9,
        subject: "Mathematics",
        name: "Equations of Straight Line",
        text: "The general form is \\( y = mx + b \\), where \\( m \\) is the slope and \\( b \\) is the y-intercept.",
        figure: null,
      },
      "10": {
        id: 10,
        subject: "Mathematics",
        name: "Polynomials",
        text: "An expression consisting of variables and coefficients, e.g., \\( p(x) = a_nx^n + a_{n-1}x^{n-1} + ... + a_0 \\).",
        figure: null,
      },
      "11": {
        id: 11,
        subject: "Mathematics",
        name: "Variations",
        text: "Direct variation: \\( y = kx \\); inverse variation: \\( y = \\frac{k}{x} \\).",
        figure: null,
      },
      "12": {
        id: 12,
        subject: "Mathematics",
        name: "Quadratic Equations Solutions",
        text: "Solutions can be real or complex. The discriminant \\( D = b^2 - 4ac \\) determines the nature of the roots.",
        figure: null,
      },
      "13": {
        id: 13,
        subject: "Mathematics",
        name: "Simultaneous Equations",
        text: "Solve equations together, often using substitution or elimination methods.",
        figure: null,
      },
      "14": {
        id: 14,
        subject: "Mathematics",
        name: "Function Graphs",
        text: "Visual representation of a function. Key features include intercepts, slopes, and asymptotes.",
        figure: null,
      },
      "15": {
        id: 15,
        subject: "Mathematics",
        name: "Properties of Circle",
        text: "A circle's properties include the radius, diameter, circumference \\( C = 2\\pi r \\), and area \\( A = \\pi r^2 \\).",
        figure: null,
      },
      "16": {
        id: 16,
        subject: "Mathematics",
        name: "Percentages",
        text: "A way to express a number as a fraction of 100. Calculated as \\( \\text{Percentage} = \\frac{\\text{Part}}{\\text{Whole}} \\times 100 \\).",
        figure: null,
      },
      "17": {
        id: 17,
        subject: "Mathematics",
        name: "Indices",
        text: "Exponential notation \\( a^n \\) represents repeated multiplication. Laws of indices include \\( a^m \\cdot a^n = a^{m+n} \\).",
        figure: null,
      },
      "18": {
        id: 18,
        subject: "Mathematics",
        name: "Surds",
        text: "An expression containing a root, such as \\( \\sqrt{2} \\). Cannot be simplified to remove the root.",
        figure: null,
      },
      "19": {
        id: 19,
        subject: "Mathematics",
        name: "Rate",
        text: "A ratio that compares two quantities, often expressed as \\( \\text{Rate} = \\frac{\\text{Distance}}{\\text{Time}} \\).",
        figure: null,
      },
      "20": {
        id: 20,
        subject: "Mathematics",
        name: "Ratio",
        text: "A relationship between two numbers, expressed as \\( a:b \\) or \\( \\frac{a}{b} \\).",
        figure: null,
      },
      "21": {
        id: 21,
        subject: "Mathematics",
        name: "Basic Geometry",
        text: "Study of shapes, sizes, and properties of space, including points, lines, angles, surfaces, and solids.",
        figure: null,
      },
      "22": {
        id: 22,
        subject: "Mathematics",
        name: "Coordinate Geometry",
        text: "Study of geometry using a coordinate system. Key concepts include distance formula and midpoint formula.",
        figure: null,
      },
      "23": {
        id: 23,
        subject: "Mathematics",
        name: "Arithmetic Sequences",
        text: "A sequence of numbers with a constant difference \\( a_n = a_1 + (n-1)d \\).",
        figure: null,
      },
      "24": {
        id: 24,
        subject: "Mathematics",
        name: "Sum of Geometric Sequences",
        text: "The sum \\( S_n = a \\frac{1 - r^n}{1 - r} \\) for \\( r \\neq 1 \\), where \\( a \\) is the first term.",
        figure: null,
      },
      "25": {
        id: 25,
        subject: "Mathematics",
        name: "Sum of Arithmetic Sequences",
        text: "The sum \\( S_n = \\frac{n}{2} (a + l) \\), where \\( a \\) is the first term and \\( l \\) is the last term.",
        figure: null,
      },
      "26": {
        id: 26,
        subject: "Mathematics",
        name: "Linear Inequality",
        text: "An inequality that involves a linear function, e.g., \\( ax + b < c \\).",
        figure: null,
      },
      "27": {
        id: 27,
        subject: "Mathematics",
        name: "Linear Programming",
        text: "A method to achieve the best outcome in a mathematical model represented by linear relationships.",
        figure: null,
      },
      "28": {
        id: 28,
        subject: "Mathematics",
        name: "Locus",
        text: "A set of points satisfying a particular condition, often representing geometric shapes.",
        figure: null,
      },
      "29": {
        id: 29,
        subject: "Mathematics",
        name: "Basic Trigonometry",
        text: "Study of relationships between the angles and sides of triangles, including sine, cosine, and tangent functions.",
        figure: null,
      },
      "30": {
        id: 30,
        subject: "Mathematics",
        name: "Cosine Law",
        text: "\\( c^2 = a^2 + b^2 - 2ab \\cos(C) \\) allows calculation of a side or angle in a triangle.",
        figure: null,
      },
      "31": {
        id: 31,
        subject: "Mathematics",
        name: "Heron's Formula",
        text: "Area \\( A = \\sqrt{s(s-a)(s-b)(s-c)} \\), where \\( s = \\frac{a+b+c}{2} \\) is the semi-perimeter.",
        figure: null,
      },
      "32": {
        id: 32,
        subject: "Mathematics",
        name: "Permutation",
        text: "Arrangement of objects in a specific order. Calculated as \\( nPr = \\frac{n!}{(n-r)!} \\).",
        figure: null,
      },
      "33": {
        id: 33,
        subject: "Mathematics",
        name: "Combination",
        text: "Selection of objects without regard to order. Calculated as \\( nCr = \\frac{n!}{r!(n-r)!} \\).",
        figure: null,
      },
      "34": {
        id: 34,
        subject: "Mathematics",
        name: "Probability",
        text: "The likelihood of an event occurring, calculated as \\( P(E) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total outcomes}} \\).",
        figure: null,
      },
      "35": {
        id: 35,
        subject: "Mathematics",
        name: "Measures of Dispersion",
        text: "Describes the spread of data, including range, variance, and standard deviation.",
        figure: null,
      },
      "36": {
        id: 36,
        subject: "Mathematics",
        name: "Statistics",
        text: "Study of data collection, analysis, interpretation, presentation, and organization.",
        figure: null,
      },
      "37": {
        id: 37,
        subject: "Mathematics",
        name: "Estimation and Approximation",
        text: "Methods to find a value that is close to the exact value, often used in calculations.",
        figure: null,
      },
      "38": {
        id: 38,
        subject: "Mathematics",
        name: "Transformation",
        text: "Operations that alter the position or size of a figure, including translations, rotations, and reflections.",
        figure: null,
      },
      "39": {
        id: 39,
        subject: "Mathematics",
        name: "Symmetry",
        text: "A property where a shape is invariant under certain transformations, such as reflection or rotation.",
        figure: null,
      },
      "40": {
        id: 40,
        subject: "Mathematics",
        name: "Measuration",
        text: "Involves calculating the dimensions, area, volume, and other properties of geometric figures.",
        figure: null,
      },
      "41": {
        id: 41,
        subject: "Mathematics",
        name: "Basic Probability",
        text: "Fundamental concepts of probability, including experiments, outcomes, and events.",
        figure: null,
      },
      "42": {
        id: 42,
        subject: "Mathematics",
        name: "Central Tendency",
        text: "Measures that describe the center of a data set, including mean, median, and mode.",
        figure: null,
      },
    },
  },
  "MATH ": {
    concept: {
      "2": {
        id: 2,
        subject: "Mathematics",
        name: "Geometric sequence",
        text: '\\left[T\\left(n\\right)\\right]^2=T\\left(n-1\\right)\\timesT\\left(n+1\\right),\\text{ where }n>1\n<p style="text-align: center;">\nThis is commonly used when you have to find <b>geometric ratio</b> in a geometric sequence, when you have some\n<b>consecutive sequences</b>.\n</p>',
        figure: null,
      },
    },
  },
};
