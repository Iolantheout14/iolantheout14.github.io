# Hephzibah Behulah — Cyber Systems Lab

A static GitHub Pages portfolio presented as an interactive horizontal OSINT-style systems map.

## Navigation

The tree is the navigation. The primary branches are:

- ABOUT — profile, timeline, engineering, cybersecurity, data and philosophy
- WORK — Elektroniker, aviation systems, web development, data analytics, research and technology stack
- LAB — reconnaissance, web security, security testing, network/OSINT, training labs, ethical tool terminal and Kali/WSL2 toolkit
- PROJECTS — pentest toolkit, data analytics, secure web, systems monitor, security blog and GitHub repositories
- PORTFOLIO — skill matrix, hosting/deployment and Python compiler
- KNOWLEDGE — fundamentals, cyber learning, data learning, quizzes/games, resources and study notes
- CONTACT — email, GitHub, LinkedIn, blog, GitBook and public social channels

## Interactive features

### Horizontal tree
D3 renders the navigation as a horizontal relationship tree. Children grow to the right. Drag to pan, scroll to zoom, Fit to center, and click a node to expand/collapse or inspect it.

### Ethical Tool Terminal
The site includes a browser-safe terminal containing 50+ named tools and utilities, including Nmap, Masscan, Rustscan, Amass, Gobuster, ffuf, Nuclei, Burp Suite, Metasploit, SQLmap, Hydra, Hashcat, Wireshark, Shodan and more.

The terminal is functional as an educational simulator: commands are parsed, tools can be selected or searched, and deterministic synthetic output is displayed. It does not perform real scans, credential attacks, DNS queries or network traffic from a visitor's browser.

### Cyber Defender Quiz
The KNOWLEDGE → QUIZZES / GAMES node launches an interactive cybersecurity quiz with scoring and replay. Topics include OSI/networking, HTTP, MFA, authentication, DNS, phishing and Linux.

### Python Compiler
PORTFOLIO → PYTHON COMPILER links to OneCompiler for Python demonstrations.

## Profile content

Public profile:
- Hephzibah Behulah
- Isaac Oluwole Adigun
- Elektroniker | Cybersecurity Student | Web Developer

Timeline:
- 2023 - Present — Elektroniker @ Centerline Design, Hamburg; Airbus systems and lighting installations
- 2022 - 2026 — BSc Cybersecurity @ IU Internationale Hochschule; network security, ethical hacking and cryptography
- 2023 — Data Analytics @ ReDI School Hamburg; Python, Pandas and BigQuery

Skills and tools include HTML5, CSS3, JavaScript, Tailwind CSS, Figma, GitHub, Python, cPanel, Namecheap, Google Colab, BigQuery, Netlify, Lighthouse, SEO, Git Sync, Agile and Scrum.

## Resources

- PortSwigger Web Security Academy
- OWASP Cheat Sheets
- Hack The Box
- Kaggle datasets
- Database Star
- Open Library
- Dummies
- GenZ Bible
- GitBook
- Security blog

## Privacy and responsible use

Security tooling is presented for authorized learning, CTFs, owned systems and permitted assessments. The browser terminal is intentionally simulated.

The contact area contains the supplied public email address and public social links. Newsletter wording is GDPR-conscious and avoids hidden or pre-checked consent.

## Technical structure

- index.html — application shell and navigation
- css/osint-tree.css — dark futuristic visual system, responsive styles and print stylesheet
- js/tree-data.js — all navigation and content data
- js/tree-loader.js — D3 rendering, search, zoom, pan and node interaction
- js/lab-tools.js — 50+ tool browser terminal simulator
- js/cyber-game.js — cybersecurity quiz game
- sw.js — offline/cache layer
- manifest.webmanifest — web-app metadata
- CNAME — custom domain
- robots.txt / sitemap.xml — crawler guidance

No package manager or build step is required. The project is designed for static GitHub Pages hosting.

## Content accuracy

Descriptions are intended to reflect the supplied portfolio information. Do not add live statistics, certifications, compliance claims or security-testing results unless they can be verified.
## Cyber Lab upgrades
- Cyber Defender Quiz now contains a 1,000-question browser-generated question engine.
- Cyber Arcade adds four different practice modes: SOC Triage, Packet Sort, Cipher Lab and Incident Timeline.
- The 50+ browser tools now expose an official documentation/project link beside every tool.
- Tool execution remains simulated in GitHub Pages; real security testing belongs in an authorized local lab such as Kali/WSL2.
- Interactive hover states, tool filtering, documentation links and arcade controls are included.
