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
        prompt: "From the questions, we've obtain the following variables",
        variables: ["triangle WXY", "WX", "XY", "\\angle WYX", "\\angle XWY"],
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
        prompt: "What method should we use to find \\( \\angle XWY \\)?",
        variables: ["triangle WXY", "\\angle XWY"],
        response: {
          type: "option",
          options: [
            {
              value: "Sine Law",
              nextStep: 2,
            },
            {
              value: "Cosine Law",
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
        prompt: "How can we apply sin law?",
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
        prompt: "Apply sin law, what is the answer? (correct to 3 sig fig)",
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
          "Apply Product rule of Logarithm, what is the correct expression of \\( \\text{log}_{7} \\alpha \\beta \\)?",
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
          "Apply Logarithm of the same number as base and Product Rule, what is the correct expression for \\( \\text{log}_{7}7^2=\\text{log)_{7}\\alpha\\beta \\) ?",
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
  },
  "Math _2023_18_a": {
    variables: {
      "\\beta": {
        value: "Unknown",
        given: 1,
        figure1: null,
        figure2: null,
      },
    },
  },
  "Math _2023_18_b": {
    steps: {
      "0": {
        id: 0,
        prompt:
          "From the questions, we've obtain the following variables \\(\\bf{\\alpha}\\), \\(\\bf{\\beta}\\).",
        variables: [],
        response: {
          type: "option",
          options: {
            value: ["OK"],
            nextStep: [1],
          },
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
        figure: "image\\Sample\\MATH_Sample1\\Photo1.svg",
        Concept: 1,
        steps: {
          "0": {
            id: 0,
            text: "\\[\n\\begin{align*}\n\\text{By the sine law,}& \\\\\n\\frac{8 cm}{sin{\\angle ACB}} &= \\frac{5 cm}{sin{20^\\circ}} \\\\\n\\angle ACB &\\approx 33.177^\\circ \\text{ or } 146.823^\\circ \\\\\n&\\approx \\underline{\\underline{33.2^\\circ}} \\text { or } \\underline{\\underline{146.8^\\circ}}\n\\textit{(cor. to 1 d.p.)} \\\\\n\\end{align*}\n\\]",
            Photo: null,
            Links: [1, 3],
          },
          "1": {
            id: 1,
            text: "\\[\n\\begin{align*}\n\\text{For } \\angle ACB \\approx 33.177^\\circ \\text{,}& \\\\\n\\angle CBA &\\approx 180^\\circ - 20^\\circ - 33.177^\\circ \\textit{(} \\angle \\textit{ sum of } \\triangle\n\\textit{)} \\\\\n&=126.823^\\circ\n\\end{align*}\n\\]",
            Photo: "image/Sample/MATH_Sample1/Photo2.svg",
            Links: [2],
          },
          "2": {
            id: 2,
            text: "\\[\n\\begin{align*}\n\\text{By the sine law,}& \\\\\n\\frac{AC}{sin{126.823^\\circ}} &\\approx \\frac{5 cm}{sin{20^\\circ}} \\\\\nAC &\\approx \\underline{\\underline{11.7 cm}} \\textit{(cor. to 1 d.p.)} \\\\\n\\end{align*}\n\\]",
            Photo: null,
            Links: [5],
          },
          "3": {
            id: 3,
            text: "\\[\n\\begin{align*}\n\\text{For } \\angle ACB \\approx 146.823^\\circ \\text{,}& \\\\\n\\angle CBA &\\approx 180^\\circ - 20^\\circ - 146.823^\\circ \\textit{(} \\angle \\textit{ sum of } \\triangle\n\\textit{)} \\\\\n&=13.177^\\circ\n\\end{align*}\n\\]",
            Photo: "image/Sample/MATH_Sample1/Photo3.svg",
            Links: [4],
          },
          "4": {
            id: 4,
            text: "\\[\n\\begin{align*}\n\\text{By the sine law,}& \\\\\n\\frac{AC}{sin{13.177^\\circ}} &\\approx \\frac{5 cm}{sin{20^\\circ}} \\\\\nAC &\\approx \\underline{\\underline{3.3 cm}} \\textit{(cor. to 1 d.p.)} \\\\\n\\end{align*}\n\\]",
            Photo: null,
            Links: [5],
          },
          "5": {
            id: 5,
            text: "\\[\n\\left\\{\n\\begin{aligned}\n\\angle CBA &\\approx 33.177^\\circ \\\\\nAC &\\approx 11.7 cm \\\\\n\\end{aligned}\n\\right.\n\\text{ or }\n\\left\\{\n\\begin{aligned}\n\\angle CBA &\\approx 146.823^\\circ \\\\\nAC &\\approx 3.3 cm \\\\\n\\end{aligned}\n\\right.\n\\]",
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
        text: '\\[\n\\begin{align*}\n\\text{Sine Law:} \\\\\n\\frac{a}{sin{A}}&=\\frac{b}{sin{B}}=\\frac{c}{sin{C}} \\text{ or } \\\\\n\\frac{sin{A}}{a}&=\\frac{sin{B}}{b}=\\frac{sin{C}}{c} \\\\\n\\end{align*}\n\\]\n<p style="text-align: center;">\nThis is commonly used when you have to find <b>specific lines/angles</b> in a triangle, when you find some\n<b>pairs</b>.\n</p>',
        figure: "image/Concepts/MATH_Concept1/Photo1.svg",
      },
      "2": {
        id: 2,
        subject: "Mathematics",
        name: "Logarithm of the same number as base",
        text: "\\text{log}_{a}a=1",
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
        text: "\\left[T\\left(n\\right)\\right]^2=T\\left(n-1\\right)\\timesT\\left(n+1\\right),\\text{ where }n>1",
        figure: null,
      },
    },
  },
};
