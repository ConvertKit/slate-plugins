import React from "react";
import Prism from "prismjs";

const getContent = token => {
  if (typeof token == "string") {
    return token;
  } else if (typeof token.content == "string") {
    return token.content;
  } else {
    return token.content.map(getContent).join("");
  }
};

// https://github.com/GitbookIO/slate-edit-code
const createDecoration = ({ text, textStart, textEnd, start, end, type }) => {
  if (start >= textEnd || end <= textStart) {
    return null;
  }

  // Shrink to this text boundaries
  start = Math.max(start, textStart);
  end = Math.min(end, textEnd);

  // Now shift offsets to be relative to this text
  start -= textStart;
  end -= textStart;

  return {
    anchor: {
      key: text.key,
      offset: start
    },
    focus: {
      key: text.key,
      offset: end
    },
    mark: {
      type
    }
  };

  return {
    anchorKey: text.key,
    anchorOffset: start,
    focusKey: text.key,
    focusOffset: end,
    marks: [{ type: "prism-token", data: { className } }]
  };
};

export default () => ({
  renderMark(props, editor, next) {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "comment":
        return (
          <span {...attributes} data-type="comment" style={{ opacity: "0.33" }}>
            {children}
          </span>
        );
      case "keyword":
        return (
          <span
            {...attributes}
            data-type="keyword"
            style={{ fontWeight: "bold" }}
          >
            {children}
          </span>
        );
      case "tag":
        return (
          <span {...attributes} data-type="tag" style={{ fontWeight: "bold" }}>
            {children}
          </span>
        );
      case "punctuation":
        return (
          <span
            {...attributes}
            data-type="punctuation"
            style={{ opacity: "0.75" }}
          >
            {children}
          </span>
        );
      default:
        return next();
    }
  },
  decorateNode(node, editor, next) {
    const others = next() || [];
    if (node.type != "code") return others;

    const texts = node.getTexts().toArray();
    const string = texts.map(t => t.text).join("\n");

    const grammar = Prism.languages["html"];

    const tokens = Prism.tokenize(string, grammar);

    const decorations = [];
    let textStart = 0;
    let textEnd = 0;

    texts.forEach(text => {
      textEnd = textStart + text.text.length;

      let offset = 0;

      function processToken(token, type) {
        if (typeof token === "string") {
          if (type) {
            const decoration = createDecoration({
              text,
              textStart,
              textEnd,
              start: offset,
              end: offset + token.length,
              type
            });
            if (decoration) {
              decorations.push(decoration);
            }
          }
          offset += token.length;
        } else {
          if (typeof token.content === "string") {
            const decoration = createDecoration({
              text,
              textStart,
              textEnd,
              start: offset,
              end: offset + token.content.length,
              type: token.type
            });
            if (decoration) {
              decorations.push(decoration);
            }

            offset += token.content.length;
          } else {
            // When using token.content instead of token.matchedStr, token can be deep
            for (let i = 0; i < token.content.length; i += 1) {
              processToken(token.content[i], token.type);
            }
          }
        }
      }

      tokens.forEach(token => {
        processToken(token);
      });
      textStart = textEnd + 1; // account for added `\n`
    });

    return decorations;

    return [...others, ...decorations];
  }
});
