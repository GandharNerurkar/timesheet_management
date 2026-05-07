import { LoginForm } from "./login-form";

const INTRO_COPY =
  "Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.";

export function LoginShell() {
  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <section className="flex bg-slate-100 px-6 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[480px] items-center justify-center">
            <div className="w-full">
              <header className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Welcome back
                </h1>
              </header>

              <LoginForm />
            </div>
          </div>
        </section>

        <section className="flex bg-[#2563EB] px-6 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[480px] items-center">
            <div className="space-y-6 text-white">
              <h2 className="text-5xl font-semibold tracking-tight sm:text-6xl">
                ticktock
              </h2>
              <p className="max-w-xl text-base leading-8 text-blue-50 sm:text-lg">
                {INTRO_COPY}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
