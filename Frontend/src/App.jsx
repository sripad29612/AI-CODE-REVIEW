import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import "./App.css";


import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markup"; 
import "prismjs/components/prism-css";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [language, setLanguage] = useState("javascript");
  const [review, setReview] = useState("Run a review to see AI feedback here.");

 
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

 
  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
        language,
      });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("⚠️ Error getting AI review. Check server or API key.");
    }
  }

 
  const highlightCode = (src) => {
    const lang = Prism.languages[language] || Prism.languages.javascript;
    try {
      return Prism.highlight(src, lang, language);
    } catch {
      return src;
    }
  };

  return (
    <main>
      {/* LEFT HALF - CODE EDITOR */}
      <div className="left">
        {/* language selector */}
        <select
          className="lang-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="markup">HTML</option>
          <option value="css">CSS</option>
          <option value="sql">SQL</option>
          <option value="json">JSON</option>
          <option value="bash">Bash</option>
        </select>

        
        <div className="code">
          <Editor
            value={code}
            onValueChange={(val) => setCode(val)}
            highlight={(code) => highlightCode(code)}
            padding={12}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 14,
              minHeight: "100%",
              outline: 0,
              color: "#fff",
            }}
          />
        </div>

        
        <div onClick={reviewCode} className="review">
          Review
        </div>
      </div>

      
      <div className="right">
        <h3>AI Code Review</h3>
        <pre style={{ whiteSpace: "pre-wrap", color: "#fff" }}>{review}</pre>
      </div>
    </main>
  );
}

export default App;





