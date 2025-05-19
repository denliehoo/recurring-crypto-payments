import { testMonorepo } from "@components";
import { TestButton } from "@components/src/button";

const App = () => {
  return (
    <div>
      <TestButton label="Component button" />
      <button onClick={() => testMonorepo()}>Test</button>
      Hello World!!
    </div>
  );
};

export default App;
