# AssetWorks Interactive Financial Reporting Platform

An AI-powered financial analysis and reporting platform that generates comprehensive, interactive financial reports using advanced language models.

## 🚀 Live Repository

**GitHub Repository:** [https://github.com/sureshvictor-source/assetworks-webapp-interactive](https://github.com/sureshvictor-source/assetworks-webapp-interactive)

## ✨ Key Features

### Financial Playground
- **AI-Powered Report Generation**: Generate comprehensive financial reports using Anthropic Claude
- **Interactive Mode**: Edit and rearrange report sections in real-time
- **Entity Extraction**: Automatically detect and track companies, people, and organizations
- **Streaming Responses**: Real-time report generation with token usage tracking
- **Thread Management**: Organize conversations and reports in persistent threads

### Advanced Capabilities
- **Multi-Model Support**: Integration with Anthropic Claude and OpenAI GPT models
- **Real-Time Financial Data**: Live stock and cryptocurrency data integration
- **Export Options**: Download reports as PDF or share via public links
- **Development Mode**: Authentication bypass for rapid development

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with Google OAuth
- **AI Integration**: Anthropic Claude API
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI, Shadcn/ui
- **Charts**: Recharts, Custom SVG/CSS charts

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud instance)
- Anthropic API key

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/sureshvictor-source/assetworks-webapp-interactive.git
cd assetworks-webapp-interactive
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env.local` file with:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/assetworks

# NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3001

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AI APIs
ANTHROPIC_API_KEY=your-anthropic-api-key

# Development Mode (optional)
DISABLE_AUTH=true
NEXT_PUBLIC_DISABLE_AUTH=true
```

4. **Run the development server**
```bash
npm run dev
```

5. **Access the application**
Open [http://localhost:3001](http://localhost:3001) in your browser

## 🎯 Quick Start

### Generate Your First Report

1. Navigate to [Financial Playground](http://localhost:3001/financial-playground)
2. Enter a prompt like "Analyze Apple vs Microsoft financial performance"
3. Watch as the AI generates a comprehensive report in real-time
4. Use Interactive Mode to edit sections
5. Export or share your report

### Development Mode

For rapid development without authentication:
- Set `DISABLE_AUTH=true` in `.env.local`
- The app will bypass login requirements
- Perfect for testing and development

## 🏗️ Project Structure

```
assetworks-webapp-interactive/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── financial-playground/  # Main playground feature
│   └── ...
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── financial-playground/  # Feature-specific components
│   └── ...
├── lib/                  # Utilities and services
│   ├── ai/              # AI integration services
│   ├── db/              # Database models and connections
│   ├── stores/          # Zustand state stores
│   └── ...
└── public/              # Static assets
```

## 🔄 Recent Updates (Oct 27, 2025)

### Fixed Issues
- ✅ Interactive Mode "Done Editing" button placement
- ✅ React hooks order errors resolved
- ✅ Entity chips display optimized
- ✅ Chart rendering improvements
- ✅ Sticky elements made more compact
- ✅ Authentication bypass for development

### Migration Complete
- Successfully migrated from PostgreSQL/Prisma to MongoDB/Mongoose
- All features fully functional with new database layer
- Entity extraction system fully operational

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is proprietary software. All rights reserved.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Anthropic Claude](https://www.anthropic.com/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)

## 📞 Support

For issues or questions, please open an issue on [GitHub](https://github.com/sureshvictor-source/assetworks-webapp-interactive/issues)

---

**Created by Victor Suresh** | **Enhanced with Claude Assistant**
