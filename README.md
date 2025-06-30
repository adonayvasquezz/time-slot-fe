# Time Slot Frontend

A Next.js frontend application for managing time slots with Auth0 authentication and Google Calendar integration.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- Backend API running (see backend README)

### 1. Install and Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001 (default)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001

# Auth0 Configuration
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
```

## 📋 Features

### ✅ Core Features

- **Event Management**: Create, edit, delete time slots
- **User Authentication**: Auth0 integration
- **Google Calendar Sync**: Automatic synchronization
- **Conflict Detection**: Real-time validation
- **Responsive UI**: Modern, mobile-friendly design

### ✅ User Experience

- **Toast Notifications**: Success/error feedback
- **Modal Forms**: Clean event creation/editing
- **Real-time Validation**: Form validation with helpful messages
- **Loading States**: Smooth user interactions

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── events/           # Event-related components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── services/             # API service layer
└── types/                # TypeScript type definitions
```

## 📝 Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Code linting
```

## 🔒 Authentication Flow

1. **Login**: User authenticates via Auth0
2. **Token Management**: Automatic token refresh
3. **API Calls**: JWT sent in Authorization header
4. **User Context**: Events filtered by authenticated user

## 🔄 Google Calendar Integration

- **Automatic Sync**: Events sync with Google Calendar
- **Token Management**: Secure Google access token handling
- **Conflict Detection**: Prevents overlapping events
- **Error Handling**: Graceful fallback on sync failures

## 🎨 UI Components

- **EventCard**: Display event information
- **EventForm**: Create/edit event modal
- **EventList**: List all user events
- **EventManager**: Main event management interface
- **Toast Notifications**: User feedback system

## 🚨 Troubleshooting

### Common Issues

- **Auth0 Errors**: Verify environment variables
- **API Connection**: Ensure backend is running
- **Google Calendar**: Check token permissions
- **Build Errors**: Clear `.next` folder and reinstall dependencies

## 📊 Status

- ✅ **Production Ready**: All core features implemented
- ✅ **Authentication**: Auth0 integration complete
- ✅ **Calendar Sync**: Google Calendar integration working
- ✅ **UI/UX**: Modern, responsive interface
- ✅ **Error Handling**: Comprehensive error management

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests: `npm run lint`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.
