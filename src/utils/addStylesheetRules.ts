import type { Animation } from "../state/animationStore";

export function addStylesheetRules(
  rules: Array<[string, Array<string>]>,
  styleEl: HTMLStyleElement
) {
  // Grab style element's sheet
  var styleSheet = styleEl.sheet;

  for (var i = 0; i < rules.length; i++) {
    var j = 1,
      rule = rules[i],
      selector = rule[0],
      propStr = "";
    // If the second argument of a rule is an array of arrays, correct our variables.
    if (Array.isArray(rule[1][0])) {
      rule = rule[1];
      j = 0;
    }

    for (var pl = rule.length; j < pl; j++) {
      var prop = rule[j];
      propStr +=
        prop[0] + ": " + prop[1] + (prop[2] ? " !important" : "") + ";\n";
    }

    // Insert CSS Rule
    styleSheet.insertRule(
      selector + "{" + propStr + "}",
      styleSheet.cssRules.length
    );
  }
}

export function generateKeyframeString(
  animationName: string,
  rules: Array<[string, Array<string>]>
) {
  let selector = `@keyframes ${animationName}`;
  let indent = 2;
  let propStr = "";

  for (let j = 0; j < rules.length; j++) {
    let keyframe = rules[j];
    let percent = keyframe[0];
    let properties = keyframe[1];

    propStr += " ".repeat(indent) + percent + " {\n";

    // Check if properties[0] is an array so multiple properties can be added
    if (Array.isArray(properties[0])) {
      properties.forEach(
        (property) =>
          (propStr +=
            " ".repeat(indent * 2) + property[0] + ": " + property[1] + ";\n")
      );
    } else {
      propStr +=
        " ".repeat(indent * 2) + properties[0] + ": " + properties[1] + ";\n";
    }

    propStr += " ".repeat(indent) + "}\n";
  }

  const fullRule = selector + " {\n" + propStr + "}";
  return fullRule;
}

export function replaceStylesheetKeyframes(
  animationName: string,
  rules: Array<[string, Array<string>]>,
  styleEl: HTMLStyleElement
) {
  // Grab style element's sheet
  var styleSheet = styleEl.sheet;
  const ruleIdx = 0;

  const keyframeString = generateKeyframeString(animationName, rules);

  // Replace Css rule
  if (styleSheet.cssRules.length) {
    styleSheet.removeRule(ruleIdx);
  }

  styleSheet.insertRule(keyframeString, ruleIdx);
}

export function generateSvgString() {
  const documentElement = document.getElementById("primary-svg");
  var s = new XMLSerializer();
  var str = s.serializeToString(documentElement);
  return str;
}

export function generateAnimationString(animations: Array<Animation>) {
  let str = "animation: ";

  animations.forEach((animation, idx) => {
    str += `${animation.name} ${animation.duration}s ${animation.delay}s ${
      animation.easing
    } ${animation.infinite ? `infinite` : ""}`;
    if (idx < animations.length - 1) {
      str += ", ";
    }
  });

  str += ";";

  return str;
}

export function replaceStylesheetAnimation(
  animations: Array<Animation>,
  styleEl: HTMLStyleElement
) {
  // Grab style element's sheet
  var styleSheet = styleEl.sheet;
  const ruleIdx = 0;
  let selector = `.svgElement`;

  const animationString = generateAnimationString(animations);

  const fullString = selector + ` {\n` + animationString + `\n}`;

  // Replace Css rule
  if (styleSheet.cssRules.length) {
    styleSheet.removeRule(ruleIdx);
  }

  styleSheet.insertRule(fullString, ruleIdx);

  console.log(styleSheet);
}
