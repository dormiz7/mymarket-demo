import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const dummyData = [
  { name: "Instagram", clicks: 120 },
  { name: "LinkedIn", clicks: 80 },
  { name: "Real Estate Site", clicks: 45 },
  { name: "Forums", clicks: 30 },
];

function MyMarketDemoLanding() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState({ name: "", industry: "", location: "", goals: "" });
  const [product, setProduct] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generatedPost, setGeneratedPost] = useState("");
  const [budget, setBudget] = useState("");
  const [channelPlan, setChannelPlan] = useState(null);

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
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center">Welcome to MyMarket</h1>
      <p className="text-center text-gray-600">Your smart digital marketing assistant</p>

      {step === 0 && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-xl font-semibold">Step 1: Tell us about your business</h2>
            <Input placeholder="Business Name" onChange={(e) => setBusiness({ ...business, name: e.target.value })} />
            <Input placeholder="Industry" onChange={(e) => setBusiness({ ...business, industry: e.target.value })} />
            <Input placeholder="Location" onChange={(e) => setBusiness({ ...business, location: e.target.value })} />
            <Textarea placeholder="Marketing Goals" onChange={(e) => setBusiness({ ...business, goals: e.target.value })} />
            <Button className="w-full" onClick={() => setStep(1)}>Next</Button>
          </CardContent>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-xl font-semibold">Step 2: Create a sample post</h2>
            <Input placeholder="What are you promoting?" value={product} onChange={(e) => setProduct(e.target.value)} />
            <select className="w-full p-2 rounded border" value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Playful">Playful</option>
            </select>
            <Button className="w-full" onClick={generatePost}>Generate Post</Button>
            {generatedPost && <div className="p-4 border rounded bg-gray-50">{generatedPost}</div>}
            <Button variant="outline" className="w-full" onClick={() => setStep(2)}>Next</Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-xl font-semibold">Step 3: Smart Channel Plan</h2>
            <Input placeholder="Monthly marketing budget (USD)" value={budget} onChange={(e) => setBudget(e.target.value)} />
            <Button className="w-full" onClick={generateChannelPlan}>Generate Plan</Button>
            {channelPlan && (
              <ul className="list-disc pl-5 space-y-1">
                {channelPlan.map((c) => (
                  <li key={c.name}>{c.name}: {c.percent}% (~${c.amount})</li>
                ))}
              </ul>
            )}
            <Button variant="outline" className="w-full" onClick={() => setStep(3)}>Next</Button>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Step 4: Performance Preview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dummyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <Button className="w-full mt-4" onClick={() => setStep(0)}>Start Over</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default MyMarketDemoLanding;
