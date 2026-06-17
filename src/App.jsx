import React, {
  useState,
  useEffect,
} from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function App() {
  const [activeTab, setActiveTab] = useState("schedule");
const [weights, setWeights] = useState(() => {
  const saved =
    localStorage.getItem("weights");

  return saved
  ? JSON.parse(saved)
  : [];
});
useEffect(() => {
  localStorage.setItem(
    "weights",
    JSON.stringify(weights)
  );
}, [weights]);

  const currentWeight =
  weights.length > 0
    ? weights[weights.length - 1].weight
    : 70;
const targetWeight = 60;
const height = 160;
  const bmi = (
    currentWeight /
    Math.pow(height / 100, 2)
  ).toFixed(1);

 const tabs = [
  { id: "schedule", label: "周计划" },
  { id: "strength", label: "力量日饮食" },
  { id: "cardio", label: "有氧日饮食" },
  { id: "progress", label: "体重追踪" },
  { id: "checkin", label: "每日打卡" },
  { id: "sleep", label: "睡眠恢复" },
  { id: "notes", label: "注意事项" },
];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FDF6EF",
        padding: 32,
        fontFamily:
          "-apple-system,BlinkMacSystemFont,sans-serif",
      }}
    >
      <h1>✨ 减脂塑形计划</h1>

      <p
        style={{
          color: "#666",
          marginBottom: 24,
        }}
      >
        24岁 · 160cm · 70kg → 60kg
      </p>

      {/* Dashboard */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 16,
          marginBottom: 30,
        }}
      >
        <Card
  title="当前体重"
  value={`${currentWeight}kg`}
/>
        <Card title="当前体重" value={`${currentWeight}kg`} />
