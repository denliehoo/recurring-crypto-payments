import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

const IntegrationInstructions = () => {
  const codeString = `
    function greet(name) {
      return "Hello, " + name + "!";
    }
    console.log(greet("World"));
  `;

  return (
    <div>
      <SyntaxHighlighter language="javascript" style={tomorrowNight}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default IntegrationInstructions;
