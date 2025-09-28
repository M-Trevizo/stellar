import TextBox from "./components/TextBox";
import Titlebar from "./components/Titlebar";

function App() {

  return (
    <>
      <main className="bg-gray-800 flex flex-col">
        <Titlebar />
        <TextBox />
      </main>
    </>
  );
}

export default App;