<Card title="目标体重" value={`${targetWeight}kg`} />
<Card title="BMI" value={bmi} />
<Card title="饮水目标" value="2.5L" />
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            style={{
              border: "none",
              borderRadius: 30,
              padding: "10px 18px",
              cursor: "pointer",
              background:
                activeTab === tab.id
                  ? "#E07A3A"
                  : "#fff",
              color:
                activeTab === tab.id
                  ? "#fff"
                  : "#333",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "schedule" && (
        <ScheduleTab />
      )}

      {activeTab === "strength" && (
        <StrengthDietTab />
      )}

      {activeTab === "cardio" && (
        <CardioDietTab />
      )}
{activeTab === "progress" && (
  <ProgressTab
    weights={weights}
    setWeights={setWeights}
  />
)}

{activeTab === "checkin" && (
  <CheckInTab />
)}

      {activeTab === "sleep" && (
        <SleepTab />
      )}

      {activeTab === "notes" && (
        <NotesTab />
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 20,
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          color: "#888",
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ScheduleTab() {
  const days = [
    "💪 周一 胸肩三头",
    "🚶 周二 有氧",
    "🏋️ 周三 核心+臀腿",
    "💪 周四 背二头",
    "🚶 周五 有氧",
    "🧘 周六 体态训练",
    "😴 周日 休息",
  ];

  return (
    <Section title="📅 本周训练计划">
      {days.map((day) => (
        <Row key={day}>{day}</Row>
      ))}
    </Section>
  );
}

function StrengthDietTab() {
  return (
    <Section title="🍱 力量日饮食">
      <Row>早餐：燕麦 + 牛奶 + 鸡蛋</Row>
      <Row>午餐：鸡肉 + 蔬菜</Row>
      <Row>训练后：香蕉 + 蛋白粉</Row>
      <Row>晚餐：米饭 + 鱼肉 + 蔬菜</Row>
    </Section>
  );
}

function CardioDietTab() {
  return (
    <Section title="🥗 有氧日饮食">
      <Row>早餐：燕麦 + 鸡蛋</Row>
      <Row>午餐：鸡肉 + 蔬菜</Row>
      <Row>晚餐：少量米饭 + 蛋白质</Row>
    </Section>
  );
}

function SleepTab() {
  return (
    <Section title="🌙 睡眠恢复">
      <Row>目标睡眠：7-9小时</Row>
      <Row>23:00前入睡</Row>
      <Row>睡前可加半根香蕉</Row>
      <Row>每日10分钟拉伸</Row>
    </Section>
  );
}

function NotesTab() {
  return (
    <Section title="📌 注意事项">
      <Row>每周减重0.4-0.6kg</Row>
      <Row>每周一次补碳日</Row>
      <Row>每天记录体重</Row>
      <Row>优先保证睡眠</Row>
    </Section>
  );
}
function ProgressTab({
  weights,
  setWeights,
}) {
  const [newWeight, setNewWeight] =
    useState("");

  const addWeight = () => {
    if (!newWeight) return;

    const today = new Date()
  .toLocaleDateString("zh-CN");

const existingIndex =
  weights.findIndex(
    (item) =>
      item.date === today
  );

if (existingIndex >= 0) {
  const updated = [...weights];

  updated[existingIndex] = {
    date: today,
    weight: Number(newWeight),
  };

  setWeights(updated);
} else {
  setWeights([
    ...weights,
    {
      date: today,
      weight: Number(newWeight),
    },
  ]);
}

    setNewWeight("");
  };

  return (
    <Section title="📈 体重追踪">

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <input
          type="number"
          placeholder="输入体重"
          value={newWeight}
          onChange={(e) =>
            setNewWeight(e.target.value)
          }
          style={{
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={addWeight}
          style={{
            border: "none",
            background: "#E07A3A",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          添加
        </button>
      </div>

      <div
        style={{
          width: "100%",
          height: 300,
        }}
      >
        <ResponsiveContainer>
          <LineChart data={weights}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
            />
          </LineChart>
        </ResponsiveContainer>
</div>

<div
  style={{
    marginTop: 20,
  }}
>
  {weights
    .slice()
    .reverse()
    .map((item) => (
      <div
        key={item.date}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 0",
          borderBottom: "1px solid #eee",
        }}
      >
        <span>{item.date}</span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <strong>{item.weight}kg</strong>

          <button
            onClick={() => {
              const updated =
                weights.filter(
                  (w) =>
                    w.date !== item.date
                );

              setWeights(updated);
            }}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            🗑️
          </button>
        </div>
      </div>
    ))}
</div>

    </Section>
  );
}
function CheckInTab() {
  const today = new Date()
  .toLocaleDateString("zh-CN");
  const [tasks, setTasks] = useState(() => {
  const saved =
    localStorage.getItem("dailyTasks");

  const savedDate =
    localStorage.getItem(
      "dailyTasksDate"
    );

  const defaultTasks = [
    {
      label: "🍳 早餐",
      done: false,
    },
    {
      label: "🍱 午餐",
      done: false,
    },
    {
      label: "🍽 晚餐",
      done: false,
    },
    {
      label: "🏋️ 今日训练",
      done: false,
    },
    {
      label: "💧 饮水达标",
      done: false,
    },
    {
      label: "🌙 23:00前睡觉",
      done: false,
    },
  ];

  if (
    saved &&
    savedDate === today
  ) {
    return JSON.parse(saved);
  }

  return defaultTasks;
});

useEffect(() => {
  localStorage.setItem(
    "dailyTasks",
    JSON.stringify(tasks)
  );

  localStorage.setItem(
    "dailyTasksDate",
    today
  );
}, [tasks, today]);

const completedCount =
  tasks.filter((task) => task.done)
    .length;

const percentage =
  (completedCount / tasks.length) *
  100;

  const toggleTask = (index) => {
    const updated = [...tasks];

    updated[index].done =
      !updated[index].done;

    setTasks(updated);
  };

  return (
  <Section title="✅ 每日打卡">

    <div
      style={{
        marginBottom: 24,
      }}
    >
      <div
        style={{
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        今日完成率：
        {completedCount}/{tasks.length}
      </div>

      <div
        style={{
          height: 12,
          background: "#eee",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            background: "#E07A3A",
            transition:
              "all 0.3s ease",
          }}
        />
      </div>

      <div
        style={{
          marginTop: 8,
          color: "#666",
        }}
      >
        {percentage.toFixed(0)}%
      </div>
    </div>

      {tasks.map((task, index) => (
        <div
          key={task.label}
          onClick={() =>
            toggleTask(index)
          }
          style={{
            cursor: "pointer",
            padding: "14px 0",
            borderBottom:
              "1px solid #f0f0f0",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
          }}
        >
          <span>
            {task.label}
          </span>

          <span
            style={{
              fontSize: 22,
            }}
          >
            {task.done
              ? "✅"
              : "⬜"}
          </span>
        </div>
      ))}
    </Section>
  );
}

function Section({ title, children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 24,
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function Row({ children }) {
  return (
    <div
      style={{
        padding: "12px 0",
        borderBottom:
          "1px solid #f0f0f0",
      }}
    >
      {children}
    </div>
  );
}
