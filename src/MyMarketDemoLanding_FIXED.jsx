import React, { useState } from "react";

function MyMarketDemoLanding() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState({ name: "", industry: "", location: "", goals: "" });
  const [product, setProduct] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generatedPost, setGeneratedPost] = useState("");
  const [budget, setBudget] = useState("");
  const [channelPlan, setChannelPlan] = useState(null);

  const dummyData = [
    { name: "Instagram", clicks: 120 },
    { name: "LinkedIn", clicks: 80 },
    { name: "Real Estate Site", clicks: 45 },
    { name: "Forums", clicks: 30 },
  ];

  const generatePost = () => {
    const post = `Check out our latest opportunity: ${product}! A ${tone.toLowerCase()} marketing message tailored for your audience.`;
    setGeneratedPost(post);
  };

  const generateChannelPlan = () => {
    const budgetValue = parseInt(budget);
    if (!budgetValue || budgetValue <= 0) return;
    const plan = [
      { name: "Instagram", percent: 40, amount: (budgetValue * 0.4).toFixed(0) },
      { name: "LinkedIn", percent: 30, amount: (budgetValue * 0.3).toFixed(0) },
      { name: "News Sites", percent: 20, amount: (budgetValue * 0.2).toFixed(0) },
      { name: "Forums", percent: 10, amount: (budgetValue * 0.1).toFixed(0) },
    ];
    setChannelPlan(plan);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", textAlign: "center" }}>Welcome to MyMarket</h1>
      <p style={{ textAlign: "center", color: "#555" }}>Your smart digital marketing assistant</p>

      {step === 0 && (
        <div>
          <h2>Step 1: Tell us about your business</h2>
          <input placeholder="Business Name" onChange={(e) => setBusiness({ ...business, name: e.target.value })} /><br />
          <input placeholder="Industry" onChange={(e) => setBusiness({ ...business, industry: e.target.value })} /><br />
          <input placeholder="Location" onChange={(e) => setBusiness({ ...business, location: e.target.value })} /><br />
          <textarea placeholder="Marketing Goals" onChange={(e) => setBusiness({ ...business, goals: e.target.value })}></textarea><br />
          <button onClick={() => setStep(1)}>Next</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2>Step 2: Create a sample post</h2>
          <input placeholder="What are you promoting?" value={product} onChange={(e) => setProduct(e.target.value)} /><br />
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Playful">Playful</option>
          </select><br />
          <button onClick={generatePost}>Generate Post</button>
          {generatedPost && <div style={{ background: "#f0f0f0", padding: "1rem", marginTop: "1rem" }}>{generatedPost}</div>}
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 3: Smart Channel Plan</h2>
          <input placeholder="Monthly marketing budget (USD)" value={budget} onChange={(e) => setBudget(e.target.value)} /><br />
          <button onClick={generateChannelPlan}>Generate Plan</button>
          {channelPlan && (
            <ul>
              {channelPlan.map((c) => (
                <li key={c.name}>{c.name}: {c.percent}% (~${c.amount})</li>
              ))}
            </ul>
          )}
          <button onClick={() => setStep(3)}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 4: Performance Preview</h2>
          <p>[Demo performance chart placeholder]</p>
          <button onClick={() => setStep(0)}>Start Over</button>
        </div>
      )}
    </div>
  );
}

export default MyMarketDemoLanding;