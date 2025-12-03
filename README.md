# Portfolio - SORO Colotcholoman Moïse

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS featuring a stunning glassmorphism design.

## ✨ Features

- 🎨 **Glassmorphism Design** - Modern glass-morphism UI with beautiful backdrop blur effects
- 🌓 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Optimized Performance** - Built with Next.js 14 App Router for optimal performance
- 🎭 **Smooth Animations** - Framer Motion powered animations and transitions
- 🔗 **GitHub Integration** - Automatically fetches and displays GitHub repositories
- 📧 **Contact Form** - Functional contact form with validation
- ♿ **Accessible** - ARIA labels and keyboard navigation support
- 🚀 **SEO Optimized** - Meta tags, sitemap, and robots.txt configured

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **GitHub API**: [@octokit/rest](https://github.com/octokit/rest.js)

## 📋 Sections

- **Hero** - Introduction with social links and CTAs
- **About** - Personal information and quick facts
- **Skills** - Technical skills organized by category
- **Projects** - Featured projects with GitHub integration
- **Experience** - Professional experience timeline
- **Contact** - Contact form and contact information

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SoroMoise/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file (optional):

```bash
cp .env.example .env.local
```

4. Update personal information in `lib/constants.ts`

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Configuration

### Personal Information

Edit `lib/constants.ts` to update:

- Personal information (name, location, company, etc.)
- Skills and technologies
- Projects and portfolio items
- Professional experience
- Social media links

### Contact Form

The contact form is ready to use. To enable email sending, choose one of these options:

#### Option 1: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local`:

```env
RESEND_API_KEY=your_api_key
CONTACT_EMAIL=your_email@example.com
```

4. Uncomment the Resend code in `app/api/contact/route.ts`

#### Option 2: Nodemailer with SMTP

1. Configure your SMTP settings in `.env.local`
2. Uncomment the Nodemailer code in `app/api/contact/route.ts`

### GitHub Integration

For higher rate limits, add your GitHub Personal Access Token:

```env
GITHUB_TOKEN=your_github_token
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Animations

Modify animation variants in component files or add new animations in `tailwind.config.ts`.

### Sections

Add, remove, or reorder sections by editing `app/page.tsx`.

## 📦 Build

Build the project for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SoroMoise/portfolio)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables if needed
4. Deploy!

### Other Platforms

This is a standard Next.js application and can be deployed to:

- Netlify
- AWS Amplify
- Railway
- Render
- Any platform supporting Node.js

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**SORO Colotcholoman Moïse**

- GitHub: [@SoroMoise](https://github.com/SoroMoise)
- WhatsApp: [+225 05 64 79 62 21](https://wa.me/2250564796221)
- Location: Abidjan, Côte d'Ivoire

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

Built with ❤️ by Moïse Soro
