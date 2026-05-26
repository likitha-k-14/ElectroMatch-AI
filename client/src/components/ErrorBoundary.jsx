import React, { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
          <div className="max-w-xl rounded-3xl border border-white/10 bg-white/10 p-6">
            <p className="text-sm font-semibold uppercase text-teal-300">ElectroMatch AI</p>
            <h1 className="mt-2 text-3xl font-black">Frontend error</h1>
            <p className="mt-3 text-slate-300">
              React started, but one component crashed. Check the browser console or restart the dev server.
            </p>
            <pre className="mt-4 overflow-auto rounded-2xl bg-black/40 p-4 text-xs text-rose-200">
              {this.state.error.message}
            </pre>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
