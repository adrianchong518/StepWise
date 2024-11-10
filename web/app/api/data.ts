export const questionData = {
  Math_2023_17_a: {
    Subject: "Math",
    year: 2023,
    questionNumber: 17,
    part: "a",
    Content:
      "It is given that \\( WXY \\) is a triangle, where \\( WX = 6 cm \\), \\( XY = 5 cm \\) and \\( \\angle WYX = 70^\\circ \\). Find \\( \\angle XWY \\).",
    Photo: null,
    var: {
      WXY: {
        Given: 1,
        Value: "Triangle",
        Photo1: "image\\Questions\\MATH_2023_17a\\aWXY1.svg",
        Photo2: null,
      },
      WX: {
        Given: 1,
        Value: 6,
        Photo1: "image\\Questions\\MATH_2023_17a\\WX.svg",
        Photo2: null,
      },
      XY: {
        Given: 1,
        Value: 5,
        Photo1: "image\\Questions\\MATH_2023_17a\\XY.svg",
        Photo2: null,
      },
      "\\angle WYX": {
        Given: 1,
        Value: "70^\\circ",
        Photo1: "image\\Questions\\MATH_2023_17a\\aWYX.svg",
        Photo2: null,
      },
      "\\angle WXY": {
        Given: 0,
        Value: "51.5^\\circ",
        Photo1: "image\\Questions\\MATH_2023_17a\\aWXY.svg",
        Photo2: "image\\Questions\\MATH_2023_17a\\aWXY2.svg",
      },
      "\\angle XWY": {
        Given: 0,
        Value: "Unknown",
        Photo1: "image\\Questions\\MATH_2023_17a\\aXWY.svg",
        Photo2: null,
      },
    },
    steps: {
      "0": {
        Questions: "From the questions, we've obtain the following variables",
        Variables: ["WXY", "WX", "XY", "\\angle WYX", "\\angle XWY"],
        Choices: [["OK", 1]],
        "Sample Questions": -1,
      },
      "1": {
        Questions: "What method should we use to find \\( \\angle XWY \\)?",
        Variables: ["WXY", "\\angle XWY"],
        Choices: [
          ["sine law", 2],
          ["cosine law", -1],
          ["Herons Formula", -1],
        ],
        "Sample Questions": 1,
      },
      "2": {
        Questions: "How can we apply sin law?",
        Variables: [
          "WXY",
          "WX",
          "XY",
          "\\angle WYX",
          "\\angle XWY",
          "\\angleWYX",
        ],
        Choices: [
          ["WX", "XY", "\\angleWYX", "\\angleWXY"],
          ["WX", "XY", "\\angleWYX"],
          3,
        ],
        "Sample Questions": 1,
      },
      "3": {
        Questions: "Apply sin law, what is the answer? (correct to 3 sig fig)",
        Variables: ["WXY", "WX", "XY", "\\angle WYX", "\\angle XWY"],
        Choices: [[51.5, -1]],
        "Sample Questions": 1,
      },
    },
  },
  Math_2023_17_b: {
    Subject: "Math",
    Content:
      "Figure 3 shows the pyramid \\( WXYZ \\), where \\( WZ=XZ=YZ \\). The base of this pyramid is the triangle \\( WXY \\) described in (a). It is given that the angle between \\( WZ \\) and the triangle \\( WXY \\) is \\( 30^\\circ \\). Does the angle between the triangles \\( WXY \\) and \\( XYZ \\) exceed \\( 45^\\circ \\)? Explain your answer.",
    Photo: "image/MATH_2023_17b_Figure3.svg",
  },
};

export const sampleData = {
  MATH: {
    sample: {
      "1": {
        "Skill set": "Sine Law",
        Questions:
          "In \\( \\triangle ABC \\), \\( Ab = 8 cm \\), \\( BC = 5 cm \\), and \\( \\angle CAB = 20^\\circ \\). Find \\( \\angle ACB \\) and \\( AC \\).",
        Photo: null,
        Concept: 1,
      },
    },
    steps: {
      "0": {
        step: "\\[\n\\begin{align*}\n\\text{By the sine law,}& \\\\\n\\frac{8 cm}{sin{\\angle ACB}} &= \\frac{5 cm}{sin{20^\\circ}} \\\\\n\\angle ACB &\\approx 33.177^\\circ \\text{ or } 146.823^\\circ \\\\\n&\\approx \\underline{\\underline{33.2^\\circ}} \\text { or } \\underline{\\underline{146.8^\\circ}}\n\\textit{(cor. to 1 d.p.)} \\\\\n\\end{align*}\n\\]",
        Photo: null,
        Links: [1, 3],
      },
      "1": {
        step: "\\[\n\\begin{align*}\n\\text{For } \\angle ACB \\approx 33.177^\\circ \\text{,}& \\\\\n\\angle CBA &\\approx 180^\\circ - 20^\\circ - 33.177^\\circ \\textit{(} \\angle \\textit{ sum of } \\triangle\n\\textit{)} \\\\\n&=126.823^\\circ\n\\end{align*}\n\\]",
        Photo: null,
        Links: [2],
      },
      "2": {
        step: "\\[\n\\begin{align*}\n\\text{By the sine law,}& \\\\\n\\frac{AC}{sin{126.823^\\circ}} &\\approx \\frac{5 cm}{sin{20^\\circ}} \\\\\nAC &\\approx \\underline{\\underline{11.7 cm}} \\textit{(cor. to 1 d.p.)} \\\\\n\\end{align*}\n\\]",
        Photo: null,
        Links: [],
      },
      "3": {
        step: "\\[\n\\begin{align*}\n\\text{For } \\angle ACB \\approx 146.823^\\circ \\text{,}& \\\\\n\\angle CBA &\\approx 180^\\circ - 20^\\circ - 146.823^\\circ \\textit{(} \\angle \\textit{ sum of } \\triangle\n\\textit{)} \\\\\n&=13.177^\\circ\n\\end{align*}\n\\]",
        Photo: null,
        Links: [4],
      },
      "4": {
        step: "\\[\n\\begin{align*}\n\\text{By the sine law,}& \\\\\n\\frac{AC}{sin{13.177^\\circ}} &\\approx \\frac{5 cm}{sin{20^\\circ}} \\\\\nAC &\\approx \\underline{\\underline{3.3 cm}} \\textit{(cor. to 1 d.p.)} \\\\\n\\end{align*}\n\\]",
        Photo: null,
        Links: [],
      },
    },
  },
};
