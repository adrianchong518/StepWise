# StepWise

[_StepWise_](https://github.com/adrianchong518/StepWise) is an all-in-one platform for step-by-step solutions to HKDSE Mathematics exam questions.

## Background

This is a project developed for the HKUST course EMIA 2020, Cross-disciplinary Design Thinking, in Fall 2024 by Team 1 in L6.

## Project Structure

Here is the folder structure of this project:

- [`web`](./web/): The front-end UI for the platform
- [`data`](./data/): The written content for the prototype.

There are two major branches:

- `main`: the main development branch
- `prod`: the main production branch where the website is automatically deployed on [Vercel](https://step-wise.vercel.app/)

> [!NOTE]
> The hosted version on Vercel may not be available after sometime, so please host this project locally on your computer to see the website.

## Building and running

To build and run this Next.js project on your local computer, you should have `pnpm` (or some other node package manager) installed.

First, enter the `web` directory and install all dependencies using:

```bash
pnpm install
```

Then, you can run the following for a development build:

```bash
pnpm dev
```

Or run the following for a production build:

```bash
pnpm build
pnpm run
```

> [!NOTE]
> When using the development build, there may be additional UI elements used for debugging which could be safely ignored. Also, the website is built on the fly, thus there may be unexpected stutters.
