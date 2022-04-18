import { textChecker, urlChecker } from "./nameChecker";

function handleSubmit(event) {
  event.preventDefault();

  // input text
  let formText = document.querySelector("#input").value;

  // if input is not text or invalid URL, it will be denied
  if (!textChecker(formText) && !urlChecker(formText)) {
    alert("Input Text or valid URL");
  } else {
    fetch(`http://localhost:8081/nlp?input=${formText}`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: formText }),
    })
      .then((res) => res.json())
      .then((res) => {
        document.querySelector("#model").innerHTML = `Model: ${res.model}`;
        document.querySelector(
          "#score_tag"
        ).innerHTML = `Score Tag: ${res.score_tag}`;
        document.querySelector(
          "#agreement"
        ).innerHTML = `Agreement: ${res.agreement}`;
        document.querySelector(
          "#subjectivity"
        ).innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.querySelector(
          "#confidence"
        ).innerHTML = `Confidence: ${res.confidence}`;
        document.querySelector("#irony").innerHTML = `Irony: ${res.irony}`;
      });
  }
}

export { handleSubmit };
