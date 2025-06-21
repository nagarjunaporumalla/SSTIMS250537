let pollData = {
  question: "",
  options: [],
  votes: []
};

function addOption() {
  const optionInput = document.createElement("input");
  optionInput.type = "text";
  optionInput.className = "option";
  optionInput.placeholder = "Another Option";
  document.getElementById("options-container").appendChild(optionInput);
}

function createPoll() {
  const question = document.getElementById("question").value;
  const options = Array.from(document.getElementsByClassName("option")).map(opt => opt.value).filter(opt => opt);

  if (!question || options.length < 2) {
    alert("Please enter a question and at least 2 options.");
    return;
  }

  pollData = {
    question,
    options,
    votes: Array(options.length).fill(0)
  };

  displayPoll();
}

function displayPoll() {
  document.getElementById("poll-question").innerText = pollData.question;
  const optionsContainer = document.getElementById("poll-options");
  optionsContainer.innerHTML = "";

  pollData.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => vote(index);
    optionsContainer.appendChild(btn);
  });

  document.getElementById("poll").style.display = "block";
  updateResults();
}

function vote(index) {
  pollData.votes[index]++;
  updateResults();
}

function updateResults() {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  const totalVotes = pollData.votes.reduce((a, b) => a + b, 0);

  pollData.votes.forEach((voteCount, index) => {
    const percentage = totalVotes === 0 ? 0 : ((voteCount / totalVotes) * 100).toFixed(1);
    const result = document.createElement("div");
    result.innerHTML = `
      <strong>${pollData.options[index]}:</strong> ${voteCount} votes (${percentage}%)
      <div class="result-bar" style="width: ${percentage}%">${percentage > 5 ? percentage + '%' : ''}</div>
    `;
    resultsContainer.appendChild(result);
  });
}
