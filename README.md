# 💼 JobStacks

**JobStacks** is a sleek, modern job application tracker built for job seekers tired of managing messy spreadsheets and juggling dozens of job posting tabs.

---

## ✨ Why JobStacks?

Job hunting is stressful enough — organizing your applications shouldn't be.

JobStacks helps job seekers **easily track where they’ve applied**, stay organized across multiple applications, and uncover insights using built-in analytics and AI.

---

## 🎯 Use Case

You're actively applying for jobs, opening dozens of tabs and copying links into Notion or spreadsheets. Weeks later, you're unsure:

- Did I apply to this job already?
- What did I like about this role?
- Did I hear back from that company?

**JobStacks eliminates the guesswork.**  
Paste a job URL, and it parses key details like title, company, location, and salary automatically using AI. You can then track your status, add notes, filter by tags, and visualize your journey with clean, built-in dashboards.

---

## 🧠 What Makes It Different?

- 🔍 **AI-powered parsing**: Just paste a job link. JobStacks uses LLMs to extract job information — no more manual entry.
- 📊 **Built-in analytics**: Visualize where your time is going, which companies you've applied to most, and when you're getting interviews.
- 🏷️ **Tags and filters**: Organize applications with custom tags and statuses. Perfect for batching and prioritizing.
- 💾 **Everything saved in one place**: No more tab clutter or forgotten links.

---

## 🧱 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, ShadCN UI
- **Backend**: Express.js, MongoDB, Mongoose
- **AI**: OpenAI (LLM parsing for job descriptions)

---

## 🔧 Why I Built It

I created JobStacks because I was tired of copying and pasting job listings into spreadsheets, Notion, and random docs — only to forget what I applied for a week later. I wanted a tool that could:

- Automatically pull job info from a URL
- Let me organize my progress across applications
- Actually *look* good and be enjoyable to use

---

## 🧗 Challenges I Faced

- **Auth & Sessions**: Getting persistent auth (especially with cookies and tokens) working across frontend/backend securely was tricky.
- **AI Integration**: Parsing job details with consistency required careful prompt engineering and fallback logic.

---

## 🛠 How I Accomplished It

- Started with a solid Next.js + Express/MongoDB foundation.
- Integrated OpenAI’s API with scraping logic to auto-populate job details.
- Used a REST API pattern for clean separation of concerns.
- Built with responsiveness and dark mode from the beginning.

---

## 🧪 Still Improving

JobStacks is constantly evolving! On the roadmap:

- 🔔 Email or browser notifications for interview follow-ups
- 📎 Resume + cover letter storage per job
- 📅 Calendar sync for deadlines
- 🧠 Better AI summaries of job descriptions

---

