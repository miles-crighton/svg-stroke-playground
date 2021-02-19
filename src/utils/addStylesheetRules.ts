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

export function replaceStylesheetAnimation(
  rules: Array<[string, Array<string>]>,
  styleEl: HTMLStyleElement
) {
  console.log("ADDING ANIMATION");
  // Grab style element's sheet
  var styleSheet = styleEl.sheet;
  const ruleIdx = 0;

  let selector = `@keyframes my-animation`;
  let propStr = "";

  for (let j = 0; j < rules.length; j++) {
    let keyframe = rules[j];
    let percent = keyframe[0];
    let properties = keyframe[1];

    propStr += percent + "{";

    // Check if properties[0] is an array so multiple properties can be added
    if (Array.isArray(properties[0])) {
      properties.forEach(
        (property) => (propStr += property[0] + ": " + property[1] + ";\n")
      );
    } else {
      propStr += properties[0] + ": " + properties[1] + ";\n";
    }

    propStr += "}";
  }

  // Replace Css rule
  if (styleSheet.cssRules.length) {
    styleSheet.removeRule(ruleIdx);
  }

  const fullRule = selector + "{" + propStr + "}";

  console.log(fullRule);

  styleSheet.insertRule(fullRule, ruleIdx);

  console.log(styleSheet.cssRules);
}
