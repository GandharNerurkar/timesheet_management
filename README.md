# Timesheet Management

A modern, responsive timesheet management application built with Next.js 16, TypeScript, and Tailwind CSS. Manage employee work hours, projects, and tasks with an intuitive weekly view interface.

## Features

- **User Authentication**: Secure login/logout with NextAuth.js
- **Weekly Timesheet View**: Visual weekly calendar with date containers
- **Task Management**: Add, edit, and delete tasks with project assignment
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Modal Interface**: Centered modals with blur background for task entry
- **Pagination**: Efficient table pagination for large datasets
- **Accessibility**: ARIA labels and keyboard navigation support

## Tech Stack

- **Framework**: Next.js 16.2.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form + Zod validation
- **Authentication**: NextAuth.js 4
- **UI Components**: Custom component library
- **State Management**: React hooks
- **Data**: Mock data (easily replaceable with real API)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd timesheet_management
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Login**: Access the app and authenticate
2. **Dashboard**: View all timesheets in a paginated table
3. **Timesheet Details**: Click on a timesheet to view weekly breakdown
4. **Add Tasks**: Use the "Add new task" button to create entries
5. **Edit/Delete**: Modify or remove tasks via the action menu

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   └── timesheet/[id]/    # Timesheet detail page
├── components/            # Reusable UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   ├── modal/            # Modal components
│   ├── table/            # Table components
│   ├── timesheet/        # Timesheet-specific components
│   └── ui/               # Base UI components
├── data/mock/             # Mock data files
├── features/auth/         # Authentication features
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── providers/             # React context providers
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
