import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(cors());

const title = "India v/s Australia live score";
const comments = [
  "Australia won the toss and elected to bat first.",
  "Steven Smith anchored the innings with a solid 73 off 96 balls.",
  "Alex Carey provided a late surge, scoring 61 from 57 deliveries.",
  "Mohammed Shami led India's bowling attack, claiming 3 wickets for 48 runs in his 10 overs.",
  "Australia were bowled out for 264 runs in 49.3 overs.",
  "India's chase was spearheaded by Virat Kohli, who scored a commanding 84 off 98 balls.",
  "Shreyas Iyer contributed a valuable 45 runs from 62 balls.",
  "Adam Zampa and Nathan Ellis each took 2 wickets for Australia, conceding 60 and 49 runs respectively.",
  "KL Rahul sealed the victory for India with a six, finishing the match with 11 balls to spare.",
  "India won by 4 wickets, advancing to the Champions Trophy final.",
];
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  let idx = 0;
  const interval = setInterval(() => {
    const time = new Date().toLocaleTimeString();
    if (idx < comments.length) {
      res.write(
        `data: ${JSON.stringify({
          id: idx,
          title,
          comment: comments[idx],
          time,
        })}\n\n`
      );
      idx++;
    } else {
      res.write("data:END\n\n");
      clearInterval(interval);
      res.end();
    }
    req.on("close", () => {
      clearInterval(interval);
    });
  }, 3000);
});
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
